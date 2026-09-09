import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import katex from 'katex';
import { inventorySource, normalizeCommutativeDiagrams, validateInventory } from './source-inventory.mjs';

const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.dirname(website);
const slugs = process.argv.slice(2);
assert.ok(slugs.length, 'Pass the paper slugs whose current source and static articles should be checked.');
const hash = source => createHash('sha256').update(source).digest('hex');
const read = file => fs.readFileSync(file, 'utf8');
const results = [];

function tree(node) {
  if (node.type === 'text') return { text: node.data };
  return {
    tag: node.tagName,
    attributes: Object.fromEntries(Object.entries(node.attribs || {}).sort(([a], [b]) => a.localeCompare(b))),
    children: (node.children || []).filter(child => child.type !== 'text' || child.data.trim()).map(tree),
  };
}

function collectMath(value, result = []) {
  if (Array.isArray(value)) value.forEach(item => collectMath(item, result));
  else if (value && typeof value === 'object') {
    if (value.t === 'Math') result.push(value.c);
    else Object.values(value).forEach(item => collectMath(item, result));
  }
  return result;
}

// Equation labels become DOM anchors, and their compiled numbers become tags.
// The remaining TeX tokens must agree in the same order, including every row.
const formulaTokens = tex => normalizeCommutativeDiagrams(tex)
  .replace(/\\(?:label|tag)\{[^}]*\}/g, '').replace(/\s+/g, '');

