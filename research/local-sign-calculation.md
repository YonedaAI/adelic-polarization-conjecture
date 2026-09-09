# A local sign calculation

This is a working derivation for independent checking. It is not yet a peer-reviewed result or a novelty claim.

Fix a prime p, L=log p, r=p^(-1/2), and a=r+r^(-1). Let g be a nonzero real smooth function supported in (-delta,delta), where 2 delta<L. For a real coefficient vector c=(c_0,...,c_m), set f(x)=sum_j c_j g(x-jL). Its centered Laplace transform is F_f(z)=F_g(z) C(exp(Lz)), where C(z)=sum_j c_j z^j.

The local distribution on the autocorrelation is exactly

W_p(f*f*)=(log p) ||g||_2^2 Q_r(c),
Q_r(c)=sum_{i != j} c_i c_j r^|i-j|.

All powers present in the compact support are retained. The narrowness of g implies that its autocorrelation vanishes at every nonzero integer multiple of L, which proves this identity without a limiting argument.

Set P(z)=1-a z+z^2=(z-r)(z-r^(-1)). Every vector whose polynomial is divisible by P gives both F_f(1/2)=0 and F_f(-1/2)=0.

For c_minus=(1,-a,1), direct expansion gives Q_r(c_minus)=-4-2r^2.

For c_plus=(1,1-a,1-a,1), whose polynomial is P(z)(1+z), direct expansion gives

Q_r(c_plus)=-8-4r^2+6r+2/r.

At the actual prime p=11 these become

Q_r(c_minus)=-46/11 < 0,
Q_r(c_plus)=(28 sqrt(11)-92)/11 > 0.

The positive inequality follows from 7 sqrt(11)>23, since 49*11=539>529=23^2. Thus the same arithmetic local distribution has both signs even on smooth tests satisfying the two pole moment conditions.

For a longer coefficient packet C_N=P(z)(1+...+z^(N-1)), N>=2, the same calculation suggests the exact identity

Q_r(c_N)=2N(1-r)^3/r +4-6r-2/r.

One way to verify it is to use the Toeplitz kernel K_ij=r^|i-j|. The Fourier symbol of K-I is (2r cos(theta)-2r^2)/(1-2r cos(theta)+r^2). Multiplication by |P(exp(i theta))|^2 leaves a Laurent polynomial with coefficients b_0=-4-2r^2, b_(+/-1)=3r+1/r, and b_(+/-2)=-1. Summing it against the length-N packet yields N b_0+2(N-1)b_1+2(N-2)b_2. The short p=11 examples suffice for the sign result, so the general identity is optional.

## Scope of a resulting obstruction

Consider the explicitly stronger ansatz that a nonpositive primitive pairing is extended by adding an orthogonal nonpositive summand at every nontrivial one-prime transition, with the old component preserved isometrically and Gamma_new f=iota Gamma_old f+eta f. Its pairing defect is I_new(eta f,eta f)<=0. It cannot equal W_11(f*f*) on the positive example above.

This excludes that orthogonal-extension ansatz with sign imposed at intermediate transitions. It does not exclude general correspondences with mixed terms, boundary terms, changing primitive projections, or sign required only on support-complete stages. At a fixed support-complete pair (S,a), any newly adjoined prime has zero local distribution on that test space. The result is therefore not a contradiction of the support-indexed formulation in the supplied perspective.
