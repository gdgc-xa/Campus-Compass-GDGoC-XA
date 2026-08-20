/* ============================================================
   data/organizations.js — the 15 Xavier Ateneo orgs.
   Pure data. No DOM.
   ------------------------------------------------------------
   Content strategy:
     GDG has full mockup content — it's the reference booth.
     The other 14 have `id, name, short, tags, tagline, fbHandle`
     only. Their `pending: true` flag tells booth.js to render
     placeholder panels that will be populated by
     fetchOrgFromFacebook(handle) once the FB integration lands.
   ============================================================ */

export const ORGS = [
  // ---------- 1. GDG — real content from mockup ----------
  {
    id: 'gdg',
    name: 'Google Developer Group on Campus',
    short: 'GDG',
    tags: ['sci-eng-tech', 'program-based'],
    tagline: 'For students who love to build. Workshops, hackathons, and open-source Fridays.',
    fbHandle: 'gdg.xavierateneo',
    founded: 2019,
    pending: false,
    description: [
      'GDG on Campus – Xavier Ateneo is a student-led community for anyone curious about building with Google technologies. We host workshops on web, mobile, AI, and cloud, plus hack nights where you ship something in a single sitting.',
      'No experience required. First-year students, non-CS majors, and side-project tinkerers are all part of the crew. If you can open a laptop, you can join a session.',
    ],
    meets: 'Thursdays · 5:30pm · Tech Hub 204',
    openTo: 'All years',
    dues: 'Free',
    events: [
      { month: 'AUG', day: 12, title: 'DevFest Info Session',       sub: 'Open to all majors · Tech Hub 204' },
      { month: 'AUG', day: 24, title: 'Cloud Study Jam #1',         sub: 'GCP fundamentals · 3 hours'        },
      { month: 'SEP', day:  9, title: 'Hack Night: Build in a Bar', sub: 'Ship something in 4 hours'         },
    ],
    leaders: [
      { initials: 'JM', name: 'James Marquez', role: 'Lead Organizer' },
      { initials: 'AR', name: 'Anna Reyes',    role: 'Tech Lead'      },
      { initials: 'LT', name: 'Luis Tan',      role: 'Community Lead' },
    ],
    fbStats: { followers: '3.2k', likes: '2.8k' },
  },

  // ---------- 2. UDS ----------
  {
    id: 'uds',
    name: 'Union Debate Society',
    short: 'UDS',
    tags: ['governance', 'media-arts'],
    tagline: 'Parliamentary and BP formats. Compete regionally, argue anywhere.',
    fbHandle: 'uds.xavierateneo',
    founded: 1998,
    pending: true,
  },

  // ---------- 3. KDT ----------
  {
    id: 'kdt',
    name: 'Kultura Dance Troupe',
    short: 'KDT',
    tags: ['media-arts', 'socio-cultural'],
    tagline: 'Filipino folk and contemporary. Weekly rehearsals, showcase every semester.',
    fbHandle: 'kdt.xavierateneo',
    founded: 2005,
    pending: true,
  },

  // ---------- 4. Basketball Varsity ----------
  {
    id: 'bsk',
    name: 'Basketball Varsity',
    short: 'BSK',
    tags: ['sports'],
    tagline: "The men's and women's varsity basketball program. Tryouts each August.",
    fbHandle: 'basketball.xavierateneo',
    founded: 1965,
    pending: true,
  },

  // ---------- 5. MUN ----------
  {
    id: 'mun',
    name: 'Model United Nations',
    short: 'MUN',
    tags: ['governance', 'program-based'],
    tagline: 'Simulate diplomacy. Represent countries in weekend conferences.',
    fbHandle: 'mun.xavierateneo',
    founded: 2011,
    pending: true,
  },

  // ---------- 6. Photography Guild ----------
  {
    id: 'pg',
    name: 'Photography Guild',
    short: 'PG',
    tags: ['media-arts', 'socio-cultural'],
    tagline: 'Film and digital, portraits and street. Monthly critique nights, always open.',
    fbHandle: 'photoguild.xavierateneo',
    founded: 2008,
    pending: true,
  },

  // ---------- 7. Newman Circle ----------
  {
    id: 'nc',
    name: 'Newman Circle',
    short: 'NC',
    tags: ['socio-cultural', 'service-learning'],
    tagline: 'Jesuit-tradition faith formation. Retreats, service, small-group discussions.',
    fbHandle: 'newmancircle.xavierateneo',
    founded: 1972,
    pending: true,
  },

  // ---------- 8. Coders Guild — real short description from mockup ----------
  {
    id: 'cg',
    name: 'Coders Guild',
    short: 'CG',
    tags: ['sci-eng-tech', 'program-based'],
    tagline: 'Competitive programming and interview prep. Weekly contests every Saturday.',
    fbHandle: 'codersguild.xavierateneo',
    founded: 2016,
    pending: true,
  },

  // ---------- 9. Peer Mentorship Program ----------
  {
    id: 'pmp',
    name: 'Peer Mentorship Program',
    short: 'PMP',
    tags: ['service-learning', 'program-based'],
    tagline: 'Upperclass mentors paired with first-years. One-on-one weekly.',
    fbHandle: 'pmp.xavierateneo',
    founded: 2014,
    pending: true,
  },

  // ---------- 10. Language Exchange Club ----------
  {
    id: 'lec',
    name: 'Language Exchange Club',
    short: 'LEC',
    tags: ['socio-cultural', 'program-based'],
    tagline: 'Practice a language, teach yours. Bisaya, Filipino, Japanese, Korean, Mandarin.',
    fbHandle: 'lec.xavierateneo',
    founded: 2018,
    pending: true,
  },

  // ---------- 11. Ultimate Frisbee Club ----------
  {
    id: 'ufc',
    name: 'Ultimate Frisbee Club',
    short: 'UFC',
    tags: ['sports', 'service-learning'],
    tagline: 'Weekend pickup and service tourneys. All skill levels welcome.',
    fbHandle: 'ultimate.xavierateneo',
    founded: 2012,
    pending: true,
  },

  // ---------- 12. Philosophy Circle ----------
  {
    id: 'phc',
    name: 'Philosophy Circle',
    short: 'PHC',
    tags: ['media-arts', 'program-based'],
    tagline: 'Text-based dialogue. Sartre, Aquinas, and everyone in between.',
    fbHandle: 'philosophycircle.xavierateneo',
    founded: 2001,
    pending: true,
  },

  // ---------- 13. Xavier Environmental Society ----------
  {
    id: 'xes',
    name: 'Xavier Environmental Society',
    short: 'XES',
    tags: ['environment', 'service-learning'],
    tagline: 'Coastal cleanups and campus greening. Field days once a month.',
    fbHandle: 'xes.xavierateneo',
    founded: 2009,
    pending: true,
  },

  // ---------- 14. Farm to Kitchen Club ----------
  {
    id: 'f2k',
    name: 'Farm to Kitchen Club',
    short: 'F2K',
    tags: ['food-agri', 'environment'],
    tagline: 'Farm-to-table cooking with campus produce. Monthly community meals.',
    fbHandle: 'farmtokitchen.xavierateneo',
    founded: 2017,
    pending: true,
  },

  // ---------- 15. Xavier Business Society ----------
  {
    id: 'xbs',
    name: 'Xavier Business Society',
    short: 'XBS',
    tags: ['business', 'program-based'],
    tagline: 'Case competitions, internships, alumni panels. For any major.',
    fbHandle: 'xbs.xavierateneo',
    founded: 1994,
    pending: true,
  },
];

/**
 * fetchOrgFromFacebook(handle) — INTEGRATION STUB
 * -----------------------------------------------
 * Replace this with a real fetch call once the Facebook Graph
 * API is wired up. The returned shape should match GDG's fields
 * above (description, meets, events, leaders, fbStats, etc.).
 * Return null → the booth stays in its "pending" state.
 */
export async function fetchOrgFromFacebook(handle) {
  // TODO: wire up FB Graph API here
  return null;
}
