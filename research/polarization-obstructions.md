# Part II research record

## Results and scope

The manuscript `papers/latex/polarization-obstructions.tex` is a 21-page mathematical development at 11pt with one-inch margins. It proves two candidate-specific obstructions and develops the remaining operator and geometric equations. No claim of priority or of RH is made.

Final publication notation uses `omega_p` for the full positive local weight and `Delta_p` for the entire Euler denominator. The initial calculations below called that denominator `Dp`; the function and its proofs are unchanged. Part I retains its `d_p` and `D_p` metric-defect notation. Actual Lean identifiers remain `eulerDenominator`.

| Result | Exact manuscript reference | Verification and scope |
|---|---|---|
| No nonzero entire F,G obey the positive ambient Euler normalization | Theorem 3.4 | Continuity upgrades almost-everywhere boundary equality, the identity theorem yields Dp G²=F², and the simple zero at 0 contradicts parity of orders. |
| Intrinsic normalization uses a compressed operator | Proposition 4.1 | A=P Md restricted to H; J*=A; U=J A^-1/2; changed projection A^-1 P Md. Closed Hilbert carrier is an explicit hypothesis. |
| Exact smooth autocorrelation realizes Qr | Proposition 6.1 | Disjoint translated bumps, exact Laplace moments, positive squared bump norm and every relevant prime power retained. |
| Actual W11 has both signs after killing pole moments | Theorem 6.3 | Values -46/11 and (28 sqrt11-92)/11 times positive log11 norm². |
| Both signs at every prime | Proposition 7.1 and Corollary 7.2 | Exact finite Laurent cancellation gives Q_N=2N(1-r)^3/r+4-6r-2/r, positive for sufficiently large N. |
| Four-bump constrained signature | Proposition 8.1 and Corollary 8.2 | Quotient polynomial alpha+beta z gives matrix diagonal -4-2r² and off-diagonal3r+1/r. Smallest prime with a positive direction is11; minimality is only within this fixed bump packet family. |
| Orthogonal nonpositive extension cannot realize +Wp | Theorem 9.2 | Positive bump contradicts nonpositive added diagonal. Sign is assumed on the nontrivial intermediate transition. |
| Support-admissible new primes are irrelevant | Proposition 10.1 | Autocorrelation support[-2a,2a] makes Wp=0 for p>exp(2a). |

The full geometric proposal survives if sign is imposed only on support-complete stages, or if correspondences retain mixed terms, old-image defects, changing primitive projections, or explicit degree/boundary corrections. Intrinsic compressed polar decomposition survives the entire obstruction. Its test-map compatibility, actual Fourier symmetry, and prime-square equations still require proof.

## Research iterations

1. Conjecture: ambient polar normalization might make the carrier identity isometric while preserving entire functions. Decomposition: positive Euler modulus, entire discriminant, simple zero, vanishing orders. Proof attempt succeeds as an obstruction: no nonzero entire input survives the specified correction. Reformulation: retain intrinsic compressed polar decomposition and test its exact arithmetic compatibility.
2. Conjecture: orthogonal nonpositive local sectors might realize the required +Wp intersection increment. Decomposition: exact lattice autocorrelation, pole-moment polynomial roots, local Toeplitz form. Proof attempt yields W11 with opposite signs and excludes the orthogonal sign ansatz. Reformulation: compute mixed and correction terms and require sign only at support-complete stages.
3. Conjecture: the short positive witness may be a numerical accident at11. Exact Laurent calculation yields both signs for every prime with sufficiently long packets. The constrained four-bump matrix proves the exact threshold at11, while restricting the minimality conclusion to this packet family.
4. Compatibility check: compressed ambient multipliers need not commute. A two-dimensional compression of commuting positive diagonal3-by3 matrices has a nonzero commutator. This is an abstract warning, not a calculation of the Sonin projection. The paper supplies the exact relative metric and polar-square equations.

