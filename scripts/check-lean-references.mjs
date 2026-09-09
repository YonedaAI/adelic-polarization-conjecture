import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const declarations = new Set();
for (const file of fs.readdirSync(path.join(root, 'lean/APC')).filter(file => file.endsWith('.lean'))) {
  const source = fs.readFileSync(path.join(root, 'lean/APC', file), 'utf8');
  for (const match of source.matchAll(/^(?:noncomputable\s+)?(?:theorem|def|abbrev)\s+([A-Za-z0-9_]+)/gm)) declarations.add(`APC.${match[1]}`);
}
let checked = 0;
const failures = [];
for (const file of fs.readdirSync(path.join(root, 'papers/latex')).filter(file => file.endsWith('.tex'))) {
  const source = fs.readFileSync(path.join(root, 'papers/latex', file), 'utf8');
  for (const match of source.matchAll(/\\(?:path|nolinkurl|texttt)\{(APC\.[^}]+)\}/g)) {
    const name = match[1].replaceAll('\\_', '_');
    if (name.endsWith('.lean')) continue;
    checked++;
    if (!declarations.has(name)) failures.push(`${file}:${source.slice(0, match.index).split('\n').length}: no declared Lean identifier ${name}`);
  }
}
if (!checked) failures.push('No explicit APC declaration references found in the papers.');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${checked} paper references match actual APC declarations.`);
