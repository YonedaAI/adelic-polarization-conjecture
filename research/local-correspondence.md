# Part I research record

Date: 2026-09-08. Paper: `papers/latex/local-correspondence.tex`. Interface: `team/local-correspondence/contract.md`.

The research-agent writing standard and paper-format skeleton control the manuscript. The humanizer skill is applied in its neutral technical mode: exact claims and formulas are retained, and promotional language, process narration, dash sequences and filler are removed. Haskell is disabled. Lean files are owned by the arithmetic worker.

## Sources and exact locations

1. Connes, Consani and Moscovici, *Zeta zeros and prolate wave operators: Semilocal adelic operators*, arXiv:2310.18423v2, 4 May 2024. https://arxiv.org/html/2310.18423v2 . Primary text opened and read on 2026-09-08. Section4.5 defines the shell indicators and proves uniqueness and Fourier invariance of sigma_p; equation56 is the shell transform. Section4.6 equation57 gives theta's multiplier. Section4.7 equation58 and the proposition following it give Fourier intertwining and theta/eta mixed duality. Theorem4.6 gives Sonin-space surjectivity. Section4.4 equations51–53 define the dual Mellin carrier; Section4.8 equations59–62 identify the entire carrier and explicitly distinguish its varying norms. Some proposition numbers fail to render in HTML, so paper cites section/equation rather than guessing.
2. Connes and Consani, *Weil positivity and Trace formula, the archimedean place*, arXiv:2006.13771v1, 24 June 2020. https://arxiv.org/html/2006.13771v1 . AppendixB equations147–150 fix the Mellin convention, complete formula, finite-place sign and archimedean cancellation. AppendixC Proposition1 equation155 gives the moment-constrained Weil criterion with finite exceptional set containing0,1. This is a precise primary route from pole-killed tests, and supersedes any generic claim that such an extension is always unknown.
3. Connes, *The Riemann Hypothesis: Past, Present and a Letter Through Time*, arXiv:2602.04022v1, 3 February2026. https://arxiv.org/html/2602.04022v1 . Section7.3 equations23–24 define the semilocal quotient and group; Theorem7.2 gives the sheaf description; following paragraph discusses Hochschild homology. Section2.1.5 recalls N(T) asymptotics, sufficient for the standard O(TlogT) convergence argument. No assertion from the incomplete proof program is used as a theorem.
4. Connes, Consani and Marcolli, *The Weil proof and the geometry of the adeles class space*, arXiv:math/0703392v1, 13 March2007. https://arxiv.org/html/math/0703392v1 . Section4 equations4.3–4.6, before subsection4.1, give the smooth crossed-product multiplication. Sections4.2–4.5 and5 give restriction cokernels, descended trace and primitive interpretation. Section6.2 Proposition6.2 states positivity equivalence, not an established sign.
5. Companion PartII, `papers/latex/polarization-obstructions.tex`: actual source and fresh auxiliary labels inspected. Theorem3.4 proves the entire obstruction; Theorem6.3 gives exact W11 signs; Theorem9.2 gives the orthogonal-extension exclusion. Main theorem numbering confirmed directly by its worker before review. Its exact title is *Obstructions to Adelic Polarization*. This is a local manuscript, not a registered DOI.

All four external bibliography URLs resolved to primary arXiv HTML at initial research. Titles/authors/versions were verified there. The GrokRxiv sidebar is a local manuscript identifier.

## Claim ledger

Exact paper sentences appear in quotation marks. Equation and proof claims are localized by LaTeX label. Excerpts are kept short; the larger technical content is derived in the paper.

