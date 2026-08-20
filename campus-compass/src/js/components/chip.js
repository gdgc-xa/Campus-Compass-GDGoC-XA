/* ============================================================
   components/chip.js — filter chip template + click wiring.
   Wiring lives here (not in browse.js) so any screen using
   chips gets identical behavior for free.
   ============================================================ */

import { CATEGORIES, COLOR_OF, SHORT_LABEL } from '../data/categories.js';

/**
 * chipHtml(categoryId, isActive) — one chip button.
 */
export function chipHtml(categoryId, isActive = false) {
  const color = COLOR_OF[categoryId];
  return `
    <button class="chip"
            role="checkbox"
            aria-pressed="${isActive}"
            aria-checked="${isActive}"
            data-category-id="${categoryId}"
            style="--chip-accent: var(--${color});">
      <span class="chip__dot" aria-hidden="true"></span>
      <svg class="chip__check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="1,7 5,11 13,2"/>
      </svg>
      <span>${SHORT_LABEL[categoryId]}</span>
    </button>
  `;
}

/**
 * renderChipRow(container, activeSet) — replace the container's
 * chip children with the current active-state markup.
 */
export function renderChipRow(container, activeSet) {
  container.innerHTML = CATEGORIES
    .map(c => chipHtml(c.id, activeSet.has(c.id)))
    .join('');
}
