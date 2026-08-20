function initSliders() {
  const sliders = document.querySelectorAll('[data-slider]');
  for (const slider of sliders) {
    const track = slider.querySelector('[data-slider-track]');
    const slides = slider.querySelectorAll('[data-slider-slide]');
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
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

    }

    function goTo(i) {
      index = clamp(i);
      render();
    }

    if (prev) prev.addEventListener('click', () => goTo(index - 1));
    if (next) next.addEventListener('click', () => goTo(index + 1));

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

function initEmailCopy() {
  const links = [...document.querySelectorAll('a[href^="mailto:"]')];
  if (links.length === 0) return;

  const isKo = document.documentElement.lang.toLowerCase().startsWith('ko');
  const toast = document.createElement('div');
  toast.className = 'email-copy-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  let toastTimer;

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const input = document.createElement('textarea');
    input.value = value;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    if (!copied) throw new Error('Copy failed');
  }

  function showToast(message, failed = false) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle('is-error', failed);
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  for (const link of links) {
    const email = decodeURIComponent(link.getAttribute('href').slice('mailto:'.length).split('?')[0]);
    if (!email) continue;

    link.dataset.copyEmail = email;
    link.setAttribute('title', isKo ? '이메일 주소 복사' : 'Copy email address');
    if (!link.textContent.trim() || link.classList.contains('profile-icon-link') || link.classList.contains('footer-icon-link')) {
      link.setAttribute('aria-label', isKo ? `이메일 주소 복사: ${email}` : `Copy email address: ${email}`);
    }

    link.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        await copyText(email);
        showToast(isKo ? '이메일 주소를 복사했습니다.' : 'Email address copied.');
      } catch {
        showToast(isKo ? '이메일 주소를 복사하지 못했습니다.' : 'Could not copy the email address.', true);
      }
    });
  }
}

function initMobileMenu() {
  const button = document.querySelector('[data-mobile-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!button || !menu) return;

  const isKo = document.documentElement.lang.toLowerCase().startsWith('ko');

  function setOpen(open) {
    if (open) {
      document.querySelector('[data-language-menu]')?.classList.remove('is-open');
      document.querySelector('[data-language-toggle]')?.setAttribute('aria-expanded', 'false');
    }
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open
      ? (isKo ? '메뉴 닫기' : 'Close menu')
      : (isKo ? '메뉴 열기' : 'Open menu'));
    button.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
  }

  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!button.closest('.site-header')?.contains(event.target)) setOpen(false);
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function initLanguageMenu() {
  const button = document.querySelector('[data-language-toggle]');
  const menu = document.querySelector('[data-language-menu]');
  if (!button || !menu) return;

  function setOpen(open) {
    if (open) {
      const mobileButton = document.querySelector('[data-mobile-menu-toggle]');
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      mobileButton?.setAttribute('aria-expanded', 'false');
      mobileButton?.classList.remove('is-open');
      mobileMenu?.classList.remove('is-open');
    }
    button.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!button.closest('.lang-nav')?.contains(event.target)) setOpen(false);
  });
}

function initDeckNavigation() {
  const navigation = document.querySelector('[data-deck-nav]');
  if (!navigation) return;

  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (sections.length === 0) return;

  function activate(section) {
    const activeLink = links.find((link) => link.getAttribute('href') === `#${section.id}`);
    if (!activeLink || activeLink.getAttribute('aria-current') === 'location') return;

    links.forEach((link) => link.removeAttribute('aria-current'));
    activeLink.setAttribute('aria-current', 'location');
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) activate(visible[0].target);
  }, {
    rootMargin: '-28% 0px -55% 0px',
    threshold: [0, 0.1, 0.25],
  });

  sections.forEach((section) => observer.observe(section));
  activate(sections.find((section) => section.matches(':target')) || sections[0]);
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
  initSliders();
  initProtectedImages();
  initProductImageZoom();
  initProductWorkflows();
  initEmailCopy();
  initMobileMenu();
  initLanguageMenu();
  initDeckNavigation();
});
