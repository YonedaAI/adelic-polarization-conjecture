import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import katex from 'katex';
import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import { inventorySource, validateInventory, normalizeCommutativeDiagrams } from './source-inventory.mjs';

const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.dirname(website);
const converterHash = createHash('sha256').update(fs.readFileSync(fileURLToPath(import.meta.url))).update(fs.readFileSync(new URL('./source-inventory.mjs', import.meta.url))).digest('hex');
const allSlugs = ['local-correspondence', 'polarization-obstructions', 'synthesis'];
const selectedSlugs = process.argv.slice(2).filter(argument => argument !== '--force');
const force = process.argv.includes('--force');
const slugs = selectedSlugs.length ? selectedSlugs : allSlugs;
for (const slug of slugs) if (!allSlugs.includes(slug)) throw new Error(`Unknown paper: ${slug}`);
const sourceDirectories = ['papers/latex', 'papers'];
const pdfDirectories = ['papers/pdf', 'papers/pdfs', 'papers/latex', 'papers'];
const contentDirectory = path.join(website, 'content');
const publicDirectory = path.join(website, 'public/papers');
fs.mkdirSync(contentDirectory, { recursive: true });
fs.mkdirSync(publicDirectory, { recursive: true });

function locate(slug, extension, directories) {
  const candidates = directories.map(directory => path.join(root, directory, `${slug}.${extension}`));
  const found = candidates.find(candidate => fs.existsSync(candidate));
  if (!found) throw new Error(`Missing ${extension.toUpperCase()} for ${slug}: expected ${candidates.join(' or ')}`);
  return found;
}

function readGroup(source, start) {
  if (source[start] !== '{') throw new Error(`Expected opening brace near ${source.slice(start, start + 40)}`);
  let depth = 1;
  for (let i = start + 1; i < source.length; i++) {
    if (source[i] === '\\') { i++; continue; }
    if (source[i] === '{') depth++;
    if (source[i] === '}' && --depth === 0) return { text: source.slice(start + 1, i), end: i + 1 };
  }
  throw new Error('Unclosed macro definition');
}

function extractMacros(source) {
  const macros = {};
  const command = /\\(?:newcommand|renewcommand|providecommand)\*?\s*(?:\{(\\[A-Za-z]+)\}|(\\[A-Za-z]+))\s*(?:\[(\d)\])?\s*/g;
  for (const match of source.matchAll(command)) {
    const start = match.index + match[0].length;
    if (source[start] !== '{') continue;
    macros[match[1] || match[2]] = readGroup(source, start).text;
  }
  const operators = /\\DeclareMathOperator\*?\s*\{(\\[A-Za-z]+)\}\s*/g;
  for (const match of source.matchAll(operators)) {
    const start = match.index + match[0].length;
    if (source[start] === '{') macros[match[1]] = `\\operatorname{${readGroup(source, start).text}}`;
  }
  return macros;
}


function labelsFor(slug, source, texPath) {
  const sourceHash = createHash('sha256').update(source).digest('hex');
  const cachePath = path.join(contentDirectory, `${slug}.labels.json`);
  const auxPath = pdfDirectories.map(directory => path.join(root, directory, `${slug}.aux`)).find(candidate => fs.existsSync(candidate));
  if (auxPath && fs.statSync(auxPath).mtimeMs >= fs.statSync(texPath).mtimeMs) {
    const auxiliary = fs.readFileSync(auxPath, 'utf8');
    const labels = Object.fromEntries([...auxiliary.matchAll(/\\newlabel\{([^}]+)\}\{\{([^}]*)\}/g)].filter(match => !match[1].endsWith('@cref')).map(match => [match[1], match[2]]));
    fs.writeFileSync(cachePath, JSON.stringify({ sourceHash, labels }, null, 2) + '\n');
    return labels;
  }
  if (fs.existsSync(cachePath)) {
    const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    if (cache.sourceHash === sourceHash) return cache.labels;
  }
  throw new Error(`${slug}: compile this manuscript first so its LaTeX auxiliary labels can be read; no matching checked label cache exists`);
}

