# reochoi109.github.io

This repo uses 3 long-lived branches (each with a different purpose):

- `theme`: custom Hugo theme development (primarily `themes/studio/**`)
- `main`: blog source (site config + content + theme as a vendored directory)
- `blog`: GitHub Pages publishing branch (generated static output only; no source)

Notes:

- Content is multilingual: `content/en/**` and `content/ko/**`.
- `blog` is meant to be written by CI, not manually edited.

## Local preview

```bash
hugo server -D
```

## Deploy

Push to `main` to trigger GitHub Actions, which builds the site and publishes the output to the `blog` branch.

GitHub Pages settings:

- Source: `Deploy from a branch`
- Branch: `blog` / folder: `/ (root)`
