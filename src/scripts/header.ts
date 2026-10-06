import { getLenis } from './motion';

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (!header.classList.contains('menu-open')) {
      if (goingDown && y > 420) header.classList.add('is-hidden');
      else if (goingUp || y < 120) header.classList.remove('is-hidden');
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  // Show the header when keyboard focus moves into it
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  // Mobile menu
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const label = header.querySelector<HTMLElement>('[data-menu-label]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  menu.hidden = false;
  menu.setAttribute('aria-hidden', 'true');
  menu.inert = true;

  const focusables = () =>
    [...menu.querySelectorAll<HTMLElement>('a, button')].filter((el) => !el.hasAttribute('disabled'));

  const open = () => {
    menu.classList.add('is-open');
    menu.inert = false;
    menu.removeAttribute('aria-hidden');
    header.classList.add('menu-open');
    header.classList.remove('is-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = 'Close';
    getLenis()?.stop();
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => focusables()[0]?.focus(), 300);
  };
  const close = (returnFocus = true) => {
    menu.classList.remove('is-open');
    menu.inert = true;
    menu.setAttribute('aria-hidden', 'true');
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = 'Menu';
    getLenis()?.start();
    document.documentElement.style.overflow = '';
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => (menu.classList.contains('is-open') ? close() : open()));
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      // keep focus within header toggle + menu
      const items = [toggle, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close(false);
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => {
    if (e.matches && menu.classList.contains('is-open')) close(false);
  });
}
