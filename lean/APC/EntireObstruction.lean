import Mathlib.Analysis.Analytic.Order
import Mathlib.Analysis.SpecialFunctions.Complex.Analytic
import Mathlib.Analysis.SpecialFunctions.Log.Basic
import Mathlib.Tactic

namespace APC

noncomputable def eulerDenominator (p : ℕ) (z : ℂ) : ℂ :=
  (1 - Complex.exp (-(Real.log p : ℂ) * z)) *
    (1 - Complex.exp ((Real.log p : ℂ) * (z - 1)))

theorem eulerDenominator_analytic (p : ℕ) (z : ℂ) :
    AnalyticAt ℂ (eulerDenominator p) z := by
  unfold eulerDenominator
  fun_prop

theorem eulerDenominator_zero (p : ℕ) : eulerDenominator p 0 = 0 := by
  simp [eulerDenominator]

theorem eulerDenominator_hasDerivAt_zero {p : ℕ} (hp : 1 < p) :
    HasDerivAt (eulerDenominator p)
      ((Real.log p : ℂ) * (1 - (p : ℂ)⁻¹)) 0 := by
  have hpR : (0 : ℝ) < p := by exact_mod_cast (lt_trans Nat.zero_lt_one hp)
  have he : Complex.exp (-(Real.log p : ℂ)) = (p : ℂ)⁻¹ := by
    rw [Complex.exp_neg, ← Complex.ofReal_exp, Real.exp_log hpR]
    simp
  have h₁ := (((hasDerivAt_id (0 : ℂ)).const_mul
    (-(Real.log p : ℂ))).cexp.const_sub 1)
  have h₂ := ((((hasDerivAt_id (0 : ℂ)).sub_const 1).const_mul
    (Real.log p : ℂ)).cexp.const_sub 1)
  convert h₁.mul h₂ using 1
  simp only [id_eq, mul_zero, Complex.exp_zero, zero_sub, mul_neg_one,
    sub_self, zero_mul, add_zero, mul_one, one_mul, neg_neg, he]

theorem eulerDenominator_deriv_ne_zero {p : ℕ} (hp : 1 < p) :
    deriv (eulerDenominator p) 0 ≠ 0 := by
  rw [(eulerDenominator_hasDerivAt_zero hp).deriv]
  have hlog : Real.log (p : ℝ) ≠ 0 := ne_of_gt (Real.log_pos (by exact_mod_cast hp))
  have hpC : (p : ℂ) ≠ 1 := by exact_mod_cast (ne_of_gt hp)
  apply mul_ne_zero (by exact_mod_cast hlog)
  intro h
  have : (p : ℂ)⁻¹ = 1 := by linear_combination -h
  exact hpC (inv_eq_one.mp this)

theorem eulerDenominator_order_one {p : ℕ} (hp : 1 < p) :
    analyticOrderAt (eulerDenominator p) 0 = 1 :=
  (eulerDenominator_analytic p 0).analyticOrderAt_eq_one_of_zero_deriv_ne_zero
    (eulerDenominator_zero p) (eulerDenominator_deriv_ne_zero hp)

/-- The local analytic obstruction uses the actual Euler denominator. -/
theorem eulerDenominator_no_local_square {p : ℕ} (hp : 1 < p)
    (F G : ℂ → ℂ) (hF : AnalyticAt ℂ F 0) (hG : AnalyticAt ℂ G 0)
    (hFfinite : analyticOrderAt F 0 ≠ ⊤) (hGfinite : analyticOrderAt G 0 ≠ ⊤) :
    ¬ (eulerDenominator p * G ^ 2 =ᶠ[nhds 0] F ^ 2) := by
  intro heq
  have ho := analyticOrderAt_congr heq
  rw [analyticOrderAt_mul (eulerDenominator_analytic p 0) (hG.pow 2),
    eulerDenominator_order_one hp, analyticOrderAt_pow hG,
    analyticOrderAt_pow hF] at ho
  have hnF := Nat.cast_analyticOrderNatAt hFfinite
  have hnG := Nat.cast_analyticOrderNatAt hGfinite
  rw [← hnF, ← hnG] at ho
  simp only [nsmul_eq_mul] at ho
  norm_cast at ho
  omega

/-- No nonzero entire functions can satisfy the squared normalization identity. -/
theorem eulerDenominator_no_entire_square {p : ℕ} (hp : 1 < p)
    (F G : ℂ → ℂ) (hF : ∀ z, AnalyticAt ℂ F z) (hG : ∀ z, AnalyticAt ℂ G z)
    (hFne : F ≠ 0) (hGne : G ≠ 0) :
    ¬ (∀ z, eulerDenominator p z * G z ^ 2 = F z ^ 2) := by
  intro heq
  exact eulerDenominator_no_local_square hp F G (hF 0) (hG 0)
    (fun h ↦ hFne ((AnalyticOnNhd.analyticOrderAt_eq_top_iff_eq_zero 0 hF).mp h))
    (fun h ↦ hGne ((AnalyticOnNhd.analyticOrderAt_eq_top_iff_eq_zero 0 hG).mp h))
    (Filter.Eventually.of_forall heq)

end APC
