/* ============================================================
   hourglass-flip.js — delight #5
   Double-click the hourglass to flip it 180°. The buried sand
   mound stays put — only the hourglass proper rotates around its
   neck, with a subtle lift so it feels like a hand picking it up
   and turning it over. Grains fade during the flip and resume
   falling downward once the rotation lands.
   Respects prefers-reduced-motion.
   ============================================================ */

const FLIP_MS = 950;

export function initHourglassFlip() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hourglass = document.querySelector('.hourglass');
  if (!hourglass) return;

  const body   = hourglass.querySelector('.hourglass__body');
  const grains = hourglass.querySelector('.hourglass__grains');
  if (!body) return;

  hourglass.title = 'Double-click to flip';
  hourglass.setAttribute('data-flippable', '');

  // Rotation accumulates so each flip goes in the same direction —
  // 0 → 180 → 360 → 540 — instead of alternating clockwise / anti-.
  let rot = 0;
  let animating = false;

  hourglass.addEventListener('dblclick', (e) => {
    e.preventDefault();
    if (animating) return;
    animating = true;

    rot += 180;
    body.style.setProperty('--flip', `${rot}deg`);

    // Grains disappear during the flip — they'd look wrong pouring
    // sideways mid-rotation. They return once the body has landed.
    if (grains) {
      grains.style.opacity = '0';
      // Restore just before the flip finishes so the fade-in overlaps
      // with the settle — reads as one continuous motion.
      setTimeout(() => { grains.style.opacity = '1'; }, FLIP_MS - 200);
    }

    setTimeout(() => { animating = false; }, FLIP_MS);
  });
}
