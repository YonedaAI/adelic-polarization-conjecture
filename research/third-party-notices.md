# Bundled math asset notices

The article build copies unmodified KaTeX CSS and fonts from the pinned package. It now also copies the package's exact MIT notice to `public/math/LICENSE-katex.txt` and the font notice to `public/math/LICENSE-fonts.txt`.

All20 installed TTF files were inspected with `otfinfo -i`. Their metadata identifies Design Science (2009 to2010), Khan Academy (2014 to2018), the SIL Open Font License1.1, and twelve family-specific Reserved Font Names. The original font files, including that metadata, are unchanged. The checked notices are retained in `website/third-party/KaTeX-FONTS-LICENSE.txt`; the license body comes from the [official SIL text](https://openfontlicense.org/documents/OFL.txt). KaTeX's separate package notice is supplied by its [upstream license](https://github.com/KaTeX/KaTeX/blob/main/LICENSE) and copied directly from the installed version at build time.

The isolated preview test first failed because the bundled math assets had no accompanying KaTeX notice file. After the generator change, it passed and checked both copied license files against their source SHA256 values. The test still proves that running the preview cannot modify real publication artifacts. No font glyphs or family names were edited.
