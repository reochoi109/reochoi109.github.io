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

function initSliders() {
  const sliders = document.querySelectorAll('[data-slider]');
  for (const slider of sliders) {
    const track = slider.querySelector('[data-slider-track]');
    const slides = slider.querySelectorAll('[data-slider-slide]');
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
    const dots = slider.querySelector('[data-slider-dots]');

    if (!track || slides.length === 0) continue;

    let index = 0;

    function clamp(i) {
      if (i < 0) return 0;
      if (i > slides.length - 1) return slides.length - 1;
      return i;
    }

    function render() {
      track.style.transform = `translateX(${-index * 100}%)`;

      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;

      if (dots) {
        const dotEls = dots.querySelectorAll('[data-slider-dot]');
        dotEls.forEach((el, i) => {
          el.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
      }
    }

    function goTo(i) {
      index = clamp(i);
      render();
    }

    if (prev) prev.addEventListener('click', () => goTo(index - 1));
    if (next) next.addEventListener('click', () => goTo(index + 1));

    if (dots) {
      dots.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'slider-dot';
        b.setAttribute('data-slider-dot', '');
        b.setAttribute('aria-label', `Slide ${i + 1}`);
        b.addEventListener('click', () => goTo(i));
        dots.appendChild(b);
      });
    }

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    slider.tabIndex = 0;
    render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSliders();
});
