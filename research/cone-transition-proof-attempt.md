# One prime kills the explicit compact-bump origin class

Date: 2026-09-09 UTC. Scope: the actual algebraic restriction cone in
`papers/latex/synthesis.tex`, Definition `def:cone` and maps `eq:cone-map`.
This note proves a transition result; it does not introduce a polarization,
a primitive projection, a completion, or a new Lean theorem.

## Result

Let \(S\) be finite and contain infinity. Take a compactly supported
Bruhat-Schwartz function \(f\) on \(\mathbb A_S\), with \(f(0)=1\).
Write \(s=-1\), let \(X\) be the real coordinate on the invertible locus,
and consider the explicit nonzero cone class represented by

\[
 a=fU_s,\qquad c=-XU_1\otimes\frac{r_S(f)}{2X}U_s.
\]

For every prime \(p\notin S\),

\[
 [\Xi_{p,1}^S(a,c)]=0
 \quad\text{in }H_1(\mathscr C_{S\cup\{p\}}).
\]

In fact, each of the two shell embeddings separately sends this cycle
to an explicit cone boundary. Thus the origin class constructed using
a compact bump does **not** survive even one prime transition. Its
vanishing in the resulting filtered direct limit follows immediately.
This does not prove that all relative classes vanish or that a suitable
primitive sector cannot exist.

The compact-support hypothesis concerns the real coordinate as well as
the finite coordinates. It covers the bump explicitly chosen in the
paper. The argument below does not claim the result for an arbitrary
noncompact Schwartz function merely by inserting a compact cutoff.

## 1. Odd signs on either shell, including the prime 2

Fix either shell \(e=e_j=\mathbf 1_{\{|y|_p=p^j\}}\), \(j=0,1\).
There is a locally constant, compactly supported complex-valued
function \(h\) on \(\mathbb Q_p\) with

\[
 h(-y)=-h(y),\qquad h^2=e.
\]

Here is a finite construction, requiring no choice of discontinuous
sign. On the shell put \(u=p^j y\in\mathbb Z_p^\times\).
For odd \(p\), the involution \(u\mapsto-u\) has no fixed residue in
\((\mathbb Z/p\mathbb Z)^\times\). Choose one residue in each of its
two-element orbits, set the sign to \(+1\) on those residue classes
and to \(-1\) on their negatives. For \(p=2\), use the two unit
residues modulo \(4\): sign \(+1\) on \(1\bmod4\) and \(-1\) on
\(3\bmod4\). Set \(h=0\) off the shell. The shell and all pieces
are compact open. Consequently \(h\) is Bruhat-Schwartz, also at
zero and at the boundary of its support.

The sign \(h\) need not be invariant under every old arithmetic unit.
No step below asserts such invariance. Its only required transformation
rule is under \(s=-1\). The shell \(e\), in contrast, is invariant
under every old arithmetic unit, as required for the original algebra
embedding.

## 2. A source commutator with genuine Schwartz factors

Choose an even compactly supported Bruhat-Schwartz function
\(\chi\) on \(\mathbb A_S\) that is identically \(1\) on
\(\operatorname{supp}(f)\cup-\operatorname{supp}(f)\).
Such a cutoff is obtained by a smooth compact real cutoff and finitely
many compact-open finite-coordinate cutoffs, chosen even. Thus
\(\chi f=f\) and \(\alpha_s\chi=\chi\).

In the new source algebra \(\mathcal A_{S\cup\{p\}}\), define

\[
 K=(h\otimes\chi)U_1,\qquad
 Z=\tfrac12(h\otimes f)U_s,\qquad t=K\otimes Z.
\]

Both coefficients really are Bruhat-Schwartz; in particular, this
does not insert the non-Schwartz old constant \(1\) into the source.
With the actual action \(\alpha_sF(y,x)=F(-y,-x)\), multiplication
gives

\[
 KZ=\tfrac12(e\otimes\chi f)U_s
     =\tfrac12(e\otimes f)U_s,
\]
\[
 ZK=\tfrac12(h\otimes f)\alpha_s(h\otimes\chi)U_s
     =-\tfrac12(e\otimes f\chi)U_s.
\]

For the multiplication-only Hochschild boundary,

\[
 bt=KZ-ZK=(e\otimes f)U_s=:a_e.
\]

This proves source homology vanishing. The rest of the argument is
needed to prove the stronger assertion about the *relative* class.

## 3. The residual target cycle

From here, all old functions in target expressions are restricted to
the invertible locus, and products such as \(ef\) denote the indicated
product in the two sets of local coordinates. Write
\(D=\mathscr D_{S\cup\{p\}}\), and put

\[
 A=(eX)U_1,\qquad B=\frac{ef}{2X}U_s,\qquad c_e=-A\otimes B.
\]

