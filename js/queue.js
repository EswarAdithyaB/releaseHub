/* ═══════════════════════════════════════════════════
   QUEUE.JS — Deployment Queue Page Renderer
   ═══════════════════════════════════════════════════ */

function renderQueue() {
  const el = document.getElementById('page-queue');
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:20px;">
      <div>
        <h2 class="page-title">Deployment Queue</h2>
        <p class="page-sub">Managing approved requests for SIT &amp; NFT windows</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="width:7px;height:7px;border-radius:50%;background:var(--teal);display:inline-block;animation:pulseGrow 2s infinite;"></span>
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Master Node: Operational</span>
      </div>
    </div>

    <div class="dq-stats">
      ${MOCK.dqStats.map(s => `
        <div class="dq-stat ${s.highlight?'highlight':''}">
          <div class="dq-stat-label">${s.label}</div>
          <div class="dq-stat-value" style="color:${s.color};">${s.val}</div>
          <div class="dq-stat-icon">${s.icon}</div>
        </div>
      `).join('')}
    </div>

    <div class="dq-layout">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-size:14px;font-weight:700;font-family:Manrope,sans-serif;">Active Queue</span>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm">Filter: Approved</button>
            <button class="btn btn-ghost btn-sm">Sort: Priority</button>
          </div>
        </div>
        <div class="queue-table">
          <div class="qt-head">
            <div>Application</div><div>Source Branch</div><div>Env</div><div>Status</div><div>Actions</div>
          </div>
          ${MOCK.queue.map(q => `
            <div class="qt-row">
              <div style="display:flex;align-items:center;gap:10px;">
                <div class="qt-app-icon">${q.icon}</div>
                <div>
                  <div class="qt-app-name">${q.app}</div>
                  <div class="qt-app-cid">CID: ${q.cid}</div>
                </div>
              </div>
              <div class="qt-branch-text">${commitSvg} ${q.branch}</div>
              <div><span class="env-tag ${q.env==='SIT'?'env-sit':'env-nft'}">${q.env}</span></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <span class="${q.status==='Approved'?'pulse-dot':''}" style="width:6px;height:6px;border-radius:50%;background:${q.statusColor};display:inline-block;"></span>
                <span style="font-size:11px;font-weight:700;color:${q.statusColor};">${q.status}</span>
              </div>
              <div style="text-align:right;"><button class="btn btn-primary btn-sm" onclick="showToast('${q.app} deployment triggered!')">Manual Trigger</button></div>
            </div>
          `).join('')}
        </div>
        <div class="emergency-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:28px;height:28px;color:var(--text3);"><path d="M4.5 16.5c-1.5 1.5-1.5 4 0 5.5C6 23.5 8.5 23.5 10 22l10-10C21.5 10.5 22 9.5 22 8.5c0-1-.5-2-1-2.5C19.5 4.5 18.5 4 17.5 4c-1 0-2 .5-3 1.5L5.5 14.5"/><line x1="9" y1="6" x2="18" y2="15"/></svg>
          <p>Have an emergency hotfix that can't wait?</p>
          <button class="btn btn-ghost btn-sm" onclick="showToast('Emergency trigger opened')">Emergency Manual Trigger</button>
        </div>
      </div>

      <div class="dq-sidebar">
        <div class="windows-card">
          <div class="wc-label">Upcoming Windows</div>
          ${MOCK.windows.map(w => `
            <div class="window-item ${w.active?'wi-active':'wi-dim'}">
              <div class="window-title">${w.title}</div>
              <div class="window-time">${w.time}</div>
              <span class="window-countdown ${!w.active?'wc-gray':''}">${w.countdown}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
