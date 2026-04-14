/* ═══════════════════════════════════════════════════
   AUTH.JS — Authentication & Role-Based Access
   ═══════════════════════════════════════════════════

   Roles:
     project_lead  — Full access: all pages, create releases,
                     approve PRs, trigger deployments
     developer     — Dashboard + Release Management (own stories);
                     no Deployment Queue write access
     idt_member    — Dashboard (read) + full Deployment Queue;
                     no Release Management write access

   Session is stored in localStorage under 'rh-session'.
   Users are loaded once from users.json and cached.
   ═══════════════════════════════════════════════════ */

const Auth = (() => {

  const SESSION_KEY = 'rh-session';
  let _usersCache   = null;

  /* ─── Load users from JSON ─── */
  async function loadUsers() {
    if (_usersCache) return _usersCache;
    try {
      const res = await fetch('users.json');
      const data = await res.json();
      _usersCache = data.users;
      return _usersCache;
    } catch (err) {
      console.error('[Auth] Failed to load users.json', err);
      return [];
    }
  }

  /* ─── Login: validate email + password ─── */
  async function login(email, password) {
    const users = await loadUsers();
    const user  = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }
    /* Store session (exclude password) */
    const session = {
      id:        user.id,
      name:      user.name,
      email:     user.email,
      role:      user.role,
      roleLabel: user.roleLabel,
      initials:  user.initials,
      avatarBg:  user.avatarBg,
      avatarColor: user.avatarColor,
      loginAt:   Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }

  /* ─── Logout ─── */
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.replace('login.html');
  }

  /* ─── Get current session ─── */
  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /* ─── Role helpers ─── */
  function getRole() {
    const s = getSession();
    return s ? s.role : null;
  }

  function is(role) {
    return getRole() === role;
  }

  function isProjectLead() { return is('project_lead'); }
  function isDeveloper()    { return is('developer'); }
  function isIDTMember()    { return is('idt_member'); }

  /* ─── Page / feature access ─── */
  /*
   * ACCESS MAP — defines what each role can see/do.
   * Keys map to features referenced in render functions.
   * Use Auth.can('feature') in templates to conditionally show UI.
   */
  const ACCESS_MAP = {
    project_lead: [
      'page:dashboard',
      'page:release',
      'page:queue',
      'dashboard:new-release',        // "New Release" button
      'dashboard:filter',             // Filter button
      'release:request-sit',          // Request SIT per story
      'release:collapse-expand',      // Collapse/Expand all
      'release:approve-pr',           // Approve PR actions
      'queue:manual-trigger',         // Manual Trigger button
      'queue:emergency-trigger',      // Emergency Manual Trigger
      'queue:filter-sort',            // Filter/Sort controls in queue
      'actions:approve',              // Approve action in pending actions
      'actions:execute'               // Execute action
    ],
    developer: [
      'page:dashboard',
      'page:release',
      // 'page:queue' — NOT accessible for developers
      'dashboard:filter',
      'release:request-sit',
      'release:collapse-expand',
      'release:view-mr'               // View MR
    ],
    idt_member: [
      'page:dashboard',
      // 'page:release' — read-only for IDT
      'page:release:readonly',
      'page:queue',
      'queue:manual-trigger',
      'queue:emergency-trigger',
      'queue:filter-sort'
    ]
  };

  function can(feature) {
    const role = getRole();
    if (!role) return false;
    const perms = ACCESS_MAP[role] || [];
    return perms.includes(feature);
  }

  function canAccessPage(pageName) {
    return can(`page:${pageName}`) || can(`page:${pageName}:readonly`);
  }

  function isPageReadOnly(pageName) {
    return can(`page:${pageName}:readonly`) && !can(`page:${pageName}`);
  }

  /* ─── Nav items visible per role ─── */
  const NAV_VISIBILITY = {
    project_lead: ['dashboard', 'release', 'queue'],
    developer:    ['dashboard', 'release'],
    idt_member:   ['dashboard', 'release', 'queue']
  };

  function getVisibleNav() {
    const role = getRole();
    return NAV_VISIBILITY[role] || ['dashboard'];
  }

  /* ─── Role badge colour config (for UI rendering) ─── */
  const ROLE_STYLES = {
    project_lead: {
      bg:     'rgba(93,165,245,0.1)',
      color:  'var(--primary)',
      border: 'rgba(93,165,245,0.25)',
      icon:   '🎯'
    },
    developer: {
      bg:     'rgba(52,213,168,0.08)',
      color:  'var(--teal)',
      border: 'rgba(52,213,168,0.2)',
      icon:   '💻'
    },
    idt_member: {
      bg:     'rgba(167,139,250,0.08)',
      color:  'var(--purple)',
      border: 'rgba(167,139,250,0.2)',
      icon:   '🚀'
    }
  };

  function getRoleStyle() {
    return ROLE_STYLES[getRole()] || ROLE_STYLES['developer'];
  }

  /* ─── Guard: redirect to login if no session ─── */
  function requireAuth() {
    if (!getSession()) {
      window.location.replace('login.html');
      return false;
    }
    return true;
  }

  /* Public API */
  return {
    loadUsers,
    login,
    logout,
    getSession,
    getRole,
    is,
    isProjectLead,
    isDeveloper,
    isIDTMember,
    can,
    canAccessPage,
    isPageReadOnly,
    getVisibleNav,
    getRoleStyle,
    requireAuth
  };

})();
