/* ═══════════════════════════════════════════════════
   BRANCHES.JS — Branch Management Page Renderer
   Flattens releases → stories → apps into a branch table.
   ═══════════════════════════════════════════════════ */

/* ─── Entry point ─── */
function renderBranches(releaseId) {
  const el = document.getElementById('page-branches');
  if (!el) return;

  const releases = DB.get('releases') || [];
  const rel      = DB.find('releases', releaseId) || releases[0];
  if (!rel) { el.innerHTML = '<p style="color:var(--text3);padding:20px;">No release data found.</p>'; return; }

  /* Flatten stories → apps into branch rows */
  const rows = _buildRows(rel);

  /* Compute stats */
  const totalBranches = rows.length;
  const citPassing    = rows.filter(r => r.chip === 'chip-teal').length;
  const citFailing    = rows.filter(r => r.chip === 'chip-red').length;
  const inSIT         = rows.filter(r => r.chipLabel && r.chipLabel.toLowerCase().includes('sit')).length;

  el.innerHTML = `
    <!-- ─── Page top bar ─── -->
    <div class="bm-top">
      <div>
        <p style="font-size:9px;text-transform:uppercase;letter-spacing:0.18em;color:var(--primary);font-weight:700;margin-bottom:4px;">Source Control</p>
        <h2 class="page-title">Branch Management</h2>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <!-- Search -->
        <div class="bm-search-wrap">
          <span class="bm-search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input type="text" id="branch-search" placeholder="Search app, branch or story…" oninput="filterBranches(this.value, '${rel.id}')"/>
        </div>
        <!-- Release dropdown -->
        <div class="bm-release-wrap">
          <span class="bm-release-label">Release</span>
          <select class="bm-release-select" id="branch-release-select" onchange="renderBranches(this.value)">
            ${releases.map(r => `<option value="${r.id}" ${r.id === rel.id ? 'selected' : ''}>${r.label}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- ─── Stats strip ─── -->
    <div class="bm-stats">
      <div class="bm-stat">
        <div class="bm-stat-icon" style="background:rgba(93,165,245,0.1);color:var(--primary);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
        </div>
        <div>
          <div class="bm-stat-label">Total Branches</div>
          <div class="bm-stat-value" style="color:var(--primary);">${totalBranches}</div>
        </div>
        <div class="bm-stat-bg-icon">⎇</div>
      </div>
      <div class="bm-stat">
        <div class="bm-stat-icon" style="background:rgba(52,213,168,0.1);color:var(--teal);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <div class="bm-stat-label">CIT Passing</div>
          <div class="bm-stat-value" style="color:var(--teal);">${citPassing}</div>
        </div>
        <div class="bm-stat-bg-icon">✓</div>
      </div>
      <div class="bm-stat">
        <div class="bm-stat-icon" style="background:rgba(248,113,113,0.1);color:var(--red);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div>
          <div class="bm-stat-label">CIT Failing</div>
          <div class="bm-stat-value" style="color:var(--red);">${citFailing}</div>
        </div>
        <div class="bm-stat-bg-icon">✕</div>
      </div>
      <div class="bm-stat">
        <div class="bm-stat-icon" style="background:rgba(167,139,250,0.1);color:var(--purple);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        </div>
        <div>
          <div class="bm-stat-label">In SIT</div>
          <div class="bm-stat-value" style="color:var(--purple);">${inSIT}</div>
        </div>
        <div class="bm-stat-bg-icon">⬡</div>
      </div>
    </div>

    <!-- ─── Branch table ─── -->
    <div id="branch-table-container">
      ${_renderTable(rows)}
    </div>
  `;
}

/* ─── Filter branches by search query ─── */
function filterBranches(query, releaseId) {
  const rel = DB.find('releases', releaseId);
  if (!rel) return;
  const q    = query.toLowerCase();
  const rows = _buildRows(rel).filter(r =>
    !q ||
    r.appName.toLowerCase().includes(q) ||
    r.branch.toLowerCase().includes(q) ||
    r.storyId.toLowerCase().includes(q) ||
    r.storyName.toLowerCase().includes(q) ||
    r.owner.toLowerCase().includes(q)
  );
  const container = document.getElementById('branch-table-container');
  if (container) container.innerHTML = _renderTable(rows);
}

/* ─── Build rows array from release data ─── */
function _buildRows(rel) {
  const rows = [];
  (rel.stories || []).forEach(story => {
    (story.apps || []).forEach(app => {
      rows.push({
        appName:      app.name,
        appIcon:      _appEmoji(app.name),
        branch:       app.branch,
        storyId:      story.id,
        storyName:    story.name,
        storyColor:   story.borderColor,
        owner:        app.owner,
        initials:     app.initials,
        avBg:         app.avBg,
        avColor:      app.avColor,
        chip:         app.chip,
        chipLabel:    app.chipLabel,
        actionLabel:  app.actionLabel,
        actionClass:  app.actionClass,
        disabled:     !!app.disabled || !!story.locked
      });
    });
  });
  return rows;
}

/* ─── Render the table HTML ─── */
function _renderTable(rows) {
  if (!rows.length) {
    return `
      <div class="branch-table-wrap">
        <div class="bm-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
          <div class="bm-empty-title">No branches found</div>
          <div class="bm-empty-sub">Try adjusting your search or selecting a different release.</div>
        </div>
      </div>`;
  }

  const isReadOnly = Auth.isPageReadOnly('branches');

  return `
    <div class="bm-result-label">${rows.length} branch${rows.length !== 1 ? 'es' : ''}</div>
    <div class="branch-table-wrap">
      <!-- Table header -->
      <div class="bt-head">
        <div>#</div>
        <div>Application</div>
        <div>Branch</div>
        <div>Parent Story</div>
        <div>Status</div>
        <div class="bt-head-actions">Actions</div>
      </div>

      <!-- Table rows -->
      ${rows.map((r, i) => `
        <div class="bt-row" style="border-left-color:${r.storyColor};">
          <!-- Index -->
          <div class="bt-idx">${String(i + 1).padStart(2, '0')}</div>

          <!-- App -->
          <div class="bt-app">
            <div class="bt-app-icon">${r.appIcon}</div>
            <div class="bt-app-name">${r.appName}</div>
          </div>

          <!-- Branch -->
          <div class="bt-branch" title="${r.branch}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
            <span class="bt-branch-text">${r.branch}</span>
          </div>

          <!-- Story -->
          <div class="bt-story">
            <span class="bt-story-id" style="color:${r.storyColor};border-color:${r.storyColor};background:${r.storyColor}18;">${r.storyId}</span>
            <span class="bt-story-name" title="${r.storyName}">${r.storyName}</span>
          </div>

          <!-- Owner + Status -->
          <div class="bt-owner">
            <div style="width:24px;height:24px;border-radius:6px;background:${r.avBg};color:${r.avColor};font-size:8px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:1;">${r.initials}</div>
            <div style="min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:2px;">
              <div class="bt-owner-name">${r.owner}</div>
              <span class="chip ${r.chip}" style="font-size:8px;padding:2px 6px;"><span class="chip-dot"></span>${r.chipLabel}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="bt-actions">
            <button
              class="btn ${r.actionClass} btn-sm"
              ${r.disabled || isReadOnly ? 'style="opacity:0.4;cursor:not-allowed;" disabled' : ''}
              onclick="showToast('${r.actionLabel} triggered for ${r.appName}')">
              ${r.actionLabel}
            </button>
          </div>
        </div>
      `).join('')}
    </div>`;
}

/* ─── Map app name prefix to an emoji ─── */
function _appEmoji(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('api'))     return '⚡';
  if (n.includes('portal'))  return '🌐';
  if (n.includes('service')) return '⚙️';
  if (n.includes('auth'))    return '🔐';
  if (n.includes('notify'))  return '🔔';
  if (n.includes('data'))    return '🗄️';
  if (n.includes('ui') || n.includes('front') || n.includes('web')) return '🖥️';
  if (n.includes('mobile'))  return '📱';
  if (n.includes('gateway')) return '🚪';
  if (n.includes('report'))  return '📊';
  return '📦';
}
