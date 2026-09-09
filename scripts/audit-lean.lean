import APC

/-! Complete axiom inventory for all explicit project theorem declarations.
Run from lean/: lake env lean ../scripts/audit-lean.lean
Only propext, Classical.choice, and Quot.sound are permitted.
-/

#print axioms APC.eleven_prime
#print axioms APC.sqrt_eleven_sq
#print axioms APC.minus_exact
#print axioms APC.plus_exact
#print axioms APC.minus_negative
#print axioms APC.plus_positive
#print axioms APC.minus_moment_radius
#print axioms APC.minus_moment_inverse
#print axioms APC.plus_moment_radius
#print axioms APC.plus_moment_inverse
#print axioms APC.primeRadius_pos
#print axioms APC.primeRadius_lt_one
#print axioms APC.primeRadius_sq
#print axioms APC.localMultiplier_exp
#print axioms APC.localWeight_formula
#print axioms APC.localWeight_defect
#print axioms APC.localWeight_lower
#print axioms APC.localWeight_upper
#print axioms APC.localWeight_at_zero
#print axioms APC.localWeight_at_pi_div_log
#print axioms APC.localWeight_defect_negative
#print axioms APC.localWeight_defect_positive
#print axioms APC.primePowerCoefficient_pos
#print axioms APC.primePowerCoefficient_vonMangoldt
#print axioms APC.localPrimePowerSum_add
#print axioms APC.localPrimePowerSum_eq_zero_of_support
#print axioms APC.discreteCorrelation_eq_zero_of_ge
#print axioms APC.localLatticeSum_stable
#print axioms APC.lattice_profile_of_support
#print axioms APC.translatedCorrelation_sample
#print axioms APC.localPrimePowerSum_translated
#print axioms APC.localLatticeSum_three
#print axioms APC.localLatticeSum_four
#print axioms APC.translated_minus_exact
#print axioms APC.translated_plus_exact
#print axioms APC.soninShell_at_zero
#print axioms APC.soninShell_at_one
#print axioms APC.soninShell_no_nonzero_scalar_idempotent
#print axioms APC.soninShell_tensor_not_multiplicative
#print axioms APC.eulerDenominator_analytic
#print axioms APC.eulerDenominator_zero
#print axioms APC.eulerDenominator_hasDerivAt_zero
#print axioms APC.eulerDenominator_deriv_ne_zero
#print axioms APC.eulerDenominator_order_one
#print axioms APC.eulerDenominator_no_local_square
#print axioms APC.eulerDenominator_no_entire_square
