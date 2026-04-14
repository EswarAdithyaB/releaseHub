/* ═══════════════════════════════════════════════════
   RELEASE.JS — Release Management Page Renderer
   All data read from DB.find('releases', releaseId).
   ═══════════════════════════════════════════════════ */

/* ─── Entry point ─── */
function renderRelease(releaseId) {
  const rel = DB.find('releases', releaseId);
  if (!rel) return;

  /* reset story state for new release */
  openStories.clear();
  searchQuery = '';

  const el = document.getElementById('page-release');

  el.innerHTML = `
    ${Auth.isPageReadOnly('release') ? `
      <div class="readonly-banner" style="margin-bottom:16px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;flex-shrink:0;">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        Read-only view — IDT members can view release details but cannot request SIT or modify stories.
      </div>
    ` : ''}

    <div class="rel-page-top">
      <div>
        <div class="breadcrumb">
          <span onclick="showPage('dashboard')" style="cursor:pointer;">Release Trains</span>
          ${svg('<polyline points="9 18 15 12 9 6"/>')}
          <span class="curr">Release ${rel.label}</span>
        </div>
        <h2 class="page-title" style="display:flex;align-items:center;gap:12px;">
          Release ${rel.label}
          <span class="rel-id-tag">${rel.relTag}</span>
          ${rel.urgent ? '<span class="chip chip-red"><span class="chip-dot"></span>Urgent</span>' : ''}
        </h2>
      </div>
      <div class="env-summary">
        <div class="env-stat">
          <div class="es-label">
            <span class="status-dot" style="background:var(--teal);width:7px;height:7px;"></span> CIT Live
          </div>
          <div class="es-val">${rel.envCIT}</div>
        </div>
        <div class="env-divider"></div>
        <div class="env-stat">
          <div class="es-label">
            <span class="status-dot ${rel.dotAnim ? 'pulse-status' : ''}" style="background:${rel.statusColor};width:7px;height:7px;"></span> SIT Sync
          </div>
          <div class="es-val">${rel.envSIT}</div>
        </div>
        <button class="btn btn-ghost" style="margin-left:8px;" onclick="renderRelease('${rel.id}')">
          ${svg('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5"/>')} Refresh
        </button>
      </div>
    </div>

    <!-- Stories filters -->
    <div class="tbl-filters">
      <div class="search-wrap">
        <span class="search-icon">${svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>')}</span>
        <input type="text" id="story-search" placeholder="Search stories, branches, or developers…" oninput="filterStories(this.value)"/>
      </div>
      <select class="sort-sel" id="story-sort" onchange="renderStories('${rel.id}')">
        <option value="recent">Recent Activity</option>
        <option value="id">Story ID</option>
        <option value="failures">Failures First</option>
      </select>
      <button class="btn btn-ghost btn-sm" onclick="openStories.clear();renderStories('${rel.id}')">Collapse All</button>
      <button class="btn btn-ghost btn-sm" onclick="(DB.find('releases','${rel.id}')||{stories:[]}).stories.forEach(s=>openStories.add(s.id));renderStories('${rel.id}')">Expand All</button>
    </div>

    <div class="tbl-head">
      <div>Identity &amp; Hierarchy / Applications</div>
      <div>Owner &amp; Context</div>
      <div style="text-align:center;">Env Status</div>
      <div>Actions / Controls</div>
    </div>
    <div class="stories-wrap" id="stories-wrap"></div>

    <!-- Bento cards -->
    <div class="bento-grid">
      <div class="bento-card">
        <div class="bento-lbl">
          <span>Release Health</span>
          ${svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>','style="color:var(--primary)"')}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:10px;">
          <div class="bento-big">${rel.bento.health.val}</div>
          <span class="chip chip-teal">${rel.bento.health.sub}</span>
        </div>
        <div class="prog-bar" style="height:5px;margin-bottom:10px;">
          <div class="prog-fill" style="width:${rel.bento.health.progress}%;background:var(--primary);"></div>
        </div>
        <p style="font-size:10px;color:var(--text3);line-height:1.6;">${rel.bento.health.desc}</p>
      </div>
      <div class="bento-card">
        <div class="bento-lbl" style="color:var(--text3);">
          Recent Conflicts
          ${svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>','style="color:var(--red)"')}
        </div>
        ${rel.bento.conflicts.map(c => `
          <div class="conflict-item" style="border-left-color:${c.color};${c.resolved ? 'opacity:0.5' : ''}">
            <div class="conflict-title">${c.title}</div>
            <div class="conflict-sub">${c.sub}</div>
          </div>
        `).join('')}
      </div>
      <div class="bento-card" style="display:flex;flex-direction:column;gap:12px;">
        <div class="bento-lbl" style="color:var(--text3);">
          Deployment Window
          ${svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>','style="color:var(--primary)"')}
        </div>
        <div>
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--primary);margin-bottom:4px;">Upcoming SIT Window</div>
          <div style="font-family:Manrope,sans-serif;font-size:20px;font-weight:900;">${rel.bento.window.time}</div>
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(93,165,245,0.1);padding:4px 12px;border-radius:20px;margin-top:10px;">
            <span class="pulse-status" style="width:6px;height:6px;border-radius:50%;background:var(--primary);display:inline-block;"></span>
            <span style="font-size:9px;font-weight:700;color:var(--primary);text-transform:uppercase;">${rel.bento.window.countdown}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline-widget">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:var(--text3);">
          Release Timeline ${rel.label}
        </span>
        ${svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>','style="width:14px;height:14px;color:var(--primary)"')}
      </div>
      <div class="tl-steps" id="tl-steps"><div class="tl-line-bg"></div></div>
    </div>
  `;

  renderStories(rel.id);
  renderTimeline(rel.timeline);
}

