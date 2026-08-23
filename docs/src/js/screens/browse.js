/* ============================================================
   screens/browse.js — filter state + grid render.
   Multi-select intersecting chips + search + ghost cards.
   ============================================================ */

import { CATEGORIES, COLOR_OF, SHORT_LABEL } from '../data/categories.js';
import { ORGS } from '../data/organizations.js';
import { renderChipRow } from '../components/chip.js';
import { cardHtml, ghostCardHtml } from '../components/card.js';
import { attachSearchShell, setSearchValue } from '../components/search-shell.js';
import { navigate, currentQuery } from '../router.js';
import { watchReveals } from '../reveal-observer.js';
import { renderBooth } from './booth.js';

// ---------- Filter state (module-scope singleton) ----------
const state = {
  active: new Set(),   // category ids
  query: '',
};

/**
 * initBrowse(root) — wire chips, search, clear button. Called
 * on first mount + when navigation lands on ?screen=browse.
 * Reads ?filter=<id> and ?q=<text> from the URL for deep-links.
 */
export function initBrowse(root) {
  // --- Restore state from URL query ---
  const q = currentQuery();
  state.active.clear();
  (q.filters || []).forEach(id => state.active.add(id));
  state.query = q.q || '';

  // --- Sync search input value ---
  const searchShell = root.querySelector('[data-browse-search]');
  if (searchShell) {
    setSearchValue(searchShell, state.query);
    attachSearchShell(searchShell, (query) => {
      state.query = query;
      render(root);
    });
  }

  // --- Chip row: attach click delegation once ---
  const chipRow = root.querySelector('[data-chip-row]');
  if (chipRow && !chipRow.__wired) {
    chipRow.__wired = true;
    chipRow.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const id = chip.dataset.categoryId;
      if (state.active.has(id)) state.active.delete(id);
      else state.active.add(id);
      render(root);
    });
  }

  // --- Clear filters button ---
  const clearBtn = root.querySelector('[data-clear-filters]');
  if (clearBtn && !clearBtn.__wired) {
    clearBtn.__wired = true;
    clearBtn.addEventListener('click', () => {
      state.active.clear();
      state.query = '';
      if (searchShell) setSearchValue(searchShell, '');
      render(root);
    });
  }

  render(root);
}

// ---------- Filter logic ----------

function intersect(orgs, activeIds) {
  if (activeIds.size === 0) return orgs;
  return orgs.filter(org => [...activeIds].every(id => org.tags.includes(id)));
}

function search(orgs, query) {
  if (!query) return orgs;
  const q = query.toLowerCase();
  // Every field is optional: the roster gives some orgs only a name
  // and an e-mail, so guard each one rather than assuming a tagline.
  return orgs.filter(org => {
    const hay = [
      org.name,
      org.short,
      org.tagline,
      org.fbHandle,
      ...(org.emails || []),
      ...org.tags.map(t => SHORT_LABEL[t] || t),
    ];
    return hay.some(v => v && String(v).toLowerCase().includes(q));
  });
}

// ---------- Render ----------

function render(root) {
  const chipRow = root.querySelector('[data-chip-row]');
  const grid    = root.querySelector('[data-card-grid]');
  const title   = root.querySelector('[data-browse-title]');
  const count   = root.querySelector('[data-browse-count]');
  const note    = root.querySelector('[data-filter-note]');
  const clear   = root.querySelector('[data-clear-filters]');
  const foot    = root.querySelector('[data-grid-footnote]');

  // Re-render chips (active state changes)
  if (chipRow) renderChipRow(chipRow, state.active);

  // Filter
  const filtered = search(intersect(ORGS, state.active), state.query);
  const total    = ORGS.length;
  const shownCount = filtered.length;
  const hiddenCount = total - shownCount;

  // Title
  if (title) {
    if (state.active.size === 0 && !state.query) {
      title.textContent = 'All Xavier Ateneo orgs';
    } else if (state.active.size >= 1) {
      const labels = [...state.active].map(id => SHORT_LABEL[id]);
      title.textContent = `${labels.join(' ∩ ')} orgs`;
    } else {
      title.textContent = `Results for “${state.query}”`;
    }
  }

  // Count
  if (count) count.textContent = `${shownCount} org${shownCount === 1 ? '' : 's'}`;

  // Intersection callout
  if (note) {
    if (state.active.size >= 2) {
      const labels = [...state.active].map(id => `<strong>${SHORT_LABEL[id]}</strong>`);
      const joined = labels.join(' AND ');
      note.innerHTML = `
        <svg class="filter-note__icon" viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="7" cy="8" r="6"/><circle cx="15" cy="8" r="6"/>
        </svg>
        Showing orgs tagged with ${joined} — the intersection.
      `;
      note.hidden = false;
    } else {
      note.hidden = true;
    }
  }

  // Clear button visibility
  if (clear) {
    clear.classList.toggle('is-visible', state.active.size > 0 || !!state.query);
  }

  // Grid
  if (grid) {
    if (shownCount === 0) {
      grid.innerHTML = `
        <div class="filter-note filter-note--empty" style="grid-column: 1 / -1;">
          <strong>No orgs match every filter.</strong>&nbsp;Loosen the intersection — remove a chip, or clear filters and start again.
        </div>`;
    } else {
      const cards = filtered.map((org, i) => cardHtml(org, i)).join('');
      const ghosts = Array.from({ length: hiddenCount }, () => ghostCardHtml()).join('');
      grid.innerHTML = cards + ghosts;
    }
    watchReveals(grid);
    wireCardClicks(grid);
  }

  // Footnote
  if (foot) {
    if (hiddenCount > 0 && shownCount > 0) {
      foot.textContent = `Ghost cards indicate the ${hiddenCount} org${hiddenCount === 1 ? '' : 's'} filtered out. Remove a chip to widen the intersection.`;
      foot.hidden = false;
    } else {
      foot.hidden = true;
    }
  }

  // Sync URL (shallow — replaceState, don't push)
  syncUrl();
}

function wireCardClicks(grid) {
  if (grid.__wiredCards) return;
  grid.__wiredCards = true;
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card:not(.card--ghost)');
    if (!card) return;
    const id = card.dataset.orgId;
    // Push URL without triggering a browse re-init flash.
    const params = new URLSearchParams(location.search);
    params.set('org', id);
    if (!params.get('screen')) params.set('screen', 'browse');
    history.pushState(null, '', `?${params.toString()}`);
    renderBooth(id);
  });
}

function syncUrl() {
  const q = new URLSearchParams();
  q.set('screen', 'browse');
  if (state.active.size === 1) q.set('filter', [...state.active][0]);
  if (state.active.size > 1)   q.set('filters', [...state.active].join(','));
  if (state.query) q.set('q', state.query);
  // Preserve org param if the modal happens to be open
  const org = new URLSearchParams(location.search).get('org');
  if (org) q.set('org', org);
  const url = `?${q.toString()}`;
  history.replaceState(null, '', url);
}
