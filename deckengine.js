/**
 * DeckEngine — Zero-build presentation engine
 * A single JS file that powers <deck-engine> web component.
 */

/* ============================================================
   1. ICON SVG DEFINITIONS
   ============================================================ */
const DK_ICONS = {
  'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  'check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  'star': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  'user': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',
  'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  'target': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  'lightbulb': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>',
  'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  'gear': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z"/></svg>',
  'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>',
  'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',
  'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20"/><path d="M9 22V12h6v10M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M8 18h.01M16 14h.01M16 18h.01"/></svg>',
  'briefcase': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
  'rocket': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3"/></svg>',
  'flag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/></svg>',
  'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  'warning': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>',
  'info': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  'plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  'minus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>',
  'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  'link': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
  'download': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  'upload': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
  'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  'unlock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>',
  'cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
  'database': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
};

function dkIcon(name) {
  if (!name) return '';
  const svg = DK_ICONS[name];
  if (svg) return `<span class="dk-icon" data-icon="${esc(name)}">${svg}</span>`;
  // Fallback: treat as unicode/emoji
  return `<span class="dk-icon" data-icon="${esc(name)}">${esc(name)}</span>`;
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escBody(s) {
  if (s == null) return '';
  return esc(String(s)).replace(/\n/g, '<br>');
}

/* ============================================================
   2. RENDERER REGISTRY (all 72 slide types)
   ============================================================ */

const renderers = {};

function reg(type, fn) { renderers[type] = fn; }

// Helper: wrap slide
function slide(type, header, content, s) {
  const notes = s && s.notes ? `<div class="dk-notes" hidden>${esc(s.notes)}</div>` : '';
  return `<section class="dk-slide dk-slide--${esc(type)}">
    ${header ? `<div class="dk-header">${header}</div>` : ''}
    <div class="dk-content">${content}</div>
    ${notes}
  </section>`;
}

// ── Opening (6) ──────────────────────────────────────────────

reg('title', s => slide('title', '', `
  <h2 class="dk-title">${esc(s.title)}</h2>
  ${s.subtitle ? `<h3 class="dk-subtitle">${esc(s.subtitle)}</h3>` : ''}
  ${s.author ? `<p class="dk-body">${esc(s.author)}</p>` : ''}
  ${s.date ? `<p class="dk-body">${esc(s.date)}</p>` : ''}
`, s));

reg('title-subtitle', s => slide('title-subtitle', '', `
  <h2 class="dk-title">${esc(s.title)}</h2>
  ${s.subtitle ? `<h3 class="dk-subtitle">${esc(s.subtitle)}</h3>` : ''}
  ${s.tagline ? `<p class="dk-body dk-tagline">${esc(s.tagline)}</p>` : ''}
`, s));

reg('speaker-intro', s => slide('speaker-intro', '', `
  <div class="dk-items" style="display:flex;align-items:center;gap:60px;justify-content:center;">
    ${s.photo ? `<img class="dk-image" src="${esc(s.photo)}" alt="${esc(s.name)}" style="width:280px;height:280px;border-radius:50%;object-fit:cover;">` : ''}
    <div>
      <h2 class="dk-title">${esc(s.name)}</h2>
      ${s.role ? `<h3 class="dk-subtitle">${esc(s.role)}</h3>` : ''}
      ${s.bio ? `<p class="dk-body">${escBody(s.bio)}</p>` : ''}
      ${s.credentials && s.credentials.length ? `<div class="dk-items">${s.credentials.map(c => `<span class="dk-tag">${esc(c)}</span>`).join('')}</div>` : ''}
    </div>
  </div>
`, s));

reg('multi-speaker', s => slide('multi-speaker',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items dk-grid dk-grid--${Math.min((s.speakers||[]).length, 4)}">
    ${(s.speakers||[]).map(sp => `
      <div class="dk-item" style="text-align:center;">
        ${sp.photo ? `<img class="dk-image" src="${esc(sp.photo)}" alt="${esc(sp.name)}" style="width:160px;height:160px;border-radius:50%;object-fit:cover;">` : ''}
        <h4 class="dk-item-title">${esc(sp.name)}</h4>
        ${sp.role ? `<p class="dk-item-body" style="opacity:0.7;">${esc(sp.role)}</p>` : ''}
        ${sp.bio ? `<p class="dk-item-body">${esc(sp.bio)}</p>` : ''}
      </div>
    `).join('')}
  </div>`, s));

reg('company-overview', s => slide('company-overview', '', `
  <div style="text-align:center;">
    ${s.logo ? `<img class="dk-image" src="${esc(s.logo)}" alt="Logo" style="max-height:120px;margin-bottom:24px;">` : ''}
    <h2 class="dk-title">${esc(s.title)}</h2>
    ${s.tagline ? `<h3 class="dk-subtitle">${esc(s.tagline)}</h3>` : ''}
    ${s.facts && s.facts.length ? `<div class="dk-items dk-grid dk-grid--${Math.min(s.facts.length,4)}" style="margin-top:60px;">
      ${s.facts.map(f => `<div class="dk-item" style="text-align:center;">
        <div class="dk-stat">${esc(f.value)}</div>
        <div class="dk-stat-label">${esc(f.label)}</div>
      </div>`).join('')}
    </div>` : ''}
  </div>
`, s));

reg('agenda', s => slide('agenda',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map((it, i) => {
      const isObj = typeof it === 'object';
      return `<div class="dk-item">
          <h4 class="dk-item-title">${esc(isObj ? it.title : it)}</h4>
          ${isObj && it.description ? `<p class="dk-item-body">${esc(it.description)}</p>` : ''}
      </div>`;
    }).join('')}
  </div>`, s));

// ── Content (8) ──────────────────────────────────────────────

reg('text', s => slide('text',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-body">${escBody(s.body)}</div>`, s));

reg('bullets', s => slide('bullets',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<ul class="dk-items">
    ${(s.items||[]).map(it => `<li class="dk-item">${esc(it)}</li>`).join('')}
  </ul>`, s));

reg('two-col', s => {
  const l = s.left || {};
  const r = s.right || {};
  return slide('two-col',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-grid dk-grid--2">
      <div class="dk-left">
        ${l.title ? `<h4 class="dk-item-title">${esc(l.title)}</h4>` : ''}
        ${l.body ? `<div class="dk-body">${escBody(l.body)}</div>` : ''}
      </div>
      <div class="dk-right">
        ${r.title ? `<h4 class="dk-item-title">${esc(r.title)}</h4>` : ''}
        ${r.body ? `<div class="dk-body">${escBody(r.body)}</div>` : ''}
      </div>
    </div>`, s);
});

reg('three-col', s => slide('three-col',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-grid dk-grid--3">
    ${(s.columns||[]).map(c => `<div class="dk-item">
      ${c.icon ? dkIcon(c.icon) : ''}
      ${c.title ? `<h4 class="dk-item-title">${esc(c.title)}</h4>` : ''}
      ${c.body ? `<p class="dk-item-body">${escBody(c.body)}</p>` : ''}
    </div>`).join('')}
  </div>`, s));

reg('image-left', s => slide('image-left',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-grid dk-grid--2">
    <div class="dk-left">
      <img class="dk-image" src="${esc(s.image)}" alt="${esc(s.title)}">
      ${s.caption ? `<p class="dk-body" style="font-size:0.8em;opacity:0.7;">${esc(s.caption)}</p>` : ''}
    </div>
    <div class="dk-right">
      <div class="dk-body">${escBody(s.body)}</div>
    </div>
  </div>`, s));

reg('image-right', s => slide('image-right',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-grid dk-grid--2">
    <div class="dk-left">
      <div class="dk-body">${escBody(s.body)}</div>
    </div>
    <div class="dk-right">
      <img class="dk-image" src="${esc(s.image)}" alt="${esc(s.title)}">
      ${s.caption ? `<p class="dk-body" style="font-size:0.8em;opacity:0.7;">${esc(s.caption)}</p>` : ''}
    </div>
  </div>`, s));

reg('image-full', s => slide('image-full', '',
  `<div style="position:relative;width:100%;height:100%;">
    <img class="dk-image" src="${esc(s.image)}" alt="${esc(s.title)}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
    <div style="position:relative;z-index:1;${s.overlay ? 'background:rgba(0,0,0,0.5);padding:80px;height:100%;display:flex;flex-direction:column;justify-content:center;color:#fff;' : 'padding:80px;'}">
      <h2 class="dk-title">${esc(s.title)}</h2>
      ${s.body ? `<div class="dk-body">${escBody(s.body)}</div>` : ''}
    </div>
  </div>`, s));

reg('code', s => slide('code',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `${s.description ? `<p class="dk-body">${escBody(s.description)}</p>` : ''}
  <pre class="dk-code"><code data-language="${esc(s.language||'')}">${esc(s.code)}</code></pre>`, s));

// ── Infographic: Stats (6) ──────────────────────────────────

reg('stat-single', s => slide('stat-single',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="text-align:center;">
    ${s.icon ? dkIcon(s.icon) : ''}
    <div class="dk-stat" style="font-size:120px;">${esc(s.stat)}</div>
    <div class="dk-stat-label">${esc(s.label)}</div>
    ${s.description ? `<p class="dk-body">${escBody(s.description)}</p>` : ''}
  </div>`, s));

reg('stat-row', s => slide('stat-row',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items" style="display:flex;justify-content:space-around;align-items:center;">
    ${(s.items||[]).map(it => `<div class="dk-item" style="text-align:center;">
      ${it.icon ? dkIcon(it.icon) : ''}
      <div class="dk-stat">${esc(it.stat)}</div>
      <div class="dk-stat-label">${esc(it.label)}</div>
    </div>`).join('')}
  </div>`, s));

reg('stat-grid', s => {
  const cols = Math.min((s.items||[]).length, 4);
  return slide('stat-grid',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items dk-grid dk-grid--${cols}">
      ${(s.items||[]).map(it => `<div class="dk-item" style="text-align:center;">
        ${it.icon ? dkIcon(it.icon) : ''}
        <div class="dk-stat">${esc(it.stat)}</div>
        <div class="dk-stat-label">${esc(it.label)}</div>
      </div>`).join('')}
    </div>`, s);
});

reg('stat-progress-bar', s => slide('stat-progress-bar',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item" style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span class="dk-stat-label">${esc(it.label)}</span>
        <span class="dk-stat">${esc(it.value)}%</span>
      </div>
      <div class="dk-progress">
        <div class="dk-progress-fill" style="width:${Number(it.value)||0}%;background:${esc(it.color||'var(--dk-accent, #3b82f6)')}"></div>
      </div>
    </div>`).join('')}
  </div>`, s));

reg('stat-progress-circle', s => {
  const items = s.items || [];
  return slide('stat-progress-circle',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items" style="display:flex;justify-content:space-around;flex-wrap:wrap;gap:40px;">
      ${items.map(it => {
        const val = Number(it.value) || 0;
        const r = 54, circ = 2 * Math.PI * r;
        const offset = circ - (val / 100) * circ;
        const color = it.color || 'var(--dk-accent, #3b82f6)';
        return `<div class="dk-item" style="text-align:center;">
          <svg class="dk-circle" data-value="${val}" width="140" height="140" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(128,128,128,0.2)" stroke-width="10"/>
            <circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="10"
              stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
              stroke-linecap="round" transform="rotate(-90 60 60)"/>
            <text x="60" y="60" text-anchor="middle" dominant-baseline="central" style="font-size:24px;font-weight:bold;fill:currentColor;">${val}%</text>
          </svg>
          <div class="dk-stat-label">${esc(it.label)}</div>
        </div>`;
      }).join('')}
    </div>`, s);
});

reg('stat-pictograph', s => slide('stat-pictograph',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => {
      const val = Number(it.value)||0, total = Number(it.total)||10;
      const iconHtml = it.icon ? dkIcon(it.icon) : dkIcon('user');
      const filled = Array(val).fill(`<span style="opacity:1;">${iconHtml}</span>`).join('');
      const empty = Array(Math.max(0,total-val)).fill(`<span style="opacity:0.2;">${iconHtml}</span>`).join('');
      return `<div class="dk-item" style="margin-bottom:24px;">
        <div class="dk-stat-label" style="margin-bottom:8px;">${esc(it.label)} (${val}/${total})</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">${filled}${empty}</div>
      </div>`;
    }).join('')}
  </div>`, s));

// ── Infographic: Flow (7) ────────────────────────────────────

reg('flow-horizontal', s => slide('flow-horizontal',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items" style="display:flex;align-items:flex-start;justify-content:center;gap:0;">
    ${(s.items||[]).map((it, i, arr) => `
      <div class="dk-item" style="text-align:center;flex:1;max-width:280px;">
        ${it.icon ? dkIcon(it.icon) : ''}
        <h4 class="dk-item-title">${esc(it.title)}</h4>
        ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
      </div>
      ${i < arr.length - 1 ? `<div class="dk-arrow" style="display:flex;align-items:center;padding-top:20px;font-size:32px;color:var(--dk-accent, #3b82f6);">${DK_ICONS['arrow-right']}</div>` : ''}
    `).join('')}
  </div>`, s));

reg('flow-vertical', s => slide('flow-vertical',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map((it, i, arr) => `
      <div class="dk-item">
        ${it.icon ? dkIcon(it.icon) : ''}
        <div style="flex:1;text-align:left;">
          <h4 class="dk-item-title" style="margin:0;">${esc(it.title)}</h4>
          ${it.body ? `<p class="dk-item-body" style="margin:2px 0 0;">${esc(it.body)}</p>` : ''}
        </div>
      </div>
      ${i < arr.length - 1 ? `<div class="dk-arrow">${DK_ICONS['arrow-right']}</div>` : ''}
    `).join('')}
  </div>`, s));

reg('flow-numbered', s => slide('flow-numbered',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map((it, i) => `
      <div class="dk-item">
        <h4 class="dk-item-title">${esc(it.title)}</h4>
        ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
      </div>
    `).join('')}
  </div>`, s));

reg('flow-snake', s => {
  const items = s.items || [];
  const perRow = 4;
  const rows = [];
  for (let i = 0; i < items.length; i += perRow) {
    rows.push(items.slice(i, i + perRow));
  }
  return slide('flow-snake',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items">
      ${rows.map((row, ri) => {
        const reversed = ri % 2 === 1;
        const ordered = reversed ? [...row].reverse() : row;
        return `<div style="display:flex;justify-content:center;gap:20px;${reversed ? 'flex-direction:row-reverse;' : ''}margin-bottom:16px;">
          ${ordered.map((it, ci, arr) => `
            <div class="dk-item" style="text-align:center;flex:1;max-width:240px;">
              <h4 class="dk-item-title">${esc(it.title)}</h4>
              ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
            </div>
            ${ci < arr.length - 1 ? `<div class="dk-arrow" style="display:flex;align-items:center;font-size:24px;color:var(--dk-accent, #3b82f6);">${DK_ICONS['arrow-right']}</div>` : ''}
          `).join('')}
        </div>
        ${ri < rows.length - 1 ? `<div class="dk-arrow" style="text-align:${reversed ? 'left' : 'right'};font-size:24px;color:var(--dk-accent, #3b82f6);transform:rotate(90deg);padding:8px 40px;">${DK_ICONS['arrow-right']}</div>` : ''}`;
      }).join('')}
    </div>`, s);
});

