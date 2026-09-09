# Contract: polarization-obstructions (Part II)

## Defines

- Entire Euler denominator: `Delta_p(z)=(1-p^{-z})(1-p^{z-1})`, label `def:polarization-obstructions:discriminant` (internal label retained).
- Ambient normalization obstruction: no nonzero entire functions have boundary quotient by the positive Euler modulus, label `thm:polarization-obstructions:entire`.
- Intrinsic compressed metric operator and its polar isometry, label `prop:polarization-obstructions:compression`.
- Disjoint bump realization of local Toeplitz forms, label `prop:polarization-obstructions:bumps`.
- Exact opposite signs for the arithmetic prime 11 on tests with both pole moments zero, label `thm:polarization-obstructions:signs`.
- Exact long-packet formula and local signs at every prime, labels `prop:packet-formula` and `cor:all-prime-signs`.
- Constrained four-bump signature and smallest-prime threshold within that family, labels `prop:four-bump-signature` and `cor:smallest-prime`.
- Orthogonal nonpositive extension ansatz and its candidate-specific obstruction, labels `def:polarization-obstructions:extension` and `thm:polarization-obstructions:extension`.
- Support-indexed locality statement, label `prop:polarization-obstructions:locality`.
- Corrected transition defect with mixed and correction terms, label `prop:polarization-obstructions:mixed`.

## Imports

- Complex test algebra, convolution, involution, centered Laplace transform, local Weil distributions and the full Weil sign convention: Part I (local-correspondence).
- Shell-based Sonin transitions, common entire carrier and its weighted Hilbert norms: Part I (local-correspondence), citing Connes, Consani and Moscovici.
- Local logarithmic variation and finite-prime analytic compatibility: Part I (local-correspondence).

## Notation

- `L=log p`, `r=p^{-1/2}` and `a_r=r+r^{-1}`.
- `omega_p(t)=|1-r exp(-itL)|²` is the full positive local weight; `omega_p-1` is Part I's defect `d_p`. `Delta_p` avoids conflict with Part I's defect operator `D_p`. The phase of an arbitrary ambient isometry is `chi(t)`.
- `mathcal B_lambda` denotes the published common entire Sonin carrier; `mathcal H_S=(H,q_S)` is its closed Hilbert realization with norm `q_S`. Part I retains `H_S` for the full ambient semilocal Hilbert space. The local compression pair remains `H_0,H_1`.
- `P` is the ambient Hilbert orthogonal projection in the compression calculation; `P_S` and `P_{S,a}` denote hypothetical geometric primitive vector spaces in the extension sections.
- `I_S` is a hypothetical Hermitian geometric pairing, linear in its first variable.
- `mathcal G_S` is a hypothetical arithmetic test map, matching Part I. Part I retains `Gamma_S` for the semilocal unit group.
- `Q_r(c)=sum_{i ne j}c_i conjugate(c_j)r^{|i-j|}`.

## Cross-references I will make

- Part I, test algebra and Weil sign convention.
- Part I, shell transitions and weighted entire carrier.
- Part I, logarithmic variation and support admissibility.
- Part I, corrected algebraic Hochschild map and higher-degree local Fourier discrepancy.

## Scope

The ambient entire obstruction does not exclude intrinsic compressed polar decomposition. The orthogonal extension obstruction assumes sign on a nontrivial intermediate prime transition; it does not contradict sign imposed only on support-complete stages. Neither result proves RH or rules out general arithmetic polarization. Haskell is disabled. Actual Lean source, the final build report, theorem inventory and axiom evidence were inspected: the paper reports finite coefficient/profile identities and the entire squared-identity obstruction, while retaining the boundary passage and smooth bump bridge as paper proofs.

## Final delivery

The current source is frozen at SHA256 `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee`. The 21-page publication PDF, 300 dpi cover, fresh aux/log, source ledger and full external review history are complete. AGY mathematical review minor revisions are resolved; Codex formatting round 3 was PASS on the preceding source `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4`. The only subsequent manuscript edits implement the independent integration review's two notation corrections recorded above. The earlier source, aux, PDF and receipt are preserved in `pre-integration/`. Two fresh compiles, inspection of every affected page and a byte-identical aux verify the correction without a fourth formatting invocation. Main references remain Theorems 3.4, 6.3 and 9.2 and Proposition 10.1. The coordinator owns the second independent integration gate.
