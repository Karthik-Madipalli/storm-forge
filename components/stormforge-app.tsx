'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  BriefcaseBusiness,
  BrainCircuit,
  Camera,
  Code2,
  Clock3,
  ChevronRight,
  CircleDollarSign,
  GraduationCap,
  Compass,
  Crown,
  Flame,
  Home,
  MapPin,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Search,
  Palette,
  Settings,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  LockKeyhole,
  Flag,
  Ban,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Music2,
  TrendingUp,
  Trophy,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'

const missions = [
  {
    id: 1,
    title: 'Build a launch story for a climate startup',
    company: 'Aether Labs',
    category: 'Design',
    reward: 850,
    time: '4 days',
    tags: ['Figma', 'Branding'],
    hot: true,
  },
  {
    id: 2,
    title: 'Map the future of campus mobility',
    company: 'NIT Trichy Innovation Cell',
    category: 'Research',
    reward: 600,
    time: '6 days',
    tags: ['Research', 'Systems'],
    hot: false,
  },
  {
    id: 3,
    title: 'Ship a scrappy AI study companion',
    company: 'StudySync',
    category: 'Build',
    reward: 1200,
    time: '10 days',
    tags: ['React', 'AI'],
    hot: true,
  },
  {
    id: 4,
    title: 'Write the manifesto for mindful tech',
    company: 'Good Signal',
    category: 'Writing',
    reward: 450,
    time: '3 days',
    tags: ['Copywriting', 'Culture'],
    hot: false,
  },
  {
    id: 5,
    title: 'Design the annual cultural fest identity',
    company: 'NIT Cultural Council',
    category: 'Design',
    reward: 1500,
    time: '8 days',
    tags: ['Branding', 'Illustration'],
    hot: true,
  },
  {
    id: 6,
    title: 'Build a landing page for a student startup',
    company: 'Forge Founders',
    category: 'Build',
    reward: 1800,
    time: '7 days',
    tags: ['React', 'Next.js'],
    hot: true,
  },
  {
    id: 7,
    title: 'Photograph the Monsoon Music Night',
    company: 'Campus Arts Collective',
    category: 'Photography',
    reward: 900,
    time: '2 days',
    tags: ['Photography', 'Events'],
    hot: true,
  },
  {
    id: 8,
    title: 'Help first-years prepare for calculus',
    company: 'Student Learning Circle',
    category: 'Tutoring',
    reward: 500,
    time: '5 days',
    tags: ['Calculus', 'Teaching'],
    hot: false,
  },
]


const quickGigs = [
  {
    id: 101,
    title: 'Design a poster for Tech Club',
    category: 'Design',
    icon: Palette,
    reward: 300,
    location: 'Academic Block',
    deadline: 'Due by 8 PM',
    urgency: 'NOW',
    description:
      'Create a clean event poster for tonight’s Tech Club meetup. Final artwork should be ready for Instagram and print.',
    tags: ['Figma', 'Poster'],
  },
  {
    id: 102,
    title: 'Calculus help before tomorrow’s exam',
    category: 'Tutoring',
    icon: GraduationCap,
    reward: 500,
    location: 'Library',
    deadline: 'Tonight',
    urgency: 'TODAY',
    description:
      'Help a first-year student revise limits, derivatives and integration with a focused one-hour session.',
    tags: ['Calculus', 'Teaching'],
  },
  {
    id: 103,
    title: 'Photographer for cultural club event',
    category: 'Events',
    icon: Camera,
    reward: 1200,
    location: 'Main Auditorium',
    deadline: 'Tomorrow',
    urgency: 'TODAY',
    description:
      'Capture candid moments and key event shots for a two-hour campus cultural event.',
    tags: ['Photography', 'Events'],
  },
  {
    id: 104,
    title: 'Pick up groceries from campus gate',
    category: 'Errands',
    icon: ShoppingBag,
    reward: 150,
    location: 'Main Gate → Hostel',
    deadline: 'Within 60 min',
    urgency: 'NOW',
    description:
      'Pick up a prepaid grocery order from the main gate and deliver it to a hostel room.',
    tags: ['Delivery', 'Quick task'],
  },
  {
    id: 105,
    title: 'Fix a React component before demo',
    category: 'Tech',
    icon: Code2,
    reward: 700,
    location: 'Innovation Lab',
    deadline: 'Today',
    urgency: 'TODAY',
    description:
      'Debug a responsive React component and help get a student startup demo ready for presentation.',
    tags: ['React', 'Debugging'],
  },
  {
    id: 106,
    title: 'Beginner guitar lesson',
    category: 'Skills',
    icon: Music2,
    reward: 400,
    location: 'Hostel Common Room',
    deadline: 'This evening',
    urgency: 'TODAY',
    description:
      'Teach a beginner the basics of chords, rhythm and one simple song in a one-hour session.',
    tags: ['Guitar', 'Music'],
  },
]

const nav = [
  ['home', 'Home', Home],
  ['missions', 'Mission Board', Compass],
  ['quickgigs', 'Quick Gigs', Clock3],
  ['work', 'My Missions', BriefcaseBusiness],
  ['forge', 'My Forge', ShieldCheck],
  ['trust', 'Trust Center', ShieldAlert],
  ['wallet', 'Earnings', WalletCards],
  ['messages', 'Messages', MessageSquare],
  ['insights', 'Campus Insights', TrendingUp],
  ['business', 'For Business', BriefcaseBusiness],
] as const

