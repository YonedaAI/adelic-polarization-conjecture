# Final independent publication gate

Checked 2026-09-09 UTC in `/Users/mlong/Documents/Development/magneton_work/adelic-polarization-conjecture`. This is the final publication validator, not another mathematical peer review or a claim that the polarization conjecture is proved.

The validator read `team/final-validation-brief.md`, the complete pipeline-validator agent definition, and the current canonical `paper-format.md`. The explicit current requirement is 11pt letterpaper with one-inch margins. That requirement supersedes the validator definition's obsolete rejection of `margin=1in`; it is not a waived failure.

The checked GitHub snapshot is `9bf06b81707c0f313a922a7b9149dd0cc0441b3b`. Local HEAD and origin/main both match it. The only pre-existing uncommitted change at entry was the coordinator's refreshed public-archive audit. The validator made no manuscript, implementation, deployment, Git, Slack, social-account, or context changes. Its only repository write is this report. Two isolated test scripts created their own diagnostic temporary fixtures outside the repository.

## A. OG image quality

ImageMagick measured every PNG in `website/public/og/`.

| File | Dimensions | Bytes | Pixel standard deviation | Result |
|---|---:|---:|---:|---|
| `home.png` | 1200x630 | 486992 | 0.0954764 | PASS |
| `local-correspondence.png` | 1200x630 | 485781 | 0.0991532 | PASS |
| `og-default.png` | 1200x630 | 486992 | 0.0954764 | PASS |
| `polarization-obstructions.png` | 1200x630 | 483701 | 0.0993138 | PASS |
| `synthesis.png` | 1200x630 | 484451 | 0.0945024 | PASS |

PASS: all five exceed the 30000-byte and 0.08-variation thresholds. The validator opened the home and synthesis cards and inspected their actual pixels: full designed canvases, legible titles and diagram, no letterboxed thumbnails, clipping or overlapping text. The live desktop card screenshot independently shows the three paper-specific cards.

OG IMAGES: PASS.

## B. Exact final Slack message

The literal complete input is `reviews/slack-final.md`, not regenerated copy. `bash scripts/slack-lint.sh reviews/slack-final.md` exited 0.

- PASS: every URL is inside a standard Markdown link.
- PASS: no link is followed by a bleeding bold marker.
- PASS: no Slack-native angle-bracket links occur.
- PASS: bold markers are balanced on every line.
- PASS: both links occupy separate lines, separated from prose.
- PASS: the Vercel link equals the saved production origin exactly; the GitHub link names this project.
- PASS: the text states 20/21/21 pages and 46 local Lean theorems, distinguishes the separately checked logarithmic working note, and explicitly denies a surviving primitive family, arithmetic pairing, geometric sign theorem or RH proof. It does not claim that all cone classes vanish.

Checked message SHA256: `be78441f1e510a482a1f4ffc47b3410b57171f6fad508a4a47f66c0470829fc1`.

SLACK MESSAGE: PASS. This authorizes only this exact checked message as the next publication notification; the validator has not sent it.

## C. Saved URL and public availability

PASS: `.vercel-url` is nonempty and was read directly. Its value is `https://adelic-polarization-conjecture.vercel.app`, matching the project name and `research/deployment.json`. The deployment record identifies production deployment `dpl_CiNe6GTx5Zn7ozaRGPiXTrryUU35`, state READY, and the actual alias returned after the prebuilt deployment.

The validator fetched the production homepage and all three article routes anonymously, without following redirects. All four returned 200 and their complete response bodies matched the current local export and recorded SHA256 values. The nonexistent `/does-not-exist-apc-check/` returned 404. The existing anonymous audit of all 84 linked assets was also revalidated against the exact current local bytes; this validator did not repeat those 84 network transfers.

PASS: all 19 files in the refreshed public archive audit were independently fetched anonymously from GitHub's raw public origin at commit `9bf06b81707c0f313a922a7b9149dd0cc0441b3b`. Every response returned 200 and matched both the recorded hash and current local file. These include all three TeX sources, all three PDFs, all five Lean modules, both pins, README, the saved URL, both transition working notes, the live browser report and the exact final Slack message. The archive is populated, not merely an existing repository URL.

VERCEL URL: PASS. PUBLIC ARCHIVE: PASS.

## D. Required publication artifacts

PASS: all 19 required nonempty artifacts exist.

| Common artifact | Result |
|---|---|
| `README.md` | PASS |
| `.knowledge-base.md` | PASS |
| `website/theme.json` | PASS |
| `website/public/og/og-default.png` | PASS |