function theoremNumbers(source) {
  const entries = [];
  let section = 0, count = 0, appendix = false;
  for (const match of source.split('\\begin{document}')[1].matchAll(/\\appendix|\\section(\*)?\{|\\begin\{(theorem|proposition|lemma|corollary|definition|remark|example|conjecture)\}/g)) {
    if (match[0] === '\\appendix') { appendix = true; section = 0; count = 0; }
    else if (match[0].startsWith('\\section')) { if (!match[1]) { section++; count = 0; } }
    else entries.push({ kind: match[2], number: `${appendix ? String.fromCharCode(64 + section) : section}.${++count}` });
  }
  return entries;
}


function headingNumbers(source) {
  const entries = [], counts = [0, 0, 0, 0, 0];
  let appendix = false;
  for (const match of source.split('\\begin{document}')[1].matchAll(/\\appendix|\\(section|subsection|subsubsection|paragraph|subparagraph)(\*)?\{/g)) {
    if (match[0] === '\\appendix') { appendix = true; counts.fill(0); continue; }
    const level = ['section', 'subsection', 'subsubsection', 'paragraph', 'subparagraph'].indexOf(match[1]);
    if (match[2] || level > 2) { entries.push(null); continue; }
    counts[level]++;
    counts.fill(0, level + 1);
    const numbers = counts.slice(0, level + 1).map(String);
    if (appendix) numbers[0] = String.fromCharCode(64 + counts[0]);
    entries.push(numbers.join('.'));
  }
  return entries;
}

function prepareBibliography(source) {
  const keys = [...source.matchAll(/\\bibitem(?:\[[^\]]*\])?\{([^}]+)\}/g)].map(match => match[1]);
  let prepared = source.replace(/\\begin\{thebibliography\}\{[^}]+\}\s*(?:\\small\s*)?/g, '\\section*{References}\\begin{enumerate}').replace(/\\end\{thebibliography\}/g, '\\end{enumerate}');
  prepared = prepared.replace(/\\bibitem(?:\[[^\]]*\])?\{([^}]+)\}/g, (_, key) => `\\item \\hypertarget{bib-${key}}{}`);
  prepared = prepared.replace(/\\cite(?:p|t)?\*?(?:\[([^\]]*)\])?(?:\[([^\]]*)\])?\{([^}]+)\}/g, (_, first, second, citationKeys) => {
    const prefix = second === undefined ? '' : first;
    const suffix = second === undefined ? first : second;
    const links = citationKeys.split(',').map(key => {
      key = key.trim();
      const number = keys.indexOf(key) + 1;
      if (!number) throw new Error(`Unknown bibliography key: ${key}`);
      return `\\hyperlink{bib-${key}}{${number}}`;
    }).join(', ');
    return `[${prefix ? prefix + ' ' : ''}${links}${suffix ? ', ' + suffix : ''}]`;
  });
  return { prepared, keys };
}



const referenceNames = { eq: 'equation', thm: 'theorem', lem: 'lemma', prop: 'proposition', def: 'definition', ex: 'example', cor: 'corollary', rem: 'remark', conj: 'conjecture', sec: 'section', app: 'appendix', tab: 'table', fig: 'figure' };
function prepareReferences(source, labels) {
  return source.replace(/\\(cref|Cref|eqref|ref)\{([^}]+)\}/g, (_, command, rawKeys) => {
    const keys = rawKeys.split(',').map(key => key.trim());
    const links = keys.map(key => {
      if (!labels[key]) throw new Error(`Missing LaTeX cross-reference: ${key}`);
      return `\\hyperlink{${key}}{${command === 'eqref' ? '(' + labels[key] + ')' : labels[key]}}`;
    });
    const join = values => values.length < 2 ? values[0] : values.slice(0, -1).join(', ') + ' and ' + values.at(-1);
    if (command === 'ref' || command === 'eqref') return join(links);
    const kinds = keys.map(key => referenceNames[key.split(':')[0]]);
    if (kinds.some(kind => !kind)) throw new Error(`Unknown named cross-reference: ${rawKeys}`);
    let result;
    if (kinds.every(kind => kind === kinds[0])) {
      const label = links.length > 1 ? (kinds[0] === 'appendix' ? 'appendices' : kinds[0] + 's') : kinds[0];
      result = label + '~' + join(links);
    } else result = join(links.map((link, index) => kinds[index] + '~' + link));
    return command === 'Cref' ? result[0].toUpperCase() + result.slice(1) : result;
  });
}




