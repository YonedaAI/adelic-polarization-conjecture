# Lean arithmetic results

The `APC` library contains 46 explicit theorem declarations in five modules.
`lake build` completed successfully with Lean `v4.30.0-rc2` and mathlib commit
`0f9072dd907c6e2e4264ab241a049cab50137f7c`. The complete axiom audit reports only
`propext`, `Classical.choice`, and `Quot.sound` for every theorem. No theorem
depends on a project axiom or an admitted proof.

The following statements describe the compiled files. They distinguish
arithmetic proofs from the analytic and geometric constructions that the
papers discuss.

## Euler factor and finite local distribution

`APC/LocalFactor.lean` defines `primeRadius p = 1 / sqrt p`, a complex
`localMultiplier`, its squared norm `localWeight`, and the finite real local
prime-power distribution `localPrimePowerSum`.

`localMultiplier_exp` identifies the multiplier with
`1 - p^(-1/2) exp(-i t log p)`. `primeRadius_sq`, `localWeight_formula`, and
`localWeight_defect` prove the exact squared norm and its difference from 1.
For every natural number `p > 1`, `localWeight_lower` and `localWeight_upper`
prove the sharp bounds `(1-r)^2` and `(1+r)^2`. `localWeight_at_zero` and
`localWeight_at_pi_div_log` prove that the two bounds are attained.
`localWeight_defect_negative` and `localWeight_defect_positive` give strict
opposite signs at those frequencies.

`primePowerCoefficient_vonMangoldt` identifies the coefficient at `k log p`
with `vonMangoldt (p^k) * r^k` for an actual prime `p` and `k != 0`.
`primePowerCoefficient_pos` proves coefficient positivity.
`localPrimePowerSum_add` proves additivity on real test functions.
`localPrimePowerSum_eq_zero_of_support` proves that every finite cutoff is
zero when the test vanishes outside an absolute support radius less than
`log p`. The sums use positive powers `k+1`; no artificial contribution at
the zero power is present.

These are scalar and finite-distribution results. The files do not construct
the bounded translation operator on L2, prove its inverse series, or establish
the Fourier-inversion formula for the logarithmic derivative.

## Exact signs at the prime 11

`APC/LocalSigns.lean` defines the actual finite sum

\[
Q_r(c)=\sum_{i,j}\mathbf1_{i\ne j}c_ic_jr^{|i-j|}
\]

using `Fin n` indices and natural-number distance. It also defines the actual
coefficient polynomial value `sum_i c_i z^i`. The vectors are

\[
c_-=(1,-12/\sqrt{11},1),\qquad
c_+=(1,1-12/\sqrt{11},1-12/\sqrt{11},1).
\]

`eleven_prime` proves primality. `minus_exact` and `plus_exact` prove

\[
Q_{1/\sqrt{11}}(c_-)=-46/11,\qquad
Q_{1/\sqrt{11}}(c_+)=(28\sqrt{11}-92)/11.
\]

`minus_negative` and `plus_positive` prove the strict signs. The four
`minus_moment_radius`, `minus_moment_inverse`, `plus_moment_radius`, and
`plus_moment_inverse` theorems prove that both coefficient polynomials vanish
at `r` and `r^-1`. The moment equalities are conclusions of the proofs, not
premises.

## Translation profiles and cutoff stability

`APC/LatticeDistribution.lean` defines the finite discrete correlation, its
prime-power sum, and

\[
H_c(x)=\sum_{i,j}c_ic_jH(x-(i-j)\log p).
\]

`translatedCorrelation_sample` proves that the values of this translated
profile on the prime lattice are `A` times the discrete coefficient
correlation, provided `H(k log p)` is `A` at `k=0` and zero at every other
integer `k`. `lattice_profile_of_support` derives that premise from
`H(0)=A` and the explicit condition `H(x)=0` whenever `log p <= |x|`.
`localPrimePowerSum_translated` then proves the identity with the actual
finite local distribution.

`discreteCorrelation_eq_zero_of_ge` proves the support bound `|k| < n` for
a vector of length `n`. `localLatticeSum_stable` proves that every cutoff
`N >= n` gives the same prime-power sum. `localLatticeSum_three` and
`localLatticeSum_four` identify the sums with `log p * Q_r(c)` for arbitrary
real coefficient vectors of those lengths. `translated_minus_exact` and
`translated_plus_exact` give the resulting exact values `log 11 * A * Q`
for the two chosen vectors.

