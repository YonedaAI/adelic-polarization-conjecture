#!/usr/bin/env python3
"""Check publication typography and human-readable prose without changing sources."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
filler = re.compile(r"it is important to note|it is worth noting|it should be noted|the aforementioned|under the documented search strategy|findings follow|in what follows|having established|the remainder of this|we now turn to|it follows immediately|\bcrucially\b|\binterestingly\b|\bmoreover\b|\bfurthermore\b|taken together|the key insight|at its core|rapidly evolving|a growing body of|this is the first|\[SOURCE REQUIRED\]|\[VERIFY VALUE\]", re.I)
slop = re.compile(r"\b(delve|tapestry|testament|pivotal|crucial|seamless(?:ly)?|leverag(?:e|es|ing)|realm|groundbreaking|unlock(?:s|ed|ing)?|harness(?:es|ed|ing)?|foster(?:s|ed|ing)?|holistic|nuanced|intricate|multifaceted|vibrant)\b|serves as|stands as|plays a vital role|paradigm shift", re.I)
failures = []
papers = sorted((ROOT / 'papers/latex').glob('*.tex'))
if len(papers) != 3:
    failures.append(f"Expected 3 final papers; found {len(papers)}")
for paper in papers:
    text = paper.read_text()
    checks = {
        'class': r'\documentclass[11pt,letterpaper]{article}' in text,
        'margins': 'margin=1in' in text,
        'maketitle': r'\maketitle' in text,
        'no parskip package': not re.search(r'\\usepackage(?:\[[^]]*\])?\{parskip\}', text),
    }
    abstract = re.search(r'\\begin\{abstract\}(.*?)\\end\{abstract\}', text, re.S)
    body = abstract.group(1).strip() if abstract else ''
    words = len(body.split())
    checks.update({'abstract length': 150 <= words <= 250,
                   'abstract paragraph': bool(body) and not re.search(r'\n\s*\n|\\par\b', body),
                   'abstract citations': r'\cite' not in body})
    for name, passed in checks.items():
        if not passed:
            failures.append(f'{paper.name}: {name}')
    for line_number, line in enumerate(text.splitlines(), 1):
        if line.lstrip().startswith('%'):
            continue
        prose = re.sub(r'\\(?:cite|label|ref|eqref|url)\{[^}]*\}', '', line)
        if re.search(r'\\bibitem\b', prose):
            continue
        for name, pattern in [('filler', filler), ('AI vocabulary', slop)]:
            if pattern.search(prose):
                failures.append(f'{paper.name}:{line_number}: {name}: {prose[:160]}')
        if any(char in prose for char in '—–“”‘’'):
            failures.append(f'{paper.name}:{line_number}: Unicode dash or quote')
        if re.search(r'\\item\s*\\textbf\{', prose):
            failures.append(f'{paper.name}:{line_number}: bold-header list')
    print(f'{paper.name}: {words} abstract words; typography checked')
if failures:
    print('\n'.join(failures))
    sys.exit(1)
print('STYLE GREP: CLEAN')
print('HUMANIZER: CLEAN')
print('FORMAT: PASS')