function alignmentRows(body) {
  const rows = [];
  let start = 0, braces = 0, environments = 0;
  for (let i = 0; i < body.length;) {
    if (body.startsWith('\\begin{', i) || body.startsWith('\\end{', i)) {
      const beginning = body.startsWith('\\begin{', i);
      const group = readGroup(body, i + (beginning ? 6 : 4));
      environments += beginning ? 1 : -1;
      i = group.end;
      continue;
    }
    if (body.startsWith('\\\\', i) && !braces && !environments) {
      const end = i;
      i += 2;
      if (body[i] === '[') {
        const close = body.indexOf(']', i + 1);
        if (close < 0) throw new Error('Unclosed alignment row spacing');
        i = close + 1;
      }
      rows.push({ body: body.slice(start, end), separator: body.slice(end, i) });
      start = i;
      continue;
    }
    if (body[i] === '\\') { i += 2; continue; }
    if (body[i] === '{') braces++;
    if (body[i] === '}') braces--;
    i++;
  }
  rows.push({ body: body.slice(start), separator: '' });
  return rows;
}

function numberDisplay(tex, state, labels) {
  const opening = /^\\begin\{(equation|align|gather|multline|alignat)(\*)?\}/.exec(tex);
  if (!opening || opening[2]) return tex.replace(/\\label\{[^}]+\}/g, '');
  const ending = `\\end{${opening[1]}}`;
  if (!tex.endsWith(ending)) throw new Error(`Unsupported surrounding content for numbered ${opening[1]}`);
  if (/\\tag\b/.test(tex)) throw new Error('Explicit custom equation tags require an explicit numbering adapter');
  state.environments++;
  const body = tex.slice(opening[0].length, -ending.length);
  const rows = ['align', 'alignat', 'gather'].includes(opening[1]) ? alignmentRows(body) : [{ body, separator: '' }];
  const numbered = rows.map(row => {
    if (!row.body.trim() || /\\(?:notag|nonumber)\b/.test(row.body)) return row.body + row.separator;
    const number = String(++state.count);
    for (const match of row.body.matchAll(/\\label\{([^}]+)\}/g)) {
      if (labels[match[1]] !== number) throw new Error(`Equation numbering disagrees with compiled LaTeX at ${match[1]}: expected ${labels[match[1]]}, derived ${number}`);
    }
    return row.body.replace(/\\label\{[^}]+\}/g, '').trimEnd() + `\\tag{${number}}` + row.separator;
  }).join('');
  return opening[0] + numbered + ending;
}

function normalizeColumnSpec(spec) {
  let result = '';
  for (let i = 0; i < spec.length;) {
    const char = spec[i++];
    if (/\s|[|:]/.test(char)) continue;
    if ('lcrX'.includes(char)) { result += char === 'X' ? 'l' : char; continue; }
    if ('pmbLRC'.includes(char)) {
      if (spec[i] === '{') i = readGroup(spec, i).end;
      result += char === 'R' ? 'r' : char === 'C' ? 'c' : 'l';
      continue;
    }
    if ('<>@!'.includes(char) && spec[i] === '{') { i = readGroup(spec, i).end; continue; }
    if (char === '*') {
      const count = readGroup(spec, i); i = count.end;
      const columns = readGroup(spec, i); i = columns.end;
      if (!/^\d+$/.test(count.text)) throw new Error(`Unsupported repeated column count: ${count.text}`);
      result += normalizeColumnSpec(columns.text).repeat(Number(count.text));
      continue;
    }
    throw new Error(`Unsupported table column specification near ${spec.slice(i - 1)}`);
  }
  return result;
}

function normalizeTables(source) {
  let position = 0, result = '', count = 0;
  for (const match of source.matchAll(/\\begin\{(tabularx|tabular|longtable)\}(?:\[[^\]]*\])?\s*/g)) {
    let start = match.index + match[0].length;
    if (match[1] === 'tabularx') start = readGroup(source, start).end;
    while (/\s/.test(source[start] || '')) start++;
    const columns = readGroup(source, start);
    result += source.slice(position, match.index) + `\\begin{${match[1] === 'tabularx' ? 'tabular' : match[1]}}{${normalizeColumnSpec(columns.text)}}`;
    position = columns.end;
    count++;
  }
  result += source.slice(position);
  return { source: result.replaceAll('\\end{tabularx}', '\\end{tabular}'), count };
}

function expandListings(source, sourceDirectory) {
  return source.replace(/\\lstinputlisting(?:\[[^\]]*\])?\{([^}]+)\}/g, (_, file) => {
    const location = path.resolve(sourceDirectory, file);
    if (!location.startsWith(root + path.sep)) throw new Error(`Listing outside repository: ${file}`);
    const code = fs.readFileSync(location, 'utf8');
    if (code.includes('\\end{lstlisting}')) throw new Error(`Listing has a LaTeX environment terminator: ${file}`);
    return `\\begin{lstlisting}\n${code}\n\\end{lstlisting}`;
  });
}

