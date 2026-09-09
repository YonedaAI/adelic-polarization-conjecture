# Presentation checks

## Preliminary two-paper inspection

Part I's first converted draft contained577 mathematical expressions and Part II's645. These counts are snapshots before minor review edits, not final publication totals. The converter validated expression counts, display modes, alignment rows, and LaTeX cross-reference labels.

The mobile browser inspection at390px found an equation-number collision in a two-row aligned display. The rendered formula extended to x429.96 while its absolutely positioned tag began at x344.30. The regression assertion required the tag to begin at least10px after the complete formula and failed.

The CSS correction gives display mathematics its intrinsic width and reserves tag space inside the same horizontal scroll region. The same assertion then passed: formula right491.55, tag left530.63, with page width still390px. All90 tagged displays in this Part I snapshot had no collisions at390px or1280px. Wide equations remain horizontally scrollable; the page itself does not overflow.

The mobile contents control opened, navigated to the selected section, and closed after activation. All577 formulas remained in the initial HTML and in the resulting DOM. Desktop inspection showed a legible reading column, equation numbers, and active-section navigation.

Final three-paper and live-deployment inspection remains required after review revisions and synthesis.