These are exactly the two factors obtained by applying the shell
embedding to the original target chain. The coefficient \(f/(2X)\)
belongs to the paper's stated target algebra because \(X\ne0\)
there and no growth restriction is imposed. Since
\(\alpha_sX=-X\) and \(\alpha_se=e\),

\[
 AB=\tfrac12efU_s,\qquad BA=-\tfrac12efU_s,\qquad
 bc_e=-r(a_e).
\]

Identify \(r(K),r(Z)\) with \(K,Z\) only in target formulas and set

\[
 z=r_*(t)+c_e=K\otimes Z-A\otimes B.
\]

Then \(bz=r(bt)+bc_e=0\). The fact that \(z\) is a boundary
cannot be inferred from \(bt=a_e\); it is proved explicitly next.

## 4. An explicit Hochschild filling in a target corner

Let \(P=eU_1\in D\) and \(H=hU_1\in D\). All four elements
\(A,B,K,Z\) belong to the corner algebra \(R=PDP\).
This corner has unit \(P\), and \(H\in R\) satisfies
\(H^2=P\). The coefficients \(e,h\), independent of the old
coordinates, are allowed in the target, even though they would not
be allowed as such in the Schwartz source.

No assertion that \(P\) is central in the full new crossed product
is needed. In particular the newly available group generator \(p\)
may move the shell. Membership in this corner is enough for every
calculation, and the inclusion of its algebraic Hochschild complex
into that of \(D\) is a chain map.

For \(q\in R\) and elementary degree-one tensors define

\[
 L_0(q)=qH\otimes H,
\]
\[
 L_1(u\otimes v)
   =uH\otimes H\otimes v
       -uH\otimes(HvH)\otimes H.
\]

Using only \(H^2=P\) and associativity,

\[
 bL_0(q)=q-HqH,
\]

and direct expansion of all six boundary terms gives

\[
 bL_1(u\otimes v)
 =u\otimes v-(HuH)\otimes(HvH)
      +(vu-uv)H\otimes H.
\]

Indeed, the two terms \(uH\otimes Hv\) cancel; the other four
are exactly the displayed terms. Therefore

\[
 bL_1+L_0b=\operatorname{id}-(\operatorname{Ad}_H)^{\otimes2}.
\]

Conjugation by \(H\) fixes \(A,K\), which are coefficient
elements. It negates \(B,Z\): for example

\[
 HZH=h\,\frac{hf}{2}\,\alpha_s(h)U_s
   =-\frac{hf}{2}U_s=-Z.
\]

Here \(HZH\) is ordinary algebra multiplication. Likewise \(HBH=-B\).
Thus \((\operatorname{Ad}_H)^{\otimes2}z=-z\), and since
\(bz=0\), the explicit chain

\[
 F=\tfrac12L_1(z)\in C_2(D)
\]

satisfies \(bF=z\). Fully expanded, it is

\[
 F=\tfrac12\bigl(
 KH\otimes H\otimes Z+KH\otimes Z\otimes H
 -AH\otimes H\otimes B-AH\otimes B\otimes H
 \bigr).
\]

This uses the actual, unnormalized, multiplication-only complex.
There is no invocation of a twisted-sector decomposition, normalized
bar comparison, excision, completion, or invariance theorem for
Hochschild homology: the four displayed three-tensors provide the
filling directly.

## 5. Cone signs and the signed transition

The cone differential in degree two is

\[
 d(t',F')=(-bt',bF'+r_*(t')).
\]

Consequently

\[
 d(-t,F)
  =(bt,bF-r_*(t))
  =(a_e,z-r_*(t))
  =(a_e,c_e).
\]

For \(j=0,1\), make the above choices on the shell \(e_j\),
obtaining \(t_j,F_j\). The actual signed transition has the
same coefficients in both cone summands, not their tensor powers:

\[
 \Xi_{p,1}^S(a,c)
  =(a_{e_0},c_{e_0})-p^{-1}(a_{e_1},c_{e_1})
  =d\bigl(-t_0+p^{-1}t_1,\ F_0-p^{-1}F_1\bigr).
\]

## Consequence for the research loop

The compact-bump origin class proves nonzero relative homology at
each fixed finite stage, but it cannot justify a stable arithmetic
sector: its image vanishes after any one-prime signed transition.
This is a proved failure of this particular witness, not merely
failure of its trace detector.

The next useful question is whether a *different* class in the
actual cone survives the transition system. In particular, the
cokernel term involving target degree-one homology is not disposed
of by the calculation above. Claims about all of that cokernel,
the entire direct limit, a primitive test map, or positivity require
additional arguments. This note makes none of those claims.
