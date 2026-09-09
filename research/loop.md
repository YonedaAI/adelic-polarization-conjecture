# Research loop

This record separates a construction attempt from the theorem that tests it. The source conventions and primary references are in literature-ledger.md. Both worker papers received AGY verdicts of MINOR REVISIONS, addressed those issues, and passed final Codex formatting checks. Independent cross-paper integration passed after two notation corrections. The final synthesis, including the explicit origin-class boundary, received AGY ACCEPT and Codex PASS. The Lean project passed independent code review and a fresh build and axiom audit. The last logarithmic-class test below is a separate coordinator-checked working note, outside the manuscript reviews and Lean library.

## Iteration 1: the shell tensor map

Conjecture: the known Sonin prime-adjoining transition lifts directly to an algebra homomorphism of semilocal crossed products by tensoring with the local Sonin vector.

Decomposition: distinguish the local shell function, Fourier gaps, old-group invariance, pointwise multiplication, and crossed-product convolution. For shell indicators epsilon_0 and epsilon_1, the actual local vector is sigma_p = epsilon_0 - p^-1 epsilon_1.

Action: calculate the product of two tensor images. Since the old group acts by p-adic units, multiplication replaces sigma_p by sigma_p^2.

Verification: idempotence would require both nonzero shell values to be idempotents. No nonzero scalar normalization satisfies this. Part I proves the crossed-product statement; Lean proves the actual two-shell coefficient obstruction. This is not an obstruction to arbitrary bimodule correspondences.

Reformulation: use the two invariant idempotent shells separately, then combine the induced maps on a complex.

## Iteration 2: the signed Hochschild repair

Conjecture: a weighted difference of the two shell-induced Hochschild maps repairs the degree-zero transition while preserving the required compatibility.

Action: define Psi_(p,n) = Phi_0^(tensor(n+1)) - p^-1 Phi_1^(tensor(n+1)) on the ordinary algebraic Hochschild chain complex. The coefficient is p^-1, not p^(-n-1).

Verification: each shell map is an algebra embedding and hence induces a chain map, including for the stated nonunital algebraic convention. Their weighted difference is a chain map. For distinct primes, expansion into four genuine shell embeddings proves the two-prime square commutes.

Obstruction: the componentwise local Fourier transform has value (p-1)^(n+1) * (p^(-n-1)-p^-1) on the forbidden ball. It is nonzero in every degree n >= 1. Fourier invariance in degree zero does not extend by this construction. The statement does not presume that Fourier itself is a Hochschild chain map.

Reformulation: retain the constructed chain maps, but seek a compatible higher duality or corrected complex. Primitive homology, the pairing, and its arithmetic comparison still have to be constructed.

## Iteration 3: positive ambient normalization

Conjecture: normalize the analytic transition pointwise by its positive Euler modulus while retaining the same entire-function carrier.

Action: write Delta_p(z) = (1-exp(-log(p) z))(1-exp(log(p)(z-1))). A normalized boundary relation between entire functions forces Delta_p G^2 = F^2 by continuity and the identity theorem.

Verification: Delta_p(0)=0 and Delta_p'(0)=log(p)(1-p^-1) != 0. The order at zero is one. The asserted squared identity would give 1+2 ord(G)=2 ord(F), which is impossible for nonzero entire functions. Lean proves the actual entire squared-identity obstruction; the critical-line boundary passage is a paper proof.

Obstruction scope: this excludes the ambient pointwise positive correction, not intrinsic polar decomposition after compression to a closed Sonin Hilbert subspace. The compressed adjoint contains a projection and need not equal the ambient multiplier adjoint.

Reformulation: account for the compressed metric, changing test maps, and the relevant operator domains. An intrinsic Hilbert isometry alone does not establish arithmetic compatibility.

## Iteration 4: orthogonal nonpositive extensions

Conjecture: an isometric orthogonal enlargement by a nonpositive primitive sector realizes every nontrivial one-prime arithmetic increment.

Action: translate one narrow nonzero smooth bump by integer multiples of log p. Impose the two pole moments through the coefficient polynomial (z-p^(-1/2))(z-p^(1/2)).

Verification: at prime 11, the three- and four-translate vectors have exact off-diagonal Toeplitz values -46/11 and (28 sqrt(11)-92)/11. Both moment constraints vanish. The local Weil terms are these values multiplied by the positive factor log(11) * ||bump||_2^2. Part II supplies the smooth-test bridge and a longer-packet construction at every prime. Lean verifies the exact prime-11 coefficient, moment, translated-profile, and finite-cutoff identities; it does not construct the smooth bump.

