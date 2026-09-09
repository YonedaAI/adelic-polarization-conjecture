import * as cheerio from 'cheerio';

function groupAt(source, start) {
  if (source[start] !== '{') throw new Error(`Expected a braced TeX argument near ${source.slice(start, start + 30)}`);
  let depth = 1;
  for (let index = start + 1; index < source.length; index++) {
    if (source[index] === '\\') { index++; continue; }
    if (source[index] === '{') depth++;
    if (source[index] === '}' && --depth === 0) return { text: source.slice(start + 1, index), end: index + 1 };
  }
  throw new Error('Unclosed TeX argument in source inventory');
}

function controlAt(source, start) {
  const match = /^\\(?:[A-Za-z]+|[\s\S])/.exec(source.slice(start));
  if (!match) throw new Error('Incomplete TeX escape in source inventory');
  return { text: match[0], end: start + match[0].length };
}

// These regions are literal text, not TeX mathematics. Process them before comments:
// a percent sign in a URL or a listing must not consume the rest of the source line.
function removeLiteralRegions(source) {
  let result = '';
  for (let index = 0; index < source.length;) {
    if (source[index] === '%') {
      const end = source.indexOf('\n', index);
      index = end < 0 ? source.length : end;
    } else if (source[index] === '\\') {
      const command = controlAt(source, index);
      if (command.text === '\\begin' && source[command.end] === '{') {
        const environment = groupAt(source, command.end);
        if (['verbatim', 'verbatim*', 'lstlisting', 'minted', 'comment'].includes(environment.text)) {
          const ending = `\\end{${environment.text}}`;
          const end = source.indexOf(ending, environment.end);
          if (end < 0) throw new Error(`Unclosed literal environment ${environment.text}`);
          result += ' ';
          index = end + ending.length;
          continue;
        }
      }
      if (['\\verb', '\\path', '\\url', '\\nolinkurl'].includes(command.text)) {
        let start = command.end;
        if (source[start] === '*') start++;
        while (/\s/.test(source[start] || '')) start++;
        if (source[start] === '{') index = groupAt(source, start).end;
        else {
          const end = source.indexOf(source[start], start + 1);
          if (end < 0) throw new Error(`Unclosed literal ${command.text}`);
          index = end + 1;
        }
        result += ' ';
      } else { result += command.text; index = command.end; }
    } else result += source[index++];
  }
  return result;
}

const mathEnvironments = new Set(['math', 'displaymath', 'equation', 'equation*', 'align', 'align*', 'alignat', 'alignat*', 'gather', 'gather*', 'multline', 'multline*', 'flalign', 'flalign*', 'eqnarray', 'eqnarray*']);

