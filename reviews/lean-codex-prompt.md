Review only the Lean proof project and its stated coverage. Files in scope:
lean/APC.lean, lean/APC/LocalFactor.lean, lean/APC/LocalSigns.lean,
lean/APC/LatticeDistribution.lean, lean/APC/EntireObstruction.lean,
lean/APC/SoninShell.lean, lean/lakefile.lean, lean/lake-manifest.json,
lean/lean-toolchain, lean/README.md, scripts/audit-lean.lean,
research/lean-results.md, research/lean-theorems.json,
research/lean-build.log, research/lean-axioms.log.

Do not explore other project directories or any context repository. You may
run `cd lean && lake build` and `lake env lean ../scripts/audit-lean.lean`.
You may inspect only directly referenced mathlib definitions in
lean/.lake/packages/mathlib if needed to resolve the semantics of a proof.
Remain read-only and do not spawn agents.

Check mathematical correctness of definitions, exact11 coefficient signs
and both polynomial roots, relation between finite prime-power sums and the
translated profile, all hypotheses and exclusions, the actual complex Euler
denominator and analytic-order parity argument, shell-coefficient obstruction,
proof soundness and axiom dependencies, complete theorem inventory, and
reproducible pinned build. Detect vacuous assumptions, hidden arithmetic
axioms, accidental statement weakening, proof substitutions, or any mismatch
between the result report and code. In particular, the report explicitly
excludes the smooth-bump/autocorrelation existence bridge, critical-line
boundary-to-entire continuation, p-adic Fourier and crossed-product geometry,
and global Weil positivity. Do not demand these excluded results to accept
the stated scope, but flag any sentence that accidentally claims them.

Give concrete findings with severity and file:line references, distinguish
blocking correctness problems from optional style suggestions, and state the
number of issues. End with exactly VERDICT: PASS or VERDICT: NEEDS_FIX.
