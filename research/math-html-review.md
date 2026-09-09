# Mathematical HTML review

All three current papers pass the independent source-to-static-HTML checks.
The audit below supersedes the earlier two-paper snapshot retained at the end
of this report. It covers the exact source, publication PDF and local export
hashes recorded in `research/math-html-checks.json`.

Verified: 2026-09-09 04:29:16 UTC. No manuscript, Lean source, converter, stylesheet,
browser session, deployment or publication output was changed by this pass.
Only this report and its machine-readable results were updated.

## Current snapshot

| Check | Part I | Part II | Synthesis |
|---|---:|---:|---:|
| PDF pages | 20 | 21 | 21 |
| Mathematical expressions | 591 | 658 | 597 |
| Inline expressions | 501 | 589 | 528 |
| Display expressions | 90 | 69 | 69 |
| Equation numbers | 100 | 49 | 76 |
| Accessible equation numbers | 100 | 49 | 76 |
| Theorem environments, including conjectures | 19 | 19 | 10 |
| Conjecture environments | 0 | 0 | 1 |
| Source labels retained as unique anchors | 119 | 81 | 86 |
| Internal cross-references | 72 | 65 | 71 |
| Bibliography entries | 6 | 9 | 8 |
| Citation links | 22 | 13 | 17 |
| MathML trees | 591 | 658 | 597 |
| SVG trees | 21 | 25 | 16 |

Part I source SHA256:
`40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a`.
Publication PDF SHA256:
`6b0d956ec7c5612103698b295fbbb7d9a65ddfcaacd4c350993295c41b0e42d4`.

Part II source SHA256:
`6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee`.
Publication PDF SHA256:
`013f6cd880274c8944a043c3e08feec14320ae4ebd84c4321491f56afa9453da`.

Synthesis source SHA256:
`042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41`.
Publication PDF SHA256:
`6f0820549262ece9f032fa82b79eca9b1fc8c94dd1c3798f831122d2075eedd1`.

## Formula and structural fidelity

The independent regression parses each original LaTeX manuscript with Pandoc,
collects its abstract and body mathematics in document order, and compares
every expression with the corresponding initial HTML TeX annotation.
Normalization removes only whitespace and the label/tag commands used for
anchors and equation numbering. Every remaining mathematical token and every
inline/display mode agrees.

Fresh KaTeX rendering of each annotation reproduces the complete MathML and
SVG trees, including their attributes and text. The converter's added
accessible equation-number text is removed only for that tree comparison;
each number is separately checked against its visual equation tag. No
mathematical expression is missing, and no KaTeX error node is present.

Equation numbers are consecutive without omissions or duplication. The
fresh compiled auxiliary labels exactly match each source-matched label
cache. The source label, internal cross-reference and bibliography checks
retain unique targets and correct numbers. Citation order and multiplicity
match the LaTeX source. Part II still retains the unlabelled first row of its
Laurent cancellation alignment as equation 32 and its labelled second row
as equation 33; its 48 equation labels therefore correctly accompany 49
numbered equations.

The theorem environment count and kind order were also compared directly
against each source, independently of the converter's stored heading list.
Labelled headings agree with compiled LaTeX numbers. Synthesis retains the
new transition-vanishing result as Proposition 8.3, its eight filling
equations as 43 through 50, and the unproved primitive comparison as the
named Conjecture 13.1. The converter does not relabel that conjecture as a
proved theorem. The mathematical expressions in Proposition 8.3 and its proof
are faithfully rendered; this does not independently establish the proof's truth.

## Artifact identity and freshness

Each content record matches the current source, publication PDF and combined
converter hash. Each compiled PDF is byte-identical to the corresponding
publication PDF in `papers/pdf/`. The TeX and PDF downloads in both
`website/public/papers/` and `website/out/papers/` are byte-identical to
those current source and publication files.

For each article, the complete HTML bytes in `website/public/`,
`website/out/` and `docs/papers/` agree. Its initial article body equals
the parsed HTML held in the checked JSON content record. Thus the audit
covers the local export itself, not only intermediate content. All PDFs
report US Letter pages, and each article's printed page count matches
`pdfinfo`. Source and publication PDF hashes were rechecked at the end.

