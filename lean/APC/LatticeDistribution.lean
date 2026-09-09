import APC.LocalSigns

namespace APC

/-- Correlation of a finite real coefficient vector, indexed by integer shifts. -/
noncomputable def discreteCorrelation {n : ℕ} (c : Fin n → ℝ) (k : ℤ) : ℝ :=
  ∑ i, ∑ j, if (i.val : ℤ) - j.val = k then c i * c j else 0

/-- Prime-power distribution on the sampled correlation sequence. -/
noncomputable def localLatticeSum {n : ℕ} (p N : ℕ) (c : Fin n → ℝ) : ℝ :=
  ∑ k ∈ Finset.range N, primePowerCoefficient p (k + 1) *
    (discreteCorrelation c (k + 1) + discreteCorrelation c (-(k + 1)))

/-- The profile obtained by pairing finitely many translates of one base profile. -/
noncomputable def translatedCorrelation {n : ℕ} (p : ℕ) (c : Fin n → ℝ)
    (H : ℝ → ℝ) (x : ℝ) : ℝ :=
  ∑ i, ∑ j, c i * c j * H (x - ((i.val : ℝ) - j.val) * Real.log p)

theorem discreteCorrelation_eq_zero_of_ge {n : ℕ} (c : Fin n → ℝ) (k : ℤ)
    (hk : (n : ℤ) ≤ |k|) : discreteCorrelation c k = 0 := by
  apply Finset.sum_eq_zero
  intro i hi
  apply Finset.sum_eq_zero
  intro j hj
  have hi' := i.isLt
  have hj' := j.isLt
  have hne : (i.val : ℤ) - j.val ≠ k := by
    rcases le_abs.mp hk with hk | hk <;> omega
  simp [hne]

/-- The finite distribution is independent of every cutoff above the vector length. -/
theorem localLatticeSum_stable {n N : ℕ} (p : ℕ) (c : Fin n → ℝ)
    (hN : n ≤ N) : localLatticeSum p N c = localLatticeSum p n c := by
  unfold localLatticeSum
  symm
  apply Finset.sum_subset (Finset.range_mono hN)
  intro k hkN hkn
  have hk : n ≤ k := by simpa using hkn
  have hkp : (n : ℤ) ≤ |(k : ℤ) + 1| := by
    rw [abs_of_nonneg (by omega)]
    omega
  rw [discreteCorrelation_eq_zero_of_ge c _ hkp,
    discreteCorrelation_eq_zero_of_ge c _ (by simpa only [abs_neg] using hkp)]
  ring

/-- A profile supported strictly inside the first lattice step satisfies the sampling premise. -/
theorem lattice_profile_of_support {p : ℕ} (hp : 1 < p) (H : ℝ → ℝ) (A : ℝ)
    (h₀ : H 0 = A) (hsupp : ∀ x, Real.log p ≤ |x| → H x = 0) :
    ∀ k : ℤ, H (k * Real.log p) = if k = 0 then A else 0 := by
  intro k
  by_cases hk : k = 0
  · simp [hk, h₀]
  · rw [if_neg hk]
    apply hsupp
    have hkabs : (1 : ℤ) ≤ |k| := by rw [le_abs]; omega
    have hkR : (1 : ℝ) ≤ |(k : ℝ)| := by exact_mod_cast hkabs
    have hL := Real.log_pos (show (1 : ℝ) < p by exact_mod_cast hp)
    rw [abs_mul, abs_of_pos hL]
    nlinarith

/-- A base autocorrelation that vanishes on nonzero lattice points samples exactly. -/
theorem translatedCorrelation_sample {n : ℕ} (p : ℕ) (c : Fin n → ℝ)
    (H : ℝ → ℝ) (A : ℝ)
    (hH : ∀ k : ℤ, H (k * Real.log p) = if k = 0 then A else 0) (k : ℤ) :
    translatedCorrelation p c H (k * Real.log p) = A * discreteCorrelation c k := by
  simp only [translatedCorrelation, discreteCorrelation, Finset.mul_sum]
  apply Finset.sum_congr rfl
  intro i hi
  apply Finset.sum_congr rfl
  intro j hj
  have hx : (k : ℝ) * Real.log p - ((i.val : ℝ) - j.val) * Real.log p =
      ((k - ((i.val : ℤ) - j.val) : ℤ) : ℝ) * Real.log p := by
    push_cast
    ring
  rw [hx, hH]
  by_cases heq : (i.val : ℤ) - j.val = k
  · simp [heq]
    ring
  · have hk : k - ((i.val : ℤ) - j.val) ≠ 0 := by omega
    simp [heq, hk]

theorem localPrimePowerSum_translated {n : ℕ} (p N : ℕ) (c : Fin n → ℝ)
    (H : ℝ → ℝ) (A : ℝ)
    (hH : ∀ k : ℤ, H (k * Real.log p) = if k = 0 then A else 0) :
    localPrimePowerSum p N (translatedCorrelation p c H) = A * localLatticeSum p N c := by
  simp only [localPrimePowerSum, localLatticeSum, Finset.mul_sum]
  apply Finset.sum_congr rfl
  intro k hk
  have hpos := translatedCorrelation_sample p c H A hH (k + 1)
  have hneg := translatedCorrelation_sample p c H A hH (-(k + 1))
  push_cast at hpos hneg
  rw [hpos]
  rw [show -((k + 1 : ℝ) * Real.log p) = (-((k : ℝ) + 1)) * Real.log p by ring]
  rw [hneg]
  ring

theorem localLatticeSum_three (p : ℕ) (c : Fin 3 → ℝ) :
    localLatticeSum p 3 c = Real.log p * toeplitzOffDiagonal (primeRadius p) c := by
  simp only [localLatticeSum, discreteCorrelation, toeplitzOffDiagonal, primePowerCoefficient,
    Finset.sum_range_succ, Fin.sum_univ_succ]
  simp +decide only [Fin.sum_univ_zero]
  norm_num [Nat.dist]
  ring

theorem localLatticeSum_four (p : ℕ) (c : Fin 4 → ℝ) :
    localLatticeSum p 4 c = Real.log p * toeplitzOffDiagonal (primeRadius p) c := by
  simp only [localLatticeSum, discreteCorrelation, toeplitzOffDiagonal, primePowerCoefficient,
    Finset.sum_range_succ, Fin.sum_univ_succ]
  simp +decide only [Fin.sum_univ_zero]
  norm_num [Nat.dist]
  ring

theorem translated_minus_exact (H : ℝ → ℝ) (A : ℝ)
    (hH : ∀ k : ℤ, H (k * Real.log 11) = if k = 0 then A else 0) :
    localPrimePowerSum 11 3 (translatedCorrelation 11 minusCoefficients H) =
      Real.log 11 * A * (-46 / 11) := by
  rw [localPrimePowerSum_translated 11 3 minusCoefficients H A hH,
    localLatticeSum_three, minus_exact]
  ring_nf

theorem translated_plus_exact (H : ℝ → ℝ) (A : ℝ)
    (hH : ∀ k : ℤ, H (k * Real.log 11) = if k = 0 then A else 0) :
    localPrimePowerSum 11 4 (translatedCorrelation 11 plusCoefficients H) =
      Real.log 11 * A * ((28 * Real.sqrt 11 - 92) / 11) := by
  rw [localPrimePowerSum_translated 11 4 plusCoefficients H A hH,
    localLatticeSum_four, plus_exact]
  ring_nf

end APC
