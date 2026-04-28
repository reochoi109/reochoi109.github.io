#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/4] Build: default config"
HUGO_CACHEDIR="${HUGO_CACHEDIR:-/tmp/hugo_cache}" \
  hugo --gc --minify --destination /tmp/hugo_theme_smoke_default >/dev/null

HOME_HTML="/tmp/hugo_theme_smoke_default/ko/index.html"
if [[ ! -f "$HOME_HTML" ]]; then
  HOME_HTML="/tmp/hugo_theme_smoke_default/en/index.html"
fi
if [[ ! -f "$HOME_HTML" ]]; then
  HOME_HTML="/tmp/hugo_theme_smoke_default/index.html"
fi

echo "[2/5] Assert: default Home renders data/home.toml"
rg -q -- "class=exp-list" "$HOME_HTML"
rg -q -- "class=skill-chip" "$HOME_HTML"

echo "[3/5] Assert: SEO tags exist"
rg -q -- "rel=canonical" "$HOME_HTML"
rg -q -- "og:title" "$HOME_HTML"
rg -q -- "name=twitter:card" "$HOME_HTML"
rg -q -- "og:image" "$HOME_HTML"

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

OVERRIDE_HOME_HTML="/tmp/hugo_theme_smoke_override/ko/index.html"
if [[ ! -f "$OVERRIDE_HOME_HTML" ]]; then
  OVERRIDE_HOME_HTML="/tmp/hugo_theme_smoke_override/en/index.html"
fi
if [[ ! -f "$OVERRIDE_HOME_HTML" ]]; then
  OVERRIDE_HOME_HTML="/tmp/hugo_theme_smoke_override/index.html"
fi

OVERRIDE_PROJECTS_HTML="/tmp/hugo_theme_smoke_override/projects/index.html"
if [[ ! -f "$OVERRIDE_PROJECTS_HTML" ]]; then
  OVERRIDE_PROJECTS_HTML="$(find /tmp/hugo_theme_smoke_override -maxdepth 3 -type f -path '*/projects/index.html' | head -n 1)"
fi

echo "[5/5] Assert: toggles applied"
! rg -q -- "Experience" "$OVERRIDE_HOME_HTML"
! rg -q -- "skill-chip" "$OVERRIDE_HOME_HTML"
! rg -q -- "projects-divider" "$OVERRIDE_PROJECTS_HTML"
rg -q -- "--section-pad-y:56px" "$OVERRIDE_HOME_HTML"
rg -q -- "project-section-link href=" "$OVERRIDE_PROJECTS_HTML"

echo "OK: theme smoke test passed"
