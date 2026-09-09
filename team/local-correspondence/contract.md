# Contract: local-correspondence (Part I)

## Defines

- Full complex test algebra and Fourier/Mellin conventions: `def:local-correspondence:test-algebra`.
- Completed Weil distribution and finite local terms: `def:local-correspondence:weil`.
- Shell function sigma_p and semilocal theta transition: `def:local-correspondence:shell`, `def:local-correspondence:theta`.
- Ambient log-coordinate operator and bounded inverse: `thm:local-correspondence:inverse`.
- Mixed theta/eta pairing and one-prime norm defect: `prop:local-correspondence:mixed`, `prop:local-correspondence:defect`.
- Analytic two-prime square and mixed norm correction: `prop:local-correspondence:square`.
- Operator logarithmic derivative and local arithmetic distribution: `thm:local-correspondence:logarithmic`.
- Support-admissible test/place pairs: `def:local-correspondence:support`, `prop:local-correspondence:support`.
- Nonmultiplicativity of the shell tensor map on the algebraic crossed product: `thm:local-correspondence:tensor-obstruction`.
- Corrected signed Hochschild chain map from shell embeddings: `prop:corrected-chain-map`; its two-prime chain square: `prop:chain-square`; failure of componentwise Fourier symmetry: `prop:chain-Fourier-defect` and `eq:degree-n-Fourier`.

## Imports

- Entire-carrier obstruction to ambient polar normalization: Part II, polarization-obstructions.
- Pole-killed positive and negative local witnesses and orthogonal-extension obstruction: Part II, polarization-obstructions.
- Lean shell-coefficient and local-weight definitions and verification scope from the separate formalization worker, with exact module names, declarations, toolchain, dependency pin and hash-manifest pointers in Section 19. The paper does not claim formalization of the analytic theorems.

## Notation

- T = C_c^infinity(R,C), star denotes conjugate reflection, F_f(z) = integral f(x) exp(zx) dx, Fourier f(t) = F_f(-it).
- W = P - A - sum_p W_p; the intended intersection increment is +W_p.
- L = log p, r = p^(-1/2), T_L u(x) = u(x-L), A_p = I-r T_L.
- S is a finite place set containing infinity; S_f denotes its finite primes.
- q_S is the inherited positive analytic norm; I_S denotes a proposed geometric primitive pairing and is never identified with q_S by definition.

## Cross-references I will make

- Part II's ambient polar obstruction and local-sign obstruction, using exact numbered results after its draft exists.
- The synthesis for the completed arithmetic construction problem.

## Scope

Part I proves and explains local harmonic analysis, operator logarithmic variation, and precise arithmetic support. It does not construct a primitive geometric pairing or establish Weil positivity. Haskell is disabled. The main geometric candidate-specific obstructions belong to Part II.

## Final interface verification

The final 20-page source preserves common-carrier equations 46 and 47, corrected-chain Proposition 14.1, Fourier-defect Proposition 14.2, chain-square Proposition 15.1 and the general Fourier-failure equation 92. Part II uses omega_p for its full positive weight and Delta_p for its entire denominator, reserving d_p and D_p for Part I's raw metric defect. AGY round 1 minor revisions were addressed; Codex formatting round 3 passed. Final artifacts and hashes are recorded in `reviews/local-correspondence-verification.json`.
