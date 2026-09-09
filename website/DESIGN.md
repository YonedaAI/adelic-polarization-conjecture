# Adelic Polarization Conjecture website

The site is a mathematical reading room for the papers and their formal code. Its central visual is the prime-adjoining square, showing the actual relationship under investigation. The text explains precise results and the remaining conjecture through ordinary scholarly prose.

## Design tokens

Use a dark plum ground #201B32, raised surfaces #2C2543, pale mathematical text #F1EDF8, muted text #BCB3CD, pale gold links #E7CB91, and periwinkle diagrams #B6B4F1. Contrast must be measured in implementation. The palette keeps the research-agent dark reading surface while tying the diagram to mathematical notation.

Use a restrained serif family for titles and mathematical reading, paired with a humanist sans for navigation. Prefer locally served font assets or system fallbacks. Body text should have a comfortable 68 to 75 character measure and enough line height for inline formulae.

## Layout

The homepage pairs the full project title and a short statement with a compact prime-adjoining square. On mobile the diagram follows the introduction. The papers appear as a small ordered collection with designed landscape previews, readable titles, brief descriptions, and direct Read/PDF/Lean links. A synthesis is visually subordinate to the main conjecture rather than inflated into a progress dashboard.

Reading pages have a clear title, author, abstract, compact mobile contents menu, and a desktop contents sidebar. Wide equations and tables scroll inside their own labeled containers, without causing document overflow. Links and focus targets remain easy to use at 360px.

## Implementation review

The memorable feature is the mathematical square; avoid decorative gradients and repeated badge-like labels. Do not use portrait PDF screenshots as the website cards. Do not display reviewer names, pipeline status, verification badges, or confidence labels in public copy.

Render every equation at build time and make article text available in the initial HTML. Validate every reference target, custom macro, PDF link, and actual mobile layout. Pure static article pages are acceptable if they preserve all content without hydration and share the same navigation and design.
