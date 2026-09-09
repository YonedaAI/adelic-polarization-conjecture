# Synthesis author render inspection

The synthesis author used Poppler 26.08.0 to render the actual compiled PDF, ImageMagick 7.1.2-31 to arrange a contact sheet, and the image-view tool to inspect the resulting PNGs in visual context. Text extraction and compilation checks supplemented, but did not substitute for, these image inspections.

## Mathematical-review draft

The 20 pages were rendered at 85 dpi under tmp/pdfs/synthesis-round-1/. The author viewed the all-page contact sheet and pages 8-10 and 15-16 separately at 150 dpi. These pages contain the restriction cone, chain-map calculation, relative exact sequence, origin class, central conjecture and moment decomposition. The visible mathematics was readable and unclipped. The initial montage produced a usable contact sheet but returned a missing-font warning; subsequent montages supplied the explicit ArnoPro-Regular.otf font and exited successfully.

## After AGY prose revisions, before Codex call 1

Source hash: 54bb96d4a38400eb9af4adf1301f2eef8988d64265563620f16a72054b0ead51.
PDF hash: d0980e407aceddb015cc19e1440de4971df587848d6feedf34f770315d89bc6f.

All 20 pages were rendered at 85 dpi in tmp/pdfs/synthesis-codex-1/ and inspected through contact.png. Individual 150 dpi pages 1, 3, 7-13, 15-16, 19 and 20 were opened and viewed. This includes the complete distribution and criterion, Hochschild and cone signs, relative commutator proof, entire normalization obstruction, compressed prime-square equations, exact local signs, conjecture, full moment decomposition and formal-scope ending.

The visible defect was the cross-page hyphenation of nonpositivity at pages 19/20. The author also clarified the autocorrelation support sentence after viewing page 13. These are the two changes in the first formatting fix pass. There were no missing math glyphs, clipped formulas or text overlaps.

The CLI text log omits the orchestrated image calls. An initial provenance question was resolved by inspecting the exact session record: call 1 really returned nine input_image blocks from four orchestration calls. The external visual findings are therefore supported, in addition to the author's independent inspection. The call IDs are recorded in reviewer-image-evidence.json.

## After Codex fix pass 1

Source hash: 91555b0abcab2e79784ee17ff1b4d8e5eab4797410b872504e3081e9a4052032.
PDF hash: 4dade3eca2005cd25f8756d94019ca60ae94039667ab72b2c91a4b1c5f8698ae.

All 20 pages were rerendered at 85 dpi in tmp/pdfs/synthesis-codex-2/. The author viewed its new contact sheet and individual 150 dpi pages 13, 19 and 20. The closing paragraph now begins intact on page 20, the mathematical support bound is explicit, and the document remains 20 pages. The standard paragraph-line penalties introduced no blank page or display clipping.

Codex call 2 ended PASS and its exact session record confirms four actual input_image blocks for the contact sheet and pages 13, 19 and 20. Final post-review compilation and cover verification are recorded below after their completion.

## Final 21-page transition-theorem version

Source hash: 042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41.
PDF hash: 6f0820549262ece9f032fa82b79eca9b1fc8c94dd1c3798f831122d2075eedd1.

After the final source changes, the manuscript was compiled twice and all 21 pages were rendered at 85 dpi under tmp/pdfs/synthesis-round-2/. The author viewed the complete contact sheet and individual 150 dpi pages 10, 11 and 12, containing the origin class, its prime-transition filling and the primitive-duality boundary. Additional current-PDF 150 dpi renders in tmp/pdfs/synthesis-codex-3/ were individually viewed on pages 1, 8, 9, 14, 15, 16, 17, 19, 20 and 21. This covers the restriction target, cone signs and exact sequence, local signs, intersection corrections, central conjecture, pole decomposition, operator-domain conditions, Lean scope and complete ending. No clipped displays, missing math glyphs, overlaps, blank pages or cross-page word splits were found.

The 300 dpi cover was regenerated from this exact PDF and viewed independently. It is 2550 by 3300 pixels, with PNG resolution 118.11 pixels per centimetre (300 dpi). Its hash is 1a49ab36fb1a04c1f11cb6dea8287f6efd7b864e0d4ad0279a9269774c11f0e8. The abstract now includes the compact-bump transition theorem.

The final external format reviewer actually opened eight images: the 21-page contact sheet and pages 1, 10, 11, 12, 16, 20 and 21. Both orchestration calls have matching outputs with four input_image blocks each; their IDs are preserved in reviewer-image-evidence.json. The source and reviewed PDF have not been changed during that review. The publication snapshot in team/synthesis/final/ preserves the exact source, auxiliary labels, compile log, metadata and PDF supplied to the final review.

That final Codex call ended PASS with no findings. Neither source nor PDF changed afterward. No extra metadata-only compilation was performed; the accepted and visually inspected PDF is the publication artifact. The exact hashes and inspection scope are recorded in research/synthesis-verification.json.