| Paper slug | TeX in `papers/latex/` | PDF in `papers/pdf/` | HTML in `docs/papers/` | OG in `website/public/og/` | Cover in `images/` |
|---|---|---|---|---|---|
| `local-correspondence` | PASS | PASS | PASS | PASS | PASS |
| `polarization-obstructions` | PASS | PASS | PASS | PASS | PASS |
| `synthesis` | PASS | PASS | PASS | PASS | PASS |

All filenames use the corresponding slug and extension. Actual PDF metadata confirms 20, 21 and 21 letter-size pages. The current source/PDF/auxiliary/cover hashes match the final author verification receipts. Compiled and publication PDFs are byte-identical. Current logs contain no TeX error, undefined reference/citation, duplicate-label, overfull/underfull-box or rerun requirement. The required legacy `everypage` notice is already correctly classified as nonblocking by the final format reviews.

The substantive page-count gate is supported by the mathematical reports and current content inventories: 7009, 7727 and 8251 converted words, 19/19/10 theorem-like environments and 100/49/76 equation numbers, with actual proofs and developed constructions. The complete final formatting reports inspected the substantive ending pages. The manuscript format uses ordinary 11pt single-spaced text, not enlarged type, injected filler pages or presentation slides. This gate does not infer correctness from page count.

ARTIFACTS: PASS.

## E. Style and format

`python3 scripts/check-papers.py` was rerun and exited 0 with `STYLE GREP: CLEAN`, `HUMANIZER: CLEAN` and `FORMAT: PASS`.

| Paper | Filler/vocabulary screen | Abstract | Class and margins | Title and paragraph format | Result |
|---|---|---|---|---|---|
| Part I | clean | 224 words, one paragraph, no citations | 11pt letterpaper, 1in | current canonical format | PASS |
| Part II | clean | 221 words, one paragraph, no citations | 11pt letterpaper, 1in | current canonical format | PASS |
| Synthesis | clean | 233 words, one paragraph, no citations | 11pt letterpaper, 1in | current canonical format | PASS |

PASS: all papers retain `maketitle` and do not load a `parskip` package. The final style and human-readable records were read and their source hashes match current sources. Their exclusions are mathematical scope qualifications, not hidden proof claims. The canonical format reviews and explicit fix dispositions cover the remaining layout and prose checks.

STYLE/FORMAT: PASS.

## F. Review provenance and exact revisions

PASS: all three complete canonical AGY reports, final Codex formatting reports and fix ledgers were read. Parts I and II each received MINOR REVISIONS with the requested changes addressed; synthesis received ACCEPT on its exact final source, including Proposition 8.3. All three final formatting reports end in PASS. Their raw bytes match their SHA256 receipts and remain unmodified. Each paper stayed within three actual Codex formatting invocations; synthesis used two AGY invocations and each worker paper one.

PASS: the final independent integration report ends INTEGRATED and checks the exact current worker source and auxiliary hashes. The two post-formatting changes are disclosed, not represented as externally reviewed final snapshots:

- Part I: reversing only the CCMar locator from Section 4 to Section 4.1 reproduces reviewed source `92ce8891a7db2de6dfd6a98b3faa163bf146411e6d29bb83a7fba049eb64dcbb` exactly. Its current clean compilation and author receipt preserve numbering and identify page 13 as the only changed render.
- Part II: reversing exactly 46 test-map substitutions and the restricted-carrier introduction reproduces the preserved pre-integration source and reviewed hash `950ffcbcac22b206c27a1405017c69ff7e39c17ad7ed36a40943b6ebeb03e7c4`. The current auxiliary hash equals the integrated receipt. The author recorded fresh inspection of the six affected pages; the independent integration review checked the complete diff and artifact linkage.
- Synthesis: both final external reviews pin the actual current source `042b9e0e...12f41`; no later source or PDF change is represented. The validator checked its four main artifact hashes and 44 additional nested receipt, review and render hashes. The reviewer-image evidence documents actual image openings. The AGY report's incidental statement that the real coordinate is even is expressly rejected in the fix ledger; it is not adopted by the manuscript.

PASS: the external Lean code review is substantive and ends PASS with zero blockers. Its optional redundant-hypothesis observation has an explicit disposition.

PASS: the external website review is substantive and ends PASS. Its first 900-second timeout is not counted as a pass; the second actual invocation resumed the same external session. The receipt and disposition disclose sandbox limitations for fixture creation and report writing, and do not claim a live browser audit. The website subtree has no changes since the recorded reviewed commit `c2516d142f30ba978fea0dfafb9114ac1434324d`. The review preceded deployment.

REVIEWS AND INTEGRATION: PASS.

## G. Lean, bibliography and mathematical scope

