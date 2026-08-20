/* ============================================================
   components/booth.js — big template for the booth screen.
   Rendered INTO the modal panel by screens/booth.js.
   Pending orgs render placeholder panels awaiting FB data.
   ============================================================ */

import { COLOR_OF, FULL_LABEL, SHORT_LABEL } from '../data/categories.js';
import { fbCardHtml } from './facebook-card.js';

/**
 * boothHtml(org) → HTML for the entire booth interior
 * (breadcrumb, hero, main panels, aside).
 */
export function boothHtml(org) {
  const primaryColor = COLOR_OF[org.tags[0]] || 'blue';
  const accent      = `var(--${primaryColor})`;
  const accentInk   = `var(--${primaryColor}-ink)`;

  const tags = org.tags.map(t => {
    const c = COLOR_OF[t];
    return `
      <span class="tag tag--booth"
            style="--tag-accent-soft: var(--${c}-soft); --tag-accent-ink: var(--${c}-ink);">
        ${SHORT_LABEL[t]}
      </span>`;
  }).join('');

  return `
    <div class="booth"
         style="--booth-accent: ${accent}; --booth-accent-ink: ${accentInk};">
      <nav class="booth__crumb" aria-label="Breadcrumb">
        <a href="?screen=browse" data-nav="browse">Discover</a>
        <span class="booth__crumb-sep">/</span>
        <a href="?screen=browse" data-nav="browse">Browse</a>
        <span class="booth__crumb-sep">/</span>
        <span>${escapeHtml(org.name)}</span>
      </nav>

      <section class="booth-hero">
        <div class="booth-hero__body">
          <button class="btn btn--back" type="button" data-nav="browse">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="12" y1="7" x2="1" y2="7"/>
              <polyline points="5,3 1,7 5,11"/>
            </svg>
            Back to browse
          </button>

          <div class="booth-hero__tags">${tags}</div>

          <h1 class="booth-hero__title">${escapeHtml(org.name)}</h1>
          <p class="booth-hero__tagline">${escapeHtml(org.tagline)}</p>

          ${org.meets ? `
            <div class="booth-hero__meet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              ${escapeHtml(org.meets)}
            </div>
          ` : ''}

          <div class="booth-hero__ctas">
            <button class="btn btn--primary" type="button">
              Join this org
              <svg class="btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="3" y1="8" x2="13" y2="8"/><polyline points="9,4 13,8 9,12"/>
              </svg>
            </button>
            <button class="btn btn--ghost" type="button">
              Save to my list
              <svg class="btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 2 h10 v13 l-5 -4 l-5 4 z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="booth-hero__visual" aria-hidden="true">
          <div class="hero-primitives">
            <div class="hero-primitives__item" style="--top: 8%; --left: 8%; --w: 60px; --rotate: -14deg;">${puzzleSvg('var(--blue)')}</div>
            <div class="hero-primitives__item hero-primitives__item--alt" style="--top: 20%; --left: 78%; --w: 42px; --rotate: 16deg;">${puzzleSvg('var(--red)')}</div>
            <div class="hero-primitives__item" style="--top: 72%; --left: 15%; --w: 48px; --rotate: 10deg;">${puzzleSvg('var(--green)')}</div>
            <div class="hero-primitives__item hero-primitives__item--alt" style="--top: 68%; --left: 72%; --w: 70px; --rotate: 22deg;">${puzzleSvg('var(--yellow)')}</div>
          </div>
          <div class="booth-hero__emblem"
               style="--booth-accent-ink: var(--${primaryColor}-ink); color: var(--${primaryColor}-ink); background: var(--${primaryColor}-soft);">
            ${escapeHtml(org.short)}
          </div>
        </div>
      </section>

      <section class="booth-body booth-grid">
        <div class="booth-main">
          ${aboutPanel(org)}
          ${eventsPanel(org)}
          ${leadersPanel(org)}
        </div>
        <div class="booth-aside">
          ${fbCardHtml(org)}
          ${metaPanel(org)}
        </div>
      </section>
    </div>
  `;
}

// ---------- sub-templates ----------

function aboutPanel(org) {
  if (org.pending) {
    return `
      <section class="panel panel--pending">
        <div class="panel__kicker">About the org</div>
        <div class="panel__body">
          <p>Description will populate from this org's Facebook page once the integration is live.</p>
          <p>For now: catch them on-campus during club fair season or DM their page.</p>
        </div>
      </section>`;
  }
  const paras = (org.description || []).map(p => `<p>${escapeHtml(p)}</p>`).join('');
  return `
    <section class="panel">
      <div class="panel__kicker">About the org</div>
      <div class="panel__body">${paras}</div>
    </section>`;
}

function eventsPanel(org) {
  const list = org.events || [];
  if (!list.length) {
    return `
      <section class="panel panel--pending">
        <div class="panel__kicker">Upcoming events</div>
        <div class="panel__body">
          <p>Events will sync from Facebook once connected.</p>
        </div>
      </section>`;
  }
  const rows = list.map(e => `
    <div class="event">
      <div class="event__date">
        <span class="event__month">${escapeHtml(e.month)}</span>
        <span class="event__day">${String(e.day).padStart(2, '0')}</span>
      </div>
      <div class="event__body">
        <div class="event__title">${escapeHtml(e.title)}</div>
        <div class="event__sub">${escapeHtml(e.sub)}</div>
      </div>
    </div>
  `).join('');
  return `
    <section class="panel">
      <div class="panel__kicker">Upcoming events</div>
      <div class="events">${rows}</div>
    </section>`;
}

function leadersPanel(org) {
  const list = org.leaders || [];
  if (!list.length) {
    return `
      <section class="panel panel--pending">
        <div class="panel__kicker">Leadership</div>
        <div class="panel__body">
          <p>Officers list will populate from Facebook page admins.</p>
        </div>
      </section>`;
  }
  const tiles = list.map(l => `
    <div class="leader">
      <div class="leader__avatar" aria-hidden="true">${escapeHtml(l.initials)}</div>
      <div>
        <div class="leader__name">${escapeHtml(l.name)}</div>
        <div class="leader__role">${escapeHtml(l.role)}</div>
      </div>
    </div>
  `).join('');
  return `
    <section class="panel">
      <div class="panel__kicker">Leadership</div>
      <div class="leaders">${tiles}</div>
    </section>`;
}

function metaPanel(org) {
  const cats = org.tags.map(t => SHORT_LABEL[t]).join(' · ');
  return `
    <section class="panel">
      <div class="panel__kicker">At a glance</div>
      <div class="panel__rows">
        <div class="panel__row"><span class="panel__row-label">Categories</span><span class="panel__row-value">${escapeHtml(cats)}</span></div>
        <div class="panel__row"><span class="panel__row-label">Founded</span><span class="panel__row-value">${org.founded ?? '—'}</span></div>
        <div class="panel__row"><span class="panel__row-label">Open to</span><span class="panel__row-value">${escapeHtml(org.openTo || 'All Xavier Ateneo students')}</span></div>
        <div class="panel__row"><span class="panel__row-label">Dues</span><span class="panel__row-value">${escapeHtml(org.dues || 'See Facebook page')}</span></div>
      </div>
    </section>`;
}

function puzzleSvg(fill) {
  return `<svg viewBox="0 0 100 100" fill="${fill}" aria-hidden="true"><path d="M15 15 h30 v20 a10 10 0 1 0 0 20 v10 h-40 v-30 a10 10 0 1 1 0 -20 z"/></svg>`;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