reg('flow-cycle', s => {
  const items = s.items || [];
  const n = items.length;
  const cx = 50, cy = 50, r = 38;
  let nodesHtml = '';
  let svgLines = '';
  items.forEach((it, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    nodesHtml += `<div style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);width:200px;text-align:center;background:var(--dk-color-surface);border:2px solid var(--dk-color-primary,#FF9900);border-radius:6px;padding:16px 20px;color:#fff;">
      <h4 class="dk-item-title" style="margin:0;font-size:20px;">${esc(it.title)}</h4>
      ${it.body ? `<p class="dk-item-body" style="margin:6px 0 0;font-size:15px;">${esc(it.body)}</p>` : ''}
    </div>`;
    const next = (i + 1) % n;
    const a2 = (2 * Math.PI * next / n) - Math.PI / 2;
    const midAngle = angle + (a2 - angle + (a2 < angle ? 2*Math.PI : 0)) / 2;
    const ax = cx + (r - 6) * Math.cos(midAngle);
    const ay = cy + (r - 6) * Math.sin(midAngle);
    const arrowAngle = (midAngle + Math.PI/2) * 180 / Math.PI;
    nodesHtml += `<div style="position:absolute;left:${ax}%;top:${ay}%;transform:translate(-50%,-50%) rotate(${arrowAngle}deg);color:var(--dk-color-primary,#FF6A00);font-size:28px;">&#x25B6;</div>`;
  });
  return slide('flow-cycle',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="position:relative;width:100%;height:700px;margin:0 auto;">
      ${nodesHtml}
    </div>`, s);
});

reg('flow-funnel', s => slide('flow-funnel',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      <h4 class="dk-item-title">${esc(it.title)}</h4>
      ${it.value ? `<div style="font-size:24px;font-weight:800;margin:4px 0;">${esc(it.value)}</div>` : ''}
      ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
    </div>`).join('')}
  </div>`, s));

reg('flow-funnel-inverted', s => slide('flow-funnel-inverted',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      <h4 class="dk-item-title">${esc(it.title)}</h4>
      ${it.value ? `<div style="font-size:24px;font-weight:800;margin:4px 0;">${esc(it.value)}</div>` : ''}
      ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
    </div>`).join('')}
  </div>`, s));

// ── Infographic: Hierarchy (4) ───────────────────────────────

reg('hierarchy-pyramid', s => slide('hierarchy-pyramid',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      <h4 class="dk-item-title">${esc(it.title)}</h4>
      ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
    </div>`).join('')}
  </div>`, s));

reg('hierarchy-concentric', s => {
  const items = s.items || [];
  const n = items.length;
  const cx = 400, cy = 380, maxR = 320;
  let svgContent = '';
  // Draw rings from outside-in
  for (let i = n - 1; i >= 0; i--) {
    const r = maxR * (n - i) / n;
    const opacity = 0.18 + 0.16 * i;
    svgContent += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--dk-color-accent,#0066FF)" opacity="${opacity}"/>`;
  }
  // Place each label at the TOP of its ring (between this ring and the next inner one)
  items.forEach((it, i) => {
    const rOuter = maxR * (n - i) / n;
    const rInner = i === n - 1 ? 0 : maxR * (n - i - 1) / n;
    // Label sits in the band between rOuter and rInner, near the top
    const labelY = cy - (rOuter + rInner) / 2;
    svgContent += `<text x="${cx}" y="${labelY}" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">${esc(it.title)}</text>`;
    if (it.body) {
      svgContent += `<text x="${cx}" y="${labelY + 22}" text-anchor="middle" fill="#fff" font-size="13" opacity="0.85">${esc(it.body)}</text>`;
    }
  });
  return slide('hierarchy-concentric',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 800 760" width="800" height="700">${svgContent}</svg>
    </div>`, s);
});

reg('hierarchy-stacked', s => slide('hierarchy-stacked',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      <div>
        <h4 class="dk-item-title">${esc(it.title)}</h4>
        ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
      </div>
    </div>`).join('')}
  </div>`, s));

function renderOrgTree(node, depth) {
  if (!node) return '';
  const children = node.children || [];
  const isRoot = depth === 0;
  const bg = isRoot ? 'var(--dk-color-primary,#FF6A00)' : '#f8fafc';
  const color = isRoot ? '#fff' : '#1a1a2e';
  const border = isRoot ? 'none' : '2px solid var(--dk-color-border,#E2E8F0)';
  return `<div style="display:flex;flex-direction:column;align-items:center;">
    <div style="display:inline-block;padding:14px 28px;background:${bg};color:${color};border:${border};border-radius:10px;text-align:center;min-width:140px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <strong style="font-size:${isRoot ? 20 : 16}px;">${esc(node.title || node.name)}</strong>
      ${node.role ? `<div style="font-size:13px;opacity:0.7;margin-top:2px;">${esc(node.role)}</div>` : ''}
    </div>
    ${children.length ? `<div style="width:2px;height:20px;background:var(--dk-color-border,#ccc);"></div>
    <div style="display:flex;gap:24px;position:relative;">
      <div style="position:absolute;top:0;left:50px;right:50px;height:2px;background:var(--dk-color-border,#ccc);"></div>
      ${children.map(c => `<div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:2px;height:20px;background:var(--dk-color-border,#ccc);"></div>
        ${renderOrgTree(c, depth + 1)}
      </div>`).join('')}
    </div>` : ''}
  </div>`;
}

reg('hierarchy-org', s => slide('hierarchy-org',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="display:flex;justify-content:center;">${renderOrgTree(s.root, 0)}</div>`, s));

