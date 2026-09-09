# Bibliography and attribution check

The eight distinct external mathematical sources in Parts I and II resolve to matching primary records. The manuscript citations preserve the necessary distinction between trace constructions, topological isomorphisms, RH criteria, and an unproved arithmetic polarization. The author corrected one subsection locator in Part I, and that correction was rechecked. Public companion-code availability is pending the source push.

The check was completed on 2026-09-08. It covered `PLAN.md`, the literature ledger, `sources/README.md`, `research/source-revisions.json`, and every bibliography item and source-citation context in the two manuscripts. It did not launch reviewer services, change papers or context repositories, test Lean, or establish novelty across the full literature.

## Primary records

| Shared key | Primary source and version | Date of inspected version |
|---|---|---|
| CCM24 / CCM | Connes, Consani and Moscovici, [Zeta zeros and prolate wave operators](https://arxiv.org/abs/2310.18423v2), with Semilocal adelic operators printed as a subtitle in the [full text](https://arxiv.org/html/2310.18423v2) | 2024-05-04 |
| C26 / Connes2026 | Connes, [The Riemann Hypothesis: Past, Present and a Letter Through Time](https://arxiv.org/abs/2602.04022v1) | 2026-02-03 |
| CC26 | Connes and Consani, [On the Jacobian of the completed Spec Z](https://arxiv.org/abs/2602.15941v1) | 2026-02-17 |
| CC20 / CC2020 | Connes and Consani, [Weil positivity and Trace formula, the archimedean place](https://arxiv.org/abs/2006.13771v1) | 2020-06-24 |
| CCM07 / CCMar | Connes, Consani and Marcolli, [The Weil proof and the geometry of the adeles class space](https://arxiv.org/abs/math/0703392v1) | 2007-03-13 |
| C98 | Connes, [Trace formula in noncommutative geometry and the zeros of the Riemann zeta function](https://arxiv.org/abs/math/9811068v1) | 1998-11-10 |
| D05 | Deninger, [Arithmetic Geometry and Analysis on Foliated Spaces](https://arxiv.org/abs/math/0505354v1) | 2005-05-17 |
| B04 | Burnol, [Two complete and minimal systems associated with the zeros of the Riemann zeta function](https://arxiv.org/abs/math/0203120v7) | 2004-02-25 |

These are version dates rather than journal publication dates. The plain-text CC26 label above represents the mathematical title printed in the manuscript. There are no independent DOI bibliography entries to resolve. Both companion-manuscript titles match their local title blocks.

## Required and optional corrections

1. Resolved locator correction: Part I line 965 now cites CCMar, Section 4, equations (4.3) to (4.6), replacing Section 4.1. The [primary full text](https://arxiv.org/html/math/0703392v1) places subsection 4.1 after equation (4.6). The mathematics and inverse-action convention match.
2. Required publication recheck: the [public companion repository](https://github.com/YonedaAI/adelic-polarization-conjecture) exists but currently reports that it is empty. Part I line 1512 and Part II lines 1566 to 1567 describe present source availability. The coordinator has retained the final exact-source push and content verification as a publication gate. No prose revision is needed if that gate passes before release. An existing repository URL alone does not verify available implementation.
3. Optional locator strengthening: Part II's framed-uniformization sentence is more precisely supported by CC26 Theorems 8.5, 8.6 and 8.15, beyond the preceding citation to Definition 3.1 and Theorem 3.4.

The first two findings were sent to the coordinating agent with source evidence. No silent fixes were made.

## Delicate claim locations

| Claim checked | Primary supporting location | Result |
|---|---|---|
| Sonin transition is topological; inherited metrics vary | [CCM24](https://arxiv.org/html/2310.18423v2), Theorem 4.6, its proof, and the sentence after equation (62) | Correct strength in both papers. |
| Prime transition and local shell conventions | [CCM24](https://arxiv.org/html/2310.18423v2), sections 4.5 to 4.7, equations (56) to (59) | The cited analytic setup matches. |
| Complete Weil form and pole-moment criterion | [CC20](https://arxiv.org/html/2006.13771v1), Appendix B, equations (147) to (150); Appendix C, Proposition 1, equation (155) | The centered substitution and criterion on all complex compact smooth tests are supported. |
| Crossed products form a sheaf | [C26](https://arxiv.org/html/2602.04022v1), section 7.3, Theorem 7.2 and the following sentence | The statement concerns sheaf organization and Hochschild homology, not a primitive sign. |
| Full zero divisor and a separate positivity criterion | [CCM07](https://arxiv.org/html/math/0703392v1), equation (4.44) and its following sentence; Theorem 6.1 and Proposition 6.2 | Correctly attributed without claiming arithmetic positivity. |
| Semilocal trace versus global criterion | [C98](https://arxiv.org/html/math/9811068v1), Section VII, Theorem 4; Section VIII, Theorem 5 and the number-field continuation after Lemma 3 | Scope remains distinct; the numbered Theorem 5 itself starts in positive characteristic. |
| Arithmetic divisors and framed/rooted uniformization | [CC26](https://arxiv.org/html/2602.15941v1), Definition 3.1; Theorems 3.4, 8.5, 8.6 and 8.15 | Does not supply the missing Weil-form polarization. |
| Arithmetic Hodge-star premise versus foliated theorem | [D05](https://arxiv.org/html/math/0505354v1), Section 3 after equation (3); Theorem 4.1 | Arithmetic premise is conditional; foliated theorem has explicit geometric hypotheses. |
| Earlier Sonin and completed-Mellin construction | [B04](https://arxiv.org/html/math/0203120v7), introduction and Section 2, especially Theorem 2.1 | Prior art is acknowledged; the theorem credits de Branges. |

The finite exceptional set in CC20 Appendix C must avoid the nontrivial zero set and contain 0 and 1. Part I chooses exactly {0,1}; this specialization satisfies those requirements. The source criterion uses the negative sign for the sum of local distributions, which agrees with the manuscript's nonnegative complete Weil form after the pole terms vanish. This verification does not prove that sign.

No first-result or universal priority claim was found in either manuscript. The search performed for this check does not establish novelty of the new elementary obstructions, and reviewer praise is not evidence of priority.

## Snapshot and limitations

| Manuscript | SHA-256 |
|---|---|
| `papers/latex/local-correspondence.tex` | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| `papers/latex/polarization-obstructions.tex` | `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4` |

The CCM24 HTML has malformed proposition labels and raw diagram expansions; clear section/equation anchors and the textual theorem proof were used. C98's HTML page is titled Untitled Document, so its abstract metadata supplies the bibliographic title. C26 equation (25) was not quoted or independently verified in this check; the earlier ledger's PDF-inspection limitation remains applicable to any later use of that formula.

The source-revision inventory agrees with the checked identifiers and dates. Its CC20 location list predates Part I's added Appendix C use; a future inventory refresh should include Proposition 1 and equation (155). Its historical review-status notes were not treated as current acceptance evidence.

The two per-paper receipts are [Part I](../team/local-correspondence/bib-check.md) and [Part II](../team/polarization-obstructions/bib-check.md). Synthesis citations are outside this completed bounded check and require their own final refresh if new references are added.

## Synthesis refresh, 2026-09-08

The subsequent bounded synthesis check is complete at source SHA-256 `54bb96d4a38400eb9af4adf1301f2eef8988d64265563620f16a72054b0ead51`. The initially reviewed synthesis source was `21d5a8ac99cbda905f63593e5cd91f699d3d32a869bf20acb4727075ccef8322`; the later snapshot includes the author's precise zero-count locator and stylistic review cuts. These snapshots supplement, rather than replace, the historical two-paper snapshot above.

All eight synthesis entries match: five external sources already present in the primary-record table (C26, CC20, CCMar, CCM and D05), two companion manuscripts, and the companion archive. All twelve numbered companion imports match fresh `.aux` labels and the associated source statements. The current companion hashes used for imports are Part I `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` and Part II `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee`.

The C26 zero-count locator was tightened from Section 2 to Section 2.1.5. Its final paragraph explicitly recalls the all-zero asymptotic N(T) ~ T log T / (2 pi), supporting the weaker bound used for convergence. [Primary text](https://arxiv.org/html/2602.04022v1).

The synthesis distinguishes its own restriction cone and nonzero origin trace class from the CCMar restriction-cokernel precedent; it does not attribute those new constructions or a primitive sign to the literature. It correctly cites CC20 Appendix C, Proposition 1, equation (155) for the full complex two-pole-moment kernel criterion, and separates D05's conditional arithmetic weight premise from its foliated Theorem 4.1. No remaining required citation or import corrections were found. The exact-source publication gate remains separate and pending in this receipt; repository identity alone is not available implementation.

The detailed [synthesis receipt](../team/synthesis/bib-check.md) preserves all eight item checks, claim locations, numbered import labels and limitations. No manuscript or context-repository edits, external reviewer calls, build claims or novelty-priority claims were made by this check.
# Public archive gate

The source archive is now populated and public. At commit `c2516d142f30ba978fea0dfafb9114ac1434324d`, the coordinator fetched 14 files anonymously from GitHub's raw public origin and compared their SHA256 values with local files: all three LaTeX sources, all three PDFs, all five Lean modules, the Lean toolchain and mathlib pins, and README. Every byte comparison passed. Exact evidence is in `research/public-archive-verification.json`.

This closes the earlier publication-only concern that a repository existed without its companion files. The historical bibliography checks below retain their original source snapshots. The final synthesis bibliography is unchanged from its independently checked snapshot; the added origin-class transition theorem was separately reviewed on final source `042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41`.
