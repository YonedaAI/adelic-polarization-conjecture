import Mathlib.Analysis.SpecialFunctions.Trigonometric.Basic
import Mathlib.Analysis.SpecialFunctions.Log.Basic
import Mathlib.Analysis.SpecialFunctions.Pow.Real
import Mathlib.Analysis.Complex.Exponential
import Mathlib.NumberTheory.ArithmeticFunction.VonMangoldt
import Mathlib.Tactic

/-! Scalar Euler factors and the actual finite local prime-power sum. -/

namespace APC

noncomputable def primeRadius (p : ℕ) : ℝ := 1 / Real.sqrt p

theorem primeRadius_pos {p : ℕ} (hp : 1 < p) : 0 < primeRadius p := by
  unfold primeRadius
  positivity

theorem primeRadius_lt_one {p : ℕ} (hp : 1 < p) : primeRadius p < 1 := by
  have hpR : (1 : ℝ) < p := by exact_mod_cast hp
  have hs : (1 : ℝ) < Real.sqrt p := by
    rw [Real.lt_sqrt (by norm_num)]
    simpa using hpR
  unfold primeRadius
  exact (div_lt_one (by positivity)).2 hs

theorem primeRadius_sq (p : ℕ) : primeRadius p ^ 2 = 1 / (p : ℝ) := by
  simp [primeRadius, Real.sq_sqrt (Nat.cast_nonneg p)]

noncomputable def localMultiplier (p : ℕ) (t : ℝ) : ℂ :=
  ⟨1 - primeRadius p * Real.cos (t * Real.log p),
    primeRadius p * Real.sin (t * Real.log p)⟩

noncomputable def localWeight (p : ℕ) (t : ℝ) : ℝ :=
  Complex.normSq (localMultiplier p t)

theorem localMultiplier_exp (p : ℕ) (t : ℝ) :
    localMultiplier p t = 1 - (primeRadius p : ℂ) *
      Complex.exp (-(t * Real.log p : ℝ) * Complex.I) := by
  unfold localMultiplier
  generalize primeRadius p = r
  generalize t * Real.log (p : ℝ) = θ
  rw [Complex.exp_mul_I]
  apply Complex.ext <;> simp [Complex.cos_ofReal_re, Complex.sin_ofReal_re]

theorem localWeight_formula (p : ℕ) (t : ℝ) :
    localWeight p t = 1 + primeRadius p ^ 2 -
      2 * primeRadius p * Real.cos (t * Real.log p) := by
  have h := Real.sin_sq_add_cos_sq (t * Real.log p)
  simp only [localWeight, localMultiplier, Complex.normSq_apply]
  nlinarith [sq_nonneg (primeRadius p * Real.sin (t * Real.log p))]

theorem localWeight_defect (p : ℕ) (t : ℝ) :
    localWeight p t - 1 = primeRadius p ^ 2 -
      2 * primeRadius p * Real.cos (t * Real.log p) := by
  rw [localWeight_formula]
  ring

theorem localWeight_lower {p : ℕ} (hp : 1 < p) (t : ℝ) :
    (1 - primeRadius p) ^ 2 ≤ localWeight p t := by
  rw [localWeight_formula]
  have hr := primeRadius_pos hp
  have hc := Real.cos_le_one (t * Real.log p)
  nlinarith

theorem localWeight_upper {p : ℕ} (hp : 1 < p) (t : ℝ) :
    localWeight p t ≤ (1 + primeRadius p) ^ 2 := by
  rw [localWeight_formula]
  have hr := primeRadius_pos hp
  have hc := Real.neg_one_le_cos (t * Real.log p)
  nlinarith

theorem localWeight_at_zero (p : ℕ) :
    localWeight p 0 = (1 - primeRadius p) ^ 2 := by
  rw [localWeight_formula]
  simp
  ring

theorem localWeight_at_pi_div_log {p : ℕ} (hp : 1 < p) :
    localWeight p (Real.pi / Real.log p) = (1 + primeRadius p) ^ 2 := by
  have hlog : Real.log (p : ℝ) ≠ 0 := ne_of_gt (Real.log_pos (by exact_mod_cast hp))
  rw [localWeight_formula, div_mul_cancel₀ _ hlog, Real.cos_pi]
  ring

theorem localWeight_defect_negative {p : ℕ} (hp : 1 < p) :
    localWeight p 0 - 1 < 0 := by
  rw [localWeight_at_zero]
  have hr := primeRadius_pos hp
  have hr1 := primeRadius_lt_one hp
  nlinarith

theorem localWeight_defect_positive {p : ℕ} (hp : 1 < p) :
    0 < localWeight p (Real.pi / Real.log p) - 1 := by
  rw [localWeight_at_pi_div_log hp]
  have hr := primeRadius_pos hp
  nlinarith [sq_nonneg (primeRadius p)]

/-- The coefficient at the positive prime-power location `k log p`. -/
noncomputable def primePowerCoefficient (p k : ℕ) : ℝ :=
  Real.log p * primeRadius p ^ k

theorem primePowerCoefficient_pos {p : ℕ} (hp : p.Prime) (k : ℕ) :
    0 < primePowerCoefficient p k := by
  exact mul_pos (Real.log_pos (by exact_mod_cast hp.one_lt))
    (pow_pos (primeRadius_pos hp.one_lt) _)

theorem primePowerCoefficient_vonMangoldt {p k : ℕ} (hp : p.Prime) (hk : k ≠ 0) :
    primePowerCoefficient p k = ArithmeticFunction.vonMangoldt (p ^ k) *
      primeRadius p ^ k := by
  rw [ArithmeticFunction.vonMangoldt_apply_pow hk,
    ArithmeticFunction.vonMangoldt_apply_prime hp]
  rfl

noncomputable def localPrimePowerSum (p N : ℕ) (h : ℝ → ℝ) : ℝ :=
  ∑ k ∈ Finset.range N, primePowerCoefficient p (k + 1) *
    (h ((k + 1) * Real.log p) + h (-((k + 1) * Real.log p)))

theorem localPrimePowerSum_add (p N : ℕ) (f g : ℝ → ℝ) :
    localPrimePowerSum p N (fun x ↦ f x + g x) =
      localPrimePowerSum p N f + localPrimePowerSum p N g := by
  simp only [localPrimePowerSum, ← Finset.sum_add_distrib]
  apply Finset.sum_congr rfl
  intro k hk
  ring

/-- A support radius strictly below `log p` removes every positive prime power. -/
theorem localPrimePowerSum_eq_zero_of_support {p N : ℕ} {a : ℝ}
    (hp : 1 < p) (ha : a < Real.log p) (h : ℝ → ℝ)
    (hsupp : ∀ x, a < |x| → h x = 0) : localPrimePowerSum p N h = 0 := by
  have hL : 0 < Real.log (p : ℝ) := Real.log_pos (by exact_mod_cast hp)
  apply Finset.sum_eq_zero
  intro k hk
  have hkR : (1 : ℝ) ≤ k + 1 := by have := Nat.cast_nonneg (α := ℝ) k; linarith
  have hloc : a < (k + 1 : ℝ) * Real.log p := by nlinarith
  have hnonneg : 0 ≤ (k + 1 : ℝ) * Real.log p := by positivity
  rw [hsupp _ (by simpa [abs_of_nonneg hnonneg] using hloc),
    hsupp _ (by simpa [abs_neg, abs_of_nonneg hnonneg] using hloc)]
  ring

end APC
