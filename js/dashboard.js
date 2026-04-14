/* ═══════════════════════════════════════════════════
   DASHBOARD.JS — Dashboard Page Renderer
   Release cards driven by DB, count = however many exist.
   ═══════════════════════════════════════════════════ */

function renderDashboard() {
  const releases = DB.get('releases') || [];
  const el = document.getElementById('page-dashboard');

  el.innerHTML = `
    <div class="dash-hero">
      <div>
        <p style="font-size:9px;text-transform:uppercase;letter-spacing:0.18em;color:var(--primary);font-weight:700;margin-bottom:4px;">Telemetry</p>
        <h2 class="page-title">Active Releases</h2>
      </div>
      <div style="display:flex;gap:8px;">
        ${Auth.can('dashboard:new-release')
          ? `<button class="btn btn-primary">${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>')} New Release</button>`
          : ''}
      </div>
    </div>

    <!-- Release cards: one per DB entry, no hardcoded count -->
    <div class="releases-row" style="grid-template-columns:repeat(${Math.min(releases.length, 5)},1fr);">
      ${releases.map(r => `
        <div class="rel-card"
          style="border-top-color:${r.borderColor};${r.dim ? 'opacity:0.55' : ''}"
          onclick="switchRelease('${r.id}', document.querySelector('[data-rel=\\'${r.id}\\']'))"
        >
          ${r.urgent ? '<div class="urgent-tag">URGENT</div>' : ''}
          <div class="rel-card-id" style="color:${r.borderColor}">${r.label}</div>
          <div class="rel-row"><span class="lbl">Stories</span><span class="val">${r.stories ? r.stories.length : '--'}</span></div>
          <div class="rel-row"><span class="lbl">Apps</span><span class="val">${r.stories ? r.stories.reduce((n,s) => n + s.apps.length, 0) : '--'}</span></div>
          <div class="prog-wrap">
            <div class="prog-labels">
              <span style="color:${r.borderColor}">QA Progress</span>
              <span>${r.progress}%</span>
            </div>
            <div class="prog-bar">
              <div class="prog-fill" style="width:${r.progress}%;background:${r.borderColor};"></div>
            </div>
          </div>
          <div class="rel-status">
            <span class="status-dot" style="background:${r.statusColor};${r.dotAnim ? 'animation:pulseGrow 2s infinite' : ''}"></span>
            <span class="status-text" style="color:${r.statusColor};">${r.statusText}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="dash-grid">
      <div>
        <div class="panel">
          <div class="panel-header">
            <h3>${svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>')} Pending Actions</h3>
            <span class="chip chip-blue"><span class="chip-dot"></span>${MOCK.actions.length} tasks</span>
          </div>
          ${MOCK.actions.map(a => `
            <div class="action-item">
              <div class="action-icon" style="background:${a.iconBg};font-size:15px;">${a.icon}</div>
              <div class="action-info" style="margin:0 12px;">
                <div class="action-title">${a.title}</div>
                <div class="action-desc">${a.desc}</div>
              </div>
              <div class="action-btns">
                <button class="dismiss-btn" onclick="this.closest('.action-item').remove()">✕</button>
                <button class="btn ${a.btnClass}">${a.btnLabel}</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="health-grid">
          ${MOCK.health.map(h => `
            <div class="health-card">
              <div class="health-top">
                <div>
                  <div style="font-size:13px;font-weight:700;">${h.title}</div>
                  <div class="health-label">${h.sub}</div>
                </div>
                <div style="width:10px;height:10px;border-radius:50%;background:${h.barColor};box-shadow:0 0 10px ${h.barColor};"></div>
              </div>
              <div class="health-val" style="color:var(--text)">${h.val}</div>
              <div class="health-sub" style="color:${h.labelColor};margin:4px 0 10px;">${h.label}</div>
              <div class="spark-bars">
                ${h.bars.map(b => `<div class="spark-bar" style="height:${b}%;background:${h.barColor};opacity:${0.3 + b / 100 * 0.7};"></div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="panel">
        <div class="panel-header"><h3>${svg('<bookmark/>')} Quick Access</h3></div>
        <div class="quick-panel">
          ${MOCK.quickAccess.map(q => `
            <div class="quick-item">
              <div class="quick-icon" style="background:${q.bg};font-size:16px;">${q.icon}</div>
              <div>
                <div class="quick-title">${q.title}</div>
                <div class="quick-sub">${q.sub}</div>
              </div>
              <div class="quick-arrow">${svg('<polyline points="9 18 15 12 9 6"/>')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