function checkPreamble(preamble) {
  if (/\\(?:def|let|newenvironment|renewenvironment|ensuremath)\b/.test(preamble)) throw new Error('Preamble expansion constructs require an explicit source-inventory adapter');
  const definitions = /\\(?:newcommand|renewcommand|providecommand)\*?\s*(?:\{(\\[A-Za-z]+)\}|(\\[A-Za-z]+))\s*(?:\[\d\])?\s*/g;
  for (const match of preamble.matchAll(definitions)) {
    const body = groupAt(preamble, match.index + match[0].length).text;
    for (let index = 0; index < body.length;) {
      if (body[index] === '$' || body.startsWith('\\(', index) || body.startsWith('\\[', index) || /^\\begin\{(?:math|displaymath|equation|align|gather|multline|flalign|eqnarray)/.test(body.slice(index))) throw new Error(`Math-generating macro ${match[1] || match[2]} requires an explicit source-inventory adapter`);
      index = body[index] === '\\' ? controlAt(body, index).end : index + 1;
    }
  }
}

function delimitedEnd(source, start, closing) {
  for (let index = start; index < source.length;) {
    if (source.startsWith(closing, index)) return index;
    index = source[index] === '\\' ? controlAt(source, index).end : index + 1;
  }
  throw new Error(`Unclosed source mathematics: expected ${closing}`);
}

function environmentEnd(source, start, name) {
  const stack = [name];
  for (let index = start; index < source.length;) {
    if (source[index] !== '\\') { index++; continue; }
    const command = controlAt(source, index);
    if (['\\begin', '\\end'].includes(command.text)) {
      const environment = groupAt(source, command.end);
      if (command.text === '\\begin') stack.push(environment.text);
      else {
        if (stack.pop() !== environment.text) throw new Error(`Mismatched mathematical environment ${environment.text}`);
        if (!stack.length) return environment.end;
      }
      index = environment.end;
    } else index = command.end;
  }
  throw new Error(`Unclosed mathematical environment ${name}`);
}

// Inventory explicit row separators, including nested matrices, cases and splits.
// Keep one entry per row with its nonempty status, so replacing a row by a blank
// cannot evade the check by retaining the same number of row separators.
export function mathRows(tex) {
  const rows = [];
  let start = 0;
  const nonempty = row => row.replace(/\\(?:begin|end|label|tag)\{[^}]*\}/g, '').replace(/\\(?:notag|nonumber)\b/g, '').replace(/[\s&{}]/g, '').length > 0;
  for (let index = 0; index < tex.length;) {
    if (tex[index] !== '\\') { index++; continue; }
    const command = controlAt(tex, index);
    if (command.text === '\\\\') {
      rows.push(nonempty(tex.slice(start, index)));
      index = command.end;
      if (tex[index] === '*') index++;
      if (tex[index] === '[') {
        const end = tex.indexOf(']', index + 1);
        if (end < 0) throw new Error('Unclosed mathematical row spacing');
        index = end + 1;
      }
      start = index;
    } else index = command.end;
  }
  rows.push(nonempty(tex.slice(start)));
  return rows;
}

export function inventorySource(source, { normalizeMath = tex => tex } = {}) {
  const stripped = removeLiteralRegions(source);
  const start = stripped.indexOf('\\begin{document}');
  const end = stripped.lastIndexOf('\\end{document}');
  if (start < 0 || end < start) throw new Error('Source inventory requires a complete TeX document');
  checkPreamble(stripped.slice(0, start));
  const body = stripped.slice(start + '\\begin{document}'.length, end);
  // Expansion would need to be explicitly integrated into this inventory first.
  if (/\\(?:input|include|ensuremath|newcommand|renewcommand|providecommand|def)\b/.test(body)) throw new Error('Body includes or math-generating commands require an explicit source-inventory adapter');
  const labels = [];
  for (let index = 0; index < body.length;) {
    if (body[index] !== '\\') { index++; continue; }
    const command = controlAt(body, index);
    if (command.text === '\\label') {
      let start = command.end;
      while (/\s/.test(body[start] || '')) start++;
      const label = groupAt(body, start);
      if (labels.includes(label.text)) throw new Error(`Duplicate source label ${label.text}`);
      labels.push(label.text);
      index = label.end;
    } else index = command.end;
  }
  const expressions = [];
  for (let index = 0; index < body.length;) {
    let contentStart, contentEnd, end, mode;
    if (body[index] === '$' || body.startsWith('\\(', index) || body.startsWith('\\[', index)) {
      const opening = body[index] === '$' ? (body[index + 1] === '$' ? '$$' : '$') : body.slice(index, index + 2);
      const closing = opening === '\\(' ? '\\)' : opening === '\\[' ? '\\]' : opening;
      mode = opening === '$' || opening === '\\(' ? 'inline' : 'display';
      contentStart = index + opening.length;
      contentEnd = delimitedEnd(body, contentStart, closing);
      end = contentEnd + closing.length;
    } else if (body[index] === '\\') {
      const command = controlAt(body, index);
      if (command.text === '\\begin') {
        const environment = groupAt(body, command.end);
        if (mathEnvironments.has(environment.text)) {
          mode = environment.text === 'math' ? 'inline' : 'display';
          contentStart = index;
          end = environmentEnd(body, environment.end, environment.text);
          contentEnd = end;
        }
      }
      if (!mode) { index = command.end; continue; }
    } else { index++; continue; }
    expressions.push({ mode, rows: mathRows(normalizeMath(body.slice(contentStart, contentEnd))) });
    index = end;
  }
  return { version: 1, mathCount: expressions.length, inlineCount: expressions.filter(item => item.mode === 'inline').length, displayCount: expressions.filter(item => item.mode === 'display').length, rowCount: expressions.reduce((total, item) => total + item.rows.length, 0), expressions, labels };
}

