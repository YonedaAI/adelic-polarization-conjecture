import APC.LocalFactor
import Mathlib.Data.Nat.Dist

/-! Exact finite coefficient witnesses for the local prime-power quadratic form. -/

namespace APC

/-- The diagonal is omitted, as in the local Weil distribution. -/
noncomputable def toeplitzOffDiagonal {n : ℕ} (r : ℝ) (c : Fin n → ℝ) : ℝ :=
  ∑ i, ∑ j, if i = j then 0 else c i * c j * r ^ (Nat.dist i.val j.val)

noncomputable def coefficientPolynomialValue {n : ℕ} (c : Fin n → ℝ) (z : ℝ) : ℝ :=
  ∑ i, c i * z ^ i.val

noncomputable def minusCoefficients : Fin 3 → ℝ := ![1, -12 / Real.sqrt 11, 1]
noncomputable def plusCoefficients : Fin 4 → ℝ :=
  ![1, 1 - 12 / Real.sqrt 11, 1 - 12 / Real.sqrt 11, 1]

theorem eleven_prime : Nat.Prime 11 := by norm_num

theorem sqrt_eleven_sq : Real.sqrt 11 ^ 2 = 11 := Real.sq_sqrt (by norm_num)

theorem minus_exact : toeplitzOffDiagonal (primeRadius 11) minusCoefficients = -46 / 11 := by
  simp only [toeplitzOffDiagonal, Fin.sum_univ_succ, minusCoefficients]
  simp +decide only [Matrix.cons_val_zero, Matrix.cons_val_succ, Fin.sum_univ_zero]
  norm_num [primeRadius, Nat.dist]
  field_simp
  nlinarith [sqrt_eleven_sq]

theorem plus_exact : toeplitzOffDiagonal (primeRadius 11) plusCoefficients =
    (28 * Real.sqrt 11 - 92) / 11 := by
  simp only [toeplitzOffDiagonal, Fin.sum_univ_succ, plusCoefficients]
  simp +decide only [Matrix.cons_val_zero, Matrix.cons_val_succ, Fin.sum_univ_zero]
  norm_num [primeRadius, Nat.dist]
  field_simp
  nlinarith [sqrt_eleven_sq,
    congrArg (fun x : ℝ ↦ x * Real.sqrt 11) sqrt_eleven_sq,
    congrArg (fun x : ℝ ↦ x ^ 2) sqrt_eleven_sq]

theorem minus_negative : toeplitzOffDiagonal (primeRadius 11) minusCoefficients < 0 := by
  rw [minus_exact]
  norm_num

theorem plus_positive : 0 < toeplitzOffDiagonal (primeRadius 11) plusCoefficients := by
  rw [plus_exact]
  have hs := Real.sqrt_nonneg (11 : ℝ)
  nlinarith [sqrt_eleven_sq]

theorem minus_moment_radius :
    coefficientPolynomialValue minusCoefficients (primeRadius 11) = 0 := by
  norm_num [coefficientPolynomialValue, Fin.sum_univ_succ, minusCoefficients, primeRadius]
  field_simp
  nlinarith [sqrt_eleven_sq]

theorem minus_moment_inverse :
    coefficientPolynomialValue minusCoefficients ((primeRadius 11)⁻¹) = 0 := by
  norm_num [coefficientPolynomialValue, Fin.sum_univ_succ, minusCoefficients, primeRadius]

theorem plus_moment_radius :
    coefficientPolynomialValue plusCoefficients (primeRadius 11) = 0 := by
  norm_num [coefficientPolynomialValue, Fin.sum_univ_succ, plusCoefficients, primeRadius]
  field_simp
  nlinarith [sqrt_eleven_sq,
    congrArg (fun x : ℝ ↦ x * Real.sqrt 11) sqrt_eleven_sq,
    congrArg (fun x : ℝ ↦ x ^ 2) sqrt_eleven_sq]

theorem plus_moment_inverse :
    coefficientPolynomialValue plusCoefficients ((primeRadius 11)⁻¹) = 0 := by
  norm_num [coefficientPolynomialValue, Fin.sum_univ_succ, plusCoefficients, primeRadius]
  field_simp
  nlinarith [sqrt_eleven_sq]

end APC
