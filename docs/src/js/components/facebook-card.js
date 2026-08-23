/* ============================================================
   components/facebook-card.js — mockup Facebook page card.
   Populated by fetchOrgFromFacebook(handle) — when the org is
   still pending, we render the shell in --pending state with a
   dashed banner so the reviewer sees where FB data will land.
   ============================================================ */

import { COLOR_OF } from '../data/categories.js';

/**
 * @param {Org} org
 * @returns {string} HTML string for the FB page mockup
 */
export function fbCardHtml(org) {
  const color = COLOR_OF[org.tags[0]] || 'blue';
  const stats = org.fbStats || { followers: '—', likes: '—' };
  const isPending = !!org.pending;

  // Part of the roster has no Facebook page at all — show the contact
  // card instead of an empty page mockup.
  if (!org.fbHandle) {
    const mails = (org.emails || []).map(e =>
      `<a class="fb-card__mail" href="mailto:${escapeHtml(e)}">${escapeHtml(e)}</a>`).join('');
    return `
      <aside class="fb-card fb-card--nopage">
        <div class="fb-card__body">
          <div class="fb-card__emblem"
               style="background: var(--${color}-soft); color: var(--${color}-ink);">
            ${org.logo ? `<img src="${escapeHtml(org.logo)}" alt=""/>` : escapeHtml(org.short)}
          </div>
          <div class="fb-card__name">${escapeHtml(org.name)}</div>
          <div class="fb-card__handle">No Facebook page in the roster</div>
          <div class="fb-card__mails">${mails || '<span class="fb-card__handle">No contact listed</span>'}</div>
        </div>
      </aside>`;
  }

  return `
    <aside class="fb-card ${isPending ? 'fb-card--pending' : ''}"
           aria-labelledby="fb-card-name-${org.id}">
      <div class="fb-card__cover" aria-hidden="true"></div>
      <span class="fb-card__preview-chip">Preview</span>

      <div class="fb-card__body">
        <div class="fb-card__emblem"
             style="background: var(--${color}-soft); color: var(--${color}-ink);">
          ${org.logo ? `<img src="${escapeHtml(org.logo)}" alt=""/>` : escapeHtml(org.short)}
        </div>

        <div id="fb-card-name-${org.id}" class="fb-card__name">
          ${escapeHtml(org.name)}
          <span class="fb-card__verified" aria-label="Verified">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 5 L4 7 L8 3"/>
            </svg>
          </span>
        </div>
        <div class="fb-card__handle">@${escapeHtml(org.fbHandle)} · Community</div>

        <div class="fb-card__stats">
          <span><span class="fb-card__stat-num">${stats.followers}</span> followers</span>
          <span><span class="fb-card__stat-num">${stats.likes}</span> likes</span>
        </div>

        <div class="fb-card__actions">
          <button class="fb-card__like" type="button" disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 20l-1.45-1.32C5.4 14.24 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.74-8.55 11.18L12 20z"/>
            </svg>
            Like page
          </button>
          <button class="fb-card__msg" type="button" disabled>Message</button>
        </div>
      </div>

      <a class="fb-card__link" href="${escapeHtml(org.fbUrl)}" target="_blank" rel="noopener noreferrer">
        <span class="fb-card__link-mark">f</span>
        facebook.com/${escapeHtml(org.fbHandle)}
        <span class="fb-card__link-arrow" aria-hidden="true">↗</span>
      </a>
    </aside>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