export function validateInventory(html, inventory, context = 'article') {
  if (inventory?.version !== 1) throw new Error(`${context}: missing supported source inventory`);
  const $ = cheerio.load(html, null, false);
  const expressions = $('.math').toArray();
  if (expressions.length !== inventory.mathCount) throw new Error(`${context}: source math count ${inventory.mathCount}, rendered ${expressions.length}`);
  expressions.forEach((node, index) => {
    const mode = $(node).hasClass('display') ? 'display' : 'inline';
    const annotation = $(node).find('annotation[encoding="application/x-tex"]');
    if (annotation.length !== 1) throw new Error(`${context}: missing unique mathematical annotation at expression ${index + 1}`);
    const expected = inventory.expressions[index];
    if (mode !== expected.mode) throw new Error(`${context}: source math mode differs at expression ${index + 1}`);
    if (JSON.stringify(mathRows(annotation.text())) !== JSON.stringify(expected.rows)) throw new Error(`${context}: source math rows differ at expression ${index + 1}`);
  });
  const counts = new Map();
  $('[id]').each((_, node) => { const id = $(node).attr('id'); counts.set(id, (counts.get(id) || 0) + 1); });
  for (const label of inventory.labels) if (counts.get(label) !== 1) throw new Error(`${context}: source label ${label} must survive as exactly one DOM ID`);
}

export function normalizeCommutativeDiagrams(tex) {
  return tex.replace(/\\begin\{tikzcd\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{tikzcd\}/g, (_, body) => {
    const rows = body.trim().split(/\\\\/).map(row => row.trim()).filter(Boolean).map(row => row.split('&'));
    if (rows.length !== 2 || rows.some(row => row.length !== 2)) throw new Error('Only rectangular two-by-two commutative diagrams are supported; preserve a more general diagram explicitly');
    const cells = rows.map(row => row.map(cell => {
      const arrows = {};
      const value = cell.replace(/\\arrow\[([rd])(?:,\s*"([^"]*)"\s*(')?)?(?:,\s*(equal))?\]/g, (_, direction, label, reversed, equal) => {
        if (arrows[direction]) throw new Error('Multiple arrows in one diagram direction are not supported');
        arrows[direction] = { label: label || '', reversed: Boolean(reversed), equal: Boolean(equal) };
        return '';
      }).trim();
      if (value.includes('\\arrow')) throw new Error(`Unsupported commutative-diagram arrow: ${value}`);
      return { value, arrows };
    }));
    const horizontal = arrow => !arrow ? '@.' : arrow.equal ? '@=' : arrow.reversed ? `@>>{${arrow.label}}>` : `@>{${arrow.label}}>>`;
    const vertical = arrow => !arrow ? '@.' : arrow.equal ? '@|' : arrow.reversed ? `@V{${arrow.label}}VV` : `@VV{${arrow.label}}V`;
    if (cells[0][1].arrows.r || cells[1][1].arrows.r || cells[1][0].arrows.d || cells[1][1].arrows.d) throw new Error('Diagram arrow leaves the supported rectangle');
    return `\\begin{CD}${cells[0][0].value} ${horizontal(cells[0][0].arrows.r)} ${cells[0][1].value} \\\\ ${vertical(cells[0][0].arrows.d)} ${vertical(cells[0][1].arrows.d)} \\\\ ${cells[1][0].value} ${horizontal(cells[1][0].arrows.r)} ${cells[1][1].value}\\end{CD}`;
  });
}
