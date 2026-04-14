/* ═══════════════════════════════════════════════════
   DATA.JS — Static mock data for non-release sections
   (Releases, stories, timelines live in DB via seeds.js)
   ═══════════════════════════════════════════════════ */

const MOCK = {

  /* ── Dashboard: pending actions panel ── */
  actions: [
    { icon:'⌥', iconBg:'rgba(93,165,245,0.12)', iconColor:'var(--primary)',  title:'PR #892: Security Patch for Auth Flow',       desc:'Merge to <span style="color:var(--primary);font-family:JetBrains Mono,monospace;">develop</span> · Requested by j.doe', btnLabel:'Approve', btnClass:'btn-teal btn-sm' },
    { icon:'🚀', iconBg:'rgba(52,213,168,0.1)',  iconColor:'var(--teal)',     title:'SIT Deployment Approval: v26.05.RC1',         desc:'Environment: <span style="color:var(--teal);font-family:JetBrains Mono,monospace;">SIT-B</span> · Readiness: 100%',  btnLabel:'Execute', btnClass:'btn-primary btn-sm' },
    { icon:'📦', iconBg:'rgba(160,180,208,0.08)',iconColor:'var(--text3)',    title:'Resource Tagging: Release 26.04',              desc:'Missing metadata for 4 sub-tasks',                                                                                    btnLabel:'Fix Now', btnClass:'btn-ghost btn-sm' },
    { icon:'⚠️', iconBg:'rgba(248,113,113,0.1)', iconColor:'var(--red)',      title:'Hotfix Required: PAYMENT-API timeout',         desc:'Reported by monitoring · P1 severity',                                                                               btnLabel:'Review',  btnClass:'btn-red btn-sm' }
  ],

  /* ── Dashboard: cluster health cards ── */
  health: [
    { title:'CIT Cluster', sub:'Continuous Integration', val:'99.98%', label:'OPTIMAL PERFORMANCE', labelColor:'var(--teal)',    bars:[30,55,40,70,50,80,45,90], barColor:'var(--teal)' },
    { title:'SIT Cluster', sub:'System Integration',     val:'84.2%',  label:'HEAVY LOAD DETECTED', labelColor:'var(--primary)', bars:[75,90,65,80,90,78,85,82], barColor:'var(--primary)' }
  ],

  /* ── Dashboard: quick access panel ── */
  quickAccess: [
    { icon:'⎇', title:'Branch Tracker',      sub:'Manage 14 active branches', bg:'rgba(93,165,245,0.08)',   color:'var(--primary)' },
    { icon:'⟳', title:'Deployment Pipeline', sub:'Track build artifacts',      bg:'rgba(52,213,168,0.08)',   color:'var(--teal)' },
    { icon:'📄', title:'Release Notes',       sub:'Auto-generate docs',         bg:'rgba(167,139,250,0.08)', color:'var(--purple)' },
    { icon:'📊', title:'QA Analytics',        sub:'View test reports',          bg:'rgba(240,180,41,0.08)',  color:'var(--amber)' }
  ],

  /* ── Deployment Queue: stat counters ── */
  dqStats: [
    { label:'Pending Requests', val:'14',       color:'var(--primary)', icon:'📋' },
    { label:'Next SIT Window',  val:'02:14:55', color:'var(--text)',    icon:'⏰', highlight:true },
    { label:'Next NFT Window',  val:'18:45:10', color:'var(--text)',    icon:'☁️' },
    { label:'System Health',    val:'99.8%',    color:'var(--teal)',    icon:'⚡' }
  ],

  /* ── Deployment Queue: queue table rows ── */
  queue: [
    { app:'AUTH-SERVICE',  cid:'99421-AX', branch:'feature/iportal-421-auth-fix',    env:'SIT', status:'Approved', icon:'🔐', statusColor:'var(--teal)' },
    { app:'FRONTEND-WEB',  cid:'88214-FE', branch:'hotfix/css-regression-v2',         env:'NFT', status:'Approved', icon:'🌐', statusColor:'var(--teal)' },
    { app:'PAYMENT-API',   cid:'77512-PY', branch:'release/v26.06-core',              env:'SIT', status:'Approved', icon:'💳', statusColor:'var(--teal)' },
    { app:'NOTIF-ENGINE',  cid:'44109-NT', branch:'bugfix/retry-exponential-backoff', env:'SIT', status:'Approved', icon:'📡', statusColor:'var(--teal)' },
    { app:'BILLING-SVC',   cid:'33821-BL', branch:'feature/iportal-418-billing',      env:'NFT', status:'Pending',  icon:'🧾', statusColor:'var(--amber)' },
    { app:'RECONCILER',    cid:'22177-RC', branch:'feature/iportal-418-recon',        env:'SIT', status:'Pending',  icon:'🔄', statusColor:'var(--amber)' }
  ],

  /* ── Deployment Queue: upcoming windows ── */
  windows: [
    { title:'SIT Window — Alpha',  time:'14:00–16:00 UTC',    countdown:'Starts in 02:14:55', active:true },
    { title:'NFT Load Testing',    time:'Tomorrow 08:00 UTC', countdown:'Queue Open',         active:false }
  ]
};

/* ── Shared UI state (release page) ── */
const openStories = new Set(['iportal-421']);
let searchQuery   = '';
