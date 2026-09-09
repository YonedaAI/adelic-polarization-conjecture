# Adelic Polarization Conjecture

Research papers and Lean proofs on prime-adjoining adelic correspondences and the arithmetic polarization problem.

[Read the papers on the website](https://adelic-polarization-conjecture.vercel.app)

The papers test concrete ways of transporting analytic and geometric pairings between semilocal adelic spaces. The local constructions yield arithmetic identities and several candidate-specific obstructions. They do not construct a global adelic polarization or prove the Riemann Hypothesis.

## Papers

| Paper | Subject | Files |
|---|---|---|
| Prime-Adjoining Correspondences | Sonin transitions, local logarithmic variation, and signed Hochschild chain maps | [PDF](papers/pdf/local-correspondence.pdf), [LaTeX](papers/latex/local-correspondence.tex) |
| Obstructions to Adelic Polarization | Entire normalization, pole-killed local sign witnesses, and primitive extensions | [PDF](papers/pdf/polarization-obstructions.pdf), [LaTeX](papers/latex/polarization-obstructions.tex) |
| Adelic Polarization Conjecture | A restriction cone, a transient relative class, and the support-indexed construction problem | [PDF](papers/pdf/synthesis.pdf), [LaTeX](papers/latex/synthesis.tex) |

Matthew Long, The YonedaAI Collaboration, YonedaAI Research Collective. September 2026.

## Mathematical scope

The full Weil distribution has convention `W = P - A - sum_p W_p`. An intersection realization with `B_W = -I` therefore has local increment `+W_p`. The sign is not the sign of the inherited positive Sonin norm.

The research distinguishes the following constructions and obstructions:

- The Sonin shell coefficient is not idempotent, so its tensor map is not an algebra homomorphism. A signed sum of shell-induced Hochschild chain maps repairs the chain identity, but not higher-degree componentwise Fourier symmetry.
- Positive pointwise normalization by the Euler modulus does not preserve nonzero entire functions. This does not exclude intrinsic polar decomposition in the compressed Sonin Hilbert space.
- Local prime-power terms take both signs even on smooth tests whose two pole moments vanish. An orthogonal nonpositive added sector cannot realize every nontrivial local increment.
- Support-complete transitions are different: a newly adjoined prime beyond the test's support contributes zero. The local sign obstruction does not refute the support-indexed polarization conjecture.
- The algebraic restriction cone has nonzero relative homology at every finite stage. However, its explicit compact-bump origin class becomes an actual boundary after either shell embedding, hence after every signed one-prime transition. It cannot witness a stable primitive space. This does not show that all cone classes vanish.

The [research loop](research/loop.md) records attempted constructions and their reformulations. The [source ledger](research/literature-ledger.md) and [source index](sources/README.md) locate the primary literature and distinguish established results from proposed extensions.

The next proof gate is to exhibit a different family of classes that survives the transitions and accepts a nontrivial test-function map. No primitive pairing or proof of its required sign has been obtained. Further formalization of local identities would not close that gap.

A separate [proof-only follow-up](research/cokernel-survival-attempt.md) tests the simplest logarithmic class from the target-homology cokernel: it is nonzero initially but also dies after one prime. This note is outside the manuscripts' external reviews and the Lean library.

## Lean code

The [APC library](lean/) formalizes scalar Euler weights, exact local sign calculations at the prime 11, finite translated-profile distributions, shell nonmultiplicativity, and the entire Euler denominator's square obstruction. The [scope report](research/lean-results.md) states the analytic and geometric steps that remain outside Lean.

```sh
cd lean
lake exe cache get
lake build
lake env lean ../scripts/audit-lean.lean
```

Lean and mathlib revisions are pinned. The [theorem inventory](research/lean-theorems.json) and [axiom audit](research/lean-axioms.txt) cover every explicit project theorem. No Haskell code is used.

## Rebuild the papers and website

The papers require a standard TeX Live installation. From `papers/latex`, run `pdflatex -interaction=nonstopmode -halt-on-error PAPER.tex` twice for each paper, then copy the resulting PDF into `papers/pdf`. Preserve the fresh `.aux` files until the HTML conversion has read their cross-reference numbers.

The website requires Node.js 24, Pandoc, Poppler (`pdfinfo`), and ImageMagick. It renders mathematics at build time with KaTeX. Article pages contain complete static HTML and do not depend on client-side hydration to show formulas.

```sh
cd website
npm ci
# Set NEXT_PUBLIC_SITE_URL to the intended HTTPS production origin.
npm run build
node scripts/verify-export.mjs
node scripts/test-math-preservation.mjs local-correspondence polarization-obstructions synthesis
node scripts/test-conjecture-preservation.mjs
node scripts/test-article-preview.mjs
```

The converter checks source and output formula inventories, equation and theorem numbers, citations, and anchors. Generated paper HTML is also retained in `docs/papers/`.

Bundled mathematical fonts and styles retain their [third-party notices](research/third-party-notices.md).

Review reports and reproducibility evidence are kept in [reviews](reviews/) and [research](research/). User-supplied conversation exports and dependency caches remain local and are not published.
