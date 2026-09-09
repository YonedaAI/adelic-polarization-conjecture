# Preliminary HTML and layout review

The homepage and the two current papers pass this bounded local layout review after three navigation repairs. This review does not cover the synthesis article or a live Vercel deployment. The synthesis preview card was present and its layout was inspected; its destination remains part of the final publication pass.

The review used the actual exported site at `http://127.0.0.1:4318/` in Chrome through the browser-client API. Checks used viewport widths of 360, 390, 768, and 1280 pixels, with viewport heights between 800 and 1000 pixels. Screenshots were inspected as well as DOM geometry. This report makes no findings from manuscript line lengths or HTML source line lengths.

## Reviewed snapshots

The final two-paper refresh passed the normal source/compiled-label freshness gates. `node scripts/test-math-preservation.mjs local-correspondence polarization-obstructions` passed after regeneration. `npx next build` and `node --check public/reading.js` passed. The exported article files were byte-identical to their generated files in `public/papers/`.

| Artifact | SHA256 |
|---|---|
| Part I source, `papers/latex/local-correspondence.tex` | `92ce8891a7db2de6dfd6a98b3faa163bf146411e6d29bb83a7fba049eb64dcbb` |
| Part II source, `papers/latex/polarization-obstructions.tex` | `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4` |
| Part I JSON, `website/content/local-correspondence.json` | `d21b4318c4a4cbc0c4c266f5fa84612bfe47eeb5e2b7109bb6cec8e8023f8125` |
| Part II JSON, `website/content/polarization-obstructions.json` | `7b16e3bc183e2ff9d397e9e133927ca0162e407caaee543ec8a2819db7406a9e` |
| Part I generated article, `website/public/papers/local-correspondence/index.html` | `6793a9ac2f665afafb563bf35a845454a790657663b356e543d84ad1efb250e0` |
| Part II generated article, `website/public/papers/polarization-obstructions/index.html` | `39cf6b6aa516b22b5f17925e5aec1c20e424d636bad6c09234486e9781c87e29` |
| Exported homepage, `website/out/index.html` | `f87229d87e62191555e1ab04ca2754a9dffa75731362b003cc5d7794b60227e4` |
| Shared CSS, `website/public/site.css` | `7f711de2aea29e24bec3a7f844987bc593a7efd3ecbf5caa1005639e46736f34` |
| Reading interaction script, `website/public/reading.js` | `28e2c207108aa79a307694b070978f8063e8a2cf100d0aacfa80509c660acb62` |
| Unchanged article generator, `website/scripts/build-articles.mjs` | `9e8511b796afa0a62a2282c537441d9421207c09bca07c4863a51c983e80bac2` |

Part I contains 591 mathematical expressions, 90 display containers, and 100 equation numbers. Part II contains 657 expressions, 69 display containers, and 49 equation numbers. There are 90 tagged display containers in Part I and 42 in Part II; a multirow display can contain more than one number. The earlier mathematical review's 588/656 expression totals describe older snapshots.

## Actual defects and repairs

### Current-section marker disagreed with anchor navigation

Before repair, selecting **11. Prime powers and finite propagation** landed its heading at y=127.85px, while the desktop contents marked **10. Logarithmic variation**. The script used a fixed y=110px threshold, but native anchor navigation combines the document's 96px scroll padding with the heading's 32px scroll margin. The mobile contents had no current-section attribute at all because the script selected only desktop links.

The regression assertion comparing the active link to `location.hash` failed with `#logarithmic-variation` versus `#prime-powers-and-finite-propagation`. The corresponding mobile assertion failed with `null`.

The script now derives its threshold from the actual computed scroll padding and heading margin, with a two-pixel allowance for subpixel layout. Both contents lists use the selected heading's hash. After repair, selecting **10. Logarithmic variation** landed at y=128.05px and both menus marked `#logarithmic-variation`. Part II's nested **4.1. A finite-dimensional model** also marked the same selected subsection in both menus.

### Mobile contents disappeared far above a long article

Before repair, the contents control was at y=-26105.32px after navigating deep into Part I. The regression requiring a reachable contents control failed. The mobile contents now uses sticky positioning inside the reading column, an opaque reading-surface background, and sufficient stacking order to remain usable over the article.

