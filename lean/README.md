# Lean arithmetic results

The `APC` library proves arithmetic identities and obstructions for local
Euler factors. It includes exact opposite-sign coefficient vectors at the
prime 11 and the entire-function square obstruction for the Euler denominator.
See [the proof scope](../research/lean-results.md) for the relation to the papers.

Install [elan](https://github.com/leanprover/elan), then run:

```sh
cd lean
lake exe cache get
lake build
lake env lean ../scripts/audit-lean.lean
```

The toolchain is Lean `v4.30.0-rc2`. Both the Lake configuration and manifest
pin mathlib to `0f9072dd907c6e2e4264ab241a049cab50137f7c`.
The project requires no path to another local repository. `.lake/` is an
untracked build cache.

The axiom audit lists every explicit project theorem. Its only permitted
dependencies are Lean's standard `propext`, `Classical.choice`, and `Quot.sound`.
There are no project axioms or admitted proofs. The files do not prove Weil
positivity or the Riemann Hypothesis.