const mathTags = ['math','semantics','annotation','mrow','mi','mo','mn','mtext','mspace','msup','msub','msubsup','mfrac','msqrt','mroot','mtable','mtr','mtd','mover','munder','munderover','mpadded','mphantom','menclose','mstyle','svg','path','line','rect'];
const styleValue = /^[a-zA-Z0-9.%,()\s+\-]+$/;
const styleKeys = ['height','width','min-width','max-width','top','bottom','left','right','position','vertical-align','font-size','margin','margin-left','margin-right','margin-top','margin-bottom','padding-left','padding-right','border-bottom-width','border-top-width','border-right-width','border-left-width','color','background-color','display','text-align','white-space','transform','transform-origin'];
const sanitizerOptions = {
  allowedTags: [...new Set([...sanitizeHtml.defaults.allowedTags, ...mathTags, 'figure','figcaption','section','span'])],
  allowedAttributes: {
    '*': ['id','class','role','aria-label','aria-hidden','style'],
    a: ['href','title','id','class','role','aria-label','rel'],
    math: ['xmlns','display'], annotation: ['encoding'],
    mi: ['mathvariant'], mn: ['mathvariant'], mo: ['mathvariant','stretchy','fence','separator','accent','form','lspace','rspace','minsize','maxsize','movablelimits'],
    mspace: ['width','height','depth'], mstyle: ['mathsize','scriptlevel','displaystyle'],
    mtable: ['columnalign','columnspacing','rowspacing'], mtd: ['columnalign','rowspan','columnspan'],
    mpadded: ['width','height','depth','lspace','voffset'], mover: ['accent'], munder: ['accentunder'],
    svg: ['xmlns','width','height','viewBox','preserveAspectRatio','aria-hidden'],
    path: ['d','fill','stroke','stroke-width'], line: ['x1','y1','x2','y2','stroke','stroke-width'], rect: ['x','y','width','height','fill'],
    td: ['colspan','rowspan','style'], th: ['colspan','rowspan','scope','style'],
    ol: ['start','type'],
  },
  parser: { lowerCaseAttributeNames: false },
  allowedStyles: { '*': Object.fromEntries(styleKeys.map(key => [key, [styleValue]])) },
  allowedSchemes: ['http','https','mailto'],
  allowProtocolRelative: false,
};

