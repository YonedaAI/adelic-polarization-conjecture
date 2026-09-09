import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as cheerio from 'cheerio';

const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publishedArticle = path.join(website, 'public/papers/local-correspondence/index.html');
const digest = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const originalPublishedArticle = digest(publishedArticle);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'apc-preview-test-'));
const previewWebsite = path.join(temporary, 'website');
for (const directory of ['scripts', 'content', 'public/papers', 'third-party']) fs.mkdirSync(path.join(previewWebsite, directory), { recursive: true });
fs.symlinkSync(path.join(website, 'node_modules'), path.join(previewWebsite, 'node_modules'), 'dir');
for (const file of ['scripts/build-articles.mjs', 'papers.json', 'content/local-correspondence.json', 'public/papers/local-correspondence.pdf', 'third-party/KaTeX-FONTS-LICENSE.txt']) {
  fs.copyFileSync(path.join(website, file), path.join(previewWebsite, file));
}
// Catches accidental all-paper builds during a requested single-paper preview.
const selected = spawnSync(process.execPath, ['scripts/build-articles.mjs', 'local-correspondence'], { cwd: previewWebsite, encoding: 'utf8' });
assert.equal(selected.status, 0, selected.stderr);
assert.match(selected.stdout, /local-correspondence:/);
assert.doesNotMatch(selected.stdout, /polarization-obstructions:|synthesis:/);
const $ = cheerio.load(fs.readFileSync(path.join(previewWebsite, 'public/papers/local-correspondence/index.html'), 'utf8'));
assert.equal($('h1').text(), 'Prime-Adjoining Correspondences');
assert.ok($('.paper-content .katex').length > 100, 'The preview must contain actual static mathematics.');
assert.ok(fs.existsSync(path.join(previewWebsite, 'public/math/LICENSE-katex.txt')), 'The math assets must retain the KaTeX license notice.');
assert.ok(fs.existsSync(path.join(previewWebsite, 'public/math/LICENSE-fonts.txt')), 'The font assets must retain their font license notice.');
assert.equal(digest(path.join(previewWebsite, 'public/math/LICENSE-katex.txt')), digest(path.join(website, 'node_modules/katex/LICENSE')));
assert.equal(digest(path.join(previewWebsite, 'public/math/LICENSE-fonts.txt')), digest(path.join(website, 'third-party/KaTeX-FONTS-LICENSE.txt')));
// Catches silent acceptance of a misspelled paper selection.
const unknown = spawnSync(process.execPath, ['scripts/build-articles.mjs', 'nonexistent-paper'], { cwd: previewWebsite, encoding: 'utf8' });
assert.notEqual(unknown.status, 0);
assert.match(unknown.stderr, /Unknown paper/);
assert.equal(digest(publishedArticle), originalPublishedArticle, 'Preview tests must not alter publication artifacts or production URLs.');
console.log('PASS: isolated selected preview, static mathematics, unknown selection rejected, publication artifacts unchanged.');
console.log(`Generated diagnostic fixture retained at ${temporary}`);
