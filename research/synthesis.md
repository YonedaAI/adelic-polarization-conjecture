# Synthesis research record

## Arithmetic result and remaining construction

The manuscript Adelic Polarization Conjecture unifies Parts I and II at the level of actual semilocal algebras, their signed Hochschild maps, local forms and support-indexed comparison. Its added algebraic construction is a restriction cone. The source is the semilocal Bruhat-Schwartz crossed product by the arithmetic unit group; the target restricts to the invertible locus and permits locally smooth coefficients without growth restrictions.

The multiplication-only, nonunital Hochschild convention gives a cone with degree-n term C_(n-1)(A_S) direct-sum C_n(D_S) and differential (-ba, bc+r_*a). The signed shell maps commute with restriction, hence induce chain maps on this cone; distinct prime maps commute. Proposition 8.1 identifies degree-one homology by a short exact sequence with both a cokernel and a commutator kernel.

Proposition 8.2 gives a nonzero relative class at every finite stage. Evaluation of the coefficient of U_-1 at the origin is a source trace. A Schwartz coefficient f with f(0)=1 therefore gives a nonzero class f U_-1 in source HH_0. On the invertible locus it becomes the commutator [X U_1, (f/(2X)) U_-1]. This supplies an explicit cone cycle and proves its nonvanishing.

Proposition 8.3 proves that the explicit class with compactly supported f is killed by each shell embedding, hence by every one-prime signed transition. Odd locally constant shell signs (using unit residues modulo4 at the prime2) and an even compact old cutoff give a source commutator with genuine Schwartz coefficients. The remaining target cycle has an explicit four-term Hochschild filling in a noncentral shell corner. The actual cone differential then gives the relative boundary. This is stronger than the earlier vanishing of a trace detector. It excludes this compact-bump witness from the surviving direct-limit classes, but does not determine other H1 classes, the entire cokernel term or a primitive sector.

The central Conjecture 13.1 requires an arithmetic topological realization of the specified relative complex, geometric degree maps, a primitive subquotient, an independently constructed continuous Hermitian duality, and complete comparison on every support-complete two-moment test window. None of these missing data is replaced by an abstract norm pulled back from the Weil form. The algebraic cone is a proposed candidate, not a literature-established arithmetic cohomology or completed polarization.

## Exact signs and quantifiers

The convention is W=P-A-sum_p W_p. Pole terms are mixed products. The primitive intersection target is I=-B_W, with I nonpositive. A nontrivial intermediate prime increment is +W_p. For tests supported in [-a,a], all relevant prime powers obey p^k <= exp(2a). A newly irrelevant prime changes no old test coefficient at a support-complete stage.

The local positive packets from Part II exclude orthogonal nonpositive intermediate enlargements. They do not contradict a sign theorem imposed only at support-complete stages. The manuscript retains mixed terms, old-image defects, boundary corrections and changing primitive projections explicitly.

The classical Connes-Consani Appendix C criterion already applies to the full complex two-pole-moment kernel. Proposition 13.2 uses exactly that established domain: a geometric realization with the conjectured sign and complete finite-support comparison would imply RH. The missing geometric pairing and its sign are not claimed as proved. Topological completion, fixed-gap dilation invariance, adjoint-domain equality and realization of every zero with multiplicity are separate requirements.

## Source and notation checks

Both complete final component manuscripts, their contracts and integration report were read. Imports retain Gamma_S for the arithmetic unit group, mathcal G for test maps, H_S for ambient invariant L2 and mathcal H_S for the restricted normed carrier. The raw scalar/operator defects remain d_p/D_p; omega_p is the positive local weight and Delta_p the entire Euler denominator.

The primary-source checks use these exact versions:

