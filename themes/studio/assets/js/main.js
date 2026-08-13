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

function initProtectedImages() {
  const images = document.querySelectorAll('[data-protected-image]');
  for (const image of images) {
    image.addEventListener('dragstart', (event) => event.preventDefault());
    image.closest('.about-photo-wrap, .home-profile-photo')?.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }
}

function initProductImageZoom() {
  const images = document.querySelectorAll('[data-product-zoom]');
  if (images.length === 0) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'product-image-lightbox';
  dialog.innerHTML = `
    <button type="button" class="product-image-lightbox-close" aria-label="Close">×</button>
    <div class="product-image-lightbox-stage">
      <img alt="">
      <p></p>
    </div>`;
  document.body.appendChild(dialog);

  const preview = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  const close = dialog.querySelector('.product-image-lightbox-close');

  function open(image) {
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    caption.textContent = image.alt;
    dialog.showModal();
    close.focus();
  }

  images.forEach((image) => {
    image.addEventListener('click', () => open(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(image);
      }
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initProductWorkflows() {
  const workflows = document.querySelectorAll('[data-product-workflow]');

  for (const workflow of workflows) {
    const viewport = workflow.querySelector('.product-workflow-viewport');
    const canvas = workflow.querySelector('.product-workflow-canvas');
    const svg = workflow.querySelector('.product-workflow-edges');
    const nodeElements = [...workflow.querySelectorAll('[data-workflow-node]')];
    const edgeElements = [...workflow.querySelectorAll('[data-workflow-from]')];
    if (!viewport || !canvas || !svg || nodeElements.length === 0) continue;

    const nodes = new Map(nodeElements.map((element) => [element.dataset.workflowNode, element]));
    const edges = edgeElements
      .map((element) => ({ from: element.dataset.workflowFrom, to: element.dataset.workflowTo }))
      .filter((edge) => nodes.has(edge.from) && nodes.has(edge.to));

    const incoming = new Map([...nodes.keys()].map((id) => [id, 0]));
    const outgoing = new Map([...nodes.keys()].map((id) => [id, []]));
    for (const edge of edges) {
      incoming.set(edge.to, incoming.get(edge.to) + 1);
      outgoing.get(edge.from).push(edge.to);
    }

    for (const [id, element] of nodes) {
      element.classList.toggle('is-start', incoming.get(id) === 0);
      element.classList.toggle('is-end', outgoing.get(id).length === 0);
    }

    const levels = new Map([...nodes.keys()].map((id) => [id, 0]));
    const remaining = new Map(incoming);
    const queue = [...nodes.keys()].filter((id) => remaining.get(id) === 0);
    const visited = new Set();

    while (queue.length) {
      const id = queue.shift();
      visited.add(id);
      for (const next of outgoing.get(id)) {
        levels.set(next, Math.max(levels.get(next), levels.get(id) + 1));
        remaining.set(next, remaining.get(next) - 1);
        if (remaining.get(next) === 0) queue.push(next);
      }
    }

    const lastLevel = Math.max(0, ...levels.values());
    for (const id of nodes.keys()) {
      if (!visited.has(id)) levels.set(id, lastLevel + 1);
    }

    const markerId = `workflow-arrow-${Math.random().toString(36).slice(2)}`;

    function render() {
      const mobile = window.matchMedia('(max-width: 760px)').matches;
      const groups = [];
      for (const [id, level] of levels) {
        if (!groups[level]) groups[level] = [];
        groups[level].push(id);
      }

      const levelCount = groups.length;
      const availableWidth = viewport.clientWidth;
      const width = mobile ? availableWidth : Math.max(availableWidth, levelCount * 144);
      const maxInLevel = Math.max(1, ...groups.map((group) => group?.length || 0));
      const height = mobile ? levelCount * 92 + 8 : Math.max(180, maxInLevel * 86 + 24);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      for (let level = 0; level < groups.length; level += 1) {
        const group = groups[level] || [];
        group.forEach((id, index) => {
          const element = nodes.get(id);
          const nodeWidth = mobile
            ? Math.min(132, Math.max(76, (width - 24 - (group.length - 1) * 10) / group.length))
            : 124;
          const x = mobile
            ? 12 + (group.length === 1 ? (width - 24 - nodeWidth) / 2 : index * ((width - 24 - nodeWidth) / (group.length - 1)))
            : 12 + (levelCount === 1 ? (width - 24 - nodeWidth) / 2 : level * ((width - 24 - nodeWidth) / (levelCount - 1)));
          const y = mobile
            ? 8 + level * 92
            : 12 + (group.length === 1 ? (height - 24 - 56) / 2 : index * ((height - 24 - 56) / (group.length - 1)));
          element.style.width = `${nodeWidth}px`;
          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
        });
      }

      const canvasRect = canvas.getBoundingClientRect();
      const paths = edges.map((edge) => {
        const from = nodes.get(edge.from).getBoundingClientRect();
        const to = nodes.get(edge.to).getBoundingClientRect();
        let startX;
        let startY;
        let endX;
        let endY;
        let path;

        if (mobile) {
          startX = from.left - canvasRect.left + from.width / 2;
          startY = from.bottom - canvasRect.top;
          endX = to.left - canvasRect.left + to.width / 2;
          endY = to.top - canvasRect.top - 6;
          const middleY = (startY + endY) / 2;
          path = `M ${startX} ${startY} C ${startX} ${middleY}, ${endX} ${middleY}, ${endX} ${endY}`;
        } else {
          startX = from.right - canvasRect.left;
          startY = from.top - canvasRect.top + from.height / 2;
          endX = to.left - canvasRect.left - 6;
          endY = to.top - canvasRect.top + to.height / 2;
          const middleX = (startX + endX) / 2;
          path = `M ${startX} ${startY} C ${middleX} ${startY}, ${middleX} ${endY}, ${endX} ${endY}`;
        }

        return `<path d="${path}" marker-end="url(#${markerId})"></path>`;
      }).join('');

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.innerHTML = `<defs><marker id="${markerId}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z"></path></marker></defs>${paths}`;
    }

    new ResizeObserver(render).observe(viewport);
    render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSliders();
  initProtectedImages();
  initProductImageZoom();
  initProductWorkflows();
});