After repair its top was y=12px during both Part I and Part II section navigation. The closed control is 55.59px tall, and the destination headings land below it. The existing native details disclosure and close-after-selection behavior are preserved. The expanded navigation has its own vertical scroll area; at a 390x844 viewport its client height was 506px for 957px of contents.

### Resizing removed keyboard access to wide equations

Before repair, loading Part I at 1280px found no horizontally overflowing equations. Resizing to 360px then created 74 wide equations, but none had the focusable, labeled region treatment because the script measured overflow only once. The regression failed with 74 missing focus targets.

Overflow classification now runs initially, after fonts are ready, and after resize. It removes unnecessary region attributes when an equation fits again. After the same desktop-to-mobile transition, all 74 wide equations had `tabindex="0"`, `role="region"`, and an accessible label. A keyboard ArrowRight action on the first visible equation in section 10 changed its local scroll position from zero while document horizontal scroll stayed zero. The equation retained focus. Resizing to desktop again left no unnecessary equation focus targets.

Only `website/public/site.css` and `website/public/reading.js` were edited for these repairs. The prior intrinsic formula width and equation-tag padding correction was preserved. No paper source, Lean source, review record, homepage component, or converter was edited by this layout pass. Selected article generation refreshed the usual derived artifacts.

## Responsive and content checks

| Page | Width | Document width | Wide equation containers | Wide equations missing keyboard access | Equation-tag collisions |
|---|---:|---:|---:|---:|---:|
| Part I | 360 | 360 | 74 | 0 | 0 |
| Part I | 390 | 390 | 59 | 0 | 0 |
| Part I | 768 | 768 | 37 | 0 | 0 |
| Part I | 1280 | 1280 | 0 | 0 | 0 |
| Part II | 360 | 360 | 45 | 0 | 0 |
| Part II | 390 | 390 | 41 | 0 | 0 |
| Part II | 768 | 768 | 23 | 0 | 0 |
| Part II | 1280 | 1280 | 0 | 0 | 0 |

The collision check requires each direct KaTeX tag to begin at least 10px after the right edge of the complete direct formula base. No inline formula extended past the document viewport at these sizes. Long displays scroll locally; their scroll width does not widen the document.

The homepage also had matching document and viewport widths at all four sizes. All three 1200x630 preview images loaded. The hero stacks the mathematical square beneath the introduction on mobile, becomes two columns on tablet/desktop, and keeps its labels and caption legible. The paper collection uses one column on mobile, two columns with a wider synthesis card at 768px, and three columns at 1280px. Paper titles, descriptions, Read/PDF links, mobile footer, and the formal-code call to action were visually inspected without clipping or overlap.

The image-only preview anchors are intentionally decorative duplicates of adjacent named paper links: rendered `aria-hidden="true"` and `tabindex="-1"` were verified. An initial broad unnamed-anchor query did not exclude these hidden anchors; it was not a confirmed accessibility defect, and no markup change was made.

The article title, author block, 20/21-page metadata, download navigation, abstract, theorem borders, subsection hierarchy, bibliography links, adjacent-paper navigation, and footer were inspected. At 390px, Enter opened the contents, Tab reached the first contents link, and computed keyboard focus was a two-pixel gold outline. Enter activated sections and closed the menu. All 591/657 expressions remained in the DOM after navigation and resizing. Part II's ordered TeX annotation digest was identical before and after mobile navigation: `244d643f0531531c287058afee43140a1d4211263b88bd93531751418ad94779`.

Part I's formal-scope code includes the full mathlib commit, `lean/APC/LocalFactor.lean`, `APC.soninShellCoefficient`, and `soninShell_no_nonzero_scalar_idempotent`. The generated code text preserves the source strings and underscores. At 390px, these code spans wrapped within the reading column; the document remained 390px wide. Neither reviewed paper contains a rendered table or a block-level `pre` element. Table and block-code rendering therefore have no real-content coverage in this pass; no synthetic fixture was presented as manuscript evidence.

