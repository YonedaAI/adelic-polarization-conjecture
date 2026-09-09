# The logarithmic cokernel class exists but dies after one prime

Date: 2026-09-09 UTC. This is a proof-only test of the actual algebraic
restriction cone and multiplication-only Hochschild complex specified
in the synthesis source. No manuscript or Lean file is changed.

## Outcome

At \(S=\{\infty\}\), the target cycle

\[
 z=X^{-1}U_1\otimes XU_1
\]

defines a nonzero class in

\[
 \operatorname{coker}\bigl(
 \mathrm{HH}_1(\mathcal A_S)\longrightarrow
 \mathrm{HH}_1(\mathscr D_S)\bigr).
\]

Nevertheless, after adjoining any prime \(p\), each of its two
individual shell images is an explicit boundary in
\(C_*(\mathscr D_{S\cup\{p\}})\). Consequently the signed image
\(\Psi_{p,1}^{\times,S}z\) is a target boundary, and the relative
class represented by \((0,z)\) is killed by \(\Xi_{p,1}^S\).

Thus this is another finite-stage class, not a surviving class.
The proof uses neither an HKR identification nor a general
Hochschild swindle, Morita equivalence, or a twisted-sector theorem.
The target filling has only three elementary three-tensors.

## 1. A direct detector at the initial stage

Put

\[
 R=C^\infty(\mathbb R^\times,\mathbb C),\qquad
 D=R\rtimes_{\mathrm{alg}}\{1,-1\}.
\]

The action is \(\alpha_\gamma f(x)=f(x/\gamma)\). On smooth
one-forms, use the corresponding pullback:

\[
 \alpha_\gamma(F(x)\,dx)
     =F(x/\gamma)\,\frac{dx}{\gamma}.
\]

Let \(\Omega\) be the vector space of smooth complex one-forms on
\(\mathbb R^\times\). Let \(\Omega_{\mathrm{ext}}\subset\Omega\)
consist of restrictions of smooth one-forms on all of \(\mathbb R\).
Both are preserved by the two-element group. Define

\[
 \operatorname{Av}(\omega)=\tfrac12(\omega+\alpha_{-1}\omega).
\]

For elementary tensors of crossed-product terms, define a linear map
\(\Theta:C_1(D)\to\Omega/\Omega_{\mathrm{ext}}\) by

\[
 \Theta(fU_\gamma\otimes gU_\delta)=
 \begin{cases}
 [\operatorname{Av}(f\,d(\alpha_\gamma g))],&
                      \gamma\delta=1,\\
 0,&\gamma\delta\ne1.
 \end{cases}
\]

All crossed-product group sums are finite, so this defines a map
on the stated algebraic tensor complex. The differential \(d\) here
is the ordinary derivative of actual smooth functions, not an
asserted identification with algebraic Kähler differentials.

### The detector annihilates Hochschild boundaries

Take \(fU_\gamma\otimes gU_\delta\otimes hU_\epsilon\).
If \(\gamma\delta\epsilon\ne1\), all three terms of its boundary
have total group product different from \(1\), so their images
under \(\Theta\) are zero. If \(\gamma\delta\epsilon=1\), the
first two images before taking classes are

\[
 \operatorname{Av}\bigl(
 f\,\alpha_\gamma(g)\,d(\alpha_{\gamma\delta}h)\bigr)
\]

and

\[
 -\operatorname{Av}\bigl(
 f\,d(\alpha_\gamma(g)\alpha_{\gamma\delta}(h))\bigr).
\]

The third is

\[
 \operatorname{Av}\bigl(
 h\,\alpha_\epsilon(f)\,d(\alpha_{\epsilon\gamma}g)\bigr).
\]

Averaging is unchanged by applying \(\alpha_{\gamma\delta}\)
to the whole form. Since \(\gamma\delta\epsilon=1\), the third
expression is therefore

\[
 \operatorname{Av}\bigl(
 \alpha_{\gamma\delta}(h)\,f\,d(\alpha_\gamma g)\bigr).
\]

The three terms sum to zero by the ordinary product rule.
Hence \(\Theta b=0\). This explicitly checks the cyclic last
Hochschild face, not merely the commutative-coefficient faces.

### It annihilates the image of source chains

At this stage
\(\mathcal A_S=\mathcal S(\mathbb R)\rtimes_{\mathrm{alg}}\{1,-1\}\).
If \(f,g\) are Schwartz, the form \(f\,d(\alpha_\gamma g)\)
extends smoothly across \(0\). The same is true after averaging.
It follows that

\[
 \Theta(r_{S,*}t)=0\qquad\text{for every }t\in C_1(\mathcal A_S).
\]

In particular the induced map on target degree-one homology kills
the entire image of source degree-one homology.

### It detects the proposed cycle

The factors \(X^{-1},X\) commute, so \(bz=0\). Moreover

\[
 \Theta(z)=\left[\frac{dx}{x}\right]\ne0.
\]

The form \(dx/x\) is fixed by reflection and does not extend
smoothly across \(0\): its coefficient is unbounded there. Thus
the displayed target class is nonzero even after quotienting by
the source image. Equivalently, the cone cycle \((0,z)\) is not
a cone boundary. Indeed, applying \(\Theta\) to the target
component of any cone boundary gives zero.

This argument establishes just the claimed nonzero class, not a
description of all Hochschild homology.

