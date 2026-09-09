import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.dirname(website);
const papers = JSON.parse(fs.readFileSync(path.join(website, 'papers.json'), 'utf8'));
const selectedSlugs = process.argv.slice(2);
for (const slug of selectedSlugs) if (!papers.some(paper => paper.slug === slug)) throw new Error(`Unknown paper: ${slug}`);
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const github = 'https://github.com/YonedaAI/adelic-polarization-conjecture';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const publicRoot = path.join(website, 'public');
const mathAssets = path.join(publicRoot, 'math');
fs.mkdirSync(mathAssets, { recursive: true });
fs.copyFileSync(path.join(website, 'node_modules/katex/dist/katex.min.css'), path.join(mathAssets, 'katex.min.css'));
fs.cpSync(path.join(website, 'node_modules/katex/dist/fonts'), path.join(mathAssets, 'fonts'), { recursive: true });
fs.copyFileSync(path.join(website, 'node_modules/katex/LICENSE'), path.join(mathAssets, 'LICENSE-katex.txt'));
fs.copyFileSync(path.join(website, 'third-party/KaTeX-FONTS-LICENSE.txt'), path.join(mathAssets, 'LICENSE-fonts.txt'));
fs.mkdirSync(path.join(root, 'docs/papers'), { recursive: true });

for (let index = 0; index < papers.length; index++) {
  const paper = papers[index];
  if (selectedSlugs.length && !selectedSlugs.includes(paper.slug)) continue;
  const article = JSON.parse(fs.readFileSync(path.join(website, 'content', `${paper.slug}.json`), 'utf8'));
  const info = execFileSync('pdfinfo', [path.join(publicRoot, 'papers', `${paper.slug}.pdf`)], { encoding: 'utf8' });
  const pages = Number(/^Pages:\s+(\d+)/m.exec(info)?.[1]);
  if (!pages) throw new Error(`Missing page count for ${paper.slug}`);
  const url = `${site}/papers/${paper.slug}/`;
  const contents = article.toc.map(item => `<a class="${item.level === 3 ? 'toc-sub' : ''}" href="#${escape(item.id)}">${escape(item.title)}</a>`).join('\n');
  const adjacent = [papers[index - 1], papers[index + 1]].map((item, i) => item ? `<a href="/papers/${item.slug}/">${i === 0 ? 'Previous' : 'Next'}: ${escape(item.title)}</a>` : '<span></span>').join('');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark">
<title>${escape(paper.title)} | Adelic Polarization Conjecture</title><meta name="description" content="${escape(paper.description)}"><link rel="canonical" href="${escape(url)}">
<meta property="og:type" content="article"><meta property="og:title" content="${escape(paper.title)}"><meta property="og:description" content="${escape(paper.description)}"><meta property="og:url" content="${escape(url)}"><meta property="og:site_name" content="Adelic Polarization Conjecture"><meta property="og:image" content="${escape(site)}/og/${paper.slug}.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(paper.title)}"><meta name="twitter:description" content="${escape(paper.description)}"><meta name="twitter:image" content="${escape(site)}/og/${paper.slug}.png">
<link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/math/katex.min.css"><script src="/reading.js" defer></script></head>
<body><a href="#main" class="skip-link">Skip to content</a><header class="site-header"><a class="brand" href="/">Adelic Polarization</a><nav aria-label="Main navigation"><a href="/#papers">Papers</a><a href="/#conjecture">Conjecture</a><a href="${github}/tree/main/lean">Lean code</a></nav></header>
<main id="main"><header class="paper-title"><p class="part">${escape(paper.part)} of Adelic Polarization Conjecture</p><h1>${escape(paper.title)}</h1><p class="author">Matthew Long<br>The YonedaAI Collaboration, YonedaAI Research Collective<br>September 2026 &middot; ${pages} pages</p><nav class="paper-actions" aria-label="Paper downloads"><a href="/papers/${paper.slug}.pdf">Download PDF</a><a href="/papers/${paper.slug}.tex">LaTeX source</a><a href="${github}/tree/main/lean">Lean code</a></nav></header>
<div class="reading-layout"><aside class="toc" aria-label="Contents"><h2>Contents</h2><nav>${contents}</nav></aside><div><details class="mobile-contents"><summary>Contents</summary><nav aria-label="Paper contents">${contents}</nav></details><article class="paper-content" aria-label="${escape(paper.title)}">${article.html}</article></div></div><nav class="paper-nav" aria-label="Adjacent papers">${adjacent}</nav></main>
<footer class="site-footer"><p>Matthew Long<br>The YonedaAI Collaboration</p><div><a href="${github}">Repository</a><a href="https://yonedaai.com">YonedaAI</a></div></footer></body></html>`;
  const destination = path.join(publicRoot, 'papers', paper.slug);
  fs.mkdirSync(destination, { recursive: true });
  fs.writeFileSync(path.join(destination, 'index.html'), html);
  fs.writeFileSync(path.join(root, 'docs/papers', `${paper.slug}.html`), html);
  console.log(`${paper.slug}: ${pages} PDF pages, ${article.mathCount} static math expressions`);
}
const urls = ['/', ...papers.map(paper => `/papers/${paper.slug}/`)];
fs.writeFileSync(path.join(publicRoot, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escape(site + url)}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(publicRoot, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
