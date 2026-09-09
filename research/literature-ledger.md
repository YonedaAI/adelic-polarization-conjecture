# Literature ledger

Verified by opening primary texts and arXiv metadata on 2026-09-08. This is an internal claim ledger. The public papers should state mathematical hypotheses and conclusions directly.

## Source locations

| Key | Claim | Exact location | Assessment |
|---|---|---|---|
| CCM24 | Prime transitions preserve Fourier symmetry; carrier norms vary. | [Sections 4.5 to 4.8](https://arxiv.org/html/2310.18423v2#S4.SS5), equations (56), (57), (59), (62); Theorem 4.6 | Established within the stated Sonin construction. |
| C26 | Semilocal crossed products form a sheaf. | [Section 7.3](https://arxiv.org/html/2602.04022v1#S7.SS3), Theorem 7.2 | Established statement; no primitive sign follows. |
| CC26 | Adelic divisor classes form a Picard monoid. | [Section 3.4](https://arxiv.org/html/2602.15941v1#S3.SS4), Theorem 3.4; Theorem 8.15 | Geometric identification; no Weil-form polarization asserted here. |
| CC20 | Explicit formula conventions include subtracted local distributions. | [Appendix B](https://arxiv.org/html/2006.13771v1#A2), equations (147) to (150) | Checked by the change of variables recorded in the knowledge base. |
| CCM07 | All-zero trace realization and positivity are separate. | [Sections 4.4 to 6.2](https://arxiv.org/html/math/0703392v1), equation (4.44), Theorem 6.1, Proposition 6.2 | The trace is constructed; its required positivity is RH-equivalent. |
| C98 | The semilocal cutoff trace formula retains principal-value normalization. | [Section VII](https://arxiv.org/html/math/9811068v1), equations (12), (13), Theorem 4 | Finite-place theorem; the global condition in Theorem 5 has different status. |
| D05 | A positive arithmetic Hodge-star pairing would give the centered weight identity. | [Section 3](https://arxiv.org/html/math/0505354v1), discussion after equation (3); compare Theorem 4.1 | Arithmetic premise is conjectural; foliated theorem has explicit geometric hypotheses. |
| B04 | Completed Mellin transforms realize Sonin spaces as entire-function spaces. | [Introduction and section 2](https://arxiv.org/html/math/0203120v7) | Earlier analytic construction; relevant prior art. |

No source extracts are reproduced. Equation and theorem locations provide the audit trail without collecting quotations.

## Working deductions

| Claim | Evidence | Limit |
|---|---|---|
| Logarithmic variation gives \(W_p\). | Uniform geometric expansion and Fourier inversion in `.knowledge-base.md`. | A local scalar identity, not an intersection comparison. |
| Ambient polar normalization cannot preserve a nonzero entire function. | Identity theorem and odd vanishing order of \(D_p\) at zero, proved in `.knowledge-base.md`. | Does not apply to the intrinsic compressed polar operator. |
| \(W_{11}\) has both signs after the two pole moments vanish. | Exact three- and four-bump coefficients in `local-sign-calculation.md`; independently expanded symbolically. | Local distribution on compact tests; not the full Weil form. |
| Orthogonal nonpositive enlargement cannot realize the positive \(W_{11}\) increment. | Its increment is the diagonal value of the added nonpositive summand. | Assumes sign at a nontrivial intermediate extension; does not contradict support-complete assembly. |
| Fixed-support prime sums are finite. | Autocorrelation support is contained in the difference of test supports. | Finiteness does not establish positivity or infinite Euler-product convergence. |

The two candidate obstructions are working mathematical deductions awaiting the requested external review. Their novelty has not been established. The exact finite packet avoids relying on a numerical limit or a Fejer argument.

## Construction gaps

The reviewed material does not supply the package requested by the perspective: an arithmetic primitive complex with independently proved nonpositive pairing, compatible prime maps and an exact comparison with the complete Weil form on all complex tests. The common Sonin carrier, sheaf organization and Picard uniformization do not by themselves identify the needed primitive pairing.

The remaining comparison must include poles, prime powers, the archimedean counterterm, mixed pairings, completion topology and operator domains. A spectral realization must account for every nontrivial zero with multiplicity. An isomorphism of topological vector spaces does not establish equality of inner products. A regularized or alternating trace is not an ordinary positive trace.

## Retrieval limitations

The CCM24 HTML contains malformed proposition labels and large raw commutative-diagram fragments. Its unambiguous definitions, equations and Theorem 4.6 were used. The C26 HTML text extraction omits displayed equation (25); the exact formula should be read in the PDF before quoting it. These are rendering limitations, not mathematical gaps in the papers.

Unversioned URLs were opened, their arXiv version histories checked, and the versioned citations recorded. Metadata for Burnol resolves to v7, not v1. Context-repository Lean verification reports were read as previous evidence; this knowledge-base task did not rerun their builds.
