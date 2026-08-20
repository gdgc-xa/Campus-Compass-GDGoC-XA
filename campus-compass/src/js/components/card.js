/* ============================================================
   components/card.js — org card markup for the browse grid.
   Pure template; no DOM mutation.
   Card accent color comes from the first tag's color token.
   ============================================================ */

import { SHORT_LABEL, COLOR_OF } from '../data/categories.js';

/**
 * @param {Org} org  — organization record
 * @param {number} i — index within the filtered list (drives reveal stagger)
 * @returns {string} HTML string
 */
export function cardHtml(org, i = 0) {
  const primaryColor = COLOR_OF[org.tags[0]] || 'blue';
  const staggerMs    = Math.min(i * 60, 420);

  const accent      = `var(--${primaryColor})`;
  const accentSoft  = `var(--${primaryColor}-soft)`;
  const accentInk   = `var(--${primaryColor}-ink)`;

  const tags = org.tags.map(t => {
    const c = COLOR_OF[t];
    return `
      <span class="tag tag--card"
            style="--tag-accent-soft: var(--${c}-soft); --tag-accent-ink: var(--${c}-ink);">
        ${SHORT_LABEL[t]}
      </span>`;
  }).join('');

  return `
    <button class="card reveal"
            data-org-id="${org.id}"
            style="--card-accent: ${accent}; --card-accent-soft: ${accentSoft}; --card-accent-ink: ${accentInk}; --reveal-delay: ${staggerMs}ms;"
            aria-label="Open ${escapeAttr(org.name)} booth">
      <div class="card__head">
        <span class="card__emblem" aria-hidden="true">${escapeHtml(org.short)}</span>
        <div>
          <div class="card__title">${escapeHtml(org.name)}</div>
          <div class="card__tags">${tags}</div>
        </div>
      </div>
      <div class="card__body">
        <p class="card__desc">${escapeHtml(org.tagline)}</p>
      </div>
      <div class="card__foot">
        <span class="card__meta">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          Est. ${org.founded ?? '—'}
        </span>
        <span class="card__cta">Visit booth →</span>
      </div>
    </button>
  `;
}

/**
 * A dashed placeholder for a filtered-out org — visualizes the
 * filter working without erasing the ghost of what was removed.
 */
export function ghostCardHtml() {
  return `<div class="card card--ghost" aria-hidden="true"></div>`;
}

// ---------- small escape helpers to keep templates safe ----------
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
function escapeAttr(s) {
  return escapeHtml(s).replaceAll('"', '&quot;');
}