/* ─── Filter ─── */
function filterStories(q) {
  searchQuery = q.toLowerCase();
  const rel = DB.find('releases', currentReleaseId);
  if (rel) renderStories(rel.id);
}

/* ─── Stories Table ─── */
function renderStories(releaseId) {
  const wrap = document.getElementById('stories-wrap');
  if (!wrap) return;

  const rel = DB.find('releases', releaseId);
  if (!rel) return;

  const sort   = document.getElementById('story-sort')?.value || 'recent';
  let stories  = [...(rel.stories || [])];

  if (searchQuery) {
    stories = stories.filter(s =>
      s.name.toLowerCase().includes(searchQuery) ||
      s.id.toLowerCase().includes(searchQuery) ||
      s.owner.toLowerCase().includes(searchQuery) ||
      s.apps.some(a => a.name.includes(searchQuery) || a.branch.includes(searchQuery))
    );
  }

  if (sort === 'id')       stories.sort((a, b) => a.id.localeCompare(b.id));
  if (sort === 'failures') stories.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0));

  const isReadOnly = Auth.isPageReadOnly('release');

  wrap.innerHTML = stories.map(s => {
    const isOpen = openStories.has(s.id);
    return `
      <div class="story-group" id="sg-${s.id}">
        <div class="story-row" style="border-left-color:${s.borderColor};" onclick="toggleStory('${s.id}','${releaseId}')">
          <div style="display:flex;align-items:flex-start;gap:0;">
            <span class="story-expand ${isOpen ? 'open' : ''}" id="exp-${s.id}">
              ${svg('<polyline points="9 18 15 12 9 6"/>')}
            </span>
            <div>
              <div class="story-name-text">${s.id}: ${s.name}</div>
              <div class="story-meta">Parent Story · ${s.apps.length} application${s.apps.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <div class="owner-cell">
            <div class="avatar" style="background:${s.avatarBg};color:${s.avatarColor};">${s.initials}</div>
            <div class="owner-info">
              <div class="owner-name">${s.owner}</div>
              <div class="owner-time">${s.time}</div>
            </div>
          </div>
          <div style="text-align:center;">
            <span class="chip ${s.chip}"><span class="chip-dot"></span>${s.chipLabel}</span>
          </div>
          <div class="story-actions" onclick="event.stopPropagation()">
            ${isReadOnly
              ? '<button class="btn btn-ghost btn-sm" style="opacity:0.45;cursor:not-allowed;" disabled>View Only</button>'
              : s.locked
                ? '<button class="btn btn-ghost btn-sm" style="opacity:0.45;cursor:not-allowed;" disabled>SIT Locked</button>'
                : '<button class="btn btn-teal btn-sm" onclick="showToast(\'SIT request submitted!\')">Request SIT</button>'
            }
            <button class="more-btn">⋯</button>
          </div>
        </div>

        <div class="apps-wrap ${isOpen ? 'open' : ''}" id="apps-${s.id}">
          ${s.apps.map(a => `
            <div class="app-row">
              <div>
                <div class="app-name-text">⬡ ${a.name}</div>
                <div class="app-branch">${branchSvg} ${a.branch}</div>
              </div>
              <div class="owner-cell">
                <div class="avatar" style="background:${a.avBg};color:${a.avColor};font-size:8px;">${a.initials}</div>
                <div style="font-size:10px;font-weight:700;">${a.owner}</div>
              </div>
              <div style="text-align:center;">
                <span class="chip ${a.chip}"><span class="chip-dot"></span>${a.chipLabel}</span>
              </div>
              <div class="story-actions">
                <button class="btn ${a.actionClass}"
                  ${a.disabled || isReadOnly ? 'style="opacity:0.4;cursor:not-allowed;" disabled' : ''}
                  onclick="showToast('${a.actionLabel} triggered')">
                  ${a.actionLabel}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/* ─── Toggle Story Expand ─── */
function toggleStory(id, releaseId) {
  if (openStories.has(id)) openStories.delete(id);
  else openStories.add(id);
  const appsEl = document.getElementById('apps-' + id);
  const expEl  = document.getElementById('exp-' + id);
  if (appsEl) appsEl.classList.toggle('open', openStories.has(id));
  if (expEl)  expEl.classList.toggle('open',  openStories.has(id));
}

/* ─── Release Timeline ─── */
function renderTimeline(steps) {
  const c = document.getElementById('tl-steps');
  if (!c) return;
  (steps || []).forEach(step => {
    const color   = step.done ? 'var(--teal)' : step.active ? 'var(--primary)' : 'var(--text3)';
    const opacity = (!step.done && !step.active) ? 'opacity:0.55;' : '';
    const d = document.createElement('div');
    d.className    = 'tl-step';
    d.style.cssText = opacity;
    d.innerHTML = `
      <div class="tl-dot" style="border-color:${color};">
        ${step.done
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" style="width:11px;height:11px;"><polyline points="20 6 9 17 4 12"/></svg>`
          : step.active
            ? `<span style="width:8px;height:8px;border-radius:50%;background:var(--primary);display:block;animation:pulseGrow 1.8s infinite;"></span>`
            : `<span style="width:7px;height:7px;border-radius:50%;border:1px solid ${color};display:block;"></span>`}
      </div>
      <div class="tl-step-name">${step.name}</div>
      <div class="tl-step-status" style="color:${color};">${step.status}</div>
      <div class="tl-step-date">${step.date}</div>
    `;
    c.appendChild(d);
  });
}
