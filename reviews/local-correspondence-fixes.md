# Part I review responses

## AGY round1

Actual review: `local-correspondence-review-round-1.md`,7684 characters, final verdict MINOR REVISIONS. No critical issues. One exposition item was labeled Major within that final minor verdict; it is addressed below along with all minor items and all three weak-paragraph comments.

1. Nonunital Hochschild convention: added an explicit opening paragraph to Section14 specifying uncompleted algebraic tensors over C, multiplication-only boundary, no unit or degeneracy maps, and that homology means the displayed complex. No equivalence with completed or relative complexes is asserted.
2. Fourier normalization: Definition2.1 now explicitly distinguishes the analytic transform from the unitary L2 normalization used in operator norms.
3. Character precision: Section4 now fixes e_p(x)=exp(2pi i fractional_part_p(x)) and specifies the Fourier integral with that character.
4. Topology versus norm wording: replaced the repetitive common-carrier paragraph with a direct statement of topological isomorphism and failure of isometry.
5. Weak pole paragraph: separated the algebraic cancellation from the criterion; stated the precise AppendixC equivalence on the two-moment subspace.
6. Weak ambient-sign paragraph: reduced four sentences to the ambient-sign result and the simultaneous gap conditions that localization does not preserve.
7. Weak geometric-comparison paragraph: wrote the required primitive cohomological sector, Hermitian pairing and complex-linear test map directly. Did not adopt the review's suggested conflation of the sector with the source complex. The sign and all boundary/degree qualifications remain unchanged.

All changes are expository or normalization clarifications. The theorem statements, formulas and cross-paper numbers are unchanged. No new arithmetic sign assumption was introduced.

## Codex formatting round1

Actual review: `local-correspondence-codex-review-round-1.md`,2258 characters, verdict NEEDS_FIX.

1. Sidebar-removal request: not adopted because the research-agent publication skeleton expressly requires the restrained GrokRxiv manuscript identifier, category and manuscript date. These are publication metadata, not agent activity or a registered DOI. Followup prompt clarifies this requirement for independent re-review.
2. Two potentially wide equations: split the analytic square and geometric comparison into aligned displays; preserved equation labels and numbers. The existing log had no actual overflow; the fresh log is included in the followup.
3. Real-exponent wording: named sigma explicitly.
4. Nonpositive-sign wording: changed to establishing the required nonpositivity.
5. Repeated caveats: shortened the chain-complex scope paragraph, removed the repeated list of absent structures after the chain square, and combined the pairing-comparison paragraphs.
6. Finite-calculation wording: replaced verified finite calculations with explicit error control, avoiding confusion with Lean.
7. Unused-package suggestion: kept the required house preamble skeleton; followup prompt distinguishes optional cleanup from genuine formatting issues.

The next external Codex invocation reviews the revised source and the actual compile log. No mathematical result or cross-paper numbering was changed.

## Codex formatting round2

Actual review: `local-correspondence-codex-review-round-2.md`,2264 characters, verdict NEEDS_FIX. The reviewer accepted the required sidebar and confirmed20 pages with no overfull/underfull boxes, undefined labels/citations, or rerun requests.

1. Introductory sign ambiguity: named the proposed primitive geometric pairing I as nonpositive and explicitly stated that the desired Weil form B_W=-I is nonnegative. The previous phrase arithmetic form was ambiguous.
2. Formalization traceability: added the actual companion repository bibliography entry, exact SoninShell and LocalFactor module paths, precise theorem identifiers for weights/bounds/signs/support vanishing, Lean toolchain and pinned mathlib commit, plus source-hash and proof-scope artifact paths. No scope was broadened.
3. Integrability wording: replaced integrable square integrable with L1(Qp) intersect L2(Qp).
4. Added requested PDF title, author, subject and keyword metadata before the final review so its source hash covers these changes.

The third Codex invocation receives the source, fresh log and auxiliary file, and explicitly named Lean/source-scope artifacts for read-only validation. This is the final allowed formatting invocation.

The initial queued runner for round3 was stopped before it acquired the mutex or started an external reviewer. The new traceability paragraph had introduced three overfull boxes. No round3 response, log or receipt existed. Breakable identifier formatting and sentence reflow removed all three; two clean20-page compiles preceded the actual third-review submission.

## Codex formatting round 3 and final artifacts

Actual review: `local-correspondence-codex-review-round-3.md`, 1,582 characters, verdict PASS. The reviewer verified the final source/build synchronization, 20-page output, resolved bibliography and internal references, primitive/Weil sign convention, exact Lean declarations, toolchain and source hashes. The everypage legacy warning was explicitly accepted as a nonblocking requirement of the house template. The full response was read and copied to `local-correspondence-codex-review.md` without alteration.

At this checkpoint, no manuscript changes had followed the passing review. Two final pdflatex runs succeeded. The publication PDF and 300-dpi cover were generated from that build. A fresh contact sheet covers all 20 pages; the first page, chain proof, all-degree Fourier failure, and closing scope/references were inspected individually. The log contained no overfull/underfull boxes, missing references or rerun requests.

## Post-review bibliographic locator correction

The bibliography checker verified that CCMar v1 equations (4.3) to (4.6) occur in Section 4 before subsection 4.1. At the root worker's request, the single source locator was changed from `Section 4.1` to `Section 4`. This is the only change from the Codex-reviewed source: replacing the corrected string with its prior value reproduces the reviewed SHA256 `92ce8891a7db2de6dfd6a98b3faa163bf146411e6d29bb83a7fba049eb64dcbb`. No fourth Codex invocation was made.

Two further pdflatex runs succeeded, preserving 20 pages and the identical auxiliary-file hash. The final PDF and 300-dpi cover were regenerated. Fresh 85-dpi renders show that only page 13 changed; it was inspected individually with no overlap or clipping. All other page images, including page 20, are byte-identical to the preceding inspected set, and the regenerated cover hash is unchanged. The fresh contact sheet was also inspected. Final source and artifact hashes are recorded in `local-correspondence-verification.json`; its review record now explicitly distinguishes the reviewed source from this locator-only revision.
