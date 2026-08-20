/* ============================================================
   hourglass-scroll.js — delight #3
   As the user scrolls past the hourglass, the falling sand grains
   speed up briefly — as if time were racing to keep up. When the
   scroll stops, it settles back to the ambient rate.
   ============================================================ */

const AMBIENT_MS = 1400;   // default sandFall duration
const SCROLL_MS  = 380;    // fast rate during active scroll
let idleTimer = 0;

export function initHourglassScroll() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const grainsWrap = document.querySelector('.hourglass__grains');
  if (!grainsWrap) return;

  const speed = (ms) => {
    grainsWrap.querySelectorAll('.hourglass__grain').forEach(g => {
      g.style.animationDuration = `${ms}ms`;
    });
  };

  speed(AMBIENT_MS);
  window.addEventListener('scroll', () => {
    speed(SCROLL_MS);
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => speed(AMBIENT_MS), 260);
  }, { passive: true });
}
