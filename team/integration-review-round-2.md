# Integration review, round 2

Reviewed at 2026-09-09T03:25:41Z, with the final author receipt and contract refresh checked before closing this gate. Both conflicts from round 1 are resolved. This independent gate permits synthesis on the exact source snapshot below. The complete manuscripts, contracts, board, team protocol, bibliography check and Lean sources were examined in round 1; round 2 verifies the complete source diff, updated notation contracts and actual source/PDF/auxiliary linkage. The unchanged mathematical checks are retained below. The gate does not replace the upstream external reviews or the separate publication checks. Round 1 is preserved in `team/integration-review-round-1.md` and its JSON receipt.

## Exact snapshot

| Input | SHA-256 |
|---|---|
| `papers/latex/local-correspondence.tex` | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| `papers/latex/polarization-obstructions.tex` | `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee` |
| `papers/latex/local-correspondence.aux` | `f7b2ca2c04e09073b025b98cbec32dab2dd2bb239ba50a2f623535408e26b08b` |
| `papers/latex/polarization-obstructions.aux` | `b31155ecb515920c23c68b7c3dd1219192230bef548e0f61012ddde6aae4f382` |
| `papers/pdf/polarization-obstructions.pdf` | `013f6cd880274c8944a043c3e08feec14320ae4ebd84c4321491f56afa9453da` |
| `research/lean-source-sha256.txt` | `d714df4f2e137f5a3dfa0344b488fd46e3bae83680ee7188d41afc231255ba2c` |

Both auxiliary files are newer than their corresponding sources. Part I's current verification receipt records the same source and auxiliary hashes, and identifies the sole change after its final external formatting review: the CCMar locator changed from Section 4.1 to Section 4, equations (4.3) to (4.6). Its two subsequent compiles preserve the numbered results. The older Part I hash on the append-only board is historical, not the snapshot reviewed here.

## Resolved corrections and artifact linkage

No integration conflict remains. The original Part II author made exactly the two requested repairs.

1. **Arithmetic test maps:** all 46 occurrences of `\Gamma` in Part II were replaced by `\mathcal G`, preserving their indices. No `\Gamma` occurrence remains in Part II. Its test maps now agree with Part I's proposed `\mathcal G_S`, while Part I retains `\Gamma_S` for the semilocal unit group. The Part II contract explicitly records both meanings and ownership boundaries.

2. **Restricted Hilbert carriers:** Part II lines 600 to 601 now explicitly introduce `\mathcal H_S=(H,q_S)` and use it as the target of `V_S`. The local compression pair `H_0,H_1` is unchanged. Its contract records this distinction from Part I's full ambient `H_S=L^2(Y_S)^{K_S}`. Neither `\mathcal B_\lambda` nor the geometric sectors `P_S` are repurposed.

The preserved pre-integration Part II source hashes to `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4`. Its complete diff against the corrected source contains only the test-map substitutions and the two-line restricted-carrier introduction. Independently reversing exactly those edits reproduces that same old SHA-256. Thus no theorem, hypothesis, proof, sign, support condition, citation, label or Lean-scope claim changed.

The current compiled PDF in `papers/latex/` and the publication copy in `papers/pdf/` are byte-identical at the PDF hash above. Both are newer than the corrected source. The current compilation log records 21 pages and 419705 bytes, matching `pdfinfo`, with no TeX errors, undefined references, multiply-defined labels, overfull boxes or underfull boxes. Text extracted from this actual PDF includes the corrected G test maps in the compression and primitive-extension sections and the newly explicit `H_S=(H,q_S)` carrier introduction; its source uses the intended calligraphic symbols. The fresh auxiliary file is byte-identical to round 1. This verifies the current source/PDF/numbering connection independently of the author's receipt.

