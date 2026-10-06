import Lenis from 'lenis';

/**
 * Motion system.
 * - Lenis for smooth wheel scrolling (touch keeps native scrolling).
 * - One requestAnimationFrame loop drives every scroll-linked effect (parallax, hero, drift),
 *   reading cached geometry and writing only transforms / opacity — no layout thrash.
 * - IntersectionObserver for one-shot reveals and for the sticky "process" story.
 * Everything is disabled for prefers-reduced-motion.
 */

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

type Effect = {
  el: HTMLElement;
  target: HTMLElement;
  top: number;
  height: number;
  visible: boolean;
  apply: (progress: number) => void;
};

const effects: Effect[] = [];
let vh = window.innerHeight;
let scrollY = window.scrollY;
let ticking = false;
let mobile = window.matchMedia('(max-width: 767px)').matches;

/** Document offset that ignores transforms (so moving elements can be re-measured safely). */
const docTop = (el: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

function measure() {
  vh = window.innerHeight;
  mobile = window.matchMedia('(max-width: 767px)').matches;
  for (const fx of effects) {
    // Measure the untransformed element (the frame), not the moving target.
    fx.top = docTop(fx.el);
    fx.height = fx.el.offsetHeight;
  }
  render();
}

function render() {
  ticking = false;
  for (const fx of effects) {
    if (!fx.visible) continue;
    // 0 when the element's top enters the bottom of the viewport, 1 when its bottom leaves the top
    const p = (scrollY + vh - fx.top) / (vh + fx.height);
    fx.apply(Math.min(1, Math.max(0, p)));
  }
}

function requestRender() {
  scrollY = lenis ? lenis.scroll : window.scrollY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(render);
  }
}

function addEffect(el: HTMLElement, target: HTMLElement, apply: (p: number) => void) {
  effects.push({ el, target, top: 0, height: 0, visible: false, apply });
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/** One-shot reveals driven by IntersectionObserver. */
function initReveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  // Masked elements start fully clipped, which IntersectionObserver reports as invisible —
  // so watch their (unclipped) parent instead.
  const targets = new Map<Element, HTMLElement[]>();
  els.forEach((el) => {
    const target = el.dataset.reveal === 'mask' && el.parentElement ? el.parentElement : el;
    targets.set(target, [...(targets.get(target) ?? []), el]);
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          targets.get(entry.target)?.forEach((el) => el.classList.add('is-in'));
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  targets.forEach((_, target) => io.observe(target));
}

/** Register scroll-linked effects. */
function initScrollEffects() {
  // Framed image parallax: the image drifts inside its frame.
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((frame) => {
    const img = frame.querySelector<HTMLElement>('img');
    if (!img) return;
    addEffect(frame, img, (p) => {
      const amount = mobile ? 4 : 8;
      img.style.transform = `translate3d(0, ${(p * 2 - 1) * amount}%, 0)`;
    });
  });

  // Elements drifting at a different speed than the page.
  document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed || '0');
    addEffect(el, el, (p) => {
      const range = speed * (mobile ? 40 : 100);
      el.style.transform = `translate3d(0, ${(p - 0.5) * range}%, 0)`;
    });
  });

  // Hero: media eases down and scales, content lifts and fades.
  const hero = document.querySelector<HTMLElement>('[data-hero-scroll]');
  if (hero) {
    const media = hero.querySelector<HTMLElement>('[data-hero-media]');
    const content = hero.querySelector<HTMLElement>('[data-hero-content]');
    addEffect(hero, hero, () => {
      const h = hero.offsetHeight || 1;
      const t = Math.min(1, Math.max(0, scrollY / h));
      if (media) media.style.transform = `translate3d(0, ${t * 18}%, 0) scale(${1 + t * 0.06})`;
      if (content) {
        content.style.transform = `translate3d(0, ${-t * 22}%, 0)`;
        content.style.opacity = String(Math.max(0, 1 - t * 1.1));
      }
    });
  }

  if (!effects.length) return;

  // Only run effects that are on (or near) screen.
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        effects.forEach((fx) => {
          if (fx.el === entry.target) fx.visible = entry.isIntersecting;
        });
      }
      requestRender();
    },
    { rootMargin: '25% 0px 25% 0px' },
  );
  effects.forEach((fx) => io.observe(fx.el));

  if (lenis) lenis.on('scroll', requestRender);
  else window.addEventListener('scroll', requestRender, { passive: true });

  const ro = new ResizeObserver(() => measure());
  ro.observe(document.body);
  window.addEventListener('load', measure);
  measure();
}

/** Sticky storytelling: activate the step that crosses the middle of the viewport. */
function initSticky() {
  document.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
    const steps = [...story.querySelectorAll<HTMLElement>('[data-story-step]')];
    const frames = [...story.querySelectorAll<HTMLElement>('[data-story-frame]')];
    if (!steps.length) return;
    const activate = (i: number) => {
      steps.forEach((s, j) => s.classList.toggle('is-active', i === j));
      frames.forEach((f, j) => f.classList.toggle('is-active', i === j));
    };
    activate(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activate(steps.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
  });
}

/** In-page anchor links use the smooth scroller (with header offset). */
function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = url.hash === '#top' ? document.body : document.querySelector<HTMLElement>(decodeURIComponent(url.hash));
    if (!target) return;
    e.preventDefault();
    const offset = -(document.querySelector<HTMLElement>('[data-header]')?.offsetHeight ?? 0) - 12;
    if (lenis) lenis.scrollTo(target, { offset: url.hash === '#top' ? 0 : offset, duration: 1.4 });
    else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    history.replaceState(null, '', url.hash === '#top' ? location.pathname : url.hash);
    if (url.hash !== '#top') {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
}

export function initMotion() {
  const reduced = prefersReducedMotion();
  if (!reduced) initSmoothScroll();
  initReveals();
  initSticky();
  initAnchors();
  if (!reduced) initScrollEffects();

  // Land on hash targets correctly once images have settled.
  if (location.hash && lenis) {
    const target = document.querySelector<HTMLElement>(decodeURIComponent(location.hash));
    if (target) {
      window.addEventListener('load', () => {
        const offset = -(document.querySelector<HTMLElement>('[data-header]')?.offsetHeight ?? 0) - 12;
        lenis?.scrollTo(target, { offset, immediate: true });
      });
    }
  }
}