// ── Infographic: Relationship (5) ────────────────────────────

reg('rel-venn', s => {
  const items = s.items || [];
  const n = items.length;
  const cx = 500, cy = 380, baseR = 220, offset = 130;
  let circles = '';
  const colors = ['#FF9900', '#00A1C9', '#7DB13B', '#D13212'];
  const fills = ['rgba(255,153,0,0.25)', 'rgba(0,161,201,0.25)', 'rgba(125,177,59,0.25)', 'rgba(209,50,18,0.25)'];
  items.forEach((it, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    const x = cx + (n > 1 ? offset * Math.cos(angle) : 0);
    const y = cy + (n > 1 ? offset * Math.sin(angle) : 0);
    circles += `<circle cx="${x}" cy="${y}" r="${baseR}" fill="${fills[i % fills.length]}" stroke="${colors[i % colors.length]}" stroke-width="3"/>`;
  });
  items.forEach((it, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    const x = cx + (n > 1 ? offset * Math.cos(angle) : 0);
    const y = cy + (n > 1 ? offset * Math.sin(angle) : 0);
    const labelDist = baseR * 0.55;
    const tx = x + labelDist * Math.cos(angle);
    const ty = y + labelDist * Math.sin(angle);
    circles += `<foreignObject x="${tx-110}" y="${ty-50}" width="220" height="100">
      <div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
        <strong style="font-size:20px;color:${colors[i % colors.length]};font-weight:700;">${esc(it.title)}</strong>
        ${(it.items||[]).slice(0,3).map(sub => `<div style="font-size:13px;color:#fff;line-height:1.4;">${esc(sub)}</div>`).join('')}
      </div>
    </foreignObject>`;
  });
  if (s.intersection) {
    circles += `<foreignObject x="${cx-140}" y="${cy-40}" width="280" height="100">
      <div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-size:14px;font-weight:600;color:#fff;display:flex;align-items:center;justify-content:center;height:100%;line-height:1.4;background:rgba(15,27,45,0.85);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,0.15);">
        ${esc(s.intersection)}
      </div>
    </foreignObject>`;
  }
  return slide('rel-venn',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 1000 760" width="1000" height="700">${circles}</svg>
    </div>`, s);
});

reg('rel-hub-spoke', s => {
  const spokes = s.spokes || [];
  const n = spokes.length;
  const center = s.center || {};
  const cx = 50, cy = 50, r = 36;
  let nodesHtml = '';
  // Center node
  nodesHtml += `<div style="position:absolute;left:${cx}%;top:${cy}%;transform:translate(-50%,-50%);width:180px;text-align:center;background:var(--dk-color-primary,#FF6A00);border-radius:50%;padding:32px 20px;color:#fff;z-index:2;aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <strong style="font-size:22px;display:block;">${esc(center.title)}</strong>
    ${center.body ? `<div style="font-size:14px;opacity:0.85;margin-top:4px;">${esc(center.body)}</div>` : ''}
  </div>`;
  // Spokes
  spokes.forEach((sp, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    // Line from center to spoke (using a stretched div)
    const lineLen = Math.sqrt(Math.pow((x-cx)*16, 2) + Math.pow((y-cy)*7, 2));
    const lineAngle = Math.atan2((y-cy)*7, (x-cx)*16) * 180 / Math.PI;
    nodesHtml += `<div style="position:absolute;left:${cx}%;top:${cy}%;width:${lineLen}px;height:2px;background:var(--dk-color-primary,#FF6A00);opacity:0.3;transform-origin:0 50%;transform:rotate(${lineAngle}deg);z-index:0;"></div>`;
    // Spoke node
    nodesHtml += `<div style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);width:200px;text-align:center;background:var(--dk-color-surface);border:2px solid var(--dk-color-primary,#FF9900);border-radius:6px;padding:16px 20px;color:#fff;z-index:1;">
      <strong style="font-size:18px;">${esc(sp.title)}</strong>
      ${sp.body ? `<div style="font-size:14px;opacity:0.7;margin-top:4px;">${esc(sp.body)}</div>` : ''}
    </div>`;
  });
  return slide('rel-hub-spoke',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="position:relative;width:100%;height:700px;">
      ${nodesHtml}
    </div>`, s);
});

