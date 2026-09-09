# Synthesis review fixes

## AGY round 1

The actual external review is synthesis-review-round-1.md, with its unmodified receipt. It ended VERDICT: MINOR REVISIONS. The review listed prose repetition under a major-findings heading but identified no mathematical correction and used a minor-revisions terminal verdict. All actionable requests have been addressed.

- Condensed the paragraph after the cone-map proof to describe the constructed input and the ensuing homology question directly.
- Rewrote the origin-class discussion around the concrete decision required of a degree projection.
- Shortened the paragraph following the conjecture to the exact topological objects and continuity proofs still required.
- Replaced the closing repeated exclusions with the remaining duality construction problem.
- Retained scope qualifications where they affect a theorem's hypotheses, the known full-kernel criterion, the proposed cone's status, or Lean coverage. Moving those mathematical qualifications only to the introduction would make the local statements less precise.
- Tightened the zero-count source locator to Connes 2026, Section 2.1.5, following an independent bibliography check.

The reviewed input is preserved in team/synthesis/round-1/; the revised, twice-compiled source, auxiliary file, log, metadata and PDF are in team/synthesis/codex-1/. The revisions change exposition and a citation locator, not theorem statements or proofs.

## Author verification before Codex round 1

The revised source compiles to 20 letter-size pages with the required 11-point type and one-inch margins. The log has no overfull/underfull boxes, undefined references, repeated labels or rerun warning. The project paper-style checker and Lean-reference checker pass. Fresh existing raster previews are supplied to the external reviewer; independent author visual inspection is recorded separately.

## Codex round 1 and fix pass 1

The actual review ended VERDICT: NEEDS_FIX, with one minor typography issue and no critical or major findings. The word nonpositivity divided across pages 19 and 20. Standard club, widow and broken-word penalties now prevent lone paragraph lines and cross-page hyphenation; no forced page break or artificial space was added.

During the author's image inspection, the sentence explaining autocorrelation samples was also made more precise: its support is contained in [-2 epsilon, 2 epsilon], with 2 epsilon less than the lattice spacing. The former phrase support shorter than the lattice spacing could be read as a statement about total interval width. The corrected sentence states the radius condition actually used in the unchanged proof.

The CLI text log did not display the orchestrated image calls, so the author initially withheld credit for the report's raster claim and asked call 2 to make its scope explicit. A later audit of the exact reviewer session records resolved this uncertainty: call 1 returned nine actual input_image blocks from its requested previews, and call 2 returned four. Both external visual reviews are supported. The original prompt and report remain unchanged as historical records; team/synthesis/reviewer-image-evidence.json records the actual call IDs and counts. The author also viewed the contact sheet and individual pages 1, 3, 7-13, 15-16, 19 and 20 independently.

## Codex round 2

The actual review ended VERDICT: PASS with no critical, major or minor findings and no remaining corrections. It verified the two edits, retained 20-page canonical typography, exact notation, mathematical scope and Lean boundaries. No source edit followed this review. The source was compiled twice again for the final publication PDF, and fresh final renders and the 300 dpi cover were generated.

## Bounded transition theorem and AGY round 2

At the coordinator's request, the reviewed 20-page snapshot was preserved in team/synthesis/pre-transition/ before inserting Proposition 8.3. The new result proves that the explicit compact-bump origin cone class becomes a boundary under each shell embedding, and hence under a signed prime transition. Its complete proof includes the prime-2 local signs, a genuine compact Schwartz cutoff, the noncentral target corner, the four-term Hochschild filling and the cone differential signs. The abstract, introduction and conclusions were updated only where needed to state the stronger result and its witness-specific scope.

AGY round 2 ended VERDICT: ACCEPT on source 042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41. There were no requested corrections. One incidental sentence in the review says that X is even; X is the odd real coordinate. This explanatory slip is not adopted: as the manuscript correctly states, conjugation by H fixes A and K because they are coefficient elements, and H commutes with the coefficient algebra in the shell corner. The proof uses oddness of h only when the crossed-product factor U_-1 occurs. No source change is needed.

## Codex round 3 and final artifacts

The third and final Codex call ended VERDICT: PASS, with no critical, major or minor findings and no remaining corrections. It read the full 1,707-line source and the pre-transition diff, checked the current 21-page PDF, log, auxiliary labels and metadata, verified the unchanged Lean manifest and declaration scope, and actually opened eight supplied raster images. Its reviewed source hash equals the accepted AGY round-2 hash and the final source hash. No manuscript change followed either final review.

The final PDF is the exact twice-compiled PDF supplied to call 3, not a later metadata-only rebuild. Its 300 dpi cover was regenerated from that PDF. All 21 pages were inspected as a contact sheet, thirteen mathematical/title/ending pages individually, and the cover separately. The exact source, PDF, auxiliary, log, cover, review and render hashes are in research/synthesis-verification.json. The canonical review files and their receipts are copies of the unmodified round-2 AGY and round-3 Codex outputs.