for (const slug of slugs) {
  assert.match(slug, /^[a-z0-9-]+$/);
  const sourcePath = path.join(root, 'papers/latex', `${slug}.tex`);
  const source = read(sourcePath);
  const sourceHash = hash(source);
  const article = JSON.parse(read(path.join(website, 'content', `${slug}.json`)));
  const labelCache = JSON.parse(read(path.join(website, 'content', `${slug}.labels.json`)));
  assert.equal(article.sourceHash, sourceHash, `${slug}: stale article source hash`);
  assert.equal(labelCache.sourceHash, sourceHash, `${slug}: stale compiled-label source hash`);
  assert.equal(article.htmlHash, hash(article.html), `${slug}: changed cached HTML`);
  const html = read(path.join(website, 'public/papers', slug, 'index.html'));
  const $ = cheerio.load(html);
  const content = $('.paper-content');
  assert.equal(content.length, 1, `${slug}: expected one complete article`);
  assert.equal(content.html(), cheerio.load(article.html, null, false).html(), `${slug}: initial HTML differs from checked content`);
  const inventory = inventorySource(source, { normalizeMath: normalizeCommutativeDiagrams });
  validateInventory(content.html(), inventory, slug);
  assert.equal(content.find('.katex-error').length, 0, `${slug}: KaTeX error node`);

  const ast = JSON.parse(execFileSync('pandoc', ['--from=latex', '--to=json'], {
    input: source, encoding: 'utf8', cwd: path.dirname(sourcePath), maxBuffer: 20 * 1024 * 1024,
  }));
  const sourceMath = [...collectMath(ast.meta.abstract), ...collectMath(ast.blocks)];
  const expressions = content.find('.math').toArray();
  assert.equal(sourceMath.length, expressions.length, `${slug}: independent Pandoc formula count differs`);
  const treeDifferences = [];
  const tags = [], accessibleTags = [];
  expressions.forEach((expression, index) => {
    const rendered = $(expression);
    const annotation = rendered.find('annotation[encoding="application/x-tex"]').text();
    assert.equal(formulaTokens(annotation), formulaTokens(sourceMath[index][1]), `${slug}: changed formula ${index + 1}`);
    assert.equal(rendered.hasClass('display'), sourceMath[index][0].t === 'DisplayMath', `${slug}: changed formula mode ${index + 1}`);
    const expected = cheerio.load(katex.renderToString(annotation, {
      displayMode: rendered.hasClass('display'), throwOnError: true, strict: 'error',
      trust: context => context.command === '\\href' && /^#[A-Za-z0-9:._-]+$/.test(context.url || ''),
      output: 'htmlAndMathml',
    }));
    const observed = rendered.clone();
    // This explicit text is the converter's accessible counterpart to KaTeX's visual tag.
    observed.find('.mml-eqn-num mtext').remove();
    for (const kind of ['math', 'svg']) {
      const before = expected(kind).toArray().map(tree);
      const after = observed.find(kind).toArray().map(tree);
      if (JSON.stringify(before) !== JSON.stringify(after)) treeDifferences.push({ expression: index + 1, kind, tex: annotation });
    }
    const formulaTags = [...annotation.matchAll(/\\tag\{([^}]+)\}/g)].map(match => match[1]);
    const formulaAccessibleTags = rendered.find('.mml-eqn-num mtext').toArray().map(node => $(node).text());
    assert.deepEqual(formulaAccessibleTags, formulaTags.map(tag => `(${tag})`), `${slug}: inaccessible equation tag at formula ${index + 1}`);
    tags.push(...formulaTags);
    accessibleTags.push(...formulaAccessibleTags);
  });
  assert.deepEqual(treeDifferences, [], `${slug}: sanitizer changed MathML or SVG trees`);
  assert.deepEqual(tags, Array.from({ length: article.equationCount }, (_, index) => String(index + 1)), `${slug}: missing or repeated equation numbers`);
  assert.equal(content.find('.katex').length, inventory.mathCount, `${slug}: missing visible mathematics`);
  assert.equal(content.find('math').length, inventory.mathCount, `${slug}: missing accessible mathematics`);

  const ids = new Set();
  $('[id]').each((_, node) => {
    const id = $(node).attr('id');
    assert.ok(!ids.has(id), `${slug}: duplicate DOM anchor ${id}`);
    ids.add(id);
  });
  $('a[href^="#"]').each((_, node) => {
    const key = decodeURIComponent($(node).attr('href').slice(1));
    assert.ok(ids.has(key), `${slug}: unresolved anchor ${key}`);
  });
  const crossReferences = content.find('a[href^="#"]').toArray().filter(node => !$(node).attr('href').startsWith('#bib-'));
  for (const node of crossReferences) {
    const link = $(node), key = decodeURIComponent(link.attr('href').slice(1));
    if (labelCache.labels[key]) assert.equal(link.text().replace(/[()]/g, '').trim(), labelCache.labels[key], `${slug}: incorrect compiled reference ${key}`);
  }
  const bibliographyKeys = [...source.matchAll(/\\bibitem(?:\[[^\]]*\])?\{([^}]+)\}/g)].map(match => match[1]);
  const sourceCitations = [...source.matchAll(/\\cite(?:p|t)?\*?(?:\[[^\]]*\])?(?:\[[^\]]*\])?\{([^}]+)\}/g)]
    .flatMap(match => match[1].split(',').map(key => key.trim()));
  const citations = content.find('a[href^="#bib-"]').toArray();
  assert.deepEqual(citations.map(node => $(node).attr('href').slice(5)), sourceCitations, `${slug}: source citations lost or reordered`);
  for (const node of citations) {
    const link = $(node), key = link.attr('href').slice(5);
    assert.equal(link.text(), String(bibliographyKeys.indexOf(key) + 1), `${slug}: incorrect bibliography number ${key}`);
  }
  const theorems = content.find('div.theorem,div.proposition,div.lemma,div.corollary,div.definition,div.remark,div.example,div.conjecture').toArray();
  theorems.forEach((node, index) => {
    const theorem = $(node), heading = theorem.children('p').first().children('strong,em').first().text();
    assert.equal(heading, article.theoremHeadings[index], `${slug}: incorrect theorem heading`);
    const key = theorem.attr('id');
    if (key && labelCache.labels[key]) assert.ok(heading.endsWith(` ${labelCache.labels[key]}`), `${slug}: theorem disagrees with compiled label ${key}`);
  });
  assert.equal(hash(read(sourcePath)), sourceHash, `${slug}: source changed during validation`);
  results.push({ slug, sourceHash, sourceMath: inventory.mathCount, inlineMath: inventory.inlineCount,
    displayMath: inventory.displayCount, equationNumbers: tags.length, accessibleEquationNumbers: accessibleTags.length,
    theoremEnvironments: theorems.length, sourceLabels: inventory.labels.length, crossReferences: crossReferences.length,
    bibliographyEntries: bibliographyKeys.length, citationLinks: citations.length, mathML: content.find('math').length,
    svg: content.find('svg').length, formulaFidelity: 'PASS', mathMLAndSvgPreservation: 'PASS',
    numberingAndAnchors: 'PASS', initialHtml: 'PASS' });
}

console.log(JSON.stringify({ status: 'PASS', scope: slugs, results }, null, 2));
