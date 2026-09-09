# Adelic Polarization Conjecture

## Objective

Investigate arithmetic polarization through semilocal adelic spaces using the supplied arithmetic-polarization-direction.md and context repositories. Seek an independently constructed correspondence or a precise obstruction for a specified candidate. A proof whose arithmetic comparison or decisive sign is assumed does not satisfy the research objective.

Work in this repository. Treat both context repositories as read-only sources. Preserve the supplied context files. Produce two complementary research papers and a synthesis, Lean 4 code, a public GitHub repository with a description and README, and a modern mobile-first Vercel site. Send progress and final links to Slack channel C0AK269AVSA. Haskell is OFF: write no src/ directory. Social copy may be drafted locally; publication to social accounts is outside the requested scope.

## Research loop

Conjecture -> decompose -> formalize -> attempt proof -> find obstruction -> reformulate.

Every iteration records its concrete conjecture, definitions, attempted argument, verified result, obstruction, and next formulation in research/loop.md. The stopping condition for this publication cycle is a reproducible, reviewed mathematical result and an explicit account of the remaining construction problem. Do not promise a proof of RH or assert novelty without a comparison with primary sources.

## Work allocation

- Knowledge base: inspect the supplied files and verify the cited primary literature. Fix the Fourier, Mellin, convolution, and Weil sign conventions before drafting.
- Part I, local-correspondence: local Euler factors, prime-adjoining maps, logarithmic variation and local distributions. Investigate an actual correspondence and specify the exact limits of the construction.
- Part II, polarization-obstructions: independently test the proposed compatibility, primitive sector, support-indexed gluing, and completion. Seek a precise obstruction for the chosen candidate and develop a corrected formulation.
- Lean: implement arithmetic definitions and proved local results, then formalize any tractable structural obstruction. Compile the actual code and audit theorem axioms. No sorry, admitted arithmetic axioms, preselected zero spectrum, or hidden Weil-positivity input.
- Synthesis: reconcile both parts and the formal results into one conjecture with explicit maps, domains, boundary terms, and remaining mathematical obligations.
- Website: build the paper browser and have separate HTML/layout and mathematical-content fixers inspect generated pages before publication.

Mathematical drafting and Lean work run in parallel after the knowledge base. Each worker owns its files and an interface contract. External reviewer calls are serialized through .review.lock.

## Mandatory publication checks

1. Run AGY peer review for every paper and synthesis. Preserve every round and iterate through corrections to ACCEPT or MINOR REVISIONS, with at most four rounds.
2. Run an external Codex formatting and prose check for every paper after its mathematical review.
3. Run an external Codex website review before Vercel deployment.
4. Send Slack notifications for each completed paper, synthesis, Lean verification, deployment, and final delivery.
5. Apply review-fix loops and substantive review-file checks; missing or invalid reviews cannot be called acceptance.
6. Use the session's unrestricted filesystem and never-ask execution policy for the team. The native collaboration API inherits these permissions and has no separate bypassPermissions argument. External reviewers remain read-only.
7. Format every Slack URL as a Markdown link on its own line with a clean label.
8. Lint every Slack message and run an independent pipeline-validator before the final completion message.

## Evidence and presentation

Use the research-agent master writing standard and humanizer editing pass. Keep operational logs in research/, reviews/, and team/. Present results in papers and the site through ordinary mathematical exposition. Validate citations against primary sources, compile PDFs, inspect rendered pages, build Lean, and inspect static and live web output on mobile and desktop. Do not equate compilation with mathematical completeness or HTTP success with correct layout.

The research-agent paper-format skeleton controls typography where its older worker template conflicts: 11pt letterpaper, margin=1in, ordinary abstract and theorem environments. Use substantial derivations and examples, not padding, to support the requested research papers.

## Current state

The two worker papers contain 20 and 21 pages. Both addressed substantive AGY minor revisions and passed final Codex formatting checks. The Lean project has 46 explicit theorems, a successful build, a complete standard-axiom audit, and independent Codex PASS. Eight primary sources and all recorded context hashes have been checked.

The independent integration gate passed after resolving two cross-paper notation collisions. The 21-page synthesis received AGY ACCEPT and final Codex PASS on the exact final source. Its additional proof shows that the compact-bump origin class becomes a boundary after either shell embedding. A separate, coordinator-checked working note finds the same failure for the simplest logarithmic cokernel witness. Neither result constructs a surviving primitive space or the required pairing.

All three papers passed independent mathematical HTML fidelity checks: 1,846 formulas and 225 equation numbers, with matching source/PDF/HTML downloads. Responsive checks include the new synthesis proof. The production Vercel build passes. External website review, public source push, deployment, live checks and the final pipeline validator remain publication gates.

The next research cycle is gated by an actual surviving family and nontrivial test-function map. No further broad formalization or manuscript expansion is part of this cycle; the two bounded survival tests and their exact limitations are recorded in research/loop.md.