## Primary-source claim ledger

All eight external bibliographic URLs resolved on 2026-09-08. Each short excerpt below has at most25 words. The quoted fragments are used only for evidence matching, not as quotations in the paper. Source locations and limits follow the repository literature ledger and direct primary-source inspection.

| Verbatim manuscript sentence or clause | Source | Exact location | Short source excerpt | Assessment |
|---|---|---|---|---|
| The construction of Connes, Consani and Moscovici provides a common space of entire functions with norms that change when a prime is adjoined. | [CCM24](https://arxiv.org/html/2310.18423v2) | Sections4.7/4.8, Theorem4.6, equations59/62 | "the choice of the finite set S plays a key role in fixing the inner product" | Supports; carrier norms imported, geometric sign not inferred. |
| The minus sign in the full Weil distribution follows from the classical explicit formula with its archimedean subtraction. | [CC20](https://arxiv.org/html/2006.13771v1#A2) | Appendix B, equations147 to150 | "the explicit formula takes the form" | Supports after additive change of variables documented in PartI. |
| Connes's semilocal cutoff theorem retains a divergent term and Fourier-normalized principal values. | [C98](https://arxiv.org/html/math/9811068v1) | SectionVII, Theorem4 and text immediately following | "Then when"; formula includes2h(1)log'Lambda and prime-marked local integrals. | Supports; global SectionVIII condition explicitly distinguished. |
| Their realization includes the full zero divisor with multiplicities, and their positivity criterion separates the trace identity from the sign. | [CCM07](https://arxiv.org/html/math/0703392v1) | Equation4.44, Theorem6.1, Proposition6.2 | "The following two conditions are equivalent" | Supports; explicit formula and RH-equivalent positivity have different status. |
| Earlier work of Burnol connects Sonin spaces, co-Poisson summation and completed Mellin transforms. | [B04](https://arxiv.org/html/math/0203120v7) | Introduction and Section2 | "The entire functions in these specific de Branges spaces are the Mellin transforms, with a Gamma factor" | Supports analytic precedence only. |
| Connes's account places semilocal crossed products over Spec Z and describes their cohomological setting. | [C26](https://arxiv.org/html/2602.04022v1) | Section7.3, Theorem7.2 | "defines a sheaf of algebras" | Supports; no primitive sign asserted. |
| The adelic divisor construction of Connes and Consani uses rank-one torsion-free groups with possibly degenerate seminorms and identifies their classes as a Picard monoid. | [CC26](https://arxiv.org/html/2602.15941v1) | Definition3.1, Section3.4, Theorem3.4 | "induces a canonical monoid isomorphism" | Supports; no Hodge-index theorem inferred. |
| A related weight identity is proved for a foliated three-manifold under stated geometric hypotheses. | [D05](https://arxiv.org/html/math/0505354v1) | Section3 and Theorem4.1 | "Let X be a compact 3-manifold" | Supports; arithmetic cohomology premise is distinguished from foliated theorem. |

## Companion and formal interfaces

PartI's actual source and fresh aux were checked. Imports resolve to test algebra Definition2.1, Weil Definition3.1, carrier equations46/47 in Section8, support Definition12.1, corrected chain map Proposition14.1, Fourier defect Proposition14.2, and all-degree discrepancy equation92. The chain maps concern uncompleted algebraic Hochschild complexes; PartII explicitly retains that limit.

The actual formal files inspected were `lean/APC/LocalSigns.lean`, `lean/APC/EntireObstruction.lean`, and `lean/APC/LatticeDistribution.lean`, together with `research/lean-results.md`. The paper reports the actual coefficient values, moment roots, translated-profile conditional distribution theorem, and whole entire squared-identity obstruction. It explicitly excludes the smooth bump/convolution/Laplace bridge, a.e. boundary passage, compressed Hilbert operator, all-prime packet formula, and geometric extension argument from its Lean claims.

Haskell is skipped by the user's flag; no `src/` was created by this worker. Context repositories were read only. The public paper has no reviewer names, verdicts, confidence badges or pipeline metadata. Its GrokRxiv sidebar is a local identifier, not a DOI.

## Humanizer and adversarial pass

The humanizer skill guided ordinary technical prose, varied paragraph lengths and explicit hypotheses. The remaining draft issues caught locally were a reused symbol for the Toeplitz symbol, raw cross-reference labels, a support-endpoint mismatch in the explicit bump, and an onto hypothesis needed for a unitary symmetry. They were corrected before external review. The final prose retains all mathematical limits and source citations. Mechanical checks found no banned phrases, dash characters, unresolved source markers, undefined references or overfull boxes in the first clean21-page compile.

## Final review and artifact verification

The external AGY mathematical review returned MINOR REVISIONS, with no critical or major issues. All numbered issues and paragraph critiques were resolved. Three external Codex formatting invocations then ended in PASS, with no remaining genuine issues. The complete reports, source-pinned receipts, principled responses to incorrect suggestions, and final artifact checks are preserved under `reviews/polarization-obstructions-*`. No self-review or stub substitutes for those external calls.

At the external formatting PASS, the source SHA256 was `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4`. Two LaTeX passes produced the then-current 21-page publication PDF, SHA256 `208aeafac4616523773acd659284138bfba9be234746aaaec912e423a1d473d9`. Its title and author metadata were populated, with no errors, unresolved references, overfull boxes or underfull boxes. This exact source, PDF, aux and receipt are preserved under `team/polarization-obstructions/pre-integration/`; the subsequent symbol-only revision is documented below.

The final cover at `images/polarization-obstructions.png` is rendered at 300 dpi and measures 2550 by 3300 pixels. The fresh cover and final formalization page were visually inspected after the last compile, supplementing the earlier inspection of representative proof pages. The final review verifies the exact ASCII identifier `APC.translated_plus_exact`; the accidental mathematical-notation replacement and the reviewer's incorrect Unicode remedy are documented and resolved. All eight code-name references match actual Lean declarations.

The reviewed manuscript remains candidate-specific. Its additional all-prime packet result and four-bump signature are paper proofs, not Lean claims. Final publication does not turn the retained compressed-polar, mixed-pairing or support-complete sign possibilities into established constructions. Website integration, the final repository commit and public delivery are handled by the coordinator.

## Post-formatting integration correction

The independent first integration gate found exactly two notation conflicts, not mathematical defects. Its complete report and JSON were read. Every Part II test-map `Gamma` became `mathcal G`, preserving indices and matching Part I's arithmetic correspondence. The coherence paragraph now defines the restricted Hilbert carrier `mathcal H_S=(H,q_S)` and uses it as the target of `V_S`; Part I retains `H_S` for the full ambient semilocal space. The local compression pair `H_0,H_1` is unchanged. The contract was updated to match.

No other source text or mathematical claim changed. The current source hash is `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee`. Two fresh compiles retain 21 pages and a byte-identical aux, SHA256 `b31155ecb515920c23c68b7c3dd1219192230bef548e0f61012ddde6aae4f382`, so all labels, numbers and page references are unchanged. All path-formatted identifiers are byte-identical to the reviewed source, and all eight cited Lean declarations were rechecked in their actual ASCII source. Fresh affected-page renders 6, 7, 8, 13, 14 and 19 were inspected without clipping, overlap or broken formulas.

The updated PDF SHA256 is `013f6cd880274c8944a043c3e08feec14320ae4ebd84c4321491f56afa9453da`; its publication copy matches the compiled file. The regenerated 300 dpi cover retains its previous pixel hash because page 1 is unchanged. The receipt distinguishes the external formatting PASS from these later integration-requested edits. No fourth Codex formatting invocation was made. The coordinator will run the second independent integration gate and regenerate HTML from this exact source.
