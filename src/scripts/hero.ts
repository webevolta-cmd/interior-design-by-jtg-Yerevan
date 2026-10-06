import { prefersReducedMotion } from './motion';

/** Editorial hero slideshow: clip-path wipe + slow settle, with pause control. */
export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-slideshow]');
  if (!hero) return;
  const slides = [...hero.querySelectorAll<HTMLElement>('[data-slide]')];
  const captions = [...hero.querySelectorAll<HTMLElement>('[data-slide-caption]')];
  const current = hero.querySelector<HTMLElement>('[data-slide-current]');
  const pauseBtn = hero.querySelector<HTMLButtonElement>('[data-slide-pause]');
  const dots = [...hero.querySelectorAll<HTMLButtonElement>('[data-slide-go]')];
  if (slides.length < 2) {
    hero.classList.add('is-ready');
    return;
  }

  const interval = Number(hero.dataset.interval || 6500);
  let index = 0;
  let timer: number | undefined;
  let paused = prefersReducedMotion();

  const show = (next: number) => {
    if (next === index) return;
    const prev = index;
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === index);
      s.classList.toggle('is-prev', i === prev);
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    captions.forEach((c, i) => c.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    hero.style.setProperty('--progress-key', String(index));
    restartProgress();
  };

  const restartProgress = () => {
    hero.classList.remove('is-running');
    void hero.offsetWidth; // restart CSS progress animation
    if (!paused) hero.classList.add('is-running');
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (paused) return;
    timer = window.setTimeout(() => {
      show(index + 1);
      schedule();
    }, interval);
  };

  const setPaused = (p: boolean) => {
    paused = p;
    hero.classList.toggle('is-paused', p);
    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', String(p));
      pauseBtn.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
    }
    restartProgress();
    schedule();
  };

  pauseBtn?.addEventListener('click', () => setPaused(!paused));
  dots.forEach((d, i) =>
    d.addEventListener('click', () => {
      show(i);
      schedule();
    }),
  );
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearTimeout(timer);
    else schedule();
  });

  // Preload the next slide after first paint so transitions never flash.
  const warm = () => slides.forEach((s) => s.querySelectorAll('img').forEach((img) => (img.loading = 'eager')));
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(warm, { timeout: 2500 });
  else setTimeout(warm, 1500);

  hero.classList.add('is-ready');
  setPaused(paused);
}
