import Mathlib.Data.Complex.Basic
import Mathlib.Tactic

namespace APC

/-- Values of the unit-invariant local Sonin generator on shells `|x|_p = p^n`.
This is the shell coefficient function, without a formal p-adic Fourier transform. -/
noncomputable def soninShellCoefficient (p : ℕ) (n : ℤ) : ℂ :=
  if n = 0 then 1 else if n = 1 then -1 / (p : ℂ) else 0

theorem soninShell_at_zero (p : ℕ) : soninShellCoefficient p 0 = 1 := by
  simp [soninShellCoefficient]

theorem soninShell_at_one (p : ℕ) : soninShellCoefficient p 1 = -1 / (p : ℂ) := by
  simp [soninShellCoefficient]

theorem soninShell_no_nonzero_scalar_idempotent {p : ℕ} (hp : 1 < p)
    (c : ℂ) (hc : c ≠ 0) :
    ¬ ∀ n : ℤ, (c * soninShellCoefficient p n) ^ 2 = c * soninShellCoefficient p n := by
  intro hid
  have h₀ := hid 0
  rw [soninShell_at_zero, mul_one] at h₀
  have hc1 : c = 1 := by
    have hprod : c * (c - 1) = 0 := by linear_combination h₀
    have := (mul_eq_zero.mp hprod).resolve_left hc
    linear_combination this
  have h₁ := hid 1
  rw [hc1, one_mul, soninShell_at_one] at h₁
  have hp0 : (p : ℂ) ≠ 0 := by exact_mod_cast (ne_of_gt (lt_trans Nat.zero_lt_one hp))
  field_simp at h₁
  have hreal := congrArg Complex.re h₁
  norm_num at hreal
  have hnonneg := Nat.cast_nonneg (α := ℝ) p
  nlinarith

/-- Even the scalar-to-shell tensor map fails multiplicativity. -/
theorem soninShell_tensor_not_multiplicative {p : ℕ} (hp : 1 < p) :
    ¬ ∀ a b : ℂ, ∀ n : ℤ,
      (a * b) * soninShellCoefficient p n =
        (a * soninShellCoefficient p n) * (b * soninShellCoefficient p n) := by
  intro h
  apply soninShell_no_nonzero_scalar_idempotent hp 1 one_ne_zero
  intro n
  simpa [pow_two] using (h 1 1 n).symm

end APC