Full source, PDF, auxiliary, article HTML, content JSON and label-cache
hashes are recorded in `research/math-html-checks.json`. The combined
converter hash is
`5eeac0e66ea4b333246facdc4d3cf871a951e9cb01c2dcf5d28779657139282b`.
It hashes `build-content.mjs` followed by `source-inventory.mjs`, rather
than either file alone.

## Converter coverage and isolated regressions

The inspected converter now supports `conjecture` alongside the seven
previous theorem-like environments. Its isolated LaTeX fixture passes shared
counter, appendix counter, named-reference, anchor and formula checks.
The single-paper preview regression also passes: it creates a temporary
project, checks actual static mathematics, rejects an unknown slug, retains
the exact KaTeX/font notices, and leaves the publication article unchanged.
Neither regression rebuilds the real publication tree.

The source inventory independently checks mathematical modes, row
presence and source labels. Unsupported source includes, math-generating
constructs and custom equation counters require explicit adapters instead
of silent conversion. The inspected two-by-two diagram adapter is not
exercised by these three manuscripts. This is coverage of their present
syntax, not a claim to support arbitrary LaTeX.

## Reproduction and scope

After a source-matched website build, from `website/` run:

```sh
node scripts/test-math-preservation.mjs local-correspondence polarization-obstructions synthesis
node scripts/test-conjecture-preservation.mjs
node scripts/test-article-preview.mjs
```

The first command is read-only. The latter two create retained diagnostic
fixtures in temporary directories. The supplementary byte audit compares
SHA256 across the paths listed above and checks the current auxiliary data
against `website/content/<slug>.labels.json`; its exact results are in the
machine-readable report.

This pass establishes faithful mathematical rendering for the stated local
snapshots. It does not establish the truth of their mathematical arguments,
perform visual PDF review, assess browser overlap or mobile interaction, or
verify a deployed website. Those are separate review gates. Any subsequent
source, PDF, converter or generated article change requires rechecking the
affected snapshot.

---

## Earlier two-paper snapshot (superseded)

The following historical report predates the all-three audit above. Its
source hashes, counts and converter limitation describe that earlier
snapshot only; they are not current release claims.

The current two-paper snapshot passes the mathematical HTML checks. One
sanitizer defect was corrected: `mo` elements now retain their `mathvariant`
attribute. No manuscript, stylesheet, browser session, deployment, or Lean
source was changed in this task.

This is a preliminary review of Part I and Part II only. Synthesis was not
available for this pass. Later manuscript changes require regeneration and
another check, even when a change affects only metadata.

### Reviewed snapshots

| Check | Part I | Part II |
|---|---:|---:|
| Mathematical expressions | 588 | 656 |
| Inline expressions | 498 | 587 |
| Display expressions | 90 | 69 |
| Equation numbers | 100 | 49 |
| Accessible equation numbers | 100 | 49 |
| Theorem environments | 19 | 19 |
| Source labels retained as unique anchors | 119 | 81 |
| Internal cross-references | 72 | 65 |
| Bibliography entries | 5 | 9 |
| Citation links | 21 | 13 |
| MathML trees | 588 | 656 |
| SVG trees | 21 | 25 |

The Part I source is `papers/latex/local-correspondence.tex`, SHA256
`4fc625f855e7d431dab93f4463f089b67bf8671907b0ff73e7dea7f57cc1fc87`.
The Part II source is `papers/latex/polarization-obstructions.tex`, SHA256
`d3a4365f3ce3e5d557d8af227b9ab34658276aae51a8b9ab88446e60bbc16d6e`.
Their corresponding JSON records in `website/content/` and initial HTML
articles in `website/public/papers/<slug>/index.html` matched those source
hashes at validation time. The PDFs used by article generation have 20 and
21 pages, respectively.

### Defect and correction

The independent rendering comparison found that the sanitizer removed
`mathvariant="normal"` from MathML operator elements. In Part II this
affected 13 expressions, including derivative primes, inequality signs,
and nonmembership symbols. A direct attribute comparison identified 14
removed attributes. The visible KaTeX formulas and their TeX annotations
were already intact, but the accessible MathML trees were not exact
copies of the renderer output.

