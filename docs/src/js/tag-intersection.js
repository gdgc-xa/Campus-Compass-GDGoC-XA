/* ============================================================
   tag-intersection.js — delight #4
   On the browse chip row, hovering a chip while ≥1 chip is
   already active previews the intersection: the hovered chip
   gets a sun outline and its dot gains a subtle glow. It's a
   quick visual promise of "click this to combine".
   ============================================================ */

export function initTagIntersection() {
  const chipRow = document.querySelector('[data-chip-row]');
  if (!chipRow) return;

  chipRow.addEventListener('pointerover', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    if (chip.getAttribute('aria-pressed') === 'true') return;

    // Only preview if there's at least one active chip to intersect with
    const anyActive = chipRow.querySelector('.chip[aria-pressed="true"]');
    if (!anyActive) return;

    chip.classList.add('chip--preview');
  });

  chipRow.addEventListener('pointerout', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    chip.classList.remove('chip--preview');
  });
}
