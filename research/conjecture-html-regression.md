# Conjecture numbering regression

The converter previously omitted conjectures from its shared theorem counter and rejected named references with the `conj:` prefix. A synthetic, compiled fixture now checks both ordinary and appendix conjectures, the intervening proposition counter, named references, anchors, and the unchanged formula count. This is a converter regression, not evidence about a research theorem.

Before the fix, `node scripts/test-conjecture-preservation.mjs` failed with `Unknown named cross-reference: conj:middle`. After adding the conjecture environment to the counter, heading adapter, reference names, and full-paper fidelity selector, the same test passed. Its four headings are `Theorem 1.1`, `Conjecture 1.2`, `Proposition 1.3`, and `Conjecture A.1`.

The test compiles a copied fixture twice in a newly generated temporary directory and runs the actual converter there. It never substitutes synthetic data for any publication paper. Full manuscript conversion, source-matched label checks, and final mathematics preservation remain separate gates.
