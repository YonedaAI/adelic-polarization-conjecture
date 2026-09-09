import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { validateInventory } from './source-inventory.mjs';
const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(website, 'out');
const papers = JSON.parse(fs.readFileSync(path.join(website, 'papers.json'), 'utf8'));
const routes = ['/', ...papers.map(paper => `/papers/${paper.slug}/`)];
const report = [];
for (const route of routes) {
  const file = path.join(out, route, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  if ($('h1').length !== 1) throw new Error(`${route}: expected one main heading`);
  if (!$('main').length || !$('html[lang="en"]').length) throw new Error(`${route}: missing semantic structure`);
  const canonical = $('link[rel="canonical"]').attr('href');
  const og = $('meta[property="og:image"]').attr('content');
  const twitter = $('meta[name="twitter:image"]').attr('content');
  if (!canonical?.startsWith('https://') || !og?.startsWith('https://') || !twitter?.startsWith('https://')) throw new Error(`${route}: production metadata must be absolute HTTPS URLs`);
  if ($('meta[name="twitter:card"]').attr('content') !== 'summary_large_image') throw new Error(`${route}: missing Twitter card`);
  const ids = new Set();
  $('[id]').each((_, node) => { const id = $(node).attr('id'); if (ids.has(id)) throw new Error(`${route}: duplicate anchor ${id}`); ids.add(id); });
  $('a[href],link[href],script[src],img[src]').each((_, node) => {
    const href = $(node).attr('href') || $(node).attr('src');
    if (!href || /^(?:https?:|mailto:|data:)/.test(href)) return;
    if (href.startsWith('#')) { if (!ids.has(decodeURIComponent(href.slice(1)))) throw new Error(`${route}: broken anchor ${href}`); return; }
    if (!href.startsWith('/')) throw new Error(`${route}: unsupported relative asset ${href}`);
    const [pathname, fragment] = href.split('#');
    let target = path.join(out, pathname);
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) throw new Error(`${route}: broken local link ${href}`);
    if (fragment) {
      const targetPage = cheerio.load(fs.readFileSync(target, 'utf8'));
      if (!targetPage('[id]').toArray().some(element => targetPage(element).attr('id') === decodeURIComponent(fragment))) throw new Error(`${route}: broken cross-page fragment ${href}`);
    }
  });
  const paper = papers.find(paper => route === `/papers/${paper.slug}/`);
  if (paper) {
    const article = JSON.parse(fs.readFileSync(path.join(website, 'content', `${paper.slug}.json`), 'utf8'));
    const content = $('.paper-content').html();
    validateInventory(content, article.sourceInventory, route);
    if ($('.paper-content .katex').length !== article.mathCount) throw new Error(`${route}: missing initial-HTML mathematics`);
    if ($('.katex-error').length) throw new Error(`${route}: failed formula rendering`);
    const prose = $('.paper-content').clone(); prose.find('.math,pre,code').remove();
    if (/\\(?:frac|sum|mathbb|mathcal|begin|end|label|ref|cite|operatorname)\b/.test(prose.text())) throw new Error(`${route}: raw LaTeX in prose`);
    report.push({ route, math: article.mathCount, theorems: article.theoremCount, words: article.words, localLinks: 'pass', sourceInventory: 'pass' });
  } else report.push({ route, localLinks: 'pass', metadata: 'pass' });
}
console.log(JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(website, '..', 'research/static-site-verification.json'), JSON.stringify(report, null, 2) + '\n');