| Claim | Support and exact location | Short excerpt or derivation | Status |
|---|---|---|---|
| "The resulting isomorphism therefore preserves the topology, but it does not preserve the inherited inner product." | CCM Section4.7 Theorem4.6; Section4.8.2 following equation62 | "inherits different inner products" | Source-supported; ambient norm-defect derivation included |
| "Connes describes the semilocal crossed products as a sheaf over Spec Z and relates the function spaces in the trace formula to Hochschild homology." (mathematical typography normalized here) | Connes2026 Section7.3 Theorem7.2 and following paragraph | "Hochschild homology" | Source-supported |
| "Earlier work constructs restriction-map cokernels and a descended trace pairing on the adele class space." | CCMar Sections4.2–4.5; especially trace-pairing descent | "Trace pairing and vanishing" | Source-supported |
| Full explicit formula with P-A-sum Wp, `prop:explicit-formula` | CC2020 AppendixB147–150 and additive substitution | "the explicit formula" | Source-supported; normalization derived |
| Absolute convergence of full zero sum, `prop:explicit-formula` | Repeated integration by parts in `lem:test-identities`; standard zero count recalled Connes2026 Section2.1.5 | Own dyadic estimate from O(TlogT) | Proven |
| Pole-killed criterion paragraph following `eq:primitive-tests` | CC2020 AppendixC Proposition1 equation155 | "finite set" | Precise criterion cited |
| Radial local Sonin space is C sigma_p, `prop:local-sonin` | CCM Section4.5 and equation56 | "one dimensional" | Known result rederived by Fourier transforms of balls |
| theta multiplier m_p and eta multiplier reciprocal conjugate, equations `eq:orbit-sum`, `eq:eta-orbits`, `eq:Bp` | CCM Sections4.2,4.6–4.7 equations47,57–58 | Own orbit-sum calculation | Source-supported |
| Exact inverse/norm bounds, `thm:local-correspondence:inverse` | Norm-convergent geometric series and multiplier essential extrema | Own proof | Proven standard calculation |
| Mixed pairing is preserved, `prop:local-correspondence:mixed` | CCM Section4.7 mixed-pairing proposition | "mixed" | Known identity derived with conjugates fixed |
| Raw norm defect has both ambient signs, `prop:local-correspondence:defect` | Multiplier r²-2r cos(tL) and localized ambient witnesses | Own proof | Proven only on ambient Hilbert space |
| Operator-log derivative gives every local prime power, `thm:local-correspondence:logarithmic` | Uniformly convergent logarithm and derivative series | Own operator proof of supplied scalar identity | Proven; no novelty claim |
| Analytic square retains mixed metric terms, `prop:local-correspondence:square` | Translation algebra expansion GpGq-I=Dp+Dq+DpDq | Own proof | Proven |
| Exact support indexing, `prop:local-correspondence:support` | Support(f*g*) subset support(f)-support(g) | Own proof | Proven |
| No nonzero radial local Sonin vector gives multiplicative tensor coefficient map, `thm:local-correspondence:tensor-obstruction` | Gamma_S acts p-adically by units; sigma values1,-1/p; idempotence necessary | Own candidate-specific proof | Proven in manuscript; AGY review found no mathematical correctness failure |
| Corrected signed Hochschild chain map, `prop:corrected-chain-map` | Linear combination of induced maps from the two idempotent shell algebra embeddings | Direct chain-boundary verification | Proven partial construction; homology image and topological completion not identified |
| Two-prime chain square, `prop:chain-square` | Four shell algebra embeddings; old/new group unit checks | Direct equality on elementary tensors | Proven partial compatibility |
| Corrected local tensor factors fail Fourier symmetry in all degrees n>=1, `prop:chain-Fourier-defect`, `eq:degree-n-Fourier` | Value on B_-1^(n+1) is (p-1)^(n+1)(p^(-n-1)-p^-1) | Direct ball-Fourier calculation | Proven failure for componentwise local transform, not a claim that Fourier is a Hochschild chain map |

## Research-loop outcome

Conjecture tested: use the actual local Sonin vector to lift the analytic theta transition as a multiplicative coefficient map of semilocal crossed products.

Decomposition: local shell and Fourier gaps; orbit-sum multiplier; coefficient algebra multiplication; Hochschild boundary; local duality; arithmetic trace comparison.

Proof attempt and obstruction: gamma in the old group is a p-adic unit, so tensor multiplication produces sigma². Multiplicativity requires idempotence, incompatible with both nonzero shell values. This rejects the specific tensor algebra map and every nonzero scalar normalization.

