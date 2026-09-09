import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const website = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const papers = JSON.parse(fs.readFileSync(path.join(website, 'papers.json'), 'utf8'));
const directory = path.join(website, 'public/og');
fs.mkdirSync(directory, { recursive: true });
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;');
const cards = [{ slug: 'home', title: 'Adelic Polarization Conjecture', part: 'Arithmetic geometry' }, ...papers];
for (const paper of cards) {
  const words = paper.title.split(' '), lines = [];
  for (const word of words) {
    if (!lines.length || (lines.at(-1) + ' ' + word).length > 22) lines.push(word);
    else lines[lines.length - 1] += ' ' + word;
  }
  const text = lines.map((line, i) => `<text x="70" y="${220 + i * 75}" font-size="64" fill="#F1EDF8">${escape(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#201b32"/><stop offset="1" stop-color="#47375d"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><g font-family="Georgia,serif">${text}<text x="70" y="100" font-size="25" fill="#E7CB91">${escape(paper.part)}</text><text x="70" y="553" font-size="25" fill="#BCB3CD">The YonedaAI Collaboration</text></g><g stroke="#8F81AE" fill="none" stroke-width="2"><path d="M892 204H1020M864 228V387M1091 228V387M918 410H1020"/><path d="M1010 198L1020 204L1010 210M858 377L864 387L870 377M1085 377L1091 387L1097 377M1010 404L1020 410L1010 416"/></g><g font-family="Georgia,serif" fill="#E7CB91" text-anchor="middle" font-size="22"><text x="864" y="213">S</text><text x="1091" y="213">S∪{p}</text><text x="864" y="419">S∪{q}</text><text x="1091" y="419">S∪{p,q}</text></g><g fill="#B6B4F1" opacity=".18">${Array.from({ length: 11 }, (_, i) => `<circle cx="${775 + i * 35}" cy="493" r="2"/><circle cx="${775 + i * 35}" cy="128" r="2"/>`).join('')}</g></svg>`;
  const source = path.join(directory, `${paper.slug}.svg`), output = path.join(directory, `${paper.slug}.png`);
  fs.writeFileSync(source, svg);
  execFileSync('magick', ['-background', 'none', source, '-depth', '8', '-define', 'png:color-type=2', output]);
  const stats = execFileSync('magick', ['identify', '-format', '%w %h %[fx:standard_deviation]', output], { encoding: 'utf8' }).trim().split(' ');
  const bytes = fs.statSync(output).size;
  if (stats[0] !== '1200' || stats[1] !== '630' || Number(stats[2]) <= .08 || bytes < 30000) throw new Error(`Invalid OG image ${paper.slug}: ${stats}, ${bytes} bytes`);
  console.log(`${paper.slug}: 1200x630, ${bytes} bytes, std ${stats[2]}`);
}
fs.copyFileSync(path.join(directory, 'home.png'), path.join(directory, 'og-default.png'));
