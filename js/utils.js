/* ═══════════════════════════════════════════════════
   UTILS.JS — SVG Helpers, Toast Notifications,
              Theme Toggle, Countdown Timer
   ═══════════════════════════════════════════════════ */

/* ─── SVG Helpers ─── */
const svg = (path, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${extra}>${path}</svg>`;
const checkSvg  = svg('<polyline points="20 6 9 17 4 12"/>');
const chevSvg   = svg('<polyline points="9 18 15 12 9 6"/>');
const branchSvg = svg('<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>');
const commitSvg = svg('<circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>');

/* ─── Toast Notification ─── */
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;right:24px;background:var(--bg4);border:1px solid var(--border2);border-left:3px solid var(--primary);color:var(--text);padding:12px 18px;border-radius:8px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeUp 0.2s ease;`;
  t.textContent = '✓  ' + msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ─── Countdown Timer ─── */
let sitSeconds = 2*3600+14*60+55;
let nftSeconds = 18*3600+45*60+10;

setInterval(() => {
  if (sitSeconds > 0) sitSeconds--;
  if (nftSeconds > 0) nftSeconds--;
  const fmt = s => `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s%3600/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const dqVals = document.querySelectorAll('.dq-stat-value');
  if (dqVals[1]) dqVals[1].textContent = fmt(sitSeconds);
  if (dqVals[2]) dqVals[2].textContent = fmt(nftSeconds);
  const uw = document.querySelectorAll('.window-countdown');
  if (uw[0]) uw[0].textContent = 'Starts in ' + fmt(sitSeconds);
}, 1000);

/* ─── Theme Toggle ─── */
function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains('light')) {
    html.classList.remove('light');
    html.classList.add('dark');
    localStorage.setItem('rh-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    localStorage.setItem('rh-theme', 'light');
  }
}

/* ─── Apply saved theme on load ─── */
(function() {
  const saved = localStorage.getItem('rh-theme');
  if (saved === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
})();
