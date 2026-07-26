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

function initFlashcards() {
  const decks = document.querySelectorAll('[data-flashcards]');

  for (const deck of decks) {
    const session = deck.closest('.interview-session') ?? document;
    const allCards = Array.from(deck.querySelectorAll('[data-flashcard-item]'));
    const counter = session.querySelector('[data-flashcard-counter]');
    const sessionTitle = session.querySelector('[data-session-title]');
    const empty = deck.querySelector('[data-flashcard-empty]');
    const prev = deck.querySelector('[data-flashcard-prev]');
    const next = deck.querySelector('[data-flashcard-next]');
    const shuffle = deck.querySelector('[data-flashcard-shuffle]');
    if (allCards.length === 0) continue;

    const params = new URLSearchParams(window.location.search);
    const selectedSubtopic = params.get('subcategory') ?? '';
    const selectedDifficulty = params.get('difficulty') ?? '';
    let cards = allCards.filter(
      (card) =>
        (!selectedSubtopic || card.dataset.subcategory === selectedSubtopic) &&
        (!selectedDifficulty || card.dataset.difficulty === selectedDifficulty),
    );
    let index = 0;

    function setFlipped(card, flipped) {
      card.classList.toggle('is-flipped', flipped);
      card.querySelector('[data-flashcard-flip]')?.setAttribute(
        'aria-pressed',
        flipped ? 'true' : 'false',
      );
      const note = deck.querySelector(`[data-flashcard-note="${card.dataset.cardIndex}"]`);
      if (note) note.hidden = !flipped;
    }

    function render() {
      allCards.forEach((card) => {
        card.hidden = true;
        setFlipped(card, false);
      });

      const active = cards[index];
      if (active) active.hidden = false;
      if (empty) empty.hidden = cards.length !== 0;
      if (counter) counter.textContent = `${cards.length === 0 ? 0 : index + 1} / ${cards.length}`;
      if (sessionTitle) {
        const labels = [selectedSubtopic, selectedDifficulty].filter(Boolean);
        sessionTitle.textContent = labels.length > 0 ? labels.join(' · ') : '전체 문제';
      }

      if (prev) prev.disabled = cards.length < 2;
      if (next) next.disabled = cards.length < 2;
      if (shuffle) shuffle.disabled = cards.length < 2;
    }

    function move(offset) {
      if (cards.length === 0) return;
      index = (index + offset + cards.length) % cards.length;
      render();
    }

    for (const card of allCards) {
      const flip = card.querySelector('[data-flashcard-flip]');
      flip?.addEventListener('click', () => {
        setFlipped(card, !card.classList.contains('is-flipped'));
      });
      flip?.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        setFlipped(card, !card.classList.contains('is-flipped'));
      });
    }

    prev?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));

    shuffle?.addEventListener('click', () => {
      for (let i = cards.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      index = 0;
      render();
    });

    deck.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    });

    render();
  }
}

function initCodingStudy() {
  const study = document.querySelector('[data-coding-study]');
  if (!study) return;

  const jumpButtons = Array.from(study.querySelectorAll('[data-coding-jump]'));

  for (const button of jumpButtons) {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.codingJump ?? '');
      if (!target) return;
      if (target instanceof HTMLDetailsElement) target.open = true;
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }
}

function initCodingLibrary() {
  const library = document.querySelector('[data-coding-library]');
  if (!library) return;

  const categoryButtons = Array.from(library.querySelectorAll('[data-category-filter]'));
  const difficultyButtons = Array.from(library.querySelectorAll('[data-coding-difficulty]'));
  const problems = Array.from(library.querySelectorAll('[data-coding-problem]'));
  const reset = library.querySelector('[data-coding-reset]');
  const title = library.querySelector('[data-coding-list-title]');
  const count = library.querySelector('[data-coding-visible-count]');
  const empty = library.querySelector('[data-coding-list-empty]');
  const params = new URLSearchParams(window.location.search);

  let category = params.get('category') ?? '';
  let difficulty = params.get('difficulty') ?? '';

  function syncUrl() {
    const next = new URL(window.location.href);
    if (category) next.searchParams.set('category', category);
    else next.searchParams.delete('category');
    if (difficulty) next.searchParams.set('difficulty', difficulty);
    else next.searchParams.delete('difficulty');
    window.history.replaceState({}, '', next);
  }

  function render() {
    let visible = 0;
    problems.forEach((problem) => {
      const matches =
        (!category || problem.dataset.category === category) &&
        (!difficulty || problem.dataset.difficulty === difficulty);
      problem.hidden = !matches;
      if (matches) visible += 1;
    });

    categoryButtons.forEach((button) => {
      const selected = button.dataset.categoryFilter === category;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    difficultyButtons.forEach((button) => {
      const selected = button.dataset.codingDifficulty === difficulty;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    const labels = [category, difficulty].filter(Boolean);
    if (title) title.textContent = labels.length > 0 ? labels.join(' · ') : '전체 문제';
    if (count) count.textContent = `${visible}개`;
    if (empty) empty.hidden = visible !== 0;
    syncUrl();
  }

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.categoryFilter ?? '';
      category = category === value ? '' : value;
      render();
      library.querySelector('#coding-problems')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  difficultyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      difficulty = button.dataset.codingDifficulty ?? '';
      render();
    });
  });

  reset?.addEventListener('click', () => {
    category = '';
    difficulty = '';
    render();
  });

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSliders();
  initFlashcards();
  initCodingStudy();
  initCodingLibrary();
});
