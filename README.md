# reochoi109.github.io

This repo uses 3 long-lived branches:

- `theme`: Hugo theme development (primarily `themes/studio/**`)
- `main`: Blog source (content + site config)
- `blog`: GitHub Pages publishing branch (built static output only)

## Local preview

```bash
hugo server -D
```

## Deploy

Push to `main` to trigger GitHub Actions, which builds the site and publishes the output to the `blog` branch.

GitHub Pages settings:

- Source: `Deploy from a branch`
- Branch: `blog` / folder: `/ (root)`
