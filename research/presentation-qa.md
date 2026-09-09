# Presentation checks

## Final three-paper production inspection

The final sources contain 591, 658 and 597 mathematical expressions: 1,846 in total, with 225 equation numbers and 48 theorem-like statements. Independent source-to-HTML checks passed for all three papers; see [math-html-review.md](math-html-review.md) and [math-html-checks.json](math-html-checks.json). The synthesis preserves Proposition 8.3 and labels the unresolved primitive comparison as Conjecture 13.1.

The external website code review passed before production deployment. Anonymous HTTP checks returned the exact exported bytes for all four pages and 84 linked assets. The independent live browser inspection covered all pages at measured CSS widths of 390 and 1280, plus synthesis at 360. No document or inline overflow, equation-tag collisions, or inaccessible wide display regions were found. Each mobile contents menu selected the correct section and closed; the wide-equation keyboard check scrolled the equation without scrolling the page. See [production-http-verification.json](production-http-verification.json) and [production-browser-review.md](production-browser-review.md) for the measurements and seven live screenshots.

The following preliminary inspection is retained as the history of the layout regression and repair, not as the current formula inventory.

## Preliminary two-paper inspection

Part I's first converted draft contained577 mathematical expressions and Part II's645. These counts are snapshots before minor review edits, not final publication totals. The converter validated expression counts, display modes, alignment rows, and LaTeX cross-reference labels.

The mobile browser inspection at390px found an equation-number collision in a two-row aligned display. The rendered formula extended to x429.96 while its absolutely positioned tag began at x344.30. The regression assertion required the tag to begin at least10px after the complete formula and failed.

The CSS correction gives display mathematics its intrinsic width and reserves tag space inside the same horizontal scroll region. The same assertion then passed: formula right491.55, tag left530.63, with page width still390px. All90 tagged displays in this Part I snapshot had no collisions at390px or1280px. Wide equations remain horizontally scrollable; the page itself does not overflow.

The mobile contents control opened, navigated to the selected section, and closed after activation. All577 formulas remained in the initial HTML and in the resulting DOM. Desktop inspection showed a legible reading column, equation numbers, and active-section navigation.

At this preliminary stage, final three-paper and live-deployment inspection was still required. Those checks are now recorded above.
