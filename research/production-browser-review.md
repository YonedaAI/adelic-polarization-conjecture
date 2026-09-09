# Production browser review

PASS for the requested live browser checks. No implementation repair was needed.

The production origin was read directly from `.vercel-url`: **https://adelic-polarization-conjecture.vercel.app**. The live inspection ran from **2026-09-09 04:54:40 UTC to 04:59:30 UTC** in Chrome through browser-client. It covered the homepage and the three article routes, with real rendering and interaction checks. This worker changed only this report and the listed screenshots.

## Live layout measurements

Widths below are measured CSS viewport widths, not merely requested device sizes. Chrome had a saved 110% zoom on the production origin. The viewport overrides were compensated to obtain the exact requested widths while preserving that zoom setting. Mobile height was 844px; desktop article height was 901px and homepage height was 900px.

| Live route | Viewport width | Document width | Math expressions | Wide outer displays | Wide displays missing keyboard access | Inline overflows | Tag collisions |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 390 | 390 | n/a | n/a | n/a | n/a | n/a |
| `/` | 1280 | 1280 | n/a | n/a | n/a | n/a | n/a |
| `/papers/local-correspondence/` | 390 | 390 | 591 | 59 | 0 | 0 | 0 |
| `/papers/local-correspondence/` | 1280 | 1280 | 591 | 0 | 0 | 0 | 0 |
| `/papers/polarization-obstructions/` | 390 | 390 | 658 | 41 | 0 | 0 | 0 |
| `/papers/polarization-obstructions/` | 1280 | 1280 | 658 | 0 | 0 | 0 | 0 |
| `/papers/synthesis/` | 390 | 390 | 597 | 56 | 0 | 0 | 0 |
| `/papers/synthesis/` | 1280 | 1280 | 597 | 1 | 0 | 0 | 0 |
| `/papers/synthesis/` | 360 | 360 | 597 | 60 | 0 | 0 | 0 |

All 90 tagged display containers in Part I, 42 in Part II, and 68 in synthesis were checked at every listed article width. A collision means the direct tag begins less than 10px after the right edge of the complete direct formula base. None occurred. The one wide synthesis equation at desktop width scrolls within its own container and does not widen the page.

Every overflowing outer `.math.display` had `tabindex="0"`, `role="region"`, and an accessible label. This explicitly checks the outer scrolling element. In synthesis at 360px, pressing ArrowRight on the first focusable outer equation moved its scroll position from 0 to 36.36px while document horizontal scroll remained 0. The outer element retained focus and all 597 expressions remained present.

The homepage's three 1200x630 previews loaded at both sizes. Its full project title, mathematical square, three paper titles, descriptions, Read/PDF links, and responsive collection were inspected in screenshots. Decorative image links retained `aria-hidden="true"` and `tabindex="-1"`, with adjacent named links available to keyboard users.

## Navigation and current publication content

Enter opened the mobile contents and activated a section in each article. Each menu closed afterward, stayed at approximately y=12px during reading, and marked the selected hash in both mobile and desktop contents:

| Article | Selected section | Selected hash | Math count afterward |
|---|---|---|---:|
| Part I | 10. Logarithmic variation | `#logarithmic-variation` | 591 |
| Part II | 4.2. Test maps and symmetry | `#test-maps-and-symmetry` | 658 |
| Synthesis | 13. The support-indexed conjecture | `#the-support-indexed-conjecture` | 597 |

The live titles and author metadata were correct: **Prime-Adjoining Correspondences**, 20 pages; **Obstructions to Adelic Polarization**, 21 pages; and **Adelic Polarization Conjecture**, 21 pages. Every article exposed its own `/papers/<slug>.pdf` Download PDF link and `/papers/<slug>.tex` LaTeX source link, plus the Lean-code link. HTTP status and byte/hash verification of those downloads is the root worker's separate check.

Specific final-revision content was visible in production. Part I prints `[1, Section 4.5]` with target `#bib-CCM` and preserves `soninShell_no_nonzero_scalar_idempotent` and `lean/APC/LocalFactor.lean`. Part II contains all 46 `\mathcal G` occurrences and the explicit `\mathcal H_S=(H,q_S)` carrier. Synthesis displays **Proposition 8.3**, stating that the compact-bump origin cone class becomes a boundary under each shell embedding and has zero image in the filtered direct limit. It displays **Conjecture 13.1 (Adelic primitive comparison)** as a conjecture; the subsequent prose explicitly says that the geometric sign and exact comparison remain unproved. This checks the published statements and their presentation, not the mathematical truth of their arguments.

The expected source baseline comes from `research/math-html-checks.json`, verified locally at 2026-09-09 04:29:16 UTC:

| Source | SHA256 |
|---|---|
| Part I | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| Part II | `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee` |
| Synthesis | `042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41` |

The browser's counts, metadata, and revision-specific statements match that baseline. Exact remote-byte/source correspondence is left to the root worker's HTTP/hash audit; no browser-only source-hash claim is substituted for it.

## Actual production screenshots

- `screenshots/live-home-390.jpg`: mobile homepage title, introduction, and prime square.
- `screenshots/live-home-1280.jpg`: desktop homepage hero and square.
- `screenshots/live-home-1280-cards.jpg`: all three live paper cards and download links.
- `screenshots/live-part-i-390-reading.jpg`: mobile contents and logarithmic-variation equations.
- `screenshots/live-part-ii-390-test-maps.jpg`: current test-map notation and equation (12).
- `screenshots/live-synthesis-1280-proposition.jpg`: Proposition 8.3 and its surrounding explanation.
- `screenshots/live-synthesis-360-conjecture.jpg`: Conjecture 13.1 and the stated construction problem.

All listed screenshots were captured from the production origin and visually inspected. The viewport override was reset and only this worker's tab was closed after the checks. The user's saved zoom, the root browser tab, deployment, source files, and implementation were preserved. No additional build, pipeline run, external review, or deployment was performed.