The remaining smooth-test bridge is not formalized. In the paper, `H` is the
autocorrelation of a nonzero smooth bump whose support has width less than
`log p`; then `A` is its positive squared L2 norm. The Lean files do not define
this bump, its convolution integral, or its Laplace transform. They therefore
do not by themselves prove existence of smooth pole-killing tests with both
local signs. They prove the exact coefficient identities and the finite
distribution calculation under the stated, explicit profile condition.

## Entire Euler denominator

`APC/EntireObstruction.lean` defines the complex function

\[
\Delta_p(z)=(1-\exp(-\log p\,z))(1-\exp(\log p\,(z-1))).
\]

`eulerDenominator_analytic` proves analyticity at every complex point.
`eulerDenominator_zero` and `eulerDenominator_hasDerivAt_zero` prove
`Delta_p(0)=0` and `Delta_p'(0)=log p * (1-p^-1)`. For `p > 1`, the derivative is
nonzero, and `eulerDenominator_order_one` proves that the analytic order at
zero is exactly 1.

`eulerDenominator_no_local_square` rules out an identity `Delta_p G^2 = F^2` in
a neighborhood of zero when `F` and `G` are analytic there and have finite
orders. `eulerDenominator_no_entire_square` removes the order premises: for
nonzero functions analytic at every complex point, mathlib's identity theorem
implies finite orders, and parity gives the contradiction. Thus the final
entire theorem concerns the actual Euler denominator, not an arbitrary
function whose simple zero has been assumed.

The passage from an almost-everywhere critical-line relation
`G = F / abs(1-p^-z)` to the entire identity `Delta_p G^2 = F^2` is a paper proof.
Lean does not formalize that boundary passage, the weighted Hilbert spaces,
or their intrinsic polar decomposition. The entire theorem excludes the
squared identity; the paper supplies its application to pointwise ambient
normalization.

## Sonin shell coefficients

`APC/SoninShell.lean` defines a complex-valued function of the integer shell
index. Its values are 1 on shell 0, `-1/p` on shell 1, and zero elsewhere.
For every `p > 1`, `soninShell_no_nonzero_scalar_idempotent` proves that no
nonzero complex scalar multiple is pointwise idempotent.
`soninShell_tensor_not_multiplicative` proves that the corresponding map
from complex scalars to shell functions is not multiplicative.

This is the shell-coefficient algebraic core of Part I's
`thm:local-correspondence:tensor-obstruction`. The formalization does not
construct p-adic functions, prove Sonin uniqueness or Fourier invariance,
define crossed products, or construct Hochschild chain maps.

## Reproduction and evidence

Run the commands in `lean/README.md`. The Lake manifest pins every dependency;
the project contains no dependency requiring an absolute local path. This run
used a private APFS clone of the existing package cache. Both context
repositories remained read-only.

`research/lean-theorems.json` records all 46 explicit theorem declarations.
`scripts/audit-lean.lean` contains a matching `#print axioms` command for each
one. `research/lean-build.txt` and `research/lean-axioms.txt` preserve the
successful build and complete axiom output. `research/lean-verification.json`
records the matching declaration, command, and output counts.
`research/lean-source-sha256.txt` hashes every Lean source, the dependency
configuration, and the audit file. The SHA256 of that hash manifest is
`d714df4f2e137f5a3dfa0344b488fd46e3bae83680ee7188d41afc231255ba2c`.

External Codex review completed in one round with `VERDICT: PASS`. The
reviewer independently rebuilt the project and reran all 46 axiom checks.
It found no blocking issues and one optional strengthening: in the entire
theorem, nonzero `F` together with the proposed identity already implies
nonzero `G`. The theorem retains both hypotheses because its stated scope is
a pair of nonzero entire functions; the redundancy does not weaken that
claim. The review and receipt are `reviews/lean-codex-review-round-1.md` and
`reviews/lean-codex-review-round-1.receipt.json`, with canonical copies
`reviews/lean-codex-review.md` and `reviews/lean-codex-review.receipt.json`.

No file proves global Weil positivity, constructs the proposed adelic
polarization, or proves the Riemann Hypothesis. No Haskell files were created.
