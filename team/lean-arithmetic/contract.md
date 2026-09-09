# Lean arithmetic interface

The formal project uses namespace `APC`, Lean `v4.30.0-rc2`, and mathlib commit
`0f9072dd907c6e2e4264ab241a049cab50137f7c`. Its git dependency is reproducible.
The temporary local package cache is a private APFS clone, so compilation does
not write into either context repository.

`APC.LocalFactor` owns the actual scalar Euler weight and its norm defect,
sharp bounds, von Mangoldt coefficients, and the finite prime-power
distribution. `APC.LocalSigns` owns the finite off-diagonal Toeplitz sum and
exact coefficient witnesses at 11. `APC.LatticeDistribution` owns discrete
correlations, translated profiles, their prime-power sum, and cutoff
stability. `APC.EntireObstruction` proves the analytic-order obstruction for
the actual entire Euler denominator. `APC.SoninShell` proves the complex
shell-coefficient idempotence and scalar-tensor multiplicativity obstructions.

All 46 explicit theorem declarations compiled successfully. Each axiom list
contains only `propext`, `Classical.choice`, and `Quot.sound`. The complete
name inventory is `research/lean-theorems.json`; scope and reproduction are
in `research/lean-results.md` and `lean/README.md`. The raw tracked evidence
is `research/lean-build.txt` and `research/lean-axioms.txt`. Source hashes are
in `research/lean-source-sha256.txt` (manifest SHA256
`d714df4f2e137f5a3dfa0344b488fd46e3bae83680ee7188d41afc231255ba2c`).

Part I's `thm:local-correspondence:tensor-obstruction` may cite
`APC.soninShell_no_nonzero_scalar_idempotent` and
`APC.soninShell_tensor_not_multiplicative` only for the shell algebraic core.
The exact prime-11 values are `APC.minus_exact`, `APC.plus_exact`,
`APC.minus_negative`, and `APC.plus_positive`; four `*_moment_*` theorems
prove both polynomial roots. `APC.translated_minus_exact` and
`APC.translated_plus_exact` connect the values to the actual finite local
distribution under the explicit base-profile condition.

`APC.eulerDenominator_no_entire_square` proves that no nonzero entire
complex functions satisfy `D_p G^2 = F^2` for natural `p > 1`. The simple
zero and derivative of the actual exponential Euler denominator are proved.
This theorem has no assumed analytic-order premise.

The smooth-bump construction, autocorrelation integral, pole-moment Laplace
transform, Fourier-inversion formula, critical-line boundary continuation,
p-adic Fourier transform, crossed products, and Hilbert-space polar
decomposition remain paper arguments. No result proves Weil positivity or
the proposed adelic polarization.

External Codex review passed in round 1 after an independent build and axiom
audit. It found no blocking issues and one optional redundant-hypothesis
strengthening. The theorem keeps the stated pair of nonzero entire functions.
Canonical review: `reviews/lean-codex-review.md`. Source hashes are unchanged
since the successful independent review.

Haskell is OFF. This worker creates no `src/` directory and sends no Slack
messages. Root maintains the shared board and publication actions.
