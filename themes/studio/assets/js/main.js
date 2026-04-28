const storageKey = 'theme';

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function setTheme(next) {
  const root = document.documentElement;
  if (next === 'light' || next === 'dark') root.dataset.theme = next;
  else delete root.dataset.theme;
}

function saveTheme(next) {
  try {
    if (next === null) localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, next);
  } catch {}
}

function currentTheme() {
  return document.documentElement.dataset.theme || null;
}

function updateToggleUI(button) {
  const forced = currentTheme();
  const effective = forced ?? getSystemTheme();
  const label = forced ? `테마: ${forced}` : `테마: 시스템(${effective})`;
  button.setAttribute('aria-label', `${label} (클릭해서 전환)`);
  button.setAttribute('title', label);
}

function cycleTheme() {
  const forced = currentTheme();
  const next = forced === null ? 'dark' : forced === 'dark' ? 'light' : null;
  setTheme(next);
  saveTheme(next);
}

function initThemeToggle() {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const saved = getSavedTheme();
  if (saved) setTheme(saved);

  updateToggleUI(button);
  button.addEventListener('click', () => {
    cycleTheme();
    updateToggleUI(button);
  });

  const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
  mq?.addEventListener?.('change', () => updateToggleUI(button));
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
});
