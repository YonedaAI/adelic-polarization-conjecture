# Integration review, round 1

Reviewed at 2026-09-09T03:18:21Z. This is an independent integration gate before synthesis. Both final manuscripts, both contracts, the complete team board, the team protocol and `research/bibliography-check.md` were read. The review checks ownership, notation, numbered imports, signs, support scope and the correspondence between manuscript claims and Lean statements. It does not replace the upstream external mathematical and formatting reviews or a publication check.

## Exact snapshot

| Input | SHA-256 |
|---|---|
| `papers/latex/local-correspondence.tex` | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| `papers/latex/polarization-obstructions.tex` | `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4` |
| `papers/latex/local-correspondence.aux` | `f7b2ca2c04e09073b025b98cbec32dab2dd2bb239ba50a2f623535408e26b08b` |
| `papers/latex/polarization-obstructions.aux` | `b31155ecb515920c23c68b7c3dd1219192230bef548e0f61012ddde6aae4f382` |
| `research/lean-source-sha256.txt` | `d714df4f2e137f5a3dfa0344b488fd46e3bae83680ee7188d41afc231255ba2c` |

Both auxiliary files are newer than their corresponding sources. Part I's current verification receipt records the same source and auxiliary hashes, and identifies the sole change after its final external formatting review: the CCMar locator changed from Section 4.1 to Section 4, equations (4.3) to (4.6). Its two subsequent compiles preserve the numbered results. The older Part I hash on the append-only board is historical, not the snapshot reviewed here.

## Required corrections

Two notation conflicts remain. Both are in Part II; neither requires a mathematical change.

1. **The arithmetic test map collides with the semilocal unit group.** Part I defines `\Gamma_S` as the group of signed products of the finite primes in S at source line 388, equation (25), and uses that group throughout the crossed-product and chain constructions. Part I uses `\mathcal G_S` for the proposed arithmetic test map at line 1403. Part II instead uses `\Gamma_S` and its variants for the proposed test maps at lines 466 to 497, 1022 to 1108, and 1499 to 1541. Its contract adopts the conflicting notation. This is both one symbol with two incompatible types and two symbols for the shared proposed test correspondence. Replace **every** `\Gamma` in Part II by `\mathcal G`, retaining its existing indices, and update the contract. Every occurrence of `\Gamma` in Part II was inspected: all denote test maps; none denotes the semilocal unit group. The replacement therefore applies to `\Gamma_0`, `\Gamma_1`, `\Gamma_S`, `\Gamma_T`, `\Gamma_{S,a}`, `\Gamma_{T,b}`, and the unindexed `\Gamma` in the global target.

2. **The restricted Hilbert carrier collides with the ambient semilocal Hilbert space.** Part I defines `H_S=L^2(Y_S)^{K_S}` at source line 393 and uses it as the full ambient realization. Part II line 600 uses `H_S` for the common closed carrier equipped with the norm `q_S`; its contract explicitly gives that different meaning. The distinction matters because Part II's compression argument depends on restricting to a closed subspace of an ambient space. In Part II's coherence paragraph, explicitly write `\mathcal H_S=(H,q_S)` and change the target of `V_S` to `\mathcal H_S`. Keep the already defined base `H_0` and local pair `H_0,H_1` in the compression argument. Update the Part II contract accordingly. `\mathcal H_S` is currently unused in either manuscript, does not collide with `\mathcal B_\lambda`, and leaves `P_S` for the geometric primitive sector.

After these substitutions, regenerate Part II's PDF and auxiliary file, verify that equation and theorem numbers are unchanged, refresh its exact-source receipt, and return the new source hash for the second integration gate. The integration reviewer has not edited either manuscript or either contract.

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
| Part II, line 1146 | Part I, Definition 12.1 | `def:local-correspondence:support`, 12.1 |
| Part II, line 1438 | Part I, Proposition 14.1 | `prop:corrected-chain-map`, 14.1 |
| Part II, line 1449 | Part I, Section 15 | Section 15, Two-prime chain compatibility; its actual square is `prop:chain-square`, Proposition 15.1 |
| Part II, lines 1457 to 1458 | Part I, Proposition 14.2 | `prop:chain-Fourier-defect`, 14.2 |
| Part II, line 1461 | Part I, equation (92) | `eq:degree-n-Fourier`, 92 |

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

The claimed scope matches the declarations: scalar local weights and finite support sums; real finite coefficient signs and the four exact moment identities at 11; translated-profile identities under an explicit sampling premise; the actual Euler denominator's simple zero and entire squared-identity obstruction; and complex shell-coefficient nonidempotence/nonmultiplicativity. `APC.eulerDenominator` is Part II's `Delta_p`, irrespective of the older explanatory `D_p` notation in the internal Lean results note. No public manuscript identifies it with Part I's metric-defect operator.

The papers correctly retain the smooth autocorrelation and Laplace-moment bridge, the almost-everywhere boundary passage, operator logarithms, p-adic Sonin uniqueness/Fourier invariance, crossed products, Hochschild maps, all-prime packet formula, compressed operators and geometric extension obstruction as paper arguments rather than Lean results. Neither paper or contract claims a Lean proof of RH, global Weil positivity or a constructed primitive geometric pairing.

## Publication dependency carried forward

The bibliography check's pending verification of actual public companion-source availability remains a release prerequisite. It is not evidence that the source is already publicly accessible. This integration gate made no network, deployment, reviewer-service, external messaging, commit or context-repository changes. No new mathematical incompatibility was found beyond the two notation conflicts listed above.

(polarization-obstructions, arithmetic test-map notation, Replace all test-map Gamma variants by mathcal G and update the contract; preserve Part I Gamma_S for the semilocal unit group.)

(polarization-obstructions, restricted Hilbert-carrier notation, Introduce mathcal H_S=(H,q_S) in the coherence paragraph and contract; preserve Part I H_S for the full ambient semilocal Hilbert realization.)

VERDICT: CONFLICTS
