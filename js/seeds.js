/* ═══════════════════════════════════════════════════
   SEEDS.JS — Initial data for all releases.
   Loaded once into localStorage via DB.seed().
   To reset to factory state call: DB.reset('releases', SEEDS.releases)
   ═══════════════════════════════════════════════════ */

const SEEDS = {

  releases: [

    /* ══════════════════════════════════════════════
       RELEASE 26.04  —  Completed / Deployed
    ══════════════════════════════════════════════ */
    {
      id: '26.04',
      label: '26.04',
      relTag: '#REL-2024-2604',
      statusText: 'SIT: Deployed',
      statusColor: 'var(--teal)',
      borderColor: 'var(--teal)',
      dotAnim: false,
      dim: false,
      urgent: false,
      progress: 92,
      envCIT: '18 Stories',
      envSIT: '18 / 18',

      bento: {
        health: { val: '98%', progress: 98, sub: 'Fully Deployed', desc: 'All stories shipped to production. Zero P1 issues post-deployment.' },
        conflicts: [
          { title: 'Resolved: iportal-402', sub: 'Merge conflict fixed by Marcus V.', color: 'var(--teal)', resolved: true },
          { title: 'Resolved: iportal-407', sub: 'Rebase completed by Sara K.', color: 'var(--teal)', resolved: true }
        ],
        window: { time: 'Deployed Dec 10', countdown: 'Release Closed' }
      },

      timeline: [
        { name: 'Planning',    status: 'Complete',    date: 'Sep 01', done: true },
        { name: 'Development', status: 'Complete',    date: 'Sep 20', done: true },
        { name: 'SIT Testing', status: 'Complete',    date: 'Oct 05', done: true },
        { name: 'Branching',   status: 'Complete',    date: 'Oct 15', done: true },
        { name: 'NFT Uplift',  status: 'Complete',    date: 'Nov 01', done: true },
        { name: 'Production',  status: 'Complete',    date: 'Dec 10', done: true }
      ],

      stories: [
        {
          id: 'iportal-398', name: 'Core Infrastructure Upgrade',
          owner: 'Marcus Vega', initials: 'MV',
          avatarBg: 'rgba(52,213,168,0.15)', avatarColor: 'var(--teal)',
          time: '3 months ago', chip: 'chip-teal', chipLabel: 'SIT: Deployed',
          borderColor: 'var(--teal)', locked: false,
          apps: [
            { name: 'config-service',  branch: 'release/26.04-config-upgrade',   owner: 'Marcus V.',  initials: 'MV', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' },
            { name: 'infra-core',      branch: 'release/26.04-infra-core',        owner: 'Dev Bot',    initials: 'DB', avBg: 'rgba(93,165,245,0.1)',   avColor: 'var(--primary)', chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' }
          ]
        },
        {
          id: 'iportal-402', name: 'Customer Dashboard v2',
          owner: 'Sara Kim', initials: 'SK',
          avatarBg: 'rgba(167,139,250,0.12)', avatarColor: 'var(--purple)',
          time: '3 months ago', chip: 'chip-teal', chipLabel: 'SIT: Deployed',
          borderColor: 'var(--teal)', locked: false,
          apps: [
            { name: 'portal-ui',       branch: 'release/26.04-dashboard-v2',      owner: 'Sara K.',    initials: 'SK', avBg: 'rgba(167,139,250,0.12)', avColor: 'var(--purple)',  chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' },
            { name: 'analytics-svc',   branch: 'release/26.04-analytics',          owner: 'Liam C.',    initials: 'LC', avBg: 'rgba(240,180,41,0.12)', avColor: 'var(--amber)',   chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' }
          ]
        },
        {
          id: 'iportal-407', name: 'API Rate Limiting & Security Hardening',
          owner: 'Priya Nair', initials: 'PN',
          avatarBg: 'rgba(52,213,168,0.12)', avatarColor: 'var(--teal)',
          time: '2 months ago', chip: 'chip-teal', chipLabel: 'SIT: Deployed',
          borderColor: 'var(--teal)', locked: false,
          apps: [
            { name: 'api-gateway',     branch: 'release/26.04-rate-limit',         owner: 'Priya N.',   initials: 'PN', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' },
            { name: 'rate-limiter',    branch: 'release/26.04-rate-limiter-svc',   owner: 'Alex T.',    initials: 'AT', avBg: 'rgba(93,165,245,0.12)',  avColor: 'var(--primary)', chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' },
            { name: 'auth-service',    branch: 'release/26.04-auth-hardening',     owner: 'Nina W.',    initials: 'NW', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',  actionClass: 'btn-ghost btn-sm' }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       RELEASE 26.05  —  Active / In Progress
    ══════════════════════════════════════════════ */
    {
      id: '26.05',
      label: '26.05',
      relTag: '#REL-2024-2605',
      statusText: 'SIT: In Progress',
      statusColor: 'var(--primary)',
      borderColor: 'var(--primary)',
      dotAnim: true,
      dim: false,
      urgent: false,
      progress: 45,
      envCIT: '14 Stories',
      envSIT: '09 / 14',

      bento: {
        health: { val: '94%', progress: 94, sub: '+2% vs last release', desc: 'System confidence is high. Zero P1 defects in SIT sync.' },
        conflicts: [
          { title: 'Branch Conflict: iportal-425', sub: 'Collision with main in api-auth.go', color: 'var(--red)', resolved: false },
          { title: 'Resolved: iportal-421', sub: 'Conflict resolved by Liam Chen', color: 'var(--teal)', resolved: true }
        ],
        window: { time: 'Today, 4:00 PM', countdown: 'In 2h 15m' }
      },

      timeline: [
        { name: 'Planning',    status: 'Complete',    date: 'Oct 10', done: true },
        { name: 'Development', status: 'Complete',    date: 'Oct 25', done: true },
        { name: 'SIT Testing', status: 'In Progress', date: 'Nov 15', active: true },
        { name: 'Branching',   status: 'Upcoming',    date: 'Nov 20' },
        { name: 'NFT Uplift',  status: 'Upcoming',    date: 'Nov 25' },
        { name: 'Production',  status: 'Upcoming',    date: 'Dec 10' }
      ],

      stories: [
        {
          id: 'iportal-421', name: 'Unified Authentication Shield',
          owner: 'Alex Thorne', initials: 'AT',
          avatarBg: 'rgba(93,165,245,0.15)', avatarColor: 'var(--primary)',
          time: '2 hours ago', chip: 'chip-teal', chipLabel: 'CIT: Sanity Pass',
          borderColor: 'var(--primary)', locked: false,
          apps: [
            { name: 'auth-service',  branch: 'feature/iportal-421-auth-fix',     owner: 'Marcus V.', initials: 'MV', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-teal', chipLabel: 'CIT Success',   actionLabel: 'Request SIT', actionClass: 'btn-ghost btn-sm' },
            { name: 'frontend-web',  branch: 'bugfix/iportal-5232-redirect',      owner: 'Alex T.',   initials: 'AT', avBg: 'rgba(93,165,245,0.12)',  avColor: 'var(--primary)', chip: 'chip-blue', chipLabel: 'SIT Requested', actionLabel: 'View MR',     actionClass: 'btn-primary btn-sm' },
            { name: 'user-profile',  branch: 'feature/iportal-421-profile-sync',  owner: 'Sara K.',   initials: 'SK', avBg: 'rgba(167,139,250,0.12)', avColor: 'var(--purple)',  chip: 'chip-teal', chipLabel: 'CIT Success',   actionLabel: 'Request SIT', actionClass: 'btn-ghost btn-sm' }
          ]
        },
        {
          id: 'iportal-425', name: 'Multi-region Database Sharding',
          owner: 'Elena Rossi', initials: 'ER',
          avatarBg: 'rgba(248,113,113,0.12)', avatarColor: 'var(--red)',
          time: '5 mins ago', chip: 'chip-red', chipLabel: 'Testing… (3 Failures)',
          borderColor: 'var(--red)', locked: true,
          apps: [
            { name: 'db-shard-svc',  branch: 'feature/iportal-425-sharding',     owner: 'Elena R.',  initials: 'ER', avBg: 'rgba(248,113,113,0.12)', avColor: 'var(--red)',     chip: 'chip-red',  chipLabel: 'CIT Failed',    actionLabel: 'SIT Locked',  actionClass: 'btn-ghost btn-sm', disabled: true },
            { name: 'api-gateway',   branch: 'feature/iportal-425-routing',       owner: 'Liam C.',   initials: 'LC', avBg: 'rgba(240,180,41,0.12)', avColor: 'var(--amber)',   chip: 'chip-amber',chipLabel: 'Testing',       actionLabel: 'SIT Locked',  actionClass: 'btn-ghost btn-sm', disabled: true }
          ]
        },
        {
          id: 'iportal-430', name: 'Real-time Notifications Engine',
          owner: 'Sam Park', initials: 'SP',
          avatarBg: 'rgba(167,139,250,0.12)', avatarColor: 'var(--purple)',
          time: '1 day ago', chip: 'chip-blue', chipLabel: 'SIT: In Progress',
          borderColor: 'var(--teal)', locked: false,
          apps: [
            { name: 'notif-engine',  branch: 'bugfix/retry-exponential-backoff',  owner: 'Sam P.',    initials: 'SP', avBg: 'rgba(167,139,250,0.12)', avColor: 'var(--purple)', chip: 'chip-teal', chipLabel: 'SIT Deployed',  actionLabel: 'View Logs',   actionClass: 'btn-ghost btn-sm' },
            { name: 'push-service',  branch: 'feature/iportal-430-push',          owner: 'Nina W.',   initials: 'NW', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',   chip: 'chip-blue', chipLabel: 'SIT Requested', actionLabel: 'View MR',     actionClass: 'btn-ghost btn-sm' }
          ]
        },
        {
          id: 'iportal-418', name: 'Payment Gateway Overhaul',
          owner: 'Priya Nair', initials: 'PN',
          avatarBg: 'rgba(52,213,168,0.12)', avatarColor: 'var(--teal)',
          time: '3 days ago', chip: 'chip-teal', chipLabel: 'CIT: Sanity Pass',
          borderColor: 'var(--teal)', locked: false,
          apps: [
            { name: 'payment-api',   branch: 'release/v26.06-core',               owner: 'Priya N.',  initials: 'PN', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-teal', chipLabel: 'CIT Success',   actionLabel: 'Request SIT', actionClass: 'btn-ghost btn-sm' },
            { name: 'billing-svc',   branch: 'feature/iportal-418-billing',        owner: 'Marcus V.', initials: 'MV', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-teal', chipLabel: 'CIT Success',   actionLabel: 'Request SIT', actionClass: 'btn-ghost btn-sm' },
            { name: 'reconciler',    branch: 'feature/iportal-418-recon',          owner: 'Dev Bot',   initials: 'DB', avBg: 'rgba(93,165,245,0.1)',   avColor: 'var(--primary)', chip: 'chip-gray', chipLabel: 'Awaiting Review',actionLabel: 'Assign',     actionClass: 'btn-ghost btn-sm' }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       RELEASE 26.06  —  Queued / Upcoming
    ══════════════════════════════════════════════ */
    {
      id: '26.06',
      label: '26.06',
      relTag: '#REL-2024-2606',
      statusText: 'SIT: Queued',
      statusColor: 'var(--text3)',
      borderColor: 'var(--text3)',
      dotAnim: false,
      dim: false,
      urgent: false,
      progress: 12,
      envCIT: '15 Stories',
      envSIT: '00 / 15',

      bento: {
        health: { val: '—', progress: 0, sub: 'Not started', desc: 'SIT has not yet begun. Development is in early phase.' },
        conflicts: [
          { title: 'No conflicts yet', sub: 'Development branch created', color: 'var(--text3)', resolved: true }
        ],
        window: { time: 'TBD', countdown: 'Not Scheduled' }
      },

      timeline: [
        { name: 'Planning',    status: 'Complete',    date: 'Nov 01', done: true },
        { name: 'Development', status: 'In Progress', date: 'Dec 10', active: true },
        { name: 'SIT Testing', status: 'Upcoming',    date: 'Jan 15' },
        { name: 'Branching',   status: 'Upcoming',    date: 'Jan 22' },
        { name: 'NFT Uplift',  status: 'Upcoming',    date: 'Feb 01' },
        { name: 'Production',  status: 'Upcoming',    date: 'Feb 20' }
      ],

      stories: [
        {
          id: 'iportal-441', name: 'ML-powered Analytics Engine',
          owner: 'Liam Chen', initials: 'LC',
          avatarBg: 'rgba(240,180,41,0.12)', avatarColor: 'var(--amber)',
          time: '1 week ago', chip: 'chip-blue', chipLabel: 'In Development',
          borderColor: 'var(--primary)', locked: false,
          apps: [
            { name: 'ml-pipeline',   branch: 'feature/iportal-441-ml-pipeline',   owner: 'Liam C.',   initials: 'LC', avBg: 'rgba(240,180,41,0.12)', avColor: 'var(--amber)',   chip: 'chip-blue', chipLabel: 'In Dev',        actionLabel: 'View Branch', actionClass: 'btn-ghost btn-sm' },
            { name: 'analytics-api', branch: 'feature/iportal-441-analytics-api', owner: 'Elena R.',  initials: 'ER', avBg: 'rgba(248,113,113,0.12)',avColor: 'var(--red)',     chip: 'chip-gray', chipLabel: 'Not Started',   actionLabel: 'Assign',      actionClass: 'btn-ghost btn-sm' }
          ]
        },
        {
          id: 'iportal-445', name: 'Mobile App v3 Redesign',
          owner: 'Nina Walsh', initials: 'NW',
          avatarBg: 'rgba(52,213,168,0.12)', avatarColor: 'var(--teal)',
          time: '4 days ago', chip: 'chip-blue', chipLabel: 'In Development',
          borderColor: 'var(--teal)', locked: false,
          apps: [
            { name: 'mobile-bff',    branch: 'feature/iportal-445-mobile-bff',    owner: 'Nina W.',   initials: 'NW', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-blue', chipLabel: 'In Dev',        actionLabel: 'View Branch', actionClass: 'btn-ghost btn-sm' },
            { name: 'design-system', branch: 'feature/iportal-445-design-tokens', owner: 'Sam P.',    initials: 'SP', avBg: 'rgba(167,139,250,0.12)', avColor: 'var(--purple)',  chip: 'chip-blue', chipLabel: 'In Dev',        actionLabel: 'View Branch', actionClass: 'btn-ghost btn-sm' }
          ]
        },
        {
          id: 'iportal-448', name: 'Third-party Integration Hub',
          owner: 'Alex Thorne', initials: 'AT',
          avatarBg: 'rgba(93,165,245,0.15)', avatarColor: 'var(--primary)',
          time: '2 days ago', chip: 'chip-gray', chipLabel: 'Planned',
          borderColor: 'var(--text3)', locked: false,
          apps: [
            { name: 'integration-svc', branch: 'feature/iportal-448-integrations', owner: 'Alex T.',  initials: 'AT', avBg: 'rgba(93,165,245,0.12)',  avColor: 'var(--primary)', chip: 'chip-gray', chipLabel: 'Not Started',   actionLabel: 'Assign',      actionClass: 'btn-ghost btn-sm' },
            { name: 'webhook-handler', branch: 'feature/iportal-448-webhooks',      owner: 'TBD',      initials: '?',  avBg: 'rgba(160,180,208,0.08)', avColor: 'var(--text3)',   chip: 'chip-gray', chipLabel: 'Not Started',   actionLabel: 'Assign',      actionClass: 'btn-ghost btn-sm' }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       RELEASE AD HOC  —  Urgent Hotfixes
    ══════════════════════════════════════════════ */
    {
      id: 'adhoc',
      label: 'Ad hoc',
      relTag: '#REL-2024-HOT',
      statusText: 'Action Required',
      statusColor: 'var(--red)',
      borderColor: 'var(--red)',
      dotAnim: false,
      dim: false,
      urgent: true,
      progress: 100,
      envCIT: '2 Stories',
      envSIT: '02 / 02',

      bento: {
        health: { val: '⚠', progress: 100, sub: 'Pending Approval', desc: 'Both hotfixes passed CIT. Awaiting emergency SIT window approval.' },
        conflicts: [
          { title: 'Hotfix: iportal-499', sub: 'Conflicts with 26.05 auth-service branch', color: 'var(--red)', resolved: false }
        ],
        window: { time: 'Emergency Slot', countdown: 'Pending Approval' }
      },

      timeline: [
        { name: 'Identified', status: 'Complete',    date: 'Today 09:00', done: true },
        { name: 'Patched',    status: 'Complete',    date: 'Today 11:30', done: true },
        { name: 'CIT Review', status: 'In Progress', date: 'Today 14:00', active: true },
        { name: 'Approval',   status: 'Upcoming',    date: 'Today 16:00' },
        { name: 'SIT Deploy', status: 'Upcoming',    date: 'Today 17:00' },
        { name: 'Production', status: 'Upcoming',    date: 'Today 18:00' }
      ],

      stories: [
        {
          id: 'iportal-499', name: 'Critical Security Patch — Auth Bypass',
          owner: 'Alex Thorne', initials: 'AT',
          avatarBg: 'rgba(248,113,113,0.15)', avatarColor: 'var(--red)',
          time: '2 hours ago', chip: 'chip-red', chipLabel: 'P1 — Urgent',
          borderColor: 'var(--red)', locked: false,
          apps: [
            { name: 'auth-service',  branch: 'hotfix/iportal-499-auth-bypass',    owner: 'Alex T.',   initials: 'AT', avBg: 'rgba(248,113,113,0.12)', avColor: 'var(--red)',     chip: 'chip-teal', chipLabel: 'CIT Success',   actionLabel: 'Request SIT', actionClass: 'btn-red btn-sm' }
          ]
        },
        {
          id: 'iportal-500', name: 'Payment Gateway Timeout — P1 Fix',
          owner: 'Priya Nair', initials: 'PN',
          avatarBg: 'rgba(248,113,113,0.12)', avatarColor: 'var(--red)',
          time: '45 mins ago', chip: 'chip-amber', chipLabel: 'P1 — In Review',
          borderColor: 'var(--amber)', locked: false,
          apps: [
            { name: 'payment-api',   branch: 'hotfix/iportal-500-timeout-fix',    owner: 'Priya N.',  initials: 'PN', avBg: 'rgba(52,213,168,0.12)',  avColor: 'var(--teal)',    chip: 'chip-amber',chipLabel: 'Under Review',  actionLabel: 'Approve Fix', actionClass: 'btn-teal btn-sm' }
          ]
        }
      ]
    }

  ] /* end releases */

}; /* end SEEDS */


/* ═══════════════════════════════════════════════════
   seedDB() — call once at app boot
   ═══════════════════════════════════════════════════ */
function seedDB() {
  DB.seed('releases', SEEDS.releases);
}