PASS: all ten files in `research/lean-source-sha256.txt` match. The five module declarations, JSON inventory and 46 axiom-audit entries have exactly the same theorem names. Every audited dependency is among `propext`, `Classical.choice` and `Quot.sound`; no project `sorry`, `admit` or added axiom was found. Lean is pinned to `leanprover/lean4:v4.30.0-rc2`, and the installed manifest pins mathlib to `0f9072dd907c6e2e4264ab241a049cab50137f7c`. The recorded successful 3322-job build and independent review's successful build/axiom audit apply to the unchanged hashed sources. This final publication gate did not run another Lean build.

PASS: `node scripts/check-lean-references.mjs` was rerun and confirms all 16 manuscript references against actual APC declarations. The library does not claim smooth-test construction, p-adic realization, Hochschild/cone formalization, a geometric pairing, Weil positivity or RH. No Haskell implementation or root `src/` directory exists.

PASS: the bibliography records identify eight versioned primary mathematical sources, exact supporting sections and the twelve synthesis companion imports. Their known corrections and attribution limits are explicit. The validator independently confirmed that the final synthesis bibliography is byte-identical to the preserved independently checked snapshot. The current paper hashes, label checks and public-source availability close the stated release dependencies. This is receipt and citation-provenance validation, not a new literature or priority survey.

PASS: README and `research/loop.md` distinguish the reviewed compact-bump origin-class boundary from the coordinator-checked logarithmic working note, which remains outside external manuscript review and Lean. Both are witness-specific vanishing results. Neither establishes a stable primitive family or kills all cone homology. The next gate remains a surviving family with a nontrivial test-function map before substantial further formalization; a pairing, comparison and geometric sign remain unresolved.

LEAN, BIBLIOGRAPHY AND CLAIM SCOPE: PASS.

## H. HTML fidelity and production presentation

All four requested checks were executed successfully:

- PASS: `verify-export.mjs` completed every original assertion. Its sole final report write was intercepted and allowed only after confirming the serialization is byte-identical to the existing report; no evidence file was rewritten.
- PASS: `test-math-preservation.mjs local-correspondence polarization-obstructions synthesis` confirmed exact formula tokens, MathML/SVG trees, numbering, theorem environments, citations, anchors and initial HTML.
- PASS: `test-conjecture-preservation.mjs` exercised shared theorem/conjecture counters, appendix numbering, named references, anchors and formulas in an isolated fixture.
- PASS: `test-article-preview.mjs` exercised selected preview generation, unknown-slug rejection, static mathematics, license copies and unchanged publication artifacts in an isolated fixture.

PASS: all current source/PDF/auxiliary, JSON, label-cache, article HTML and recorded script hashes in the independent mathematical-fidelity receipt were checked. Public, exported and documentation article bytes agree. The initial pages contain 1846 formulas, 1846 MathML representations, 225 accessible equation numbers and 48 theorem-like environments. Synthesis Proposition 8.3 is retained, and Conjecture 13.1 remains a conjecture. Standalone static articles are deliberately not Next page components; their live routes and assets resolve.

PASS: the complete production browser report records real Chrome checks at 390px and 1280px on all four routes, plus synthesis at 360px. Document width equals viewport width; all article checks record zero inline overflows, tag collisions and wide displays missing keyboard access. Wide equations scroll in their outer `.math.display` regions; the live ArrowRight test moved the focused equation without horizontally scrolling the document. Mobile contents opened and closed by keyboard and both contents views identified the actual selected section. All seven live screenshots exist. The validator separately opened the 360px synthesis conjecture screenshot and the 1280px three-card screenshot: text, layout and mathematical status are legible without overlaps. The validator relies on the dedicated browser worker for the recorded interactive measurements, not on static screenshots alone.

HTML FIDELITY AND LIVE PRESENTATION: PASS.

## I. Drafts, repository hygiene and context preservation

PASS: exactly twelve current draft files cover three papers on Twitter, Bluesky, LinkedIn and Facebook. Each hash matches `research/social-drafts-verification.json`; frontmatter says `status: draft`, and both frontmatter and body use the saved real paper URL. Fresh counts satisfy Twitter's 280-character and 3-5-hashtag limits, Bluesky's 300-character and 2-3-hashtag limits, and LinkedIn's 200-400-word, 3-4-paragraph, 5-8-hashtag and paper/GitHub link requirements. Facebook bodies contain no Markdown styling, headings or bullets; their required hashtags are plain text. Synthesis copy explicitly states witness-specific failure and an unconstructed pairing, not an RH proof or a priority claim. These are local files only, not authorized social-account publications.

PASS: all 16 recorded context-file hashes were independently recomputed and unchanged. The 340 tracked paths contain no supplied context exports, dependency caches, Haskell files or real environment files; the only environment example is the intended `website/.env.example`. A credential-pattern screen of tracked text files found no private-key headers or the checked token patterns. This is a scoped screen, not a claim to prove absence of every conceivable secret.