Before this gate closed, the author completed the raster/cover inspection and refreshed `research/polarization-obstructions-verification.json` and the contract's delivery footer. Their recorded source, auxiliary and PDF hashes match the actual current files. The receipt reports inspection of all affected rendered pages, 6, 7, 8, 13, 14 and 19, with no clipping or overlap. The regenerated cover's actual SHA-256 is `0bd517c3183cbb0d579d3bfc7f7f16995e89303de15d360cece201495228ada6`, matching the receipt and its previously verified cover. The integration reviewer checked this evidence and the PDF text; the affected-page visual inspection is the author's recorded inspection, not a new visual inspection by this reviewer. No administrative refresh remains pending for these repairs. No fourth external Codex call was made or claimed; the prior final review covered the exact source recovered by reversing the two notation repairs.

## Cross-reference audit

Every explicit numbered cross-Part citation matches the current auxiliary files and the actual source statement.

| Citing location | Cited item | Verified target label and number |
|---|---|---|
| Part I, line 646 | Part II, Theorem 3.4 | `thm:polarization-obstructions:entire`, 3.4 |
| Part I, lines 853 to 854 | Part II, Theorem 6.3 | `thm:polarization-obstructions:signs`, 6.3 |
| Part I, line 1438 | Part II, Theorems 3.4 and 9.2 | `thm:polarization-obstructions:entire`, 3.4; `thm:polarization-obstructions:extension`, 9.2 |
| Part II, line 137 | Part I, Definition 2.1 | `def:local-correspondence:test-algebra`, 2.1 |
| Part II, line 145 | Part I, Definition 3.1 | `def:local-correspondence:weil`, 3.1 |
| Part II, lines 176 to 178 | Part I, Section 8, equations (46) and (47) | Section 8, The common entire carrier; `eq:carrier-norm`, 46; `eq:weight-relation`, 47 |
| Part II, line 1147 | Part I, Definition 12.1 | `def:local-correspondence:support`, 12.1 |
| Part II, line 1439 | Part I, Proposition 14.1 | `prop:corrected-chain-map`, 14.1 |
| Part II, line 1450 | Part I, Section 15 | Section 15, Two-prime chain compatibility; its actual square is `prop:chain-square`, Proposition 15.1 |
| Part II, lines 1458 to 1459 | Part I, Proposition 14.2 | `prop:chain-Fourier-defect`, 14.2 |
| Part II, line 1462 | Part I, equation (92) | `eq:degree-n-Fourier`, 92 |

The unnumbered companion references were also checked. Part I's introduction points to the normalization and orthogonal-extension results actually present in Part II. Part II's introduction points to Part I's local analytic identities (Sections 6 to 10, including Propositions 7.1 and 7.2 and Theorem 10.1). Part II's Fourier-intertwining discussion points to Part I Section 5 and its attributed Sonin theorem. The statement that `omega_p-1` is Part I's `d_p` matches Part I equation (43). The companion bibliography titles match their actual title blocks. Title/subject uses of “Part I” and “Part II” are identifiers rather than mathematical references.

Mechanical checks found 119 distinct Part I labels and 81 distinct Part II labels, no duplicate labels, no unresolved local references, no contracted labels missing from their owner's source, and no source labels missing from the corresponding auxiliary file. The current logs contain no undefined-reference, multiply-defined-label or TeX-error matches.

## Ownership and mathematical consistency

Part I owns the complex test algebra, convolution/involution, centered Laplace/Fourier convention, complete Weil distribution, shell vector, theta/eta transitions, logarithmic local operator, support indexing and corrected algebraic Hochschild maps. Part II's Section 2 is an explicitly attributed recall of the test conventions, local distribution, moment kernel and carrier norms. Its formulas agree with the owner and are not competing definitions. Part II Proposition 10.1 repeats the locality consequence of the imported support condition; it agrees with Part I Proposition 12.2 and does not introduce a different support object or stronger scope.

