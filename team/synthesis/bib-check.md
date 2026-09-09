# Bibliography check: synthesis

Checked 2026-09-08 against primary arXiv metadata, versioned full texts, and the current companion manuscripts and their generated labels. Inspected synthesis SHA-256: `54bb96d4a38400eb9af4adf1301f2eef8988d64265563620f16a72054b0ead51`. This includes the author's tightening of the zero-count citation to C26, Section 2.1.5, and the post-AGY stylistic cuts. The initially inspected synthesis snapshot was `21d5a8ac99cbda905f63593e5cd91f699d3d32a869bf20acb4727075ccef8322`.

OK C26 https://arxiv.org/html/2602.04022v1 Alain Connes, The Riemann Hypothesis: Past, Present and a Letter Through Time; identifier, title, author and 3 February 2026 version match. Geometric Perspectives is a section, not its title.

OK CC20 https://arxiv.org/html/2006.13771v1 Alain Connes and Caterina Consani, Weil positivity and Trace formula, the archimedean place; identifier, title, authors and 24 June 2020 version match.

OK CCMar https://arxiv.org/html/math/0703392v1 Alain Connes, Caterina Consani and Matilde Marcolli, The Weil proof and the geometry of the adeles class space; identifier, title, authors and 13 March 2007 version match.

OK CCM https://arxiv.org/html/2310.18423v2 Alain Connes, Caterina Consani and Henri Moscovici, Zeta zeros and prolate wave operators: Semilocal adelic operators; identifier, authors and 4 May 2024 version match. The subtitle is present in the full text, although absent from the abstract-page title.

OK D05 https://arxiv.org/html/math/0505354v1 Christopher Deninger, Arithmetic Geometry and Analysis on Foliated Spaces; identifier, title, author and 17 May 2005 version match. The abbreviated metadata author C. Deninger is consistent with the full author name.

OK PartI papers/latex/local-correspondence.tex Prime-Adjoining Correspondences; local title and authors match the companion reference. No independent identifier is asserted.

OK PartII papers/latex/polarization-obstructions.tex Obstructions to Adelic Polarization; local title and authors match the companion reference. No independent identifier is asserted.

OK APCcode https://github.com/YonedaAI/adelic-polarization-conjecture Companion archive identity resolves; content availability remains the coordinator's separate publication gate. The previously inspected public repository was empty. This entry is not evidence that the final implementation has already been published.

All eight bibliography keys have matching citation uses. There are five external mathematical sources, two local companion manuscripts and one companion archive; there are no independent DOI entries. No bibliography addition or required attribution correction was found.

## Source-backed claims