Reformulation: each shell separately is an invariant idempotent and defines an algebra embedding. The weighted difference of their induced Hochschild chain maps agrees with sigma at degree0 and gives exact commuting prime transitions in all degrees. This is a real algebraic construction, not a sign hypothesis. Its componentwise Fourier symmetry fails in every positive degree by an explicit value on the local forbidden ball. The next construction problem is an appropriate duality/correspondence relating the relevant algebraic products and a primitive pairing with exact arithmetic comparison.

Separate analytic result: the local metric logarithm has derivative Kp with finite signed translation matrix coefficients equal to Wp. Its kernel is a positive measure but its convolution operator is indefinite. Raw norm defects have mixed pq and p/q translations absent from the local prime decomposition.

## Publication checks

Final publication PDF: `papers/pdf/local-correspondence.pdf`, 20 pages, standard 11pt letterpaper, margin 1in. Abstract: 224 words. Bibliography primary URLs verified. Two post-review compiles succeeded with no undefined references, overfull/underfull boxes, or rerun requests. PDF title, author, subject and keywords are populated. The required everypage template produces only its documented legacy-package warning.

The final PDF was rendered at 85 dpi for a fresh 20-page contact-sheet audit; the title/abstract, chain construction, general Fourier failure, and final formal-scope/bibliography pages were also inspected individually. Earlier enlarged inspections covered the shell and operator-logarithm derivations. No overlaps, clipping, blank pages or missing mathematical glyphs were found. The 300-dpi first-page cover is `images/local-correspondence.png`, 2550 by 3300 pixels.

AGY round1 returned MINOR REVISIONS with no mathematical correctness failure. All seven expository/normalization comments were addressed, including the one item labeled major inside that final minor verdict. The response ledger is `reviews/local-correspondence-fixes.md`.

Codex formatting rounds 1 and 2 returned NEEDS_FIX. Their substantive sign, prose, display and formal-traceability issues were fixed. The suggested removal of the mandatory publication sidebar and skeleton packages was not adopted; their explicit house-template status was accepted in the subsequent reviews. Round 3 returned PASS and independently verified the reviewed source, build evidence, sign convention, all named Lean declarations and source hashes. The canonical review is `reviews/local-correspondence-codex-review.md`; all three rounds and receipts are preserved. A subsequent bibliography check corrected one locator from CCMar Section 4.1 to Section 4, equations (4.3) to (4.6). No mathematical text changed and no fourth Codex review was run. Reversing exactly this locator replacement restores the reviewed source hash.

Final source SHA256: `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a`. Final PDF SHA256: `6b0d956ec7c5612103698b295fbbb7d9a65ddfcaacd4c350993295c41b0e42d4`. After the locator correction, two fresh compiles, PDF copy and 300-dpi cover generation succeeded. All 20 pages were rerendered: only page 13 differs from the preceding audited images, and that page was inspected individually. The new contact sheet was also inspected. The other 19 page images, including the final page, and the cover are byte-identical to the previously inspected versions. The auxiliary hash is unchanged. The verification receipt is `reviews/local-correspondence-verification.json`. Haskell remains disabled and no `src/` directory was created. Publication, repository push and website review remain separate root-owned tasks.

The compilation preserves all cross-paper numbers: common-carrier norm46, weight relation47, corrected chain14.1, Fourier defect14.2, chain square15.1, and general Fourier value92. PartII's notation has been reconciled: omega_p denotes its positive weight and Delta_p its entire denominator, leaving PartI's d_p and D_p for the metric defect.

## Humanizer edit record

Draft: technical exposition with exact algebraic and analytic distinctions.

Audit: repetitive caution paragraphs were reduced; Cauchy-Schwarz, Hardy-Titchmarsh and Bruhat-Schwartz use conventional single hyphens; headings are plain subject phrases; process status is confined to this record and reviews. Abstract now includes the actual corrected chain construction and its Fourier failure.

Final rewrite: neutral scholarly paragraphs retain all hypotheses, formulas and citation locations. The post-review banned-vocabulary/dash/source-marker and placeholder scan had no hits. No formula or mathematical hypothesis was changed by the humanizer edit.