The notation already repaired before this gate is consistent: Part I's `d_p` is the scalar raw defect and `D_p` its operator; Part II's `omega_p` is the full positive weight and `Delta_p` the entire Euler denominator. The relation is `omega_p=1+d_p`, not `omega_p=d_p`. Part II owns the new entire obstruction, compressed normalization analysis, pole-killed sign constructions, orthogonal-extension ansatz and its obstruction. The shared proposed primitive sectors and pairings are hypotheses, not constructions of an existing arithmetic polarization.

Both papers use Hermitian forms linear in the first variable, `W=P-A-sum_p W_p`, and the intended comparison `B_W=-I`. The finite Weil increment is `-W_p`; the target intersection increment is therefore `+W_p`. The local prime powers retain every positive k permitted by support and coefficient `(log p)p^(-k/2)`. The three- and four-bump witnesses in Part II agree with Part I's Toeplitz formula, including the positive factor `L ||psi||_2^2` and the exact prime-11 values.

The support restriction is stated consistently. A test correlation from radius a is supported in `[-2a,2a]`; support-admissible stages contain all primes at most `exp(2a)`. A newly adjoined prime outside such a stage has zero local increment on the old tests. The centered positive prime-11 witness needs `a=3 log(11)/2+epsilon`; a stage complete for this support already contains 11. The orthogonal-extension obstruction therefore applies to the stronger sign requirement on an intermediate transition, and neither paper uses it to exclude sign imposed only at support-complete stages.

The positive entire-normalization obstruction excludes the pointwise positive polar factor, not an arbitrary phase or the intrinsic compressed polar map. Both papers preserve this distinction. Part II's compression calculations do not assert that the actual compressed Sonin operators commute. The Hochschild square is algebraic and uncompleted; the higher-degree componentwise Fourier discrepancy is negative for every n at least 1. Neither paper treats it as a formalized geometric duality or a pairing theorem.

## Lean scope

All five Lean modules were read alongside the manuscript scope sections. Every file in `research/lean-source-sha256.txt` passes its current hash check. The stored build receipt reports a successful build with Lean `v4.30.0-rc2` and mathlib commit `0f9072dd907c6e2e4264ab241a049cab50137f7c`. The stored axiom audit has 46 theorem entries and only `propext`, `Classical.choice`, and `Quot.sound`. This gate checked source and receipts; it did not rerun Lean.

The claimed scope matches the declarations: scalar local weights and finite support sums; real finite coefficient signs and the four exact moment identities at 11; translated-profile identities under an explicit sampling premise; the actual Euler denominator's simple zero and entire squared-identity obstruction; and complex shell-coefficient nonidempotence/nonmultiplicativity. `APC.eulerDenominator` is Part II's `Delta_p`. The internal `research/lean-results.md` note now also uses `Delta_p`; neither it nor either public manuscript identifies the denominator with Part I's metric-defect operator.

The papers correctly retain the smooth autocorrelation and Laplace-moment bridge, the almost-everywhere boundary passage, operator logarithms, p-adic Sonin uniqueness/Fourier invariance, crossed products, Hochschild maps, all-prime packet formula, compressed operators and geometric extension obstruction as paper arguments rather than Lean results. Neither paper or contract claims a Lean proof of RH, global Weil positivity or a constructed primitive geometric pairing.

## Publication dependency carried forward

The bibliography check's pending verification of actual public companion-source availability remains a release prerequisite. It is not evidence that the source is already publicly accessible. The corrected Part II rendered-inspection and administrative-receipt refresh are complete as described above. This integration gate made no manuscript, contract, network, deployment, reviewer-service, external messaging, commit or context-repository changes. Both mathematical interfaces are integrated on the exact snapshot recorded above.

(polarization-obstructions, arithmetic test-map notation, RESOLVED: all 46 Gamma test-map occurrences are mathcal G and the contract preserves Part I Gamma_S for its unit group.)

(polarization-obstructions, restricted Hilbert-carrier notation, RESOLVED: mathcal H_S=(H,q_S) is explicit in the source and contract while Part I H_S retains its ambient meaning.)

VERDICT: INTEGRATED
