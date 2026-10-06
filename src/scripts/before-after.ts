import { prefersReducedMotion } from './motion';

export function initBeforeAfter() {
  document.querySelectorAll<HTMLElement>('[data-ba]').forEach((root) => {
    const frame = root.querySelector<HTMLElement>('[data-ba-frame]');
    const range = root.querySelector<HTMLInputElement>('[data-ba-range]');
    if (!frame || !range) return;

    let pos = Number(range.value);
    let raf = 0;
    const apply = (value: number) => {
      pos = Math.max(0, Math.min(100, value));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--pos', `${pos}%`);
        range.value = String(Math.round(pos));
        range.setAttribute('aria-valuetext', `${Math.round(pos)}% before image visible`);
      });
    };

    range.addEventListener('input', () => apply(Number(range.value)));

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let decided = false;
    const fromEvent = (e: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    };
    frame.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      decided = e.pointerType === 'mouse';
      startX = e.clientX;
      startY = e.clientY;
      if (decided) {
        frame.setPointerCapture(e.pointerId);
        root.classList.add('is-dragging');
        apply(fromEvent(e));
      }
    });
    frame.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      if (!decided) {
        // On touch, only take over for horizontal gestures so vertical scrolling still works.
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);
        if (dx < 6 && dy < 6) return;
        if (dy > dx) {
          dragging = false;
          return;
        }
        decided = true;
        frame.setPointerCapture(e.pointerId);
        root.classList.add('is-dragging');
      }
      apply(fromEvent(e));
    });
    const end = (e: PointerEvent) => {
      if (!dragging) return;
      if (!decided && e.type === 'pointerup') apply(fromEvent(e)); // a tap moves the divider
      dragging = false;
      root.classList.remove('is-dragging');
    };
    frame.addEventListener('pointerup', end);
    frame.addEventListener('pointercancel', end);

    // A one-time hint sweep the first time the slider scrolls into view.
    if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          const from = pos;
          const keyframes = [from, from + 22, from - 14, from];
          const start = performance.now();
          const duration = 2200;
          const tick = (now: number) => {
            if (dragging) return;
            const t = Math.min(1, (now - start) / duration);
            const seg = Math.min(keyframes.length - 2, Math.floor(t * (keyframes.length - 1)));
            const local = t * (keyframes.length - 1) - seg;
            const ease = local < 0.5 ? 4 * local ** 3 : 1 - (-2 * local + 2) ** 3 / 2;
            apply(keyframes[seg] + (keyframes[seg + 1] - keyframes[seg]) * ease);
            if (t < 1) requestAnimationFrame(tick);
          };
          setTimeout(() => requestAnimationFrame(tick), 500);
        },
        { threshold: 0.6 },
      );
      io.observe(frame);
    }
  });

  // Tabs that switch which transformation a slider shows
  document.querySelectorAll<HTMLElement>('[data-ba-tabs]').forEach((tabs) => {
    const buttons = [...tabs.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panels = buttons.map((b) => document.getElementById(b.getAttribute('aria-controls') || ''));
    const select = (i: number, focus = false) => {
      buttons.forEach((b, j) => {
        const on = i === j;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        panels[j]?.toggleAttribute('hidden', !on);
      });
      if (focus) buttons[i].focus();
    };
    buttons.forEach((b, i) => {
      b.addEventListener('click', () => select(i));
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') select((i + 1) % buttons.length, true);
        if (e.key === 'ArrowLeft') select((i - 1 + buttons.length) % buttons.length, true);
        if (e.key === 'Home') select(0, true);
        if (e.key === 'End') select(buttons.length - 1, true);
      });
    });
  });
}
