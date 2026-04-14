/* ═══════════════════════════════════════════════════
   APP.JS — Navigation, Auth UI & Application Bootstrap
   ═══════════════════════════════════════════════════ */

/* ─── Currently viewed release ─── */
let currentReleaseId = '26.05';

/* ─── Page Navigation ─── */
function showPage(name) {
  if (!Auth.canAccessPage(name)) {
    showToast('⛔ You don\'t have access to this page');
    return;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
}

/* ─── Release Tab Switch ─── */
function switchRelease(relId, btn) {
  currentReleaseId = relId;

  /* update tab highlight */
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    /* called programmatically (e.g. from dashboard card click) */
    const tabBtn = document.querySelector(`.rtab[data-rel="${relId}"]`);
    if (tabBtn) tabBtn.classList.add('active');
  }

  /* re-render release page with new release data */
  renderRelease(relId);
  showPage('release');
}

/* ─── Dynamic Tabs from DB ─── */
function renderReleaseTabs() {
  const releases = DB.get('releases') || [];
  const container = document.getElementById('release-tabs');
  if (!container) return;

  container.innerHTML = releases.map(r => `
    <button
      class="rtab ${r.id === currentReleaseId ? 'active' : ''}"
      data-rel="${r.id}"
      onclick="switchRelease('${r.id}', this)"
    >${r.label}</button>
  `).join('');
}

/* ─── Apply Auth to UI ─── */
function applyAuthToUI() {
  const user      = Auth.getSession();
  if (!user) return;
  const roleStyle  = Auth.getRoleStyle();
  const visibleNav = Auth.getVisibleNav();

  /* Sidebar user footer */
  const footer = document.getElementById('user-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="user-avatar" style="background:${user.avatarBg};color:${user.avatarColor};">${user.initials}</div>
      <div class="user-footer-inner">
        <div class="user-name">${user.name}</div>
        <div class="user-role-badge" style="color:${roleStyle.color};border-color:${roleStyle.border};background:${roleStyle.bg};">
          ${roleStyle.icon} ${user.roleLabel}
        </div>
      </div>
      <div class="user-footer-actions">
        <button class="logout-btn" onclick="Auth.logout()" title="Sign out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    `;
  }

  /* Header avatar */
  const headAvatar = document.getElementById('head-avatar');
  if (headAvatar) {
    headAvatar.textContent = user.initials;
    headAvatar.style.cssText = `
      width:30px;height:30px;border-radius:8px;
      background:${user.avatarBg};color:${user.avatarColor};
      display:flex;align-items:center;justify-content:center;
      font-size:10px;font-weight:800;border:1px solid ${roleStyle.border};cursor:pointer;
    `;
  }

  /* Header role chip */
  const roleChip = document.getElementById('header-role-chip');
  if (roleChip) {
    roleChip.style.cssText = `
      display:inline-flex;align-items:center;gap:5px;
      font-size:10px;font-weight:700;padding:4px 10px;
      border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;
      border:1px solid ${roleStyle.border};
      background:${roleStyle.bg};color:${roleStyle.color};
    `;
    roleChip.innerHTML = `${roleStyle.icon} ${user.roleLabel}`;
  }

  /* Lock nav items the user can't access */
  ['dashboard', 'release', 'queue'].forEach(page => {
    const navEl = document.getElementById('nav-' + page);
    if (!navEl) return;
    if (!visibleNav.includes(page)) {
      navEl.classList.add('locked');
      navEl.setAttribute('title', 'Not available for your role');
      if (!navEl.querySelector('.nav-lock')) {
        const lock = document.createElement('span');
        lock.className = 'nav-lock';
        lock.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        navEl.appendChild(lock);
      }
    }
  });
}

/* ══════════════════════════════════════════════════
   BOOTSTRAP — runs once when page loads
══════════════════════════════════════════════════ */

/* 1. Seed DB with initial data (no-op if already seeded) */
seedDB();

/* 2. Render dynamic tabs from DB */
renderReleaseTabs();

/* 3. Render all pages */
renderDashboard();
renderRelease(currentReleaseId);
renderQueue();

/* 4. Apply auth-driven UI (user name, role badge, nav locks) */
applyAuthToUI();
