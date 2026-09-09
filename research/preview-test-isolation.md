# Preview test isolation

The single-paper preview regression originally ran the article generator directly in the publication tree. With no production-origin environment variable, it changed the Part I canonical and Open Graph URLs to localhost and also regenerated the sitemap and robots file. This made a test invocation mutate release inputs.

A new before/after assertion failed on the actual published article bytes with `Preview tests must not alter publication artifacts or production URLs`. The diff showed the production origin replaced by `http://localhost:3000`.

The test now creates a fresh temporary project, copies only its generator, paper registry, Part I content and PDF, and uses the installed dependencies through a local symlink. Both the selected-paper and unknown-slug checks execute in that temporary project. It verifies the real publication article's unchanged SHA256 afterward. The same test now passes. Production articles, sitemap and robots were regenerated with the verified assigned HTTPS origin after observing the failure.

Command: `cd website && node scripts/test-article-preview.mjs`. This is a reproducible build-test repair, not a claim that the site has already been deployed.
