#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/4] Build: default config"
HUGO_CACHEDIR="${HUGO_CACHEDIR:-/tmp/hugo_cache}" \
  hugo --gc --minify --destination /tmp/hugo_theme_smoke_default >/dev/null

echo "[2/5] Assert: default Home renders data/home.toml"
rg -q -- "class=exp-list" /tmp/hugo_theme_smoke_default/index.html
rg -q -- "class=skill-chip" /tmp/hugo_theme_smoke_default/index.html

echo "[3/5] Assert: SEO tags exist"
rg -q -- "rel=canonical" /tmp/hugo_theme_smoke_default/index.html
rg -q -- "og:title" /tmp/hugo_theme_smoke_default/index.html
rg -q -- "name=twitter:card" /tmp/hugo_theme_smoke_default/index.html
rg -q -- "og:image" /tmp/hugo_theme_smoke_default/index.html

echo "[4/5] Build: toggle params (hide sections, compact spacing, clickable projects)"
cat >/tmp/hugo_theme_smoke_override.toml <<'EOF'
[params]
showExperience = false
showSkills = false
showProjectsDivider = false
projectsClickable = true
spacing = 'compact'
EOF

HUGO_CACHEDIR="${HUGO_CACHEDIR:-/tmp/hugo_cache}" \
  hugo --config hugo.toml,/tmp/hugo_theme_smoke_override.toml \
  --gc --minify --destination /tmp/hugo_theme_smoke_override >/dev/null

echo "[5/5] Assert: toggles applied"
! rg -q -- "Experience" /tmp/hugo_theme_smoke_override/index.html
! rg -q -- "skill-chip" /tmp/hugo_theme_smoke_override/index.html
! rg -q -- "projects-divider" /tmp/hugo_theme_smoke_override/projects/index.html
rg -q -- "--section-pad-y:56px" /tmp/hugo_theme_smoke_override/index.html
rg -q -- "project-section-link href=" /tmp/hugo_theme_smoke_override/projects/index.html

echo "OK: theme smoke test passed"
