import Lake
open Lake DSL

package «adelic-polarization-conjecture» where

require mathlib from git
  "https://github.com/leanprover-community/mathlib4.git" @ "0f9072dd907c6e2e4264ab241a049cab50137f7c"

@[default_target]
lean_lib APC where
