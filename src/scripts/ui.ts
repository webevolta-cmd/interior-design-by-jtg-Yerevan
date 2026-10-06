import { prefersReducedMotion } from './motion';

/** Scroll-snap carousel with prev/next buttons and a live counter. */
export function initCarousels() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const items = [...root.querySelectorAll<HTMLElement>('[data-carousel-item]')];
    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const counter = root.querySelector<HTMLElement>('[data-carousel-current]');
    if (!track || !items.length) return;

    const currentIndex = () => {
      const left = track.scrollLeft;
      let best = 0;
      let dist = Infinity;
      items.forEach((item, i) => {
        const d = Math.abs(item.offsetLeft - track.offsetLeft - left);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      return best;
    };
    const go = (i: number) => {
      const target = items[Math.max(0, Math.min(items.length - 1, i))];
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };
    const update = () => {
      const i = currentIndex();
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    prev?.addEventListener('click', () => go(currentIndex() - 1));
    next?.addEventListener('click', () => go(currentIndex() + 1));
    let t = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(t);
      t = requestAnimationFrame(update);
    }, { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(currentIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(currentIndex() - 1); }
    });
    // Let vertical wheel scroll the page, not the carousel.
    track.setAttribute('data-lenis-prevent-horizontal', '');
    update();
  });
}

/** Portfolio category filter (all projects remain visible without JS). */
export function initFilter() {
  const root = document.querySelector<HTMLElement>('[data-filter]');
  if (!root) return;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter-value]')];
  const items = [...document.querySelectorAll<HTMLElement>('[data-filter-item]')];
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  const apply = (value: string) => {
    let count = 0;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filterValue === value)));
    items.forEach((item) => {
      const show = value === 'all' || item.dataset.category === value;
      if (show) count++;
      item.classList.toggle('is-filtered-out', !show);
      item.hidden = !show;
      if (show) {
        item.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      }
    });
    if (status) status.textContent = `${count} project${count === 1 ? '' : 's'} shown`;
    window.dispatchEvent(new Event('resize'));
  };
  buttons.forEach((b) => b.addEventListener('click', () => {
    apply(b.dataset.filterValue || 'all');
    const url = new URL(location.href);
    if (b.dataset.filterValue === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', b.dataset.filterValue || 'all');
    history.replaceState(null, '', url);
  }));
  const initial = new URL(location.href).searchParams.get('category');
  if (initial && buttons.some((b) => b.dataset.filterValue === initial)) apply(initial);
}

/** Custom "View" cursor over project imagery — fine pointers only. */
export function initCursor() {
  const cursor = document.querySelector<HTMLElement>('[data-cursor]');
  if (!cursor) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return;
  const label = cursor.querySelector<HTMLElement>('[data-cursor-label]');
  let x = -200, y = -200, cx = -200, cy = -200;
  let raf = 0;
  const loop = () => {
    cx += (x - cx) * 0.2;
    cy += (y - cy) * 0.2;
    cursor.style.setProperty('--x', `${cx}px`);
    cursor.style.setProperty('--y', `${cy}px`);
    if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) raf = requestAnimationFrame(loop);
    else raf = 0;
  };
  window.addEventListener('pointermove', (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor-target]');
    if (target) {
      if (label) label.textContent = target.dataset.cursorTarget || 'View';
      cursor.classList.add('is-active');
    }
  });
  document.addEventListener('pointerout', (e) => {
    const from = (e.target as HTMLElement).closest('[data-cursor-target]');
    const to = (e.relatedTarget as HTMLElement | null)?.closest?.('[data-cursor-target]');
    if (from && from !== to) cursor.classList.remove('is-active');
  });
}

/** Accessible image lightbox for project galleries. */
export function initLightbox() {
  const triggers = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  if (!triggers.length || !dialog) return;
  const img = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const cap = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counter = dialog.querySelector<HTMLElement>('[data-lightbox-count]');
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + triggers.length) % triggers.length;
    const t = triggers[index];
    if (img) {
      img.src = t.href;
      img.alt = t.dataset.alt || '';
    }
    if (cap) cap.textContent = t.dataset.caption || '';
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(triggers.length).padStart(2, '0')}`;
  };
  triggers.forEach((t, i) =>
    t.addEventListener('click', (e) => {
      e.preventDefault();
      opener = t;
      show(i);
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }),
  );
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    opener?.focus();
  });
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}