## 2. Actual shell images and an allowed shell-tail coefficient

Adjoin \(p\), write \(D'=\mathscr D_{\{\infty,p\}}\), and let
\(y\in\mathbb Q_p^\times\) be the new coordinate. For \(j=0,1\),
put

\[
 e_j(y)=\mathbf 1_{\{|y|_p=p^j\}},\qquad
 k_j(y)=\mathbf 1_{\{v_p(y)\ge-j\}}.
\]

Here \(e_j\) is a shell; \(k_j\) is the punctured ball, regarded
as a function on \(\mathbb Q_p^\times\). They are distinct
functions. Both are locally constant on the stated target domain.
Since \(v_p(y/p)=v_p(y)-1\),

\[
 k_j(y)-k_j(y/p)=e_j(y),
 \qquad k_j-\alpha_p(k_j)=e_j.
\]

No infinite sum is inserted into an algebraic tensor product or
crossed-product group expansion. The single ordinary function
\(k_j\) belongs to the actual target coefficient algebra.

The actual shell image of \(z\) is

\[
 z_j=(e_j/X)U_1\otimes(e_jX)U_1.
\]

The new group element \(U_p\) and its inverse \(U_{p^{-1}}\)
are available in \(D'\), because the target coefficient algebra
contains the constant function \(1\). The coefficients
\(k_j/X\), \(X\), and \((1-e_j)X\) are also allowed: they are
smooth in \(x\ne0\), locally constant in the finite coordinate,
and the target imposes no growth or support bounds.

## 3. A two-term conjugation homotopy

In any unital algebra \(B\), take an invertible \(u\), with
\(v=u^{-1}\). Define

\[
 L_0(q)=qv\otimes u,
\]

\[
 L_1(a\otimes b)=
 av\otimes u\otimes b-av\otimes(ubv)\otimes u.
\]

Direct expansion using \(uv=vu=1\) yields

\[
 bL_0(q)=q-uqv
\]

and

\[
 bL_1(a\otimes b)
  =a\otimes b-(uav)\otimes(ubv)
       +(ba-ab)v\otimes u.
\]

Consequently

\[
 bL_1+L_0b
     =\operatorname{id}-(\operatorname{Ad}_u)^{\otimes2}.
\]

Apply this identity in \(D'\) with

\[
 u=U_p,\qquad v=U_{p^{-1}},\qquad
 w_j=(k_j/X)U_1\otimes XU_1.
\]

The chain \(w_j\) is a cycle because its two coefficients
commute. Conjugation sends \(X\) to \(X/p\), so scalar
bilinearity of the tensor product gives

\[
 (\operatorname{Ad}_{U_p})^{\otimes2}w_j
  =\frac{p\,\alpha_p(k_j)}{X}U_1
        \otimes\frac XpU_1
  =\frac{\alpha_p(k_j)}XU_1\otimes XU_1.
\]

It follows that

\[
 bL_1(w_j)=
 \frac{k_j-\alpha_p(k_j)}XU_1\otimes XU_1
 =(e_j/X)U_1\otimes XU_1.
\]

This accounts for the real rescaling under \(p\); no
unjustified identification of adjacent shells is made.

## 4. The third tensor supplies the exact shell factor

Put

\[
 Q_j=(e_j/X)U_1\otimes e_jU_1\otimes(1-e_j)XU_1.
\]

Since \(e_j^2=e_j\) and \(e_j(1-e_j)=0\), the multiplication-only
boundary gives, with its second and third terms equal to zero,

\[
 bQ_j=(e_j/X)U_1\otimes(1-e_j)XU_1.
\]

Thus

\[
 F_j=L_1(w_j)-Q_j
 \qquad\text{satisfies}\qquad bF_j=z_j.
\]

For complete explicitness the filling is

\[
 \begin{aligned}
 F_j={}&
 ((k_j/X)U_{p^{-1}})\otimes U_p\otimes XU_1\\
 &-((k_j/X)U_{p^{-1}})\otimes(X/p)U_1\otimes U_p\\
 &-(e_j/X)U_1\otimes e_jU_1\otimes(1-e_j)XU_1 .
 \end{aligned}
\]

All three tensors belong to \(C_2(D')\) as defined. This is an
actual target boundary, not only a relation modulo source chains.

## 5. Signed and relative conclusions

The signed degree-one target map is the fixed linear combination
of the two shell algebra maps:

\[
 \Psi_{p,1}^{\times,S}(z)
       =z_0-p^{-1}z_1
       =b(F_0-p^{-1}F_1).
\]

With the paper's cone differential,

\[
 \Xi_{p,1}^S(0,z)
     =(0,z_0-p^{-1}z_1)
     =d(0,F_0-p^{-1}F_1).
\]

There is therefore no surviving logarithmic witness of the proposed
form. The heuristic factor \(1-p^{-1}\) is not a nonvanishing
argument: it omits the available coefficient \(k_j\) and the
explicit boundaries generated using \(U_p\).

The smallest unresolved problem remains finding a *different*
relative class whose transition image is provably nonzero, or
proving an appropriately stated vanishing result for the whole
transition system. Neither follows from the two tested classes.
The unrestricted target coefficient algebra is a concrete concern:
it admits the shell-tail coefficient and all three factors of the
filling above. Any proposed modification must specify which
existing maps and relative classes it still permits.