reg('rel-quadrant', s => {
  const quads = s.quadrants || [];
  return slide('rel-quadrant',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="position:relative;">
      ${s.y_label ? `<div style="position:absolute;left:-40px;top:50%;transform:rotate(-90deg) translateX(-50%);font-size:14px;opacity:0.6;">${esc(s.y_label)}</div>` : ''}
      ${s.x_label ? `<div style="text-align:center;margin-top:8px;font-size:14px;opacity:0.6;">${esc(s.x_label)}</div>` : ''}
      <div class="dk-grid dk-grid--2" style="border:2px solid var(--dk-accent,#3b82f6);border-radius:8px;overflow:hidden;">
        ${quads.map((q, i) => `<div class="dk-item" style="padding:24px;border:1px solid rgba(128,128,128,0.2);">
          <h4 class="dk-item-title">${esc(q.title)}</h4>
          ${q.items && q.items.length ? `<ul style="margin:8px 0 0;padding-left:20px;">${q.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}
      </div>
    </div>`, s);
});

reg('rel-mind-map', s => {
  const branches = s.branches || [];
  const n = branches.length;
  const cx = 600, cy = 380, r = 240;
  let svgContent = '';
  svgContent += `<rect x="${cx-90}" y="${cy-32}" width="180" height="64" rx="32" fill="var(--dk-color-primary,#FF6A00)"/>`;
  svgContent += `<text x="${cx}" y="${cy+7}" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">${esc(s.center)}</text>`;
  branches.forEach((b, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    const bx = cx + r * Math.cos(angle);
    const by = cy + r * Math.sin(angle);
    // Connector from center to branch
    svgContent += `<line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="var(--dk-color-primary,#FF6A00)" stroke-width="2.5" opacity="0.4"/>`;
    // Branch pill
    svgContent += `<rect x="${bx-70}" y="${by-18}" width="140" height="36" rx="18" fill="var(--dk-color-accent,#0066FF)"/>`;
    svgContent += `<text x="${bx}" y="${by+6}" text-anchor="middle" fill="#fff" font-size="15" font-weight="bold">${esc(b.title)}</text>`;
    // Sub-items: stack vertically below or above the branch pill, depending on position
    if (b.items && b.items.length) {
      const goingUp = angle < 0 && Math.abs(Math.sin(angle)) > 0.3;
      const startY = goingUp ? by - 30 : by + 30;
      const stepY = goingUp ? -22 : 22;
      b.items.slice(0, 4).forEach((sub, si) => {
        const sy = startY + stepY * (si + 1);
        svgContent += `<text x="${bx}" y="${sy}" text-anchor="middle" fill="#64748B" font-size="13">${esc(sub)}</text>`;
      });
    }
  });
  return slide('rel-mind-map',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 1200 760" width="1200" height="700">${svgContent}</svg>
    </div>`, s);
});

reg('rel-network', s => {
  const nodes = s.nodes || [];
  const edges = s.edges || [];
  const n = nodes.length;
  const cx = 550, cy = 380, r = 280;
  const positions = {};
  nodes.forEach((nd, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    positions[nd.id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), angle };
  });
  let svgContent = '<defs><marker id="dk-net-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="var(--dk-color-accent,#0066FF)"/></marker></defs>';
  edges.forEach(e => {
    const from = positions[e.from], to = positions[e.to];
    if (from && to) {
      svgContent += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="var(--dk-color-accent,#0066FF)" stroke-width="2" opacity="0.4" marker-end="url(#dk-net-arrow)"/>`;
    }
  });
  nodes.forEach(nd => {
    const p = positions[nd.id];
    // Smaller circle, label outside
    svgContent += `<circle cx="${p.x}" cy="${p.y}" r="14" fill="var(--dk-color-primary,#FF6A00)" stroke="#fff" stroke-width="3"/>`;
    // Place label outside the circle, away from center
    const labelDist = 38;
    const lx = p.x + labelDist * Math.cos(p.angle);
    const ly = p.y + labelDist * Math.sin(p.angle);
    svgContent += `<foreignObject x="${lx-90}" y="${ly-20}" width="180" height="40">
      <div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-size:14px;font-weight:600;color:#fff;background:var(--dk-color-surface);padding:4px 10px;border-radius:4px;border:1px solid var(--dk-color-border);display:inline-block;white-space:nowrap;">${esc(nd.title)}</div>
    </foreignObject>`;
  });
  return slide('rel-network',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 1100 760" width="1100" height="700">${svgContent}</svg>
    </div>`, s);
});

// ── Infographic: Icon-driven (3) ─────────────────────────────

reg('icon-grid', s => {
  const items = s.items || [];
  const cols = Math.min(items.length, 4);
  return slide('icon-grid',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items dk-grid dk-grid--${cols}">
      ${items.map(it => `<div class="dk-item" style="text-align:center;">
        ${it.icon ? dkIcon(it.icon) : ''}
        <h4 class="dk-item-title">${esc(it.title)}</h4>
        ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
      </div>`).join('')}
    </div>`, s);
});

reg('icon-row', s => slide('icon-row',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      ${it.icon ? dkIcon(it.icon) : ''}
      <div>
        <h4 class="dk-item-title">${esc(it.title)}</h4>
        ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
      </div>
    </div>`).join('')}
  </div>`, s));

reg('icon-stat', s => slide('icon-stat',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items" style="display:flex;justify-content:space-around;">
    ${(s.items||[]).map(it => `<div class="dk-item" style="text-align:center;">
      ${it.icon ? dkIcon(it.icon) : ''}
      <div class="dk-stat">${esc(it.stat)}</div>
      <div class="dk-stat-label">${esc(it.label)}</div>
    </div>`).join('')}
  </div>`, s));

// ── Comparison (5) ───────────────────────────────────────────

reg('compare-table', s => slide('compare-table',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<table style="width:100%;border-collapse:collapse;">
    <thead><tr>${(s.headers||[]).map(h => `<th style="padding:12px 16px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:left;">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${(s.rows||[]).map(row => `<tr>${row.map((cell, ci) => `<td style="padding:12px 16px;border-bottom:1px solid rgba(128,128,128,0.2);${s.highlight_col === ci ? 'background:rgba(59,130,246,0.1);font-weight:bold;' : ''}">${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>`, s));

reg('compare-versus', s => {
  const l = s.left || {}, r = s.right || {};
  return slide('compare-versus',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-grid dk-grid--2" style="gap:40px;position:relative;">
      <div class="dk-left" style="border:1px solid var(--dk-color-accent);border-radius:6px;padding:32px;background:var(--dk-color-surface);">
        <h4 class="dk-item-title" style="text-align:center;margin-bottom:16px;font-size:28px;color:var(--dk-color-accent);">${esc(l.title)}</h4>
        <div style="display:flex;flex-direction:column;gap:12px;">${(l.items||[]).map(it => `<div style="padding:12px 16px;background:rgba(0,161,201,0.08);border-left:3px solid var(--dk-color-accent);border-radius:4px;font-size:20px;color:#fff;">${esc(it)}</div>`).join('')}</div>
      </div>
      <div class="dk-right" style="border:1px solid var(--dk-color-primary);border-radius:6px;padding:32px;background:var(--dk-color-surface);">
        <h4 class="dk-item-title" style="text-align:center;margin-bottom:16px;font-size:28px;color:var(--dk-color-primary);">${esc(r.title)}</h4>
        <div style="display:flex;flex-direction:column;gap:12px;">${(r.items||[]).map(it => `<div style="padding:12px 16px;background:rgba(255,153,0,0.08);border-left:3px solid var(--dk-color-primary);border-radius:4px;font-size:20px;color:#fff;">${esc(it)}</div>`).join('')}</div>
      </div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--dk-color-bg);padding:12px 18px;border-radius:50%;border:3px solid var(--dk-color-primary);font-weight:bold;font-size:20px;color:var(--dk-color-primary);z-index:2;">VS</div>
    </div>`, s);
});

reg('compare-before-after', s => {
  const b = s.before || {}, a = s.after || {};
  return slide('compare-before-after',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-grid dk-grid--2" style="gap:40px;">
      <div class="dk-left" style="border-radius:6px;padding:32px;background:var(--dk-color-surface);border-top:3px solid var(--dk-color-danger);">
        <h4 class="dk-item-title" style="text-align:center;margin-bottom:16px;font-size:28px;color:var(--dk-color-danger);">${esc(b.title || 'Before')}</h4>
        ${b.image ? `<img class="dk-image" src="${esc(b.image)}" style="max-height:200px;margin:0 auto 16px;display:block;">` : ''}
        <div style="display:flex;flex-direction:column;gap:12px;">${(b.items||[]).map(it => `<div style="padding:12px 16px;background:rgba(209,50,18,0.1);border-radius:4px;font-size:20px;color:#fff;">${esc(it)}</div>`).join('')}</div>
      </div>
      <div class="dk-right" style="border-radius:6px;padding:32px;background:var(--dk-color-surface);border-top:3px solid var(--dk-color-success);">
        <h4 class="dk-item-title" style="text-align:center;margin-bottom:16px;font-size:28px;color:#7DB13B;">${esc(a.title || 'After')}</h4>
        ${a.image ? `<img class="dk-image" src="${esc(a.image)}" style="max-height:200px;margin:0 auto 16px;display:block;">` : ''}
        <div style="display:flex;flex-direction:column;gap:12px;">${(a.items||[]).map(it => `<div style="padding:12px 16px;background:rgba(125,177,59,0.1);border-radius:4px;font-size:20px;color:#fff;">${esc(it)}</div>`).join('')}</div>
      </div>
    </div>`, s);
});

reg('compare-pros-cons', s => slide('compare-pros-cons',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-grid dk-grid--2" style="gap:40px;">
    <div class="dk-left" style="border-radius:6px;padding:32px;background:var(--dk-color-surface);border-top:3px solid #7DB13B;">
      <h4 class="dk-item-title" style="color:#7DB13B;margin-bottom:16px;font-size:28px;">Pros</h4>
      <div style="display:flex;flex-direction:column;gap:12px;">${(s.pros||[]).map(it => `<div class="dk-item" style="color:#fff;padding:14px 20px;background:rgba(125,177,59,0.1);border-radius:4px;font-size:20px;"><span style="color:#7DB13B;">&#x2713;</span> ${esc(it)}</div>`).join('')}</div>
    </div>
    <div class="dk-right" style="border-radius:6px;padding:32px;background:var(--dk-color-surface);border-top:3px solid var(--dk-color-danger);">
      <h4 class="dk-item-title" style="color:var(--dk-color-danger);margin-bottom:16px;font-size:28px;">Cons</h4>
      <div style="display:flex;flex-direction:column;gap:12px;">${(s.cons||[]).map(it => `<div class="dk-item" style="color:#fff;padding:14px 20px;background:rgba(209,50,18,0.1);border-radius:4px;font-size:20px;"><span style="color:var(--dk-color-danger);">&#x2717;</span> ${esc(it)}</div>`).join('')}</div>
    </div>
  </div>`, s));

reg('compare-scale', s => slide('compare-scale',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="display:flex;flex-direction:column;gap:32px;width:100%;max-width:1400px;margin:0 auto;">
    <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:600;color:var(--dk-color-muted,#64748B);">
      <span>${esc(s.low_label || 'Low')}</span>
      <span>${esc(s.high_label || 'High')}</span>
    </div>
    ${(s.items||[]).map(it => {
      const v = Number(it.value) || 0;
      return `<div>
        <div style="display:flex;justify-content:space-between;margin-bottom:10px;align-items:baseline;">
          <span style="font-size:20px;font-weight:600;">${esc(it.label)}</span>
          <span style="font-size:24px;font-weight:800;color:var(--dk-color-primary,#FF6A00);">${v}%</span>
        </div>
        <div class="dk-progress">
          <div class="dk-progress-fill" style="left:calc(${v}% - 16px);"></div>
        </div>
      </div>`;
    }).join('')}
  </div>`, s));

// ── Data (4) ─────────────────────────────────────────────────

reg('table', s => slide('table',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<table style="width:100%;border-collapse:collapse;">
    <thead><tr>${(s.headers||[]).map(h => `<th style="padding:12px 16px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:left;">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${(s.rows||[]).map(row => `<tr>${row.map((cell, ci) => `<td style="padding:12px 16px;border-bottom:1px solid rgba(128,128,128,0.2);${s.highlight_col === ci ? 'background:rgba(59,130,246,0.1);font-weight:bold;' : ''}">${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>`, s));

reg('chart-placeholder', s => slide('chart-placeholder',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="text-align:center;">
    ${s.image ? `<img class="dk-image" src="${esc(s.image)}" alt="${esc(s.caption||s.title)}" style="max-height:500px;">` : '<div style="height:400px;display:flex;align-items:center;justify-content:center;border:2px dashed rgba(128,128,128,0.3);border-radius:12px;">[Chart Placeholder]</div>'}
    ${s.caption ? `<p class="dk-body" style="margin-top:16px;opacity:0.7;">${esc(s.caption)}</p>` : ''}
    ${s.description ? `<p class="dk-body">${escBody(s.description)}</p>` : ''}
  </div>`, s));

reg('scorecard', s => {
  const statusMap = { red: 'red', yellow: 'amber', amber: 'amber', green: 'green' };
  const statusColors = { red: 'var(--dk-color-danger)', amber: 'var(--dk-color-primary)', green: '#7DB13B' };
  return slide('scorecard',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items">
      ${(s.items||[]).map(it => {
        const st = statusMap[it.status] || 'amber';
        return `<div class="dk-item status-${st}">
          <div style="flex:1;min-width:0;">
            <div style="font-size:18px;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">${esc(it.metric)}</div>
            ${it.target ? `<div style="font-size:14px;color:var(--dk-color-muted);">Target: ${esc(it.target)}</div>` : ''}
          </div>
          <div style="font-size:32px;font-weight:800;color:${statusColors[st]};text-align:right;white-space:nowrap;">${esc(it.value)}</div>
        </div>`;
      }).join('')}
    </div>`, s);
});

reg('maturity-model', s => {
  const levels = s.levels || [];
  const current = Number(s.current) || 1;
  return slide('maturity-model',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items">
      ${levels.map((lv, i) => {
        const isCurrent = i + 1 === current;
        const pct = ((i + 1) / levels.length) * 100;
        return `<div class="dk-item${isCurrent ? ' current' : ''}">
          <div style="font-size:24px;font-weight:800;color:var(--dk-color-primary);min-width:60px;">L${i+1}</div>
          <div style="flex:1;">
            <h4 class="dk-item-title">${esc(lv.title)}</h4>
            ${lv.body ? `<p class="dk-item-body">${esc(lv.body)}</p>` : ''}
          </div>
          <div class="dk-progress" style="max-width:200px;">
            <div class="dk-progress-fill" style="width:${pct}%;background:var(--dk-color-primary);"></div>
          </div>
        </div>`;
      }).join('')}
    </div>`, s);
});

// ── Commercial (6) ───────────────────────────────────────────

reg('pricing', s => slide('pricing',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items dk-grid dk-grid--${Math.min((s.tiers||[]).length, 4)}" style="align-items:stretch;">
    ${(s.tiers||[]).map(t => `<div class="dk-item" style="padding:32px;border-radius:12px;border:2px solid ${t.highlighted ? 'var(--dk-accent,#3b82f6)' : 'rgba(128,128,128,0.2)'};${t.highlighted ? 'transform:scale(1.05);box-shadow:0 8px 30px rgba(59,130,246,0.2);' : ''}">
      <h4 class="dk-item-title" style="text-align:center;">${esc(t.name)}</h4>
      <div class="dk-stat" style="text-align:center;margin:16px 0;">${esc(t.price)}</div>
      ${t.period ? `<div class="dk-stat-label" style="text-align:center;margin-bottom:16px;">${esc(t.period)}</div>` : ''}
      <ul style="list-style:none;padding:0;">${(t.features||[]).map(f => `<li style="padding:6px 0;border-bottom:1px solid rgba(128,128,128,0.1);">${esc(f)}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>`, s));

reg('tco', s => slide('tco',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<table style="width:100%;border-collapse:collapse;">
    <thead><tr><th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:left;">Category</th><th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:right;">Current</th><th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:right;">Proposed</th></tr></thead>
    <tbody>
      ${(s.items||[]).map(it => `<tr>
        <td style="padding:12px;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(it.category)}</td>
        <td style="padding:12px;text-align:right;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(it.current)}</td>
        <td style="padding:12px;text-align:right;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(it.proposed)}</td>
      </tr>`).join('')}
      <tr style="font-weight:bold;font-size:1.1em;">
        <td style="padding:12px;border-top:2px solid var(--dk-accent,#3b82f6);">Total</td>
        <td style="padding:12px;text-align:right;border-top:2px solid var(--dk-accent,#3b82f6);">${esc(s.total_current)}</td>
        <td style="padding:12px;text-align:right;border-top:2px solid var(--dk-accent,#3b82f6);">${esc(s.total_proposed)}</td>
      </tr>
    </tbody>
  </table>`, s));

reg('case-study', s => slide('case-study',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="display:flex;gap:40px;align-items:flex-start;">
    <div style="flex:1;">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;">
        ${s.logo ? `<img class="dk-image" src="${esc(s.logo)}" alt="${esc(s.company)}" style="height:48px;">` : ''}
        <div>
          <h4 class="dk-item-title">${esc(s.company)}</h4>
          ${s.industry ? `<span class="dk-tag">${esc(s.industry)}</span>` : ''}
        </div>
      </div>
      ${s.quote ? `<blockquote class="dk-quote-text" style="border-left:4px solid var(--dk-accent,#3b82f6);padding-left:20px;font-style:italic;margin:24px 0;">"${esc(s.quote)}"</blockquote>` : ''}
      ${s.author ? `<p class="dk-attribution">— ${esc(s.author)}</p>` : ''}
    </div>
    ${s.metrics && s.metrics.length ? `<div style="display:flex;flex-direction:column;gap:16px;">
      ${s.metrics.map(m => `<div style="text-align:center;padding:16px 24px;border:2px solid var(--dk-accent,#3b82f6);border-radius:8px;">
        <div class="dk-stat">${esc(m.stat)}</div>
        <div class="dk-stat-label">${esc(m.label)}</div>
      </div>`).join('')}
    </div>` : ''}
  </div>`, s));

reg('case-study-grid', s => slide('case-study-grid',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items dk-grid dk-grid--${Math.min((s.cases||[]).length, 3)}">
    ${(s.cases||[]).map(c => `<div class="dk-item" style="padding:24px;border:1px solid rgba(128,128,128,0.2);border-radius:12px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        ${c.logo ? `<img class="dk-image" src="${esc(c.logo)}" style="height:32px;">` : ''}
        <h4 class="dk-item-title">${esc(c.company)}</h4>
      </div>
      <div class="dk-stat">${esc(c.metric)}</div>
      <div class="dk-stat-label">${esc(c.label)}</div>
      ${c.quote ? `<p class="dk-quote-text" style="font-size:14px;font-style:italic;margin-top:12px;">"${esc(c.quote)}"</p>` : ''}
    </div>`).join('')}
  </div>`, s));

reg('customer-logos', s => slide('customer-logos',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `${s.subtitle ? `<h3 class="dk-subtitle">${esc(s.subtitle)}</h3>` : ''}
  <div class="dk-grid dk-grid--4" style="gap:24px;margin-top:48px;">
    ${(s.logos||[]).map(l => `<div style="text-align:center;padding:32px 20px;background:var(--dk-color-surface);border:1px solid var(--dk-color-border);border-radius:6px;display:flex;align-items:center;justify-content:center;min-height:120px;">
      ${l.image && (l.image.startsWith('http') || l.image.startsWith('./') || l.image.startsWith('/')) ? `<img src="${esc(l.image)}" alt="${esc(l.name)}" style="max-height:60px;max-width:180px;filter:brightness(0) invert(1);opacity:0.7;">` : `<span style="font-size:18px;font-weight:600;color:#fff;letter-spacing:-0.01em;">${esc(l.name)}</span>`}
    </div>`).join('')}
  </div>`, s));

reg('sla', s => slide('sla',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item" style="display:flex;align-items:center;padding:20px;border:1px solid rgba(128,128,128,0.2);border-radius:8px;margin-bottom:12px;">
      <div style="flex:1;">
        <h4 class="dk-item-title">${esc(it.metric)}</h4>
        ${it.description ? `<p class="dk-item-body" style="opacity:0.7;">${esc(it.description)}</p>` : ''}
      </div>
      <div class="dk-stat" style="font-size:28px;">${esc(it.target)}</div>
    </div>`).join('')}
  </div>`, s));

// ── Planning (4) ─────────────────────────────────────────────

reg('timeline-horizontal', s => slide('timeline-horizontal',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items" style="position:relative;padding-top:60px;">
    <div style="position:absolute;top:80px;left:5%;right:5%;height:4px;background:var(--dk-accent,#3b82f6);border-radius:2px;"></div>
    <div style="display:flex;justify-content:space-around;position:relative;">
      ${(s.items||[]).map(it => `<div class="dk-item" style="text-align:center;flex:1;max-width:220px;">
        <div class="dk-tag" style="margin-bottom:8px;">${esc(it.date)}</div>
        <div style="width:16px;height:16px;background:var(--dk-accent,#3b82f6);border-radius:50%;margin:0 auto 12px;border:3px solid var(--dk-bg,#0f172a);"></div>
        <h4 class="dk-item-title">${esc(it.title)}</h4>
        ${it.body ? `<p class="dk-item-body" style="font-size:14px;">${esc(it.body)}</p>` : ''}
      </div>`).join('')}
    </div>
  </div>`, s));

reg('timeline-vertical', s => slide('timeline-vertical',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      <div class="dk-tag" style="margin-bottom:8px;">${esc(it.date)}</div>
      <h4 class="dk-item-title">${esc(it.title)}</h4>
      ${it.body ? `<p class="dk-item-body">${esc(it.body)}</p>` : ''}
    </div>`).join('')}
  </div>`, s));

reg('gantt', s => {
  const items = s.items || [];
  const labels = s.labels || [];
  const cols = labels.length || 4;
  return slide('gantt',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items" style="overflow-x:auto;">
      <div style="display:flex;border-bottom:1px solid rgba(128,128,128,0.2);padding:8px 0;margin-left:200px;">
        ${labels.map(l => `<div style="flex:1;text-align:center;font-size:12px;opacity:0.6;">${esc(l)}</div>`).join('')}
      </div>
      ${items.map(it => `<div class="dk-item" style="display:flex;align-items:center;margin:8px 0;">
        <div style="width:200px;padding-right:16px;font-size:14px;flex-shrink:0;">${esc(it.task)}</div>
        <div style="flex:1;position:relative;height:28px;">
          <div style="position:absolute;left:${Number(it.start)||0}%;right:${100-(Number(it.end)||100)}%;top:4px;bottom:4px;background:${esc(it.color||'var(--dk-accent,#3b82f6)')};border-radius:4px;"></div>
        </div>
      </div>`).join('')}
    </div>`, s);
});

reg('milestone', s => slide('milestone',
  '', `<div style="text-align:center;">
    ${s.icon ? `<div style="font-size:64px;margin-bottom:24px;">${dkIcon(s.icon)}</div>` : ''}
    <h2 class="dk-title">${esc(s.title)}</h2>
    ${s.date ? `<div class="dk-tag" style="font-size:20px;margin:16px auto;">${esc(s.date)}</div>` : ''}
    ${s.description ? `<p class="dk-body" style="max-width:700px;margin:16px auto;">${escBody(s.description)}</p>` : ''}
    ${s.metrics && s.metrics.length ? `<div class="dk-items" style="display:flex;justify-content:center;gap:40px;margin-top:32px;">
      ${s.metrics.map(m => `<div class="dk-item" style="text-align:center;">
        <div class="dk-stat">${esc(m.stat)}</div>
        <div class="dk-stat-label">${esc(m.label)}</div>
      </div>`).join('')}
    </div>` : ''}
  </div>`, s));

// ── People (3) ───────────────────────────────────────────────

reg('team-grid', s => {
  const cols = Math.min((s.members||[]).length, 4);
  return slide('team-grid',
    `<h2 class="dk-title">${esc(s.title)}</h2>`,
    `<div class="dk-items dk-grid dk-grid--${cols}">
      ${(s.members||[]).map(m => `<div class="dk-item" style="text-align:center;">
        ${m.photo ? `<img class="dk-image" src="${esc(m.photo)}" alt="${esc(m.name)}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:12px;">` : ''}
        <h4 class="dk-item-title">${esc(m.name)}</h4>
        ${m.role ? `<p class="dk-item-body" style="opacity:0.7;">${esc(m.role)}</p>` : ''}
        ${m.bio ? `<p class="dk-item-body" style="font-size:14px;">${esc(m.bio)}</p>` : ''}
      </div>`).join('')}
    </div>`, s);
});

reg('org-chart', s => slide('org-chart',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="display:flex;justify-content:center;">${renderOrgTree(s.root, 0)}</div>`, s));

reg('raci', s => slide('raci',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<table style="width:100%;border-collapse:collapse;">
    <thead><tr>
      <th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:left;">Task</th>
      <th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:center;">R</th>
      <th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:center;">A</th>
      <th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:center;">C</th>
      <th style="padding:12px;border-bottom:2px solid var(--dk-accent,#3b82f6);text-align:center;">I</th>
    </tr></thead>
    <tbody>${(s.tasks||[]).map(t => `<tr>
      <td style="padding:12px;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(t.task)}</td>
      <td style="padding:12px;text-align:center;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(t.responsible)}</td>
      <td style="padding:12px;text-align:center;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(t.accountable)}</td>
      <td style="padding:12px;text-align:center;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(t.consulted)}</td>
      <td style="padding:12px;text-align:center;border-bottom:1px solid rgba(128,128,128,0.2);">${esc(t.informed)}</td>
    </tr>`).join('')}</tbody>
  </table>`, s));

// ── Engagement (5) ───────────────────────────────────────────

reg('quote', s => slide('quote', '', `
  <div style="display:flex;align-items:center;justify-content:center;gap:40px;height:100%;">
    ${s.photo ? `<img class="dk-image" src="${esc(s.photo)}" alt="${esc(s.author)}" style="width:200px;height:200px;border-radius:50%;object-fit:cover;">` : ''}
    <div style="max-width:700px;">
      <blockquote class="dk-quote-text" style="font-size:32px;line-height:1.4;border-left:4px solid var(--dk-accent,#3b82f6);padding-left:24px;font-style:italic;">"${esc(s.quote)}"</blockquote>
      <p class="dk-attribution" style="margin-top:24px;">
        <strong>${esc(s.author)}</strong>
        ${s.role ? `<span style="opacity:0.7;"> — ${esc(s.role)}</span>` : ''}
      </p>
    </div>
  </div>
`, s));

reg('poll', s => slide('poll',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="display:flex;flex-direction:column;align-items:center;width:100%;">
    <h3 class="dk-subtitle" style="margin-bottom:32px;text-align:center;">${esc(s.question)}</h3>
    <div class="dk-items">
      ${(s.options||[]).map((opt, i) => `<div class="dk-item">
        <span style="margin-right:16px;color:var(--dk-color-primary);font-weight:800;">${String.fromCharCode(65 + i)}.</span>${esc(opt)}
      </div>`).join('')}
    </div>
  </div>`, s));

reg('exercise', s => slide('exercise',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="max-width:800px;margin:0 auto;">
    ${s.duration ? `<div class="dk-tag" style="margin-bottom:16px;">${dkIcon('clock')} ${esc(s.duration)}</div>` : ''}
    ${s.instructions ? `<div class="dk-body" style="margin-bottom:24px;">${escBody(s.instructions)}</div>` : ''}
    ${s.materials && s.materials.length ? `<div style="margin-top:24px;">
      <h4 class="dk-item-title" style="margin-bottom:12px;">Materials</h4>
      <ul style="list-style:disc;padding-left:24px;font-size:20px;line-height:1.7;">${s.materials.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
    </div>` : ''}
  </div>`, s));

reg('definition', s => slide('definition',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div style="max-width:900px;margin:0 auto;">
    <div class="dk-stat" style="font-size:48px;margin-bottom:16px;">${esc(s.term)}</div>
    ${s.etymology ? `<p style="font-style:italic;opacity:0.5;margin-bottom:16px;">${esc(s.etymology)}</p>` : ''}
    <div class="dk-body" style="font-size:24px;margin-bottom:32px;">${escBody(s.definition)}</div>
    ${s.examples && s.examples.length ? `<div>
      <h4 class="dk-item-title" style="margin-bottom:12px;">Examples</h4>
      <ul style="list-style:disc;padding-left:24px;font-size:20px;line-height:1.7;">${s.examples.map(e => `<li>${esc(e)}</li>`).join('')}</ul>
    </div>` : ''}
  </div>`, s));

reg('checklist', s => slide('checklist',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item${it.checked ? ' checked' : ''}">
      <span class="dk-item-title">${esc(it.text)}</span>
    </div>`).join('')}
  </div>`, s));

// ── Closing (6) ──────────────────────────────────────────────

reg('cta', s => slide('cta',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map((it, i) => `<div class="dk-item">
      <div style="font-size:32px;font-weight:800;color:var(--dk-color-primary,#FF6A00);margin-bottom:12px;">${String(i+1).padStart(2,'0')}</div>
      <h4 class="dk-item-title" style="margin-bottom:12px;">${esc(it.action)}</h4>
      ${it.owner ? `<div style="margin-bottom:8px;"><span class="dk-tag">${esc(it.owner)}</span></div>` : ''}
      ${it.deadline ? `<div style="font-size:15px;color:var(--dk-color-muted,#64748B);">${esc(it.deadline)}</div>` : ''}
    </div>`).join('')}
  </div>`, s));

reg('summary', s => slide('summary',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">${esc(it)}</div>`).join('')}
  </div>`, s));

reg('thank-you', s => slide('thank-you', '', `
  <div style="text-align:center;">
    <h2 class="dk-title" style="font-size:72px;">${esc(s.title || 'Thank You')}</h2>
    ${s.subtitle ? `<h3 class="dk-subtitle">${esc(s.subtitle)}</h3>` : ''}
    ${s.contact ? `<div style="display:flex;justify-content:center;gap:48px;margin-top:48px;flex-wrap:wrap;">
      ${s.contact.email ? `<div style="display:flex;align-items:center;gap:12px;font-size:22px;">${dkIcon('mail')} <span>${esc(s.contact.email)}</span></div>` : ''}
      ${s.contact.phone ? `<div style="display:flex;align-items:center;gap:12px;font-size:22px;">${dkIcon('phone')} <span>${esc(s.contact.phone)}</span></div>` : ''}
      ${s.contact.website ? `<div style="display:flex;align-items:center;gap:12px;font-size:22px;">${dkIcon('globe')} <span>${esc(s.contact.website)}</span></div>` : ''}
      ${s.contact.social ? `<div style="display:flex;align-items:center;gap:12px;font-size:22px;">${dkIcon('link')} <span>${esc(s.contact.social)}</span></div>` : ''}
    </div>` : ''}
  </div>
`, s));

reg('qna', s => slide('qna', '', `
  <div style="text-align:center;">
    <h2 class="dk-title" style="font-size:72px;">${esc(s.title || 'Q&A')}</h2>
    ${s.subtitle ? `<h3 class="dk-subtitle">${esc(s.subtitle)}</h3>` : ''}
  </div>
`, s));

reg('appendix', s => slide('appendix', '', `
  <div style="text-align:center;">
    <h2 class="dk-title">${esc(s.title || 'Appendix')}</h2>
    ${s.subtitle ? `<h3 class="dk-subtitle">${esc(s.subtitle)}</h3>` : ''}
  </div>
`, s));

reg('references', s => slide('references',
  `<h2 class="dk-title">${esc(s.title)}</h2>`,
  `<div class="dk-items">
    ${(s.items||[]).map(it => `<div class="dk-item">
      ${it.url ? `<a class="dk-item-title" href="${esc(it.url)}" target="_blank" style="color:var(--dk-color-accent,#0066FF);">${esc(it.title)}</a>` : `<span class="dk-item-title">${esc(it.title)}</span>`}
      ${it.description ? `<p class="dk-item-body" style="margin-top:4px;opacity:0.7;">${esc(it.description)}</p>` : ''}
      ${it.url ? `<div style="font-size:14px;opacity:0.5;margin-top:2px;">${esc(it.url)}</div>` : ''}
    </div>`).join('')}
  </div>`, s));

// ── Fallback ─────────────────────────────────────────────────

function renderFallback(s) {
  return slide('unknown', `<h2 class="dk-title">${esc(s.title || 'Slide')}</h2>`,
    `<div class="dk-body">
      <p style="opacity:0.5;">Unknown slide type: <strong>${esc(s.type)}</strong></p>
      <pre class="dk-code"><code>${esc(JSON.stringify(s, null, 2))}</code></pre>
    </div>`, s);
}


/* ============================================================
   3. DECKENGINE CLASS (Web Component)
   ============================================================ */

class DeckEngine extends HTMLElement {
  constructor() {
    super();
    this.slides = [];
    this.currentSlide = 0;
    this.overviewMode = false;
    this.presenterWindow = null;
    this.startTime = null;
  }

  connectedCallback() {
    this._init();
  }

  async _init() {
    // Check jsyaml
    if (typeof window.jsyaml === 'undefined') {
      this.innerHTML = `<div class="dk-viewport"><section class="dk-slide dk-slide--error"><div class="dk-content" style="display:flex;align-items:center;justify-content:center;"><h2 class="dk-title" style="color:#ef4444;">Error: js-yaml not loaded</h2><p class="dk-body">Please include js-yaml before deckengine.js</p></div></section></div>`;
      return;
    }

    const contentPath = this.getAttribute('content');
    if (!contentPath) {
      this.innerHTML = `<div class="dk-viewport"><section class="dk-slide dk-slide--error"><div class="dk-content" style="display:flex;align-items:center;justify-content:center;"><h2 class="dk-title" style="color:#ef4444;">Error: no content attribute</h2></div></section></div>`;
      return;
    }

    try {
      const resp = await fetch(contentPath);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      const yamlText = await resp.text();
      const data = window.jsyaml.load(yamlText);
      this.slides = Array.isArray(data) ? data : (data && data.slides ? data.slides : [data]);
    } catch (e) {
      this.innerHTML = `<div class="dk-viewport"><section class="dk-slide dk-slide--error"><div class="dk-content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;"><h2 class="dk-title" style="color:#ef4444;">Failed to load presentation</h2><p class="dk-body">${esc(e.message)}</p></div></section></div>`;
      return;
    }

    this._injectBaseStyles();
    this._render();
    this._bindKeys();
    this._readHash();
    this._onResize();
    window.addEventListener('resize', () => this._onResize());
    window.addEventListener('hashchange', () => this._readHash());
  }

  _injectBaseStyles() {
    if (document.getElementById('dk-base-styles')) return;
    const style = document.createElement('style');
    style.id = 'dk-base-styles';
    style.textContent = `
      /* DeckEngine fallback styles — theme.css overrides these */
      .dk-slide .dk-header { margin-bottom: 40px; }
      .dk-slide .dk-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
      .dk-notes { display: none !important; }
      .dk-counter {
        position: fixed; bottom: 24px; right: 32px; font-size: 18px;
        opacity: 0.5; z-index: 100; color: #fff; pointer-events: none;
        font-family: system-ui, sans-serif;
      }
      .dk-overview-label {
        position: absolute; top: 4px; left: 8px; font-size: 11px !important;
        opacity: 0.4; z-index: 2;
      }
    `;
    document.head.appendChild(style);
  }

  _render() {
    const viewport = document.createElement('div');
    viewport.className = 'dk-viewport';

    // Render all slides
    this.slides.forEach((s, i) => {
      const type = s.type || 'text';
      const renderer = renderers[type];
      const html = renderer ? renderer(s) : renderFallback(s);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      const section = wrapper.firstElementChild;
      section.dataset.index = i;
      if (i === 0) section.classList.add('dk-active');
      viewport.appendChild(section);
    });

    // Counter
    const counter = document.createElement('div');
    counter.className = 'dk-counter';
    viewport.appendChild(counter);

    this.innerHTML = '';
    this.appendChild(viewport);
    this._viewport = viewport;
    this._counter = counter;
    this._updateCounter();
  }

  _getAllSlides() {
    return this._viewport ? Array.from(this._viewport.querySelectorAll('.dk-slide')) : [];
  }

  _goTo(index) {
    const slides = this._getAllSlides();
    if (index < 0 || index >= slides.length) return;
    slides[this.currentSlide].classList.remove('dk-active');
    this.currentSlide = index;
    slides[this.currentSlide].classList.add('dk-active');
    this._updateCounter();
    this._updateHash();
    this._syncPresenter();
  }

  _next() {
    if (this.overviewMode) return;
    this._goTo(this.currentSlide + 1);
  }

  _prev() {
    if (this.overviewMode) return;
    this._goTo(this.currentSlide - 1);
  }

  _updateCounter() {
    if (!this._counter) return;
    this._counter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
  }

  _updateHash() {
    const hash = `#slide=${this.currentSlide + 1}`;
    if (window.location.hash !== hash) {
      history.replaceState(null, '', hash);
    }
  }

  _readHash() {
    const match = window.location.hash.match(/slide=(\d+)/);
    if (match) {
      const idx = parseInt(match[1], 10) - 1;
      if (idx >= 0 && idx < this.slides.length && idx !== this.currentSlide) {
        this._goTo(idx);
      }
    }
  }

  _onResize() {
    if (!this._viewport || this.overviewMode) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaleX = vw / 1920;
    const scaleY = vh / 1080;
    const scale = Math.min(scaleX, scaleY);
    const slides = this._getAllSlides();
    slides.forEach(sl => {
      sl.style.transform = `scale(${scale})`;
      sl.style.transformOrigin = 'top left';
      sl.style.left = `${(vw - 1920 * scale) / 2}px`;
      sl.style.top = `${(vh - 1080 * scale) / 2}px`;
    });
  }

  _toggleOverview() {
    if (this.overviewMode) {
      this._exitOverview();
    } else {
      this._enterOverview();
    }
  }

  _enterOverview() {
    this.overviewMode = true;
    this._viewport.classList.add('dk-overview');
    const slides = this._getAllSlides();

    // Wrap slides in a grid container
    const grid = document.createElement('div');
    grid.className = 'dk-overview-grid';

    slides.forEach((sl, i) => {
      sl.style.transform = '';
      sl.style.left = '';
      sl.style.top = '';
      // Add label
      let label = sl.querySelector('.dk-overview-label');
      if (!label) {
        label = document.createElement('div');
        label.className = 'dk-overview-label';
        sl.prepend(label);
      }
      label.textContent = `${i + 1}`;
      sl.onclick = () => {
        this._goTo(i);
        this._exitOverview();
      };
      grid.appendChild(sl);
    });

    // Keep counter
    this._viewport.innerHTML = '';
    this._viewport.appendChild(grid);
    this._viewport.appendChild(this._counter);
  }

  _exitOverview() {
    this.overviewMode = false;
    this._viewport.classList.remove('dk-overview');
    const grid = this._viewport.querySelector('.dk-overview-grid');
    if (grid) {
      const slides = Array.from(grid.children);
      slides.forEach(sl => {
        sl.onclick = null;
        const label = sl.querySelector('.dk-overview-label');
        if (label) label.remove();
        this._viewport.appendChild(sl);
      });
      grid.remove();
    }
    this._onResize();
    // Ensure correct slide is active
    const allSlides = this._getAllSlides();
    allSlides.forEach((sl, i) => {
      sl.classList.toggle('dk-active', i === this.currentSlide);
    });
    this._updateCounter();
  }

  _toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  _openPresenter() {
    if (this.presenterWindow && !this.presenterWindow.closed) {
      this.presenterWindow.focus();
      return;
    }

    const pw = window.open('', 'DeckEngine Presenter', 'width=1200,height=800');
    if (!pw) return;
    this.presenterWindow = pw;
    this.startTime = this.startTime || Date.now();

    pw.document.write(`<!DOCTYPE html>
<html><head><title>Presenter View</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #111; color: #eee; font-family: system-ui, sans-serif; display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr auto; height: 100vh; gap: 12px; padding: 12px; }
  #current { border: 2px solid #3b82f6; border-radius: 8px; overflow: hidden; background: #0f172a; padding: 20px; overflow-y: auto; }
  #sidebar { display: flex; flex-direction: column; gap: 12px; }
  #next { border: 1px solid #333; border-radius: 8px; flex: 1; overflow: hidden; background: #0f172a; padding: 16px; overflow-y: auto; opacity: 0.7; }
  #notes { border: 1px solid #333; border-radius: 8px; flex: 1; padding: 16px; overflow-y: auto; background: #1a1a2e; }
  #timer { grid-column: 1 / -1; text-align: center; font-size: 32px; padding: 12px; font-variant-numeric: tabular-nums; }
  h3 { font-size: 14px; opacity: 0.5; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
  #notes-content { font-size: 18px; line-height: 1.6; white-space: pre-wrap; }
</style></head>
<body>
  <div id="current"><h3>Current Slide</h3><div id="current-content"></div></div>
  <div id="sidebar">
    <div id="next"><h3>Next Slide</h3><div id="next-content"></div></div>
    <div id="notes"><h3>Speaker Notes</h3><div id="notes-content"></div></div>
  </div>
  <div id="timer">00:00:00</div>
</body></html>`);
    pw.document.close();

    this._syncPresenter();

    // Timer
    this._presenterTimer = setInterval(() => {
      if (pw.closed) {
        clearInterval(this._presenterTimer);
        this.presenterWindow = null;
        return;
      }
      const elapsed = Date.now() - this.startTime;
      const h = Math.floor(elapsed / 3600000);
      const m = Math.floor((elapsed % 3600000) / 60000);
      const sec = Math.floor((elapsed % 60000) / 1000);
      const timerEl = pw.document.getElementById('timer');
      if (timerEl) timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    }, 1000);
  }

  _syncPresenter() {
    const pw = this.presenterWindow;
    if (!pw || pw.closed) return;

    const curSlide = this.slides[this.currentSlide];
    const nextSlide = this.slides[this.currentSlide + 1];

    const curType = curSlide ? curSlide.type || 'text' : '';
    const curRenderer = renderers[curType];
    const curHtml = curSlide ? (curRenderer ? curRenderer(curSlide) : renderFallback(curSlide)) : '';

    const nextType = nextSlide ? nextSlide.type || 'text' : '';
    const nextRenderer = renderers[nextType];
    const nextHtml = nextSlide ? (nextRenderer ? nextRenderer(nextSlide) : renderFallback(nextSlide)) : '<p style="opacity:0.5;">End of presentation</p>';

    const notes = curSlide && curSlide.notes ? curSlide.notes : '(No notes for this slide)';

    try {
      const curEl = pw.document.getElementById('current-content');
      const nextEl = pw.document.getElementById('next-content');
      const notesEl = pw.document.getElementById('notes-content');
      if (curEl) curEl.innerHTML = `<div style="font-size:10px;">${curHtml}</div>`;
      if (nextEl) nextEl.innerHTML = `<div style="font-size:8px;">${nextHtml}</div>`;
      if (notesEl) notesEl.textContent = notes;
    } catch (e) {
      // Cross-origin or window closed
    }
  }

  _bindKeys() {
    document.addEventListener('keydown', (e) => {
      // Don't handle if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          this._next();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          this._prev();
          break;
        case 'Home':
          e.preventDefault();
          this._goTo(0);
          break;
        case 'End':
          e.preventDefault();
          this._goTo(this.slides.length - 1);
          break;
        case 'Escape':
          e.preventDefault();
          this._toggleOverview();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          this._openPresenter();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this._toggleFullscreen();
          break;
      }
    });
  }
}

/* ============================================================
   4. CUSTOM ELEMENT REGISTRATION
   ============================================================ */

customElements.define('deck-engine', DeckEngine);
