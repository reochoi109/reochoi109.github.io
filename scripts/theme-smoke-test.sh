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

ABOUT_HTML="/tmp/hugo_theme_smoke_default/ko/about/index.html"
PRODUCTS_HTML="/tmp/hugo_theme_smoke_default/ko/products/index.html"

echo "[2/4] Assert: shared profile and portfolio sections render"
rg -q -- 'class="portfolio-hero home-intro shared-profile-hero"' "$HOME_HTML"
rg -q -- 'class=home-profile-card' "$HOME_HTML"
rg -q -- 'profile-protected.jpg' "$HOME_HTML"
rg -q -- 'class=home-proof' "$HOME_HTML"
rg -q -- 'class=home-work-grid' "$HOME_HTML"
rg -q -- 'class="portfolio-hero home-intro shared-profile-hero"' "$ABOUT_HTML"
rg -q -- 'class=about-records' "$ABOUT_HTML"
rg -q -- 'id=tools' "$PRODUCTS_HTML"

echo "[3/4] Assert: SEO tags exist"
rg -q -- "rel=canonical" "$HOME_HTML"
rg -q -- "og:title" "$HOME_HTML"
rg -q -- "name=twitter:card" "$HOME_HTML"

echo "[4/4] Assert: private development material is not published"
! rg -q -- '/Users/' /tmp/hugo_theme_smoke_default
! find /tmp/hugo_theme_smoke_default -type f -name '.env*' | grep -q .

echo "OK: theme smoke test passed"