| Synthesis context | Verified primary location | Finding |
|---|---|---|
| Sonin shell, multiplier and changing metric; lines 78, 357 and 365 | [CCM](https://arxiv.org/html/2310.18423v2), Sections 4.5 to 4.8, Theorem 4.6 and the sentence following equation (62) | The theorem supplies a topological Hilbertian isomorphism, not an isometry. Synthesis preserves this distinction. |
| Semilocal Hilbert realization; line 332 | [CCM](https://arxiv.org/html/2310.18423v2), Section 4.1 | Correct context for the stated realization; not a claim of an arbitrary orbit-quotient measure. |
| Restriction-cokernel precedent; line 116 | [CCMar](https://arxiv.org/html/math/0703392v1), Sections 4.2 to 5 | Relevant predecessor, expressly not identified with the new cone. |
| Inverse-action convention; line 325 | [CCMar](https://arxiv.org/html/math/0703392v1), Section 4, equations (4.3) to (4.6) | Correct locator; these equations precede subsection 4.1. |
| Crossed-product sheaf; line 120 | [C26](https://arxiv.org/html/2602.04022v1), Section 7.3, Theorem 7.2 and the following sentence | Supports sheaf organization and Hochschild homology, not the requested primitive sign. |
| Explicit formula and complete zero divisor; line 189 | [CC20](https://arxiv.org/html/2006.13771v1), Appendix B, equations (147) to (150) | Matches the centered Mellin convention and includes poles and all zeros with multiplicity. |
| Zero-count bound; line 191 | [C26](https://arxiv.org/html/2602.04022v1), Section 2.1.5, final paragraph | Explicitly recalls the all-zero count asymptotic N(T) ~ T log T / (2 pi), which supports the weaker stated bound. The author's precise locator is verified. |
| RH criterion on the full two-moment kernel; lines 127 and 215 | [CC20](https://arxiv.org/html/2006.13771v1), Appendix C, Proposition 1, equation (155) | The allowed finite Mellin set contains 0 and 1 and avoids nontrivial zeros. Choosing exactly {0,1} gives the stated whole complex test space, with the manuscript's sign after poles vanish. No evenness or reality restriction is imported. |
| All-zero trace versus positivity; lines 1407 to 1410 | [CCMar](https://arxiv.org/html/math/0703392v1), equation (4.44) and its following sentence; Theorem 6.1 and Proposition 6.2 | Includes possible off-line zeros and natural multiplicities. Trace construction and positivity criterion are correctly separated. |
| Arithmetic weight identity versus foliated theorem; lines 1416 to 1420 | [D05](https://arxiv.org/html/math/0505354v1), Section 3 after equation (3); Theorem 4.1 | The arithmetic Hodge-star positivity premise is conditional. The foliated theorem has stated geometric hypotheses; neither is represented as construction of the desired arithmetic space. |

The restriction-cone construction, signed cone maps, low-degree exact sequence, and nonzero origin trace class are explicitly the synthesis paper's constructions and proofs. They are not attributed to CCMar or presented as the missing primitive arithmetic polarization. The origin class is distinguished from a primitive class and from a positive pairing, including its failure to establish survival under prime adjoining. The conditional RH implication uses the cited criterion; it does not claim the criterion's inequality is proved.

## Numbered companion imports

The following twelve imported definitions, results and sections match both the fresh `.aux` labels and their companion source statements. The companion `.aux` files postdate their current `.tex` files.

| Companion | Imported locator | Source label | Matching content |
|---|---|---|---|
| I | Definition 2.1 | `def:local-correspondence:test-algebra` | Complex test algebra and transform conventions |
| I | Definition 3.1 | `def:local-correspondence:weil` | Complete Weil form |
| I | Proposition 4.2 | `prop:local-sonin` | Unit-invariant local Sonin line and shell generator |
| I | Definition 12.1 | `def:local-correspondence:support` | Support-admissible finite stages |
| I | Theorem 13.2 | `thm:local-correspondence:tensor-obstruction` | Pointwise tensor multiplicativity obstruction |
| I | Proposition 14.1 | `prop:corrected-chain-map` | Signed shell Hochschild chain map |
| I | Proposition 15.1 | `prop:chain-square` | Commuting prime-adjoining chain square |
| II | Theorem 3.4 | `thm:polarization-obstructions:entire` | Entire-transform normalization obstruction |
| II | Section 5 | `sec:prime-compatibility` | Compression/prime-compatibility example |
| II | Theorem 6.3 | `thm:polarization-obstructions:signs` | Opposite signs on the explicit prime packet |
| II | Proposition 7.1 | `prop:packet-formula` | All-prime packet formula |
| II | Theorem 9.2 | `thm:polarization-obstructions:extension` | Orthogonal-extension obstruction |

Companion snapshots used for this import check:

| Source | SHA-256 |
|---|---|
| `papers/latex/local-correspondence.tex` | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| `papers/latex/polarization-obstructions.tex` | `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee` |

## Scope and handoff

Bibliography metadata, source attribution and numbered imports pass at the recorded snapshot. The precise C26 locator was sent to the author and coordinator and its application verified; no manuscript was edited by this check. This is not a proof audit, Lean build, rendered-output review, novelty-priority determination, or external reviewer acceptance receipt. The 46-theorem/five-module implementation claim and exact published source contents remain under the coordinator's independent build and publication checks. No AGY/Codex calls, deployments, git mutations or context-repository edits were performed.

See [the consolidated bibliography check](../../research/bibliography-check.md) for the earlier Part I/II source inventory and its historical hash snapshots.

## Final transition-theorem refresh

The coordinator rechecked source `042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41` after adding Proposition 8.3. Its bibliography is byte-identical to the independently checked post-AGY1 source preserved in `team/synthesis/codex-1/synthesis.tex`. All twelve imported companion locators above remain unchanged and were reread in the final source; neither companion source changed. The new transition-vanishing proof is a direct argument, not an additional claim attributed to the literature. AGY round2 accepted that exact source. The public archive check remains separate until the source push.