The reproducible test failed before the correction, with the assertion
`polarization-obstructions: sanitizer changed MathML or SVG trees`.
The failure is preserved in `research/math-html-before-fix.txt`.
The implementation change is one allow-list entry in
`website/scripts/build-content.mjs`: `mathvariant` was added to the allowed
attributes of `mo`. `website/scripts/source-inventory.mjs` is unchanged.

The converter hash changed, so both articles were regenerated through the
normal source and compiled-label gates. The final test reports no changed
MathML or SVG trees in either paper. Root's equation-tag layout correction
was preserved; this task made no CSS changes.

### Fidelity checks

The regression script independently runs Pandoc on each original LaTeX
source and collects its mathematics in document order, including the
abstract. Every resulting expression matches the corresponding static
HTML TeX annotation after removing only whitespace and the label/tag
commands used for HTML anchors and equation numbering. Display versus
inline mode also matches for every expression.

Each annotation is then rendered again with the installed KaTeX version.
The script compares the complete MathML and SVG element trees, including
attributes and text, against the static article. The only normalization
removes the converter's explicitly added accessible equation-number text
before comparison; that text is checked separately against every visual
tag. All mathematical expressions are present in the initial HTML, and
the parsed article content equals the checked JSON content. These checks
do not depend on a client-side math-rendering step.

Equation tags run consecutively from 1 through 100 in Part I and 1 through
49 in Part II, without missing or repeated numbers. Their accessible
MathML counterparts agree individually. In particular, Part II's Laurent
cancellation alignment retains both numbers 32 and 33, including the
unlabelled first row. All theorem headings agree with the stored heading
inventory, and labelled theorem and cross-reference numbers agree with
the source-matched LaTeX label cache. All source labels survive as unique
DOM anchors; no internal anchor is unresolved.

Citation links preserve the source order and multiplicity. Every printed
citation number agrees with the bibliography order, and each citation
target exists. The check concerns local citation rendering and navigation;
it does not repeat the project's external bibliography verification.

During concurrent manuscript revisions, the sources changed several times. The
converter correctly rejected Part II until a fresh compilation supplied
its labels, and the regression script correctly rejected a stale Part I
article by source hash. The latter failure is preserved in
`research/math-html-stale-source-regression.txt`. Both authors subsequently
confirmed fresh compilations before the successful regeneration. No
freshness check was bypassed.

The last selected rebuild includes Part II's shared-notation revision:
`omega_p` is the full positive weight, `Delta_p` the denominator,
`Delta_E` the product, and `chi` the phase. All 49 equation numbers remain
present. Further formatting edits are not covered until regenerated and
checked against their new source hashes.

### Reproduction

From `website/`, after compiling the current manuscripts, run:

```sh
node scripts/build-content.mjs local-correspondence polarization-obstructions
node scripts/build-articles.mjs local-correspondence polarization-obstructions
node scripts/test-math-preservation.mjs local-correspondence polarization-obstructions
```

The final machine-readable result is `research/math-html-checks.json`.
The reusable regression is `website/scripts/test-math-preservation.mjs`.
It accepts an explicit list of paper slugs so the final three-paper pass
can include synthesis without silently extending this preliminary result.
The converter's theorem-environment selector currently omits `conjecture`.
If synthesis uses that environment, the final pass needs a tested adapter;
no unused support was added during this two-paper review.

The converter SHA256 after the fix is
`664a02d22ff507f9043e9bc98ede0773ce2fcb2f1b5a7a3ef35cfca0ed72a002`.
The regression-script SHA256 is
`402c301f4cf5e79009b8a9b54de8f58edc07fe4fc737ef2c53c18223109ec1ba`.

Browser layout, mobile overlap, the final Next build, production metadata,
and deployed pages are outside this pass. Root owns those checks. This
report establishes source-to-static-HTML mathematical fidelity for the
two exact snapshots above; it does not assess the truth of the manuscripts'
mathematical arguments.
