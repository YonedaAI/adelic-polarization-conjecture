import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'apc-conjecture-test-'));
const temporaryWebsite = path.join(temporary, 'website');
const paperDirectory = path.join(temporary, 'papers/latex');
fs.mkdirSync(path.join(temporaryWebsite, 'scripts'), { recursive: true });
fs.mkdirSync(paperDirectory, { recursive: true });
fs.symlinkSync(path.join(website, 'node_modules'), path.join(temporaryWebsite, 'node_modules'), 'dir');
for (const script of ['build-content.mjs', 'source-inventory.mjs']) {
  fs.copyFileSync(path.join(website, 'scripts', script), path.join(temporaryWebsite, 'scripts', script));
}
fs.copyFileSync(path.join(website, 'tests/fixtures/conjecture.tex'), path.join(paperDirectory, 'synthesis.tex'));
for (let pass = 0; pass < 2; pass++) {
  execFileSync('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', 'synthesis.tex'], { cwd: paperDirectory, stdio: 'pipe' });
}
try {
  execFileSync(process.execPath, ['scripts/build-content.mjs', 'synthesis'], { cwd: temporaryWebsite, stdio: 'pipe' });
} catch (error) {
  process.stderr.write(error.stderr?.toString() || String(error));
  throw error;
}
const article = JSON.parse(fs.readFileSync(path.join(temporaryWebsite, 'content/synthesis.json'), 'utf8'));
assert.equal(article.theoremCount, 4);
assert.deepEqual(article.theoremHeadings, ['Theorem 1.1', 'Conjecture 1.2', 'Proposition 1.3', 'Conjecture A.1']);
const $ = cheerio.load(article.html);
assert.equal($('div.conjecture').length, 2);
assert.equal($('a[href="#conj:middle"]').text(), '1.2');
assert.match($.root().text(), /Conjecture\s+1\.2/);
assert.match($.root().text(), /Conjecture\s+A\.1/);
assert.equal($('a[href="#prop:last"]').text(), '1.3');
assert.equal(article.mathCount, 3);
console.log('PASS: shared conjecture counters, appendix numbering, named references, anchors and formulas');
console.log(`Generated diagnostic fixture retained at ${temporary}`);