Measured text contrast was 14.40:1 on the main background and 12.53:1 on raised surfaces. Muted text measured 8.28:1 and 7.21:1; the dimmest text token measured 6.77:1 and 5.89:1. Gold links measured 10.56:1 and 9.19:1. Periwinkle text measured 8.53:1 and 7.43:1.

The two PDF and two LaTeX download URLs returned HTTP 200 and bytes identical to the exported files. The served PDF sizes were 446204 and 419344 bytes; source sizes were 70126 and 70482 bytes. Both article canonical URLs use `https://adelic-polarization-conjecture.vercel.app/papers/<slug>/`. This verifies generated metadata and local downloads, not production availability.

## Screenshots inspected

- `screenshots/part-i-360-navigation.jpg`: repaired sticky contents, section landing, and wide displayed formulas.
- `screenshots/part-i-390-formal-scope.jpg`: intact identifiers and local wrapping of long code strings.
- `screenshots/part-i-768-chain-maps.jpg`: tablet sidebar, text column, theorem treatment, and horizontal equation containment.
- `screenshots/part-ii-1280-title.jpg`: final Part II title, author/page metadata, sidebar, and abstract.
- `screenshots/part-ii-390-keyboard-contents.jpg`: visible keyboard focus and scrollable mobile contents; captured before Part II's last source refresh, with final interaction checks repeated afterward.
- `screenshots/part-ii-390-subsection.jpg`: final Part II subsection after keyboard navigation.
- `screenshots/part-ii-390-ending.jpg`: bibliography, adjacent-paper links, and footer.
- `screenshots/home-1280.jpg`: desktop hero and mathematical square.
- `screenshots/home-768-paper-cards.jpg`: two-column collection and wide synthesis preview.
- `screenshots/home-390-figure-cards.jpg`: mobile square, caption, and paper card.
- `screenshots/home-390-footer.jpg`: mobile formal-code section, reference links, and footer.

Screenshots are JPEG files generated by the browser. The occasional browser screenshot/control timeout was retried through the same browser connection. The browser log returned four connection-receiver errors (`Could not establish connection. Receiving end does not exist.`) without a source script in the returned entries. Their origin was not established in this pass; interaction checks passed, but this report does not claim an error-free console.

## Reproduction and remaining publication checks

After compiling the exact current manuscript sources, run from `website/`:

```sh
node scripts/build-content.mjs local-correspondence polarization-obstructions
NEXT_PUBLIC_SITE_URL=https://adelic-polarization-conjecture.vercel.app node scripts/build-articles.mjs local-correspondence polarization-obstructions
node scripts/test-math-preservation.mjs local-correspondence polarization-obstructions
node --check public/reading.js
npx next build
```

The browser regression sequence is: load Part I at 1280px; resize to 360px; assert every overflowing `.math.display` is focusable and labeled; open mobile contents; activate section 10 or 11; after the native anchor jump settles, assert both active-link hashes equal `location.hash`, the closed contents stays within the viewport, and the heading lands below it. Focus a visible wide equation and press ArrowRight; assert local horizontal scroll increases and document horizontal scroll remains zero. Repeat a subsection jump in Part II and recheck mathematics counts. The concrete failing and passing measurements above were observed before and after the repair.

The final pass must include synthesis after its review revisions, regenerate all three articles through the freshness gates, rerun source-to-HTML mathematics preservation, inspect actual synthesis tables or code blocks if present, and verify all routes, anchor targets, downloads, metadata, and previews. It must also run the external website review and inspect the deployed pages at mobile and desktop widths. Recheck any manuscript or presentation file whose hash differs from this report. No deployment, commit, Slack message, or external review was performed by this worker.

## Integration refresh: notation and citation locators

A subsequent bounded browser pass inspected the root-generated export after Part I's citation-locator corrections and Part II's test-map/carrier notation corrections. No implementation change was needed. The preceding review remains attached to its original snapshots.