- Connes-Consani-Moscovici, arXiv:2310.18423v2, Sections 4.5-4.8 and Theorem 4.6: Sonin transitions, common entire carrier and changing norms.
- Connes-Consani, arXiv:2006.13771v1, Appendix B equations 147-150 and Appendix C Proposition 1 equation 155: complete explicit formula and full complex moment-kernel criterion.
- Connes-Consani-Marcolli, arXiv:math/0703392v1, Sections 4.2-5, equation 4.44, Theorem 6.1 and Proposition 6.2: restriction-cokernel precedent, all-zero trace with multiplicity, and separate positivity requirement.
- Connes, arXiv:2602.04022v1, Section 2.1.5 and Section 7.3 Theorem 7.2: zero-count bound and semilocal sheaf setting.
- Deninger, arXiv:math/0505354v1, Section 3 and Theorem 4.1: conditional arithmetic Hodge-star framework and the distinct theorem under foliated-geometric hypotheses.

All five primary pages were opened and relevant statements inspected. No literature claim identifies the new restriction target or cone with the cited cohomology. The new cone, exact-sequence and origin-class statements are proved directly in this manuscript. An independent bibliography agent additionally checked the twelve numbered companion imports against fresh auxiliary files. The source archive's public availability remains a coordinator-owned publication check.

## Formal boundary and research iterations

The paper reports the existing 46 explicit Lean theorems in five modules, using Lean v4.30.0-rc2 and pinned mathlib revision 0f9072dd907c6e2e4264ab241a049cab50137f7c. The audit lists only propext, Classical.choice and Quot.sound. Exact local coefficient signs, moment roots, translated-profile finite distributions, shell scalar obstruction and the entire squared-identity obstruction have the scope documented in research/lean-results.md.

The smooth bump and integral bridge, critical-line boundary continuation, p-adic Fourier realization, crossed products, Hochschild maps, restriction cone, relative homology and geometric pairing are not Lean results. No new Lean source or Haskell code was created by the synthesis agent.

The main synthesis iteration first separated the analytic carrier from an arithmetic complex, then tested the signed shell maps against restriction. An image-only restriction target would yield no useful relative construction; the chosen larger coefficient algebra exposes a concrete commutator kernel. The origin trace and real-coordinate commutator establish nonzero relative homology. A subsequent bounded proof attempt, recorded in research/cone-transition-proof-attempt.md and independently checked by the coordinator and synthesis author, goes beyond the failure of that trace detector: the compact-bump relative class itself becomes a boundary after one prime. The surviving-class question must therefore be addressed using different witnesses.

## Reviews and artifacts

AGY round 1 ended MINOR REVISIONS. Its only actionable request concerned repeated caveats; the affected paragraphs were shortened while local mathematical hypotheses were retained. The actual report and receipt are preserved, and reviews/synthesis-review-fixes.md records each change. The humanizer skill influenced these direct, shorter statements without changing signs, domains or construction status.

Codex calls 1 and 2 resolved one page-boundary hyphenation defect and ended in PASS on the 20-page pre-transition version, preserved in team/synthesis/pre-transition/. Its full source, fresh compile log and auxiliary labels, PDF metadata, actual existing page renders, and Lean evidence were supplied from the first call. The exact reviewer session records confirm nine image outputs in call1 and four in call2; the CLI text log alone did not display those operations.

The bounded transition theorem expands the manuscript to 21 pages. AGY round 2 ended ACCEPT after checking the new proof and full consistency. Codex call 3 ended PASS with no critical, major or minor findings and no remaining corrections. Both final reviews refer to source 042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41. No source change followed them. The final reviewer actually opened eight supplied images; the author separately viewed the complete 21-page contact sheet, thirteen individual pages and the regenerated 300 dpi cover.

The exact reviewed PDF is retained as the final PDF, with its source, fresh auxiliary labels, log and metadata preserved in team/synthesis/final/. The cover is 2550 by 3300 pixels at 300 dpi. Source, PDF, review and render hashes are recorded in research/synthesis-verification.json. The canonical reports and receipts are the unmodified AGY round-2 and Codex round-3 outputs. The coordinator owns the separate source-publication and website gates.