PASS: authored-file staged and working-tree whitespace checks passed with the documented raw-review exclusions. External response bytes were preserved so their receipts remain valid. There were no staged changes made by this validator.

DRAFTS AND HYGIENE: PASS.

## Exact checked hashes

| Artifact | SHA256 |
|---|---|
| Part I source | `40ac3940ec7ad4a1eb5d37ee0395f542464ccc0cc7da7783e8870f95bbf75f4a` |
| Part II source | `6ad7e950fc1c758fb9007e15f8c77e5a2c7456c2b55a7ab26c19cf6458d165ee` |
| Synthesis source | `042b9e0e2ccd6e916cd707858bd8cd1e02cda3afd778afeb926b61754aa12f41` |
| Part I PDF | `6b0d956ec7c5612103698b295fbbb7d9a65ddfcaacd4c350993295c41b0e42d4` |
| Part II PDF | `013f6cd880274c8944a043c3e08feec14320ae4ebd84c4321491f56afa9453da` |
| Synthesis PDF | `6f0820549262ece9f032fa82b79eca9b1fc8c94dd1c3798f831122d2075eedd1` |
| Part I AGY review | `1c64bf0da1fdfe0d8b7313aac584cde173c947d75c826665d2f63c89fcc3ee74` |
| Part I Codex format review | `f5c98e41d6d0e3505404f0526dffe23ada3a76a8ba711d5076dd660c2d3a3a41` |
| Part II AGY review | `47bb3f3761286459998869451a4fa14797eeefc6dbe4e9a44e2603a78aae59fb` |
| Part II Codex format review | `f715c8d67f2ad653f027f6ece432e4dbbeed1beab55fad9caf0416df4124fd4d` |
| Synthesis AGY review | `4117132030a7b78822a7744df8b79ad99ed3d89ee03d7fd1407aa1f12c6779c1` |
| Synthesis Codex format review | `f794773b745b7b1ae9bf919f514fa90016e64d17ea68d418c684cebdf7321501` |
| Lean Codex review | `d534a62a746642d52ac68fead5b9ff8f6f59d81c09ada84ffed6dace0298cb07` |
| Website Codex review | `8ea64750dbe2a0db58e53fb145f648598b328d2f594088bf43b7e1a2721bc67f` |
| Independent integration report | `c18ad6f9e690fb255ccae94f7676291add6fa64a8134af9141f994bba24d3c84` |
| Lean source manifest | `d714df4f2e137f5a3dfa0344b488fd46e3bae83680ee7188d41afc231255ba2c` |
| Final math/HTML receipt | `1906c48ba3db8093e3ec7acbbeb1c89830216043bde8218578ba5168ca6ce0d0` |
| Production browser report | `4527d2728b7b0329a0484efc2d9f6c4ccdf61eec5662c85a27bbe3624d61740e` |
| Production HTTP receipt | `136ac90b8722c02ee513a4a33abc46d83c2a6b69e2193806ad9d97e6ea910c21` |
| Refreshed public archive receipt | `5d51df8c697f99e031176379c832a254398a0c0e79c1f3baf0b550b5a3ccdb60` |
| Social draft receipt | `894c8e3f157ef256ae9b9510d81f5751d37ac1241f12595c1d13bcfd5d6cfbad` |
| Exact pending Slack message | `be78441f1e510a482a1f4ffc47b3410b57171f6fad508a4a47f66c0470829fc1` |

One diagnostic script initially used an incorrect literal for reversing Part II's carrier line and then treated `git diff --no-index`'s expected nonempty-diff exit 1 as a command error. No files changed. The corrected exact substitution was rerun successfully and reproduced the preserved external-review hash. This was a validator harness issue, not a product defect or an unresolved gate.

## Pipeline validator summary

```text
OG IMAGES:                 PASS (5 checked, 0 failed)
SLACK MESSAGE:             PASS (all URL/format/content rules passed)
VERCEL URL:                PASS (saved exact live origin)
ARTIFACTS:                 PASS (19 required, 0 missing)
STYLE/FORMAT:              PASS (3 papers, 0 failing)
REVIEWS AND INTEGRATION:   PASS
LEAN AND BIBLIOGRAPHY:     PASS
HTML AND LIVE BROWSER:     PASS
PUBLIC ARCHIVE:            PASS (19 fresh anonymous exact files)
SOCIAL DRAFTS:             PASS (12 local drafts)
HYGIENE AND CONTEXT:       PASS (16 context hashes unchanged)

OVERALL: PASS
```

No release-blocking finding remains for the checked snapshot and exact pending message. The research problem itself remains open. Final Slack delivery and its receipt, final administrative closeout and committing this audit are coordinator-owned steps after this gate.