| Refreshed artifact | SHA256 |
|---|---|
| Part I source | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| Part II source | `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee` |
| Part I JSON | `895e6075dbae24eda971a2fc399dbe32684f52b6602157415961d38c8512f67e` |
| Part II JSON | `94cbe912f7634000b924c84aa13e570a495dc76066c375596b0ef43797d3f1f2` |
| Part I generated HTML | `1deeb8c95691fd0d2c2f7885e585a3e01c60c615471b44bb43ad0846455f7e12` |
| Part II generated HTML | `c8ca17d579662ed393bbb33174f35e93c4e988002332ae849efbfd958b87d4b5` |

Both exported article files still matched their generated HTML byte for byte. Part I retained 591 rendered expressions; Part II now had 658. Part II's DOM annotations contained all 46 occurrences of `\mathcal G`. The coherence paragraph retained `\mathcal H_S=(H,q_S)` and the map `V_S=C_S^{-1/2}:H_0\to\mathcal H_S`. Its mobile and desktop screenshots show the revised notation in context. Equation (12) uses `A^{-1/2}\mathcal G_0f=\mathcal G_0f` and retains its number; at 360px its 350px content width scrolls within a 320px container.

| Part II viewport | Document width | Wide displays | Missing equation focus targets | Inline overflows | Tag collisions |
|---|---:|---:|---:|---:|---:|
| 360x844 | 360 | 45 | 0 | 0 | 0 |
| 390x844 | 390 | 41 | 0 | 0 | 0 |
| 1280x900 | 1280 | 0 | 0 | 0 | 0 |

All 42 tagged display containers were checked at each width. The current-section marker correctly selected **4.2. Test maps and symmetry** after mobile navigation. Part I retained 94 internal article links with no unresolved or multiply defined destination. Its ten CCM citation links still target `#bib-CCM`; the revised `[1, Section 4.5]` locator rendered correctly and clicking its citation reached that bibliography anchor. Locators for Sections 4.1, 4.4, 4.6/equation (57), and 4.7 retained the same citation target. This checks local navigation and printed locators; it does not repeat the external literature audit.

New inspected screenshots are `screenshots/refresh-part-ii-360-test-maps.jpg`, `screenshots/refresh-part-ii-390-coherence.jpg`, and `screenshots/refresh-part-ii-1280-coherence.jpg`. No new build or external review was run by this worker. Synthesis and production checks remain outside this refresh.

For the final production pass, use the existing browser binding through the browser-client Node tool. The exact viewport capability API used here is:

```js
const viewport = await browser.capabilities.get('viewport');
await viewport.set({ width: 360, height: 844 });
await viewport.set({ width: 390, height: 844 });
await viewport.set({ width: 1280, height: 900 });
await viewport.reset();
```

The capability is browser-scoped and takes no tab argument. The methods are `set` and `reset`. The refresh worker reset its override and closed only its own tab before returning control; the root tab and preview server were left available.

Root separately checked the actual post-formatting bibliography correction in the served Part I DOM. The crossed-product paragraph prints `[3, Section 4, equations (4.3) to (4.6)]` and its citation targets `#bib-CCMar`. This is the locator-only change from source92ce8891 to40ac3940. The CCM Section4.5 example inspected above is a different citation and was not that final correction.
# Final synthesis check, 2026-09-09 UTC

The coordinator inspected the 21-page synthesis source `042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41` in the rebuilt local site. Its 597 formulas include Proposition 8.3 and the explicit shell fillings. The actual overflow containers are `.math.display`, not the inner `.katex-display` spans; keyboard access was tested on those outer scroll regions.

| Viewport | Document width | Wide equations | Missing keyboard regions | Tag overlaps | Inline overflow |
|---|---:|---:|---:|---:|---:|
| 360 | 360 | 60 | 0 | 0 | 0 |
| 390 | 390 | 56 | 0 | 0 | 0 |
| 768 | 768 | 41 | 0 | 0 | 0 |
| 1280 | 1280 | 1 | 0 | 0 | 0 |

All 68 visible tag containers were checked for geometric intersection with formula bases. The separately checked accessible equation inventory has 76 numbers because some containers contain multiple numbered rows. The proposition was viewed at 390px and saved as `research/screenshots/final-synthesis-390-proposition.jpg`. This section records local browser evidence; production checks are recorded separately after deployment.