const manifest = [];
for (const slug of slugs) {
  const texPath = locate(slug, 'tex', sourceDirectories);
  const pdfPath = locate(slug, 'pdf', pdfDirectories);
  const source = fs.readFileSync(texPath, 'utf8');
  const sourceInventory = inventorySource(source, { normalizeMath: normalizeCommutativeDiagrams });
  const sourceHash = createHash('sha256').update(source).digest('hex');
  const pdfHash = createHash('sha256').update(fs.readFileSync(pdfPath)).digest('hex');
  const cachedPath = path.join(contentDirectory, `${slug}.json`);
  if (!force && fs.existsSync(cachedPath)) {
    const cached = JSON.parse(fs.readFileSync(cachedPath, 'utf8'));
    if (cached.sourceHash === sourceHash && cached.pdfHash === pdfHash && cached.converterHash === converterHash && cached.htmlHash === createHash('sha256').update(cached.html).digest('hex')) {
      if (JSON.stringify(cached.sourceInventory) !== JSON.stringify(sourceInventory)) throw new Error(`${slug}: cached source inventory is stale`);
      validateInventory(cached.html, sourceInventory, `${slug} cached HTML`);
      fs.copyFileSync(pdfPath, path.join(publicDirectory, `${slug}.pdf`));
      fs.copyFileSync(texPath, path.join(publicDirectory, `${slug}.tex`));
      manifest.push({ slug, mathCount: cached.mathCount, tableCount: cached.tableCount, theoremCount: cached.theoremCount, equationCount: cached.equationCount, sections: cached.toc.length, words: cached.words, source: path.relative(root, texPath) });
      process.stdout.write(`${slug}: verified source-matched HTML cache (${cached.mathCount} expressions)\n`);
      continue;
    }
  }
  const macros = extractMacros(source);
  const labels = labelsFor(slug, source, texPath);
  const listingsExpanded = expandListings(source, path.dirname(texPath));
  const tables = normalizeTables(listingsExpanded);
  const bibliography = prepareBibliography(tables.source);
  const prepared = prepareReferences(bibliography.prepared, labels);
  const html = execFileSync('pandoc', ['--from=latex', '--to=html5', '--standalone', '--math-method=mathjax', '--section-divs', '--wrap=none'], { input: prepared, encoding: 'utf8', cwd: path.dirname(texPath), maxBuffer: 20 * 1024 * 1024 });
  const $ = cheerio.load(html);
  const abstract = $('header#title-block-header .abstract').clone();
  $('header#title-block-header').before(abstract);
  $('head, script, style, header#title-block-header, nav#TOC').remove();
  const expectedAbstracts = [...source.matchAll(/\\begin\{abstract\}/g)].length;
  if ($('.abstract').length !== expectedAbstracts) throw new Error(`${slug}: abstract content was not preserved`);
  if ($('table').length !== tables.count) throw new Error(`${slug}: preserved ${$('table').length} of ${tables.count} tables`);
  if ($('.tabularx, .tabular, .longtable').length) throw new Error(`${slug}: unconverted table environment`);
  const numberedTheorems = theoremNumbers(source);
  $('div.theorem, div.proposition, div.lemma, div.corollary, div.definition, div.remark, div.example, div.conjecture').each((index, theorem) => {
    const expected = numberedTheorems[index];
    if (!expected || !$(theorem).hasClass(expected.kind)) throw new Error(`${slug}: theorem order differs from LaTeX at ${index}`);
    const heading = $(theorem).children('p').first().children('strong, em').first();
    const printedHeading = /^(Theorem|Proposition|Lemma|Corollary|Definition|Remark|Example|Conjecture)\s+[\d.]+$/.exec(heading.text());
    if (!printedHeading || printedHeading[1].toLowerCase() !== expected.kind) throw new Error(`${slug}: unsupported printed heading for ${expected.kind} ${expected.number}`);
    heading.text(`${printedHeading[1]} ${expected.number}`);
    const id = $(theorem).attr('id');
    if (id && labels[id] && labels[id] !== expected.number) throw new Error(`${slug}: stale auxiliary theorem number for ${id}: ${labels[id]} versus ${expected.number}`);
  });
  const theoremCount = $('div.theorem, div.proposition, div.lemma, div.corollary, div.definition, div.remark, div.example, div.conjecture').length;
  if (theoremCount !== numberedTheorems.length) throw new Error(`${slug}: preserved ${theoremCount} of ${numberedTheorems.length} theorem environments`);
  if ($('a[data-reference]').length) throw new Error(`${slug}: an unsupported cross-reference command remains`);
  if ($('.citation[data-cites]').length) throw new Error(`${slug}: a citation command was not explicitly converted`);
  const headings = $('body h1, body h2, body h3, body h4, body h5, body h6').toArray();
  const baseLevel = headings.length ? Math.min(...headings.map(heading => Number(heading.tagName.slice(1)))) : 1;
  const toc = [];
  const sectionNumbers = headingNumbers(prepared);
  if (sectionNumbers.length !== headings.length) throw new Error(`${slug}: preserved ${headings.length} of ${sectionNumbers.length} section headings`);
  let headingIndex = 0;
  for (const heading of headings) {
    const element = $(heading);
    const level = Math.min(6, 2 + Number(heading.tagName.slice(1)) - baseLevel);
    const existingId = element.attr('id') || element.parent('section').attr('id');
    const id = existingId || `section-${headingIndex + 1}`;
    const number = sectionNumbers[headingIndex++];
    if (number) element.prepend($('<span>').addClass('section-number').text(`${number}. `));
    if (element.parent('section').attr('id') === id) element.parent().removeAttr('id');
    heading.tagName = `h${level}`;
    element.attr('id', id);
    if (level <= 3) toc.push({ id, title: '', level });
  }
  let mathCount = 0;
  const equationState = { count: 0, environments: 0 };
  if (/\\(?:numberwithin|counterwithin|setcounter)\{equation\}/.test(source)) throw new Error(`${slug}: custom equation counters require an explicit adapter`);
  for (const expression of $('.math').toArray()) {
    const element = $(expression);
    const display = element.hasClass('display');
    let tex = element.text().trim().replace(/^\\\[/, '').replace(/\\\]$/, '').replace(/^\\\(/, '').replace(/\\\)$/, '');
    tex = normalizeCommutativeDiagrams(tex);
    tex = tex.replace(/\\hyperlink\{([^}]+)\}\{([^}]+)\}/g, (_, key, label) => `\\href{#${key}}{${label}}`);
    const equationLabels = [...tex.matchAll(/\\label\{([^}]+)\}/g)].map(match => match[1]);
    tex = numberDisplay(tex, equationState, labels);
    equationLabels.forEach(label => { if ($(`[id="${label.replaceAll('"', '\\"')}"]`).length === 0) element.before($('<span>').attr('id', label)); });
    try {
      element.html(katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'error', trust: context => context.command === '\\href' && /^#[A-Za-z0-9:._-]+$/.test(context.url || ''), output: 'htmlAndMathml', macros: { ...macros } }));
    } catch (error) { throw new Error(`${slug}: mathematical expression ${mathCount + 1} failed: ${tex}\n${error.message}`); }
    const equationTags = [...tex.matchAll(/\\tag\{([^}]*)\}/g)].map(match => match[1]);
    const accessibleTags = element.find('.katex-mathml .mml-eqn-num');
    if (accessibleTags.length !== equationTags.length) throw new Error(`${slug}: equation-number MathML does not match the visual tags`);
    accessibleTags.each((index, cell) => $(cell).append($('<mtext>').text(`(${equationTags[index]})`)));
    mathCount++;
  }
  const expectedNumberedEnvironments = [...source.matchAll(/\\begin\{(?:equation|align|gather|multline|alignat)\}/g)].length;
  if (equationState.environments !== expectedNumberedEnvironments) throw new Error(`${slug}: numbered display environments were lost`);
  for (const item of toc) {
    const heading = $('[id]').filter((_, element) => $(element).attr('id') === item.id).first().clone();
    heading.find('.katex-mathml').remove();
    item.title = heading.text().trim().replace(/\s+/g, ' ');
  }
  $('table').each((_, table) => $(table).wrap('<div class="table-wrapper"></div>'));
  $('a[href]').each((_, anchor) => {
    const link = $(anchor);
    const href = link.attr('href');
    if (href.startsWith('https://') || href.startsWith('http://')) link.attr('rel', 'noreferrer');
  });
  const clean = sanitizeHtml($('body').html() || '', sanitizerOptions);
  validateInventory(clean, sourceInventory, `${slug} sanitized HTML`);
  const check = cheerio.load(clean, null, false);
  if (check('.katex').length !== mathCount) throw new Error(`${slug}: sanitizer removed mathematical expressions`);
  const ids = new Set();
  check('[id]').each((_, element) => {
    const id = check(element).attr('id');
    if (ids.has(id)) throw new Error(`${slug}: duplicate anchor ${id}`);
    ids.add(id);
  });
  check('a[href^="#"]').each((_, anchor) => {
    const href = check(anchor).attr('href');
    if (href.length > 1 && !ids.has(decodeURIComponent(href.slice(1)))) throw new Error(`${slug}: unresolved anchor ${href}`);
  });
  for (const item of toc) if (!ids.has(item.id)) throw new Error(`${slug}: unresolved contents anchor ${item.id}`);
  const prose = check.root().clone();
  prose.find('.math').remove();
  const words = prose.text().trim().split(/\s+/).length;
  const htmlHash = createHash('sha256').update(clean).digest('hex');
  const theoremHeadings = numberedTheorems.map(entry => `${entry.kind[0].toUpperCase()}${entry.kind.slice(1)} ${entry.number}`);
  const article = { slug, sourceHash, pdfHash, converterHash, htmlHash, sourceInventory, html: clean, toc, mathCount, tableCount: tables.count, theoremCount, theoremHeadings, equationCount: equationState.count, words, readingMinutes: Math.max(1, Math.ceil(words / 180)), pdf: `/papers/${slug}.pdf`, source: `/papers/${slug}.tex` };
  fs.writeFileSync(path.join(contentDirectory, `${slug}.json`), JSON.stringify(article));
  fs.copyFileSync(pdfPath, path.join(publicDirectory, `${slug}.pdf`));
  fs.copyFileSync(texPath, path.join(publicDirectory, `${slug}.tex`));
  manifest.push({ slug, mathCount, tableCount: tables.count, theoremCount, equationCount: equationState.count, sections: toc.length, words, source: path.relative(root, texPath) });
  process.stdout.write(`${slug}: ${mathCount} rendered expressions, ${toc.length} contents entries, ${words} words\n`);
}
if (slugs.length === allSlugs.length) fs.writeFileSync(path.join(contentDirectory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