Obstruction: the added orthogonal nonpositive sector can only give a nonpositive pairing defect, while the positive local witness requires a positive defect because B_W=-I forces local increment +W_p.

Scope: this rejects the stronger sign requirement on nontrivial intermediate transitions. At a support-complete fixed test stage, a newly irrelevant prime contributes zero. The argument does not refute that formulation.

Reformulation: retain mixed pairings, changes of primitive projection, and explicit boundary corrections. Require the geometric sign at support-complete stages and prove the complete arithmetic comparison there.

## Iteration 5: relative homology at a finite stage

Conjecture: a restriction cone supplies a nonzero relative space compatible with the signed shell maps.

Action: restrict the Schwartz crossed product to a larger algebra of locally smooth functions on the invertible locus, without growth restrictions. Form the actual algebraic Hochschild mapping cone. The shell embeddings commute with restriction and induce commuting cone maps.

Verification: the degree-one cone homology sits in an exact sequence with a target HH1 cokernel and a source HH0 kernel. For a compact bump f with f(0)=1, the source element f U_(-1) is detected by the origin trace but becomes an explicit commutator on the invertible locus. This gives a nonzero relative class at every finite stage.

Obstruction: nonzero homology separately at every stage does not establish a nonzero compatible family. The transition maps themselves must be tested.

## Iteration 6: the origin class does not survive

Conjecture tested: the explicit compact-bump origin class survives adjoining a prime.

Action: choose an odd locally constant sign h on either new shell, with h^2 equal to its indicator. An even compact old cutoff gives genuine Schwartz factors whose commutator equals the new source component. In the target shell corner, conjugation by h negates the remaining degree-one cycle. An explicit Hochschild homotopy fills that cycle.

Verification: the complete cone image, not just its source projection or trace detector, is the boundary d(-t,F). Each shell embedding kills the class; their signed combination therefore kills it for every new prime. The construction works at p=2 using the two unit classes modulo 4. The [full chain calculation](cone-transition-proof-attempt.md) records the domains, all boundary terms, and cone signs. This is a paper-level proof, not a new Lean theorem.

Conclusion: this witness disappears in the filtered direct limit. It cannot support the proposed stable primitive realization. The calculation does not annihilate every class in the cone or the target HH1 cokernel.

## Iteration 7: a logarithmic cokernel witness

Conjecture tested: the identity-sector target cycle X^(-1) U_1 tensor X U_1 supplies a different surviving class.

Verification at the initial stage: at S={infinity}, an explicitly averaged differential map annihilates every target Hochschild boundary and every source chain, but detects dx/x modulo one-forms extending smoothly across zero. The cycle is therefore genuinely nonzero in the target HH1 cokernel, not just a formal expression.

Transition test: on the new p-adic coordinate, the allowed coefficient k_j=1_{v_p(y)>=-j} satisfies k_j-alpha_p(k_j)=e_j. A two-term inner-conjugation homotopy, plus one tensor correcting the second shell factor, gives an explicit boundary for each shell image. Real rescaling by p is included. Thus this second relative witness also dies after one prime. The [proof-only note](cokernel-survival-attempt.md) contains the detector and all three filling tensors; it is separate from the reviewed manuscripts and is not Lean-formalized.

Conclusion: both tested witnesses fail to survive. The unrestricted target algebra permits the coefficients responsible for the second filling. This identifies a concrete feature to reassess, but does not establish that the whole transition system vanishes.

## Next proof gate

Before another substantial formalization or manuscript cycle, exhibit a different class or family that survives the actual transition maps, together with a nontrivial map from the pole-killed test space. Two explicit classes have now failed this test, including the simplest logarithmic cokernel candidate. No surviving family has been obtained.

If changing the target's growth or support conditions, first prove that restriction and both shell maps still land in the modified algebra. Then check whether the displayed fillings are excluded and whether any nonzero relative class remains. Removing a troublesome coefficient by declaration is not a construction of the desired space. A comparison with the published restriction-cokernel realization must be proved rather than inferred from similar terminology.

Only after this gate is met should the program attempt a pairing on those actual classes, its full arithmetic comparison, and a geometric proof of its sign. These remain unresolved; merely imposing them as conjectural properties does not advance their proof.