function Pill({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode
  tone?: 'gold' | 'green' | 'muted'
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function Stat({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Zap
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={17} />
      </div>

      <div>
        <p className="eyebrow">{label}</p>
        <p className="stat-value">{value}</p>
        <p className="stat-detail">{detail}</p>
      </div>
    </div>
  )
}

export default function StormforgeApp() {
  const [view, setView] = useState('home')
  const [profile, setProfile] = useState('Ananya')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<(typeof missions)[number] | null>(
    null
  )
  const [applied, setApplied] = useState<number[]>([])
  const [completed, setCompleted] = useState<number[]>([])
  const [forgeScore, setForgeScore] = useState(92)
  const [workspaceStep, setWorkspaceStep] = useState<
    'working' | 'submitted' | 'reviewed'
  >('working')
  const [toast, setToast] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const filtered = useMemo(() => {
    return missions.filter(
      (mission) =>
        (category === 'All' || mission.category === category) &&
        `${mission.title} ${mission.company} ${mission.tags.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase())
    )
  }, [category, query])

  const notify = (message: string) => {
    setToast(message)

    window.setTimeout(() => {
      setToast('')
    }, 2600)
  }

  const apply = (id: number) => {
    setApplied((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    )

    setSelected(null)
    notify('Mission added to your active forge.')
  }

  const openWorkspace = (mission: (typeof missions)[number]) => {
  setWorkspaceStep(
    completed.includes(mission.id) ? 'reviewed' : 'working'
  )

  setSelected(null)
  setView('workspace')
  }

  return (
    <div className="app-shell">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="sidebar">
        <button
          className="brand"
          onClick={() => setView('home')}
          aria-label="Stormforge home"
        >
          <span className="brand-mark">
            <Zap size={19} fill="currentColor" />
          </span>

          <span>
            STORM<span>FORGE</span>
          </span>
        </button>

        <div className="profile-mini">
          <div className="avatar">{profile[0]}</div>

          <div>
            <strong>{profile}</strong>
            <small>Forge score {forgeScore}</small>
          </div>

          <MoreHorizontal size={17} className="dim" />
        </div>

        <nav aria-label="Main navigation">
          {nav.map(([key, label, Icon]) => (
            <button
              key={key}
              className={
                view === key ? 'nav-item active' : 'nav-item'
              }
              onClick={() => setView(key)}
            >
              <Icon size={17} />

              <span>{label}</span>

              {key === 'messages' && (
                <b className="nav-count">3</b>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => setView('settings')}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <div className="season-card">
            <Flame size={17} />

            <div>
              <strong>Monsoon Season</strong>
              <small>12 days left</small>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>

          <div className="breadcrumb">
            STORMFORGE
            <span>/</span>
            {view === 'home'
              ? 'STORM WATCH'
              : view.replace('-', ' ').toUpperCase()}
          </div>

          <div className="top-actions">
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => {
                setView('notifications')
                notify('You have 3 new signals.')
              }}
            >
              <Bell size={18} />
              <i />
            </button>

            <button
              className="user-chip"
              onClick={() =>
                setProfile(
                  profile === 'Ananya' ? 'Rohit' : 'Ananya'
                )
              }
            >
              <div className="avatar small">
                {profile[0]}
              </div>

              <span>{profile}</span>

              <ChevronRight size={15} />
            </button>
          </div>
        </header>

        {showMenu && (
          <div className="mobile-nav">
            {nav.map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => {
                  setView(key)
                  setShowMenu(false)
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="content-wrap">
          {view === 'home' && (
            <HomeView
              profile={profile}
              applied={applied}
              forgeScore={forgeScore}
              onView={setView}
              onOpen={setSelected}
            />
          )}

          {view === 'missions' && (
            <MissionBoard
              filtered={filtered}
              category={category}
              setCategory={setCategory}
              query={query}
              setQuery={setQuery}
              applied={applied}
              onOpen={setSelected}
            />
          )}

          {view === 'quickgigs' && (
            <QuickGigsView
              onNotify={notify}
            />
          )}

          {view === 'work' && (
            <WorkView
              applied={applied}
              onOpen={setSelected}
              onOpenWorkspace={openWorkspace}
              onView={setView}
            />
          )}

          {view === 'workspace' && (
            <WorkspaceView
              mission={
                selected ??
                missions.find((mission) => applied.includes(mission.id)) ??
                missions[0]
              }
              step={workspaceStep}
              onStepChange={setWorkspaceStep}
              onComplete={() => {
                if (!completed.includes(selected.id)) {
                  setCompleted((prev) => [...prev, selected.id])
                  setForgeScore((prev) => Math.min(100, prev + 3))
                }

                setWorkspaceStep('reviewed')
                notify(
                  'Mission verified. +3 Forge Score and payment released.'
                )
              }}
              onBack={() => setView('work')}
              onForge={() => setView('forge')}
            />
          )}

          {view === 'forge' && (
            <ForgeView
              profile={profile}
              score={forgeScore}
            />
          )}

          {view === 'trust' && (
            <TrustCenterView
              onNotify={notify}
            />
          )}

          {view === 'wallet' && <WalletView />}

          {view === 'insights' && <InsightsView />}

          {view === 'business' && <BusinessView onNotify={notify} />}

          {view === 'messages' && (
            <SimpleView
              icon={MessageSquare}
              title="Your signal room"
              copy="Conversations with collaborators, mentors, and mission givers appear here."
              action="Start a conversation"
              onClick={() =>
                notify(
                  'The signal room is ready for your first message.'
                )
              }
            />
          )}

          {view === 'notifications' && (
            <SimpleView
              icon={Bell}
              title="Signals from the network"
              copy="Your forge is quiet for now. New mission matches and payment updates will land here."
              action="Scan Mission Board"
              onClick={() => setView('missions')}
            />
          )}

          {view === 'settings' && (
            <SimpleView
              icon={Settings}
              title="Tune your forge"
              copy="Manage your profile, focus areas, availability, and notification preferences."
              action="Edit profile"
              onClick={() => setView('forge')}
            />
          )}
        </div>
      </main>

      {/* =====================================================
          MOBILE NAVIGATION
          ===================================================== */}

      <div className="mobile-bottom">
        {nav.slice(0, 5).map(([key, label, Icon]) => (
          <button
            key={key}
            className={view === key ? 'active' : ''}
            onClick={() => setView(key)}
          >
            <Icon size={18} />
            <span>{label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* =====================================================
          MISSION MODAL
          ===================================================== */}

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="mission-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <Pill tone="gold">
              {selected.category}
            </Pill>

            <h2>{selected.title}</h2>

            <p className="modal-company">
              {selected.company}
              <span>•</span>
              Campus / India
            </p>

            <div className="modal-stats">
              <div>
                <small>REWARD</small>
                <strong>
                  ₹{selected.reward.toLocaleString()}
                </strong>
              </div>

              <div>
                <small>COMMITMENT</small>
                <strong>{selected.time}</strong>
              </div>

              <div>
                <small>APPLICANTS</small>
                <strong>18</strong>
              </div>
            </div>

            <p className="modal-copy">
              A focused mission for a curious maker who can turn
              an ambitious brief into something clear, useful,
              and impossible to ignore.
            </p>

            <div className="tag-row">
              {selected.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>

            <button
              className="primary-button full"
              onClick={() => {
                if (applied.includes(selected.id)) {
                  openWorkspace(selected)
                } else {
                  apply(selected.id)
                }
              }}
            >
              {applied.includes(selected.id)
                ? 'Open workspace'
                : 'Take this mission'}

              <ChevronRight size={16} />
            </button>
          </section>
        </div>
      )}

      {toast && (
        <div className="toast">
          <Sparkles size={16} />
          {toast}
        </div>
      )}
    </div>
  )
}

/* =========================================================
   HOME
   ========================================================= */

function HomeView({
  profile,
  applied,
  forgeScore,
  onView,
  onOpen,
}: {
  profile: string
  applied: number[]
  forgeScore: number
  onView: (v: string) => void
  onOpen: (m: (typeof missions)[number]) => void
}) {
  return (
    <>
      <section
        className="hero stormforge-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '18px',
          minHeight: '440px',
          padding: '48px',
          marginBottom: '50px',
          backgroundImage:
            "linear-gradient(90deg, rgba(5,9,17,0.97) 0%, rgba(5,9,17,0.90) 32%, rgba(5,9,17,0.42) 65%, rgba(5,9,17,0.18) 100%), url('/images/stormforge-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(245,185,66,0.25)',
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.42), inset 0 1px rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 78% 45%, rgba(245,185,66,0.14), transparent 25%), linear-gradient(180deg, transparent 55%, rgba(4,8,15,0.72) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '620px',
          }}
        >
          <p className="kicker">
            <span className="live-dot" />
            THURSDAY, 29 AUGUST 2026
          </p>

          <h1
            style={{
              textShadow:
                '0 4px 30px rgba(0,0,0,0.65)',
            }}
          >
            Forge your skills.
            <br />
            Command your
            <br />
            opportunities.
          </h1>

          <p className="hero-copy">
            The campus is moving.
            <br />
            Find the work that moves you.
          </p>

          <button
            className="primary-button"
            onClick={() => onView('missions')}
          >
            Explore live missions
            <ChevronRight size={17} />
          </button>
        </div>

        <div
          className="score-orbit"
          style={{
            position: 'absolute',
            zIndex: 2,
            right: '7%',
            top: '50%',
            transform: 'translateY(-50%)',
            background:
              'radial-gradient(circle, rgba(8,13,23,0.72), rgba(8,13,23,0.25) 70%, transparent)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div className="orbit-ring">
            <div>
              <span>FORGE SCORE</span>
              <strong>{forgeScore}</strong>
              <small>TOP 8% ON CAMPUS</small>
            </div>
          </div>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SIGNALS</p>
          <h2>Storm Watch</h2>
        </div>

        <button
          className="text-button"
          onClick={() => onView('forge')}
        >
          View your forge
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="stats-grid">
        <Stat
          icon={Target}
          label="Active missions"
          value={String(applied.length).padStart(2, '0')}
          detail="Keep the momentum"
        />

        <Stat
          icon={Trophy}
          label="Forge score"
          value={String(forgeScore)}
          detail="+3 from verified work"
        />

        <Stat
          icon={CircleDollarSign}
          label="Earned this season"
          value="₹18,450"
          detail="+₹4,200 pending"
        />
      </div>

      <SmartMatch
        profile={profile}
        onOpen={onOpen}
        onView={onView}
      />

      <div className="section-heading compact">
        <div>
          <p className="eyebrow">RECOMMENDED FOR YOU</p>
          <h2>Live on the board</h2>
        </div>

        <button
          className="text-button"
          onClick={() => onView('missions')}
        >
          See all missions
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="mission-grid">
        {missions.slice(0, 4).map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            applied={applied.includes(mission.id)}
            onOpen={() => onOpen(mission)}
          />
        ))}
      </div>
    </>
  )
}

/* =========================================================
   SMART MATCH
   ========================================================= */

function SmartMatch({
  profile,
  onOpen,
  onView,
}: {
  profile: string
  onOpen: (m: (typeof missions)[number]) => void
  onView: (v: string) => void
}) {
  const ranked = [
    { id: 6, match: 98, reason: 'React + Next.js', note: 'Strong skill fit' },
    { id: 3, match: 94, reason: 'React + AI', note: 'Matches your build experience' },
    { id: 5, match: 88, reason: 'Branding + illustration', note: 'Good creative overlap' },
  ]

  return (
    <section className="smart-match-panel">
      <div className="smart-match-head">
        <div>
          <div className="smart-match-label">
            <BrainCircuit size={14} />
            SMART MATCH
          </div>
          <h2>Work that fits {profile}.</h2>
          <p>Stormforge ranks missions using your skills, past work, availability and reputation.</p>
        </div>

        <button className="text-button" onClick={() => onView('missions')}>
          Explore all matches
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="match-grid">
        {ranked.map((item) => {
          const mission = missions.find((m) => m.id === item.id)!

          return (
            <button
              key={mission.id}
              className="match-card"
              onClick={() => onOpen(mission)}
            >
              <div className="match-score">
                <strong>{item.match}%</strong>
                <span>MATCH</span>
              </div>

              <div className="match-main">
                <div className="match-category">
                  {mission.category}
                  {mission.hot && <Flame size={11} />}
                </div>
                <h3>{mission.title}</h3>
                <p>{mission.company}</p>

                <div className="match-reason">
                  <Sparkles size={12} />
                  <span>{item.reason}</span>
                  <em>{item.note}</em>
                </div>
              </div>

              <div className="match-footer">
                <strong>₹{mission.reward.toLocaleString()}</strong>
                <span>{mission.time}</span>
                <ChevronRight size={15} />
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* =========================================================
   MISSION CARD
   ========================================================= */

function MissionCard({
  mission: m,
  applied,
  onOpen,
}: {
  mission: (typeof missions)[number]
  applied: boolean
  onOpen: () => void
}) {
  return (
    <button
      className="mission-card"
      onClick={onOpen}
    >
      <div className="card-top">
        <Pill tone={m.hot ? 'gold' : 'muted'}>
          {m.hot && <Flame size={12} />}
          {m.category}
        </Pill>

        <span className="reward">
          ₹{m.reward.toLocaleString()}
        </span>
      </div>

      <h3>{m.title}</h3>

      <p>{m.company}</p>

      <div
        className="tag-row"
        style={{ marginTop: '14px' }}
      >
        {m.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <div className="card-bottom">
        <span>{m.time} commitment</span>

        <span className="arrow">
          <ChevronRight size={16} />
        </span>
      </div>

      {applied && (
        <div className="accepted">
          <ShieldCheck size={13} />
          In your forge
        </div>
      )}
    </button>
  )
}

/* =========================================================
   MISSION BOARD
   ========================================================= */

function MissionBoard({
  filtered,
  category,
  setCategory,
  query,
  setQuery,
  applied,
  onOpen,
}: {
  filtered: typeof missions
  category: string
  setCategory: (c: string) => void
  query: string
  setQuery: (q: string) => void
  applied: number[]
  onOpen: (m: (typeof missions)[number]) => void
}) {
  return (
    <>
      <div className="page-title">
        <div>
          <p className="kicker">THE OPEN NETWORK</p>
          <h1>Mission Board</h1>
          <p>Find a brief worthy of your attention.</p>
        </div>

        <Pill tone="green">
          <span className="live-dot" />
          {filtered.length * 7 + 38} live missions
        </Pill>
      </div>

      <div className="board-toolbar">
        <div className="search-box">
          <Search size={17} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search missions, skills, companies..."
          />
        </div>

        <div className="filters">
          {[
            'All',
            'Design',
            'Build',
            'Research',
            'Writing',
            'Photography',
            'Tutoring',
          ].map((c) => (
            <button
              key={c}
              className={
                category === c
                  ? 'filter active'
                  : 'filter'
              }
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mission-grid board-grid">
        {filtered.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            applied={applied.includes(mission.id)}
            onOpen={() => onOpen(mission)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <SimpleView
          icon={Search}
          title="The forge is quiet"
          copy="No missions match your current search. Try another skill, category, or keyword."
          action="Clear search"
          onClick={() => {
            setQuery('')
            setCategory('All')
          }}
        />
      )}
    </>
  )
}

/* =========================================================
   MY MISSIONS
   ========================================================= */

function WorkView({
  applied,
  onOpen,
  onOpenWorkspace,
  onView,
}: {
  applied: number[]
  onOpen: (m: (typeof missions)[number]) => void
  onOpenWorkspace: (m: (typeof missions)[number]) => void
  onView: (v: string) => void
}) {
  const active = missions.filter((m) =>
    applied.includes(m.id)
  )

  return (
    <>
      <div className="page-title">
        <div>
          <p className="kicker">YOUR ACTIVE QUESTS</p>
          <h1>My Missions</h1>
          <p>
            Small teams. Real stakes. Work you can point to.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => onView('missions')}
        >
          Find another mission
        </button>
      </div>

      {active.length === 0 ? (
        <SimpleView
          icon={BriefcaseBusiness}
          title="Your forge is ready"
          copy="Accept a mission from the board and it will appear here with a focused workspace and delivery checklist."
          action="Browse missions"
          onClick={() => onView('missions')}
        />
      ) : (
        <div className="work-list">
          {active.map((mission) => (
            <button
              className="work-row"
              key={mission.id}
              onClick={() => onOpenWorkspace(mission)}
            >
              <div className="work-status">
                <span className="status-pulse" />
                IN PROGRESS
              </div>

              <div>
                <h3>{mission.title}</h3>
                <p>{mission.company}</p>
              </div>

              <div className="work-progress">
                <div className="progress-label">
                  <span>Brief alignment</span>
                  <strong>32%</strong>
                </div>

                <div className="progress">
                  <i style={{ width: '32%' }} />
                </div>
              </div>

              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      )}
    </>
  )
}

/* =========================================================
   FORGE
   ========================================================= */

function ForgeView({
  profile,
  score,
}: {
  profile: string
  score: number
}) {
  return (
    <>
      <div className="profile-hero">
        <div className="avatar giant">
          {profile[0]}
        </div>

        <div className="profile-identity">
          <p className="kicker">THE MAKER PROFILE</p>

          <h1>{profile} Sharma</h1>

          <p>
            Product designer · NIT Trichy · Chennai, India
          </p>

          <div className="tag-row">
            <Pill tone="gold">
              <Zap size={12} />
              Master · {score}/100
            </Pill>

            <Pill tone="green">
              <ShieldCheck size={12} />
              Campus verified
            </Pill>

            <Pill>6 missions completed</Pill>
          </div>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            window.alert(
              'Profile editing will be available in the next Stormforge release.'
            )
          }
        >
          Edit profile
        </button>
      </div>

      <div className="forge-layout">
        <div className="panel score-panel forge-score-panel">
          <div className="score-heading">
            <div>
              <p className="eyebrow">YOUR FORGE SCORE</p>
              <h2>Trust, earned.</h2>
            </div>

            <div className="verified-badge">
              <ShieldCheck size={17} />
              VERIFIED
            </div>
          </div>

          <div className="forge-score-display">
            <div className="score-circle">
              <div>
                <strong>{score}</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-tier">
              <span>CURRENT TIER</span>
              <strong>MASTER</strong>
              <small>Top 8% of verified makers</small>
            </div>
          </div>

          <div className="score-progress">
            <div className="progress-label">
              <span>Progress to Stormcaller</span>
              <strong>{score}%</strong>
            </div>

            <div className="progress">
              <i style={{ width: `${score}%` }} />
            </div>

            <div className="tier-row">
              <span>MASTER</span>
              <span>STORMCALLER · 100</span>
            </div>
          </div>

          <div className="score-breakdown">
            <div className="score-metric">
              <div className="metric-icon">
                <ShieldCheck size={16} />
              </div>
              <div className="metric-info">
                <div>
                  <span>Reliability</span>
                  <strong>96</strong>
                </div>
                <div className="metric-bar">
                  <i style={{ width: '96%' }} />
                </div>
                <small>100% on-time delivery</small>
              </div>
            </div>

            <div className="score-metric">
              <div className="metric-icon">
                <Sparkles size={16} />
              </div>
              <div className="metric-info">
                <div>
                  <span>Craft</span>
                  <strong>89</strong>
                </div>
                <div className="metric-bar">
                  <i style={{ width: '89%' }} />
                </div>
                <small>4.9 average client rating</small>
              </div>
            </div>

            <div className="score-metric">
              <div className="metric-icon">
                <MessageSquare size={16} />
              </div>
              <div className="metric-info">
                <div>
                  <span>Collaboration</span>
                  <strong>94</strong>
                </div>
                <div className="metric-bar">
                  <i style={{ width: '94%' }} />
                </div>
                <small>Excellent team feedback</small>
              </div>
            </div>

            <div className="score-metric">
              <div className="metric-icon">
                <Star size={16} />
              </div>
              <div className="metric-info">
                <div>
                  <span>Trust</span>
                  <strong>91</strong>
                </div>
                <div className="metric-bar">
                  <i style={{ width: '91%' }} />
                </div>
                <small>Identity + work verified</small>
              </div>
            </div>
          </div>

          <div className="score-note">
            <Zap size={15} />
            <span>
              Complete verified missions to increase your score
              and unlock higher-value opportunities.
            </span>
          </div>
        </div>

        <div className="panel forged-work-panel">
          <div className="score-heading">
            <div>
              <p className="eyebrow">FORGED WORK</p>
              <h2>Proof, not promises.</h2>
            </div>
            <Pill tone="green">
              <ShieldCheck size={12} />
              VERIFIED
            </Pill>
          </div>

          <p className="panel-description">
            Completed work becomes portable proof of what you can
            actually do.
          </p>

          <div className="portfolio-item verified-work">
            <div className="portfolio-art art-one">
              <Sparkles size={22} />
              AETHER
            </div>
            <div className="portfolio-content">
              <div className="work-title-row">
                <h3>Climate, made tangible</h3>
                <span className="verified-check">
                  <ShieldCheck size={13} />
                </span>
              </div>
              <p>Launch narrative · Aether Labs</p>
              <div className="work-meta">
                <span>
                  <Star size={12} fill="currentColor" />
                  4.9
                </span>
                <span>Delivered on time</span>
                <span>Client verified</span>
              </div>
            </div>
            <div className="work-reward">
              <strong>₹850</strong>
              <small>earned</small>
            </div>
          </div>

          <div className="portfolio-item verified-work">
            <div className="portfolio-art art-two">
              <Zap size={22} />
              SYNC
            </div>
            <div className="portfolio-content">
              <div className="work-title-row">
                <h3>Study smarter, together</h3>
                <span className="verified-check">
                  <ShieldCheck size={13} />
                </span>
              </div>
              <p>Product system · StudySync</p>
              <div className="work-meta">
                <span>
                  <Star size={12} fill="currentColor" />
                  5.0
                </span>
                <span>Delivered on time</span>
                <span>Client verified</span>
              </div>
            </div>
            <div className="work-reward">
              <strong>₹1,200</strong>
              <small>earned</small>
            </div>
          </div>

          <div className="portfolio-item verified-work">
            <div className="portfolio-art art-three">
              <Target size={22} />
              NIT
            </div>
            <div className="portfolio-content">
              <div className="work-title-row">
                <h3>Cultural fest identity</h3>
                <span className="verified-check">
                  <ShieldCheck size={13} />
                </span>
              </div>
              <p>Brand system · NIT Cultural Council</p>
              <div className="work-meta">
                <span>
                  <Star size={12} fill="currentColor" />
                  4.8
                </span>
                <span>Delivered on time</span>
                <span>Client verified</span>
              </div>
            </div>
            <div className="work-reward">
              <strong>₹1,500</strong>
              <small>earned</small>
            </div>
          </div>

          <button className="text-button" style={{ marginTop: '18px' }}>
            View all verified work
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="panel reputation-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE REPUTATION FLYWHEEL</p>
            <h2>Every mission makes your forge stronger.</h2>
          </div>
          <Pill tone="gold">
            <TrendingUp size={12} />
            +24 this month
          </Pill>
        </div>

        <div className="reputation-flow">
          <div className="flow-step">
            <div className="flow-icon"><Compass size={19} /></div>
            <strong>Discover</strong>
            <span>Find your fit</span>
          </div>
          <ChevronRight className="flow-arrow" />
          <div className="flow-step">
            <div className="flow-icon"><BriefcaseBusiness size={19} /></div>
            <strong>Complete</strong>
            <span>Do real work</span>
          </div>
          <ChevronRight className="flow-arrow" />
          <div className="flow-step">
            <div className="flow-icon"><Star size={19} /></div>
            <strong>Verify</strong>
            <span>Earn trust</span>
          </div>
          <ChevronRight className="flow-arrow" />
          <div className="flow-step">
            <div className="flow-icon"><TrendingUp size={19} /></div>
            <strong>Grow</strong>
            <span>Unlock more</span>
          </div>
          <ChevronRight className="flow-arrow" />
          <div className="flow-step highlight">
            <div className="flow-icon"><Crown size={19} /></div>
            <strong>Advance</strong>
            <span>Better missions</span>
          </div>
        </div>

        <div className="unlock-strip">
          <div>
            <Zap size={17} />
            <span>
              <strong>Next unlock:</strong> Stormcaller missions
            </span>
          </div>
          <span>{Math.max(0, 100 - score)} points to go</span>
        </div>
      </div>
    </>
  )
}

/* =========================================================
   WALLET
   ========================================================= */

function WalletView() {
  return (
    <>
      <div className="page-title">
        <div>
          <p className="kicker">THE TREASURY</p>
          <h1>Earnings</h1>
          <p>Every good mission leaves a trace.</p>
        </div>

        <button className="secondary-button">
          Withdraw funds
        </button>
      </div>

      <div className="wallet-hero">
        <div>
          <p className="eyebrow">
            AVAILABLE TO WITHDRAW
          </p>

          <strong>₹14,250</strong>

          <p>Last payout · 14 August 2026</p>
        </div>

        <CircleDollarSign size={38} />
      </div>

      <div className="stats-grid">
        <Stat
          icon={TrendingUp}
          label="Season total"
          value="₹18,450"
          detail="Across 6 missions"
        />

        <Stat
          icon={WalletCards}
          label="Pending release"
          value="₹4,200"
          detail="2 active missions"
        />

        <Stat
          icon={Trophy}
          label="Avg. mission"
          value="₹3,075"
          detail="Top 12% on campus"
        />
      </div>

      <div className="panel table-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              RECENT ACTIVITY
            </p>

            <h2>Ledger</h2>
          </div>
        </div>

        {[
          'Aether Labs · Launch story',
          'Good Signal · Tech manifesto',
          'StudySync · Product system',
        ].map((item, index) => (
          <div
            className="ledger-row"
            key={item}
          >
            <span>{item}</span>

            <small>
              {index + 4} AUG 2026
            </small>

            <strong>
              +₹{[850, 450, 1200][index].toLocaleString()}
            </strong>
          </div>
        ))}
      </div>
    </>
  )
}

/* =========================================================
   INSIGHTS
   ========================================================= */

function InsightsView() {
  const demand = [
    { label: 'AI prototyping', value: 86, change: '+24%' },
    { label: 'Web development', value: 78, change: '+18%' },
    { label: 'Design & branding', value: 71, change: '+12%' },
    { label: 'Tutoring', value: 63, change: '+9%' },
    { label: 'Photography', value: 48, change: '+6%' },
  ]

  const opportunities = [
    {
      title: 'AI study tools',
      meta: '12 open missions',
      reward: '₹8.4K',
      signal: 'Rising',
    },
    {
      title: 'Campus event design',
      meta: '9 open missions',
      reward: '₹6.2K',
      signal: 'Hot',
    },
    {
      title: 'Web & app builds',
      meta: '7 open missions',
      reward: '₹11.7K',
      signal: 'High value',
    },
  ]

  return (
    <>
      <div className="page-title">
        <div>
          <p className="kicker">
            THE LIVING CAMPUS
          </p>

          <h1>Campus Pulse</h1>

          <p>
            See where demand is moving — and where your skills can move with it.
          </p>
        </div>

        <Pill tone="green">
          <span className="live-dot" />
          Live network
        </Pill>
      </div>

      {/* MARKETPLACE HEALTH */}

      <div className="pulse-kpi-grid">

        <div className="panel pulse-kpi">
          <div className="pulse-kpi-icon">
            <UsersIcon />
          </div>
          <div>
            <p className="eyebrow">ACTIVE MAKERS</p>
            <strong>1,284</strong>
            <span>+14% this month</span>
          </div>
        </div>

        <div className="panel pulse-kpi">
          <div className="pulse-kpi-icon">
            <BriefcaseBusiness size={17} />
          </div>
          <div>
            <p className="eyebrow">OPEN MISSIONS</p>
            <strong>186</strong>
            <span>42 posted today</span>
          </div>
        </div>

        <div className="panel pulse-kpi">
          <div className="pulse-kpi-icon">
            <CircleDollarSign size={17} />
          </div>
          <div>
            <p className="eyebrow">VALUE MOVED</p>
            <strong>₹4.8L</strong>
            <span>Across the network</span>
          </div>
        </div>

        <div className="panel pulse-kpi">
          <div className="pulse-kpi-icon">
            <ShieldCheck size={17} />
          </div>
          <div>
            <p className="eyebrow">TRUST RATE</p>
            <strong>96%</strong>
            <span>Verified completions</span>
          </div>
        </div>

      </div>

      <div className="pulse-main-grid">

        {/* DEMAND */}

        <div className="panel demand-panel">

          <div className="section-heading">
            <div>
              <p className="eyebrow">
                SKILLS IN DEMAND
              </p>

              <h2>
                What campus needs now
              </h2>
            </div>

            <Pill tone="gold">
              This month
            </Pill>
          </div>

          <div className="demand-list">
            {demand.map((item, index) => (
              <div
                className="demand-item"
                key={item.label}
              >
                <div className="demand-rank">
                  0{index + 1}
                </div>

                <div className="demand-info">
                  <div className="demand-label">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>

                  <div className="pulse-progress">
                    <i
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>

                <span className="demand-change">
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          <div className="insight-callout">
            <Sparkles size={16} />

            <div>
              <strong>
                Opportunity signal
              </strong>

              <span>
                AI prototyping is growing fastest.
                Makers with React + AI skills are
                getting matched sooner.
              </span>
            </div>
          </div>

        </div>

        {/* TREND */}

        <div className="panel pulse-trend-panel">

          <p className="eyebrow">
            MARKETPLACE MOMENTUM
          </p>

          <h2>
            More work is moving off the syllabus.
          </h2>

          <p className="muted">
            Completed campus missions
          </p>

          <div className="pulse-chart">

            {[28, 38, 34, 49, 46, 66, 61, 79, 72, 92].map(
              (height, index) => (
                <div
                  className="pulse-chart-bar"
                  key={index}
                >
                  <i style={{ height: `${height}%` }} />
                </div>
              )
            )}

          </div>

          <div className="pulse-chart-labels">
            <span>JUN</span>
            <span>JUL</span>
            <span>AUG</span>
          </div>

          <div className="momentum-number">
            <strong>+31%</strong>
            <span>mission volume vs last month</span>
          </div>

        </div>

      </div>

      {/* OPPORTUNITY MAP */}

      <div className="panel opportunity-panel">

        <div className="section-heading">
          <div>
            <p className="eyebrow">
              OPPORTUNITY MAP
            </p>

            <h2>
              Where the next work is forming
            </h2>
          </div>

          <button
            className="text-button"
            onClick={() => window.alert('Opportunity map opened for exploration.')}
          >
            Explore signals
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="opportunity-grid">

          {opportunities.map((item) => (
            <div
              className="opportunity-card"
              key={item.title}
            >
              <div className="opportunity-orb">
                <TrendingUp size={18} />
              </div>

              <div className="opportunity-copy">
                <div className="opportunity-title">
                  <h3>{item.title}</h3>

                  <Pill
                    tone={
                      item.signal === 'Hot'
                        ? 'gold'
                        : 'green'
                    }
                  >
                    {item.signal}
                  </Pill>
                </div>

                <p>{item.meta}</p>
              </div>

              <strong>{item.reward}</strong>
            </div>
          ))}

        </div>

      </div>

      {/* PERSONAL SIGNAL */}

      <div className="pulse-personal">

        <div className="panel personal-signal">

          <div className="personal-icon">
            <BrainCircuit size={19} />
          </div>

          <div>
            <p className="eyebrow">
              YOUR NEXT MOVE
            </p>

            <h2>
              Learn what the campus will need next.
            </h2>

            <p>
              Your current React + AI profile is aligned
              with one of the fastest-growing opportunity
              clusters.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              window.alert(
                'Skill roadmap: AI prototyping → agent workflows → product analytics.'
              )
            }
          >
            View skill roadmap
            <ChevronRight size={16} />
          </button>

        </div>

      </div>
    </>
  )
}

function UsersIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

/* =========================================================
   QUICK GIGS
   ========================================================= */

function QuickGigsView({
  onNotify,
}: {
  onNotify: (message: string) => void
}) {
  const [filter, setFilter] = useState('All')
  const categories = [
    'All',
    'Design',
    'Tutoring',
    'Events',
    'Tech',
    'Errands',
    'Skills',
  ]

  const filtered =
    filter === 'All'
      ? quickGigs
      : quickGigs.filter((gig) => gig.category === filter)

  return (
    <>
      <div className="page-title">
        <div>
          <p className="kicker">THE CAMPUS, IN MOTION</p>
          <h1>Quick Gigs</h1>
          <p>
            Small tasks. Fast help. Real campus opportunities.
          </p>
        </div>

        <Pill tone="green">
          <span className="live-dot" />
          {quickGigs.length + 18} live now
        </Pill>
      </div>

      <div className="quick-gig-banner panel">
        <div className="quick-gig-banner-icon">
          <Zap size={20} />
        </div>

        <div>
          <p className="eyebrow">NEED SOMETHING DONE?</p>
          <h2>Post a quick gig in under a minute.</h2>
          <p>
            Turn an everyday campus need into a paid opportunity for someone
            nearby.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            onNotify('Quick gig posting will open here.')
          }
        >
          Post a quick gig
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="quick-gig-toolbar">
        <div>
          <p className="eyebrow">NEAR YOU</p>
          <strong>Opportunities that can happen today</strong>
        </div>

        <div className="filters quick-gig-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={
                filter === item ? 'filter active' : 'filter'
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="quick-gig-grid">
        {filtered.map((gig) => {
          const Icon = gig.icon

          return (
            <article className="quick-gig-card panel" key={gig.id}>
              <div className="quick-gig-top">
                <div className="quick-gig-icon">
                  <Icon size={19} />
                </div>

                <Pill
                  tone={gig.urgency === 'NOW' ? 'gold' : 'green'}
                >
                  {gig.urgency}
                </Pill>
              </div>

              <p className="quick-gig-category">
                {gig.category}
              </p>

              <h2>{gig.title}</h2>

              <p className="quick-gig-description">
                {gig.description}
              </p>

              <div className="quick-gig-meta">
                <span>
                  <MapPin size={13} />
                  {gig.location}
                </span>

                <span>
                  <Clock3 size={13} />
                  {gig.deadline}
                </span>
              </div>

              <div className="workspace-tags quick-gig-tags">
                {gig.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>

              <div className="quick-gig-footer">
                <div>
                  <span>FIXED REWARD</span>
                  <strong>₹{gig.reward.toLocaleString()}</strong>
                </div>

                <button
                  className="secondary-button"
                  onClick={() =>
                    onNotify(
                      `"${gig.title}" added to your quick-gig queue.`
                    )
                  }
                >
                  Take gig
                  <ChevronRight size={15} />
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="quick-gig-trust">
        <ShieldCheck size={17} />

        <div>
          <strong>Campus verified by default</strong>
          <span>
            Quick gigs use the same Stormforge trust layer: verified students,
            transparent rewards and reputation after completion.
          </span>
        </div>
      </div>
    </>
  )
}

/* =========================================================
   TRUST CENTER
   ========================================================= */

function TrustCenterView({
  onNotify,
}: {
  onNotify: (message: string) => void
}) {
  const [reported, setReported] = useState(false)
  const [blocked, setBlocked] = useState(false)

  return (
    <>
      <div className="page-title trust-page-title">
        <div>
          <p className="kicker">SAFETY FIRST</p>
          <h1>Trust Center</h1>
          <p>
            Clear signals, protected payments, and simple controls for every campus transaction.
          </p>
        </div>

        <Pill tone="green">
          <ShieldCheck size={12} />
          Protected
        </Pill>
      </div>

      <div className="trust-banner panel">
        <div className="trust-banner-icon">
          <ShieldCheck size={23} />
        </div>
        <div>
          <p className="eyebrow">STORMFORGE TRUST</p>
          <h2>Know who you're working with.</h2>
          <p>
            Every campus member starts with a verified identity. Completed work, payments, and feedback create a transparent reputation trail.
          </p>
        </div>
        <div className="trust-banner-score">
          <strong>96%</strong>
          <span>verified completions</span>
        </div>
      </div>

      <div className="trust-grid">
        <div className="panel trust-card">
          <div className="trust-card-head">
            <div className="trust-card-icon"><UserCheck size={18} /></div>
            <Pill tone="green">VERIFIED</Pill>
          </div>
          <h2>Campus identity</h2>
          <p>
            A verified college email connects each profile to a real campus member.
          </p>
          <div className="trust-check-list">
            <div><ShieldCheck size={14} /><span>College email verified</span><b>Done</b></div>
            <div><ShieldCheck size={14} /><span>Profile completed</span><b>Done</b></div>
            <div><ShieldCheck size={14} /><span>Reputation history</span><b>Growing</b></div>
          </div>
        </div>

        <div className="panel trust-card">
          <div className="trust-card-head">
            <div className="trust-card-icon"><LockKeyhole size={18} /></div>
            <Pill tone="gold">PROTECTED</Pill>
          </div>
          <h2>Payment protection</h2>
          <p>
            Mission funds are held until the agreed work is reviewed and verified.
          </p>
          <div className="payment-steps">
            <span>1. Mission accepted</span>
            <i />
            <span>2. Work submitted</span>
            <i />
            <span>3. Payment released</span>
          </div>
        </div>

        <div className="panel trust-card">
          <div className="trust-card-head">
            <div className="trust-card-icon"><ShieldAlert size={18} /></div>
            <Pill>SAFETY</Pill>
          </div>
          <h2>Meet safely</h2>
          <p>
            Keep communication on Stormforge and use public campus locations for in-person work.
          </p>
          <div className="safety-tips">
            <span>✓ Meet in public campus spaces</span>
            <span>✓ Keep payment inside Stormforge</span>
            <span>✓ Never share account passwords</span>
          </div>
        </div>
      </div>

      <div className="panel trust-actions-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">IF SOMETHING FEELS WRONG</p>
            <h2>You're always in control.</h2>
          </div>
          <PhoneCall size={20} className="trust-action-phone" />
        </div>

        <div className="trust-actions">
          <button
            className={blocked ? 'trust-action danger active' : 'trust-action'}
            onClick={() => {
              setBlocked(true)
              onNotify('User blocked. You will no longer receive missions from them.')
            }}
          >
            <Ban size={17} />
            <div>
              <strong>{blocked ? 'User blocked' : 'Block a user'}</strong>
              <span>Stop future contact and mission requests.</span>
            </div>
          </button>

          <button
            className={reported ? 'trust-action reported active' : 'trust-action'}
            onClick={() => {
              setReported(true)
              onNotify('Report submitted to the Stormforge safety team.')
            }}
          >
            <Flag size={17} />
            <div>
              <strong>{reported ? 'Report submitted' : 'Report an issue'}</strong>
              <span>Flag unsafe behavior or a suspicious transaction.</span>
            </div>
          </button>
        </div>
      </div>

      <div className="trust-principles">
        <div><ShieldCheck size={15} /><span>Verified identities</span></div>
        <div><LockKeyhole size={15} /><span>Protected transactions</span></div>
        <div><Flag size={15} /><span>Human-reviewed reports</span></div>
        <div><Star size={15} /><span>Transparent reputation</span></div>
      </div>
    </>
  )
}

/* =========================================================
   SIMPLE STATE
   ========================================================= */

function WorkspaceView({
  mission,
  step,
  onStepChange,
  onComplete,
  onBack,
  onForge,
}: {
  mission: (typeof missions)[number]
  step: 'working' | 'submitted' | 'reviewed'
  onStepChange: (step: 'working' | 'submitted' | 'reviewed') => void
  onComplete: () => void
  onBack: () => void
  onForge: () => void
}) {
  const isSubmitted = step === 'submitted' || step === 'reviewed'
  const isReviewed = step === 'reviewed'

  return (
    <>
      <div className="workspace-header">
        <button className="back-button" onClick={onBack}>
          <ChevronRight size={15} style={{ transform: 'rotate(180deg)' }} />
          My Missions
        </button>
        <Pill tone="gold"><Zap size={12} /> Mission workspace</Pill>
      </div>

      <div className="workspace-title">
        <div>
          <p className="kicker">ACTIVE MISSION</p>
          <h1>{mission.title}</h1>
          <p>
            {mission.company}
            <span className="workspace-dot">•</span>
            {mission.time} commitment
          </p>
        </div>
        <div className="workspace-reward">
          <span>MISSION VALUE</span>
          <strong>₹{mission.reward.toLocaleString()}</strong>
        </div>
      </div>

      <div className="workspace-steps">
        <div className="workspace-step active"><div>01</div><span>Work</span></div>
        <div className={isSubmitted ? 'workspace-step active' : 'workspace-step'}><div>02</div><span>Submit</span></div>
        <div className={isReviewed ? 'workspace-step active' : 'workspace-step'}><div>03</div><span>Verify</span></div>
        <div className={isReviewed ? 'workspace-step active' : 'workspace-step'}><div>04</div><span>Earn</span></div>
      </div>

      <div className="workspace-grid">
        <div className="panel workspace-brief">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE BRIEF</p>
              <h2>What needs to be done</h2>
            </div>
            <ShieldCheck size={20} className="brief-shield" />
          </div>

          <p className="workspace-copy">
            Turn the brief into a clear, polished deliverable that the mission owner can use immediately.
          </p>

          <div className="brief-list">
            <div><span className="brief-number">01</span><div><strong>Understand the problem</strong><small>Align on audience, goals and success criteria.</small></div></div>
            <div><span className="brief-number">02</span><div><strong>Build the first version</strong><small>Create a focused solution using your strongest skills.</small></div></div>
            <div><span className="brief-number">03</span><div><strong>Deliver the final work</strong><small>Submit the finished work before the mission deadline.</small></div></div>
          </div>

          <div className="workspace-tags">
            {mission.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
          </div>
        </div>

        <div className="workspace-side">
          <div className="panel status-panel">
            <p className="eyebrow">MISSION STATUS</p>
            <div className="mission-status-main">
              <div className={isReviewed ? 'status-orb complete' : isSubmitted ? 'status-orb submitted' : 'status-orb'}>
                {isReviewed ? <ShieldCheck size={22} /> : isSubmitted ? <Search size={22} /> : <Zap size={22} />}
              </div>
              <div>
                <strong>{isReviewed ? 'Verified & paid' : isSubmitted ? 'Awaiting verification' : 'In progress'}</strong>
                <small>{isReviewed ? 'Mission successfully completed' : isSubmitted ? 'Client is reviewing your work' : 'You are currently working on this mission'}</small>
              </div>
            </div>
          </div>

          <div className="panel delivery-panel">
            <p className="eyebrow">DELIVERY</p>

            {!isSubmitted && !isReviewed && (
              <>
                <h2>Ready to submit?</h2>
                <p>Your work is prepared for the mission owner. Submit it for verification.</p>
                <button className="primary-button full" onClick={() => onStepChange('submitted')}>
                  Submit for review <ChevronRight size={16} />
                </button>
              </>
            )}

            {isSubmitted && !isReviewed && (
              <>
                <div className="review-waiting">
                  <Search size={18} />
                  <div><strong>Client review</strong><span>Your submission has been sent.</span></div>
                </div>

                <div className="fake-review">
                  <div className="review-avatar">A</div>
                  <div>
                    <strong>Aether Labs</strong>
                    <div className="stars">★★★★★</div>
                    <p>Great work. Clear thinking, polished execution and delivered exactly when promised.</p>
                  </div>
                </div>

                <button className="primary-button full" onClick={onComplete}>
                  Verify & release payment <ShieldCheck size={16} />
                </button>
              </>
            )}

            {isReviewed && (
              <>
                <div className="success-panel">
                  <div className="success-icon"><ShieldCheck size={21} /></div>
                  <strong>Mission verified</strong>
                  <span>The work has been approved.</span>
                </div>

                <div className="payment-release">
                  <div><span>PAYMENT RELEASED</span><strong>₹{mission.reward.toLocaleString()}</strong></div>
                  <CircleDollarSign size={24} />
                </div>

                <div className="score-gain">
                  <Zap size={16} />
                  <div><strong>+3 Forge Score</strong><span>Your verified reputation just grew.</span></div>
                </div>

                <button className="secondary-button full" onClick={onForge}>
                  View your updated Forge <ChevronRight size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="workspace-trust">
        <ShieldCheck size={17} />
        <div>
          <strong>Protected by Stormforge Trust</strong>
          <span>Verified completion creates permanent proof of work and improves your future mission matches.</span>
        </div>
      </div>
    </>
  )
}

function BusinessView({
  onNotify,
}: {
  onNotify: (message: string) => void
}) {
  return (
    <>
      <div className="page-title business-page-title">
        <div>
          <p className="kicker">THE NEXT MARKET</p>
          <h1>For Business</h1>
          <p>Give startups and local businesses trusted access to campus talent.</p>
        </div>
        <Pill tone="gold"><TrendingUp size={12} /> Growth layer</Pill>
      </div>

      <div className="business-hero panel">
        <div>
          <p className="eyebrow">WHY STORMFORGE</p>
          <h2>One campus. Thousands of skills. One trusted network.</h2>
          <p>Businesses post real work, discover verified student talent, and build long-term campus relationships.</p>
          <button className="primary-button" onClick={() => onNotify('Business workspace created. We will match you with verified campus makers.')}>Post a business mission <ChevronRight size={16} /></button>
        </div>
        <div className="business-flywheel">
          <div><strong>01</strong><span>Post</span></div>
          <div><strong>02</strong><span>Match</span></div>
          <div><strong>03</strong><span>Verify</span></div>
          <div><strong>04</strong><span>Grow</span></div>
        </div>
      </div>

      <div className="business-kpis">
        <div className="panel business-kpi"><span>VERIFIED MAKERS</span><strong>1,284</strong><small>Across the campus network</small></div>
        <div className="panel business-kpi"><span>AVG. MATCH TIME</span><strong>18 min</strong><small>For active missions</small></div>
        <div className="panel business-kpi"><span>REPEAT WORK</span><strong>64%</strong><small>Businesses returning for talent</small></div>
      </div>

      <div className="business-grid">
        <div className="panel business-model">
          <p className="eyebrow">BUSINESS MODEL</p>
          <h2>Free to discover. Pay when value is created.</h2>
          <div className="model-row"><div><strong>Student</strong><span>Free access to missions and reputation</span></div><b>₹0</b></div>
          <div className="model-row"><div><strong>Business</strong><span>Transaction fee on successfully completed work</span></div><b>8–12%</b></div>
          <div className="model-row"><div><strong>Campus</strong><span>Analytics, talent programs and verified network tools</span></div><b>Pro</b></div>
        </div>
        <div className="panel business-value">
          <p className="eyebrow">VALUE TO BUSINESS</p>
          <h2>What companies actually get</h2>
          <div className="business-check"><ShieldCheck size={15}/><span>Campus-verified student profiles</span></div>
          <div className="business-check"><Sparkles size={15}/><span>Skill-based matching instead of random applications</span></div>
          <div className="business-check"><BriefcaseBusiness size={15}/><span>Proof of past work before hiring</span></div>
          <div className="business-check"><TrendingUp size={15}/><span>Repeat talent relationships across semesters</span></div>
        </div>
      </div>

      <div className="panel business-growth">
        <div><p className="eyebrow">THE FLYWHEEL</p><h2>More completed work makes the network more valuable.</h2></div>
        <div className="growth-chain"><span>Students</span><i>→</i><span>Skills</span><i>→</i><span>Missions</span><i>→</i><span>Trust</span><i>→</i><span>Businesses</span><i>→</i><span>More work</span></div>
      </div>
    </>
  )
}

function SimpleView({
  icon: Icon,
  title,
  copy,
  action,
  onClick,
}: {
  icon: typeof Bell
  title: string
  copy: string
  action: string
  onClick: () => void
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={25} />
      </div>

      <p className="kicker">
        SIGNAL RECEIVED
      </p>

      <h1>{title}</h1>

      <p>{copy}</p>

      <button
        className="primary-button"
        onClick={onClick}
      >
        {action}
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

export { missions }