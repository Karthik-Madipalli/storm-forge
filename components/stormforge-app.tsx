'use client'

import { useMemo, useState } from 'react'
import {
  Bell, BriefcaseBusiness, ChevronRight, CircleDollarSign, Compass, Crown, Flame, Home, LayoutGrid,
  Menu, MessageSquare, Moon, MoreHorizontal, Search, Settings, ShieldCheck, Sparkles, Star, Target,
  TrendingUp, Trophy, UserRound, WalletCards, X, Zap,
} from 'lucide-react'

const missions = [
  { id: 1, title: 'Build a launch story for a climate startup', company: 'Aether Labs', category: 'Design', reward: 850, time: '4 days', tags: ['Figma', 'Branding'], hot: true },
  { id: 2, title: 'Map the future of campus mobility', company: 'NIT Trichy Innovation Cell', category: 'Research', reward: 600, time: '6 days', tags: ['Research', 'Systems'], hot: false },
  { id: 3, title: 'Ship a scrappy AI study companion', company: 'StudySync', category: 'Build', reward: 1200, time: '10 days', tags: ['React', 'AI'], hot: true },
  { id: 4, title: 'Write the manifesto for mindful tech', company: 'Good Signal', category: 'Writing', reward: 450, time: '3 days', tags: ['Copywriting', 'Culture'], hot: false },
]

const nav = [
  ['home', 'Home', Home], ['missions', 'Mission Board', Compass], ['work', 'My Missions', BriefcaseBusiness], ['forge', 'My Forge', ShieldCheck],
  ['wallet', 'Earnings', WalletCards], ['messages', 'Messages', MessageSquare], ['insights', 'Campus Insights', TrendingUp],
]

function Pill({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'gold' | 'green' | 'muted' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function Stat({ icon: Icon, label, value, detail }: { icon: typeof Zap; label: string; value: string; detail: string }) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={17} /></div><div><p className="eyebrow">{label}</p><p className="stat-value">{value}</p><p className="stat-detail">{detail}</p></div></div>
}

export default function StormforgeApp() {
  const [view, setView] = useState('home')
  const [profile, setProfile] = useState('Ananya')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<(typeof missions)[number] | null>(null)
  const [applied, setApplied] = useState<number[]>([])
  const [toast, setToast] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const filtered = useMemo(() => missions.filter((m) => (category === 'All' || m.category === category) && `${m.title} ${m.company} ${m.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [category, query])
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const apply = (id: number) => { setApplied((prev) => prev.includes(id) ? prev : [...prev, id]); setSelected(null); notify('Mission added to your active forge.') }

  return <div className="app-shell">
    <aside className="sidebar">
      <button className="brand" onClick={() => setView('home')} aria-label="Stormforge home"><span className="brand-mark"><Zap size={19} fill="currentColor" /></span><span>STORM<span>FORGE</span></span></button>
      <div className="profile-mini"><div className="avatar">{profile[0]}</div><div><strong>{profile}</strong><small>Forge score 742</small></div><MoreHorizontal size={17} className="dim" /></div>
      <nav aria-label="Main navigation">{nav.map(([key, label, Icon]) => <button key={key} className={view === key ? 'nav-item active' : 'nav-item'} onClick={() => setView(key)}><Icon size={17} /><span>{label}</span>{key === 'messages' && <b className="nav-count">3</b>}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item" onClick={() => setView('settings')}><Settings size={17} /><span>Settings</span></button><div className="season-card"><Flame size={17} /><div><strong>Monsoon Season</strong><small>12 days left</small></div></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setShowMenu(!showMenu)} aria-label="Toggle navigation"><Menu size={20} /></button><div className="breadcrumb">STORMFORGE <span>/</span> {view === 'home' ? 'STORM WATCH' : view.replace('-', ' ').toUpperCase()}</div><div className="top-actions"><button className="icon-button" aria-label="Notifications" onClick={() => { setView('notifications'); notify('You have 3 new signals.') }}><Bell size={18} /><i /></button><button className="user-chip" onClick={() => setProfile(profile === 'Ananya' ? 'Rohit' : 'Ananya')}><div className="avatar small">{profile[0]}</div><span>{profile}</span><ChevronRight size={15} /></button></div></header>
      {showMenu && <div className="mobile-nav">{nav.map(([key, label, Icon]) => <button key={key} onClick={() => { setView(key); setShowMenu(false) }}><Icon size={16} />{label}</button>)}</div>}
      <div className="content-wrap">
        {view === 'home' && <HomeView profile={profile} applied={applied} onView={setView} onOpen={setSelected} />}
        {view === 'missions' && <MissionBoard filtered={filtered} category={category} setCategory={setCategory} query={query} setQuery={setQuery} applied={applied} onOpen={setSelected} />}
        {view === 'work' && <WorkView applied={applied} onOpen={setSelected} onView={setView} />}
        {view === 'forge' && <ForgeView profile={profile} />}
        {view === 'wallet' && <WalletView />}
        {view === 'insights' && <InsightsView />}
        {view === 'messages' && <SimpleView icon={MessageSquare} title="Your signal room" copy="Conversations with collaborators, mentors, and mission givers appear here." action="Start a conversation" onClick={() => notify('The signal room is ready for your first message.')} />}
        {view === 'notifications' && <SimpleView icon={Bell} title="Signals from the network" copy="Your forge is quiet for now. New mission matches and payment updates will land here." action="Scan Mission Board" onClick={() => setView('missions')} />}
        {view === 'settings' && <SimpleView icon={Settings} title="Tune your forge" copy="Manage your profile, focus areas, availability, and notification preferences." action="Edit profile" onClick={() => setView('forge')} />}
      </div>
    </main>
    <div className="mobile-bottom">{nav.slice(0, 5).map(([key, label, Icon]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}><Icon size={18} /><span>{label.split(' ')[0]}</span></button>)}</div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="mission-modal" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button><Pill tone="gold">{selected.category}</Pill><h2>{selected.title}</h2><p className="modal-company">{selected.company} <span>•</span> Remote / India</p><div className="modal-stats"><div><small>REWARD</small><strong>₹{selected.reward.toLocaleString()}</strong></div><div><small>COMMITMENT</small><strong>{selected.time}</strong></div><div><small>APPLICANTS</small><strong>18</strong></div></div><p className="modal-copy">A focused mission for a curious maker who can turn an ambitious brief into something clear, useful, and impossible to ignore.</p><div className="tag-row">{selected.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div><button className="primary-button full" onClick={() => apply(selected.id)}>{applied.includes(selected.id) ? 'Mission accepted' : 'Take this mission'} <Zap size={16} /></button></section></div>}
    {toast && <div className="toast"><Sparkles size={16} />{toast}</div>}
  </div>
}

function HomeView({ profile, applied, onView, onOpen }: { profile: string; applied: number[]; onView: (v: string) => void; onOpen: (m: (typeof missions)[number]) => void }) { return <><section className="hero"><div><p className="kicker"><span className="live-dot" /> THURSDAY, 29 AUGUST 2026</p><h1>Good morning, {profile}.</h1><p className="hero-copy">The campus is moving. Find the work that moves you.</p><button className="primary-button" onClick={() => onView('missions')}>Explore live missions <ChevronRight size={17} /></button></div><div className="score-orbit"><div className="orbit-ring"><div><span>FORGE SCORE</span><strong>742</strong><small>TOP 8% ON CAMPUS</small></div></div></div></section><div className="section-heading"><div><p className="eyebrow">YOUR SIGNALS</p><h2>Storm Watch</h2></div><button className="text-button" onClick={() => onView('forge')}>View your forge <ChevronRight size={15} /></button></div><div className="stats-grid"><Stat icon={Target} label="Active missions" value={String(applied.length).padStart(2, '0')} detail="Keep the momentum" /><Stat icon={Trophy} label="Forge score" value="742" detail="+24 this month" /><Stat icon={CircleDollarSign} label="Earned this season" value="₹18,450" detail="+₹4,200 pending" /></div><div className="section-heading compact"><div><p className="eyebrow">RECOMMENDED FOR YOU</p><h2>Live on the board</h2></div><button className="text-button" onClick={() => onView('missions')}>See all missions <ChevronRight size={15} /></button></div><div className="mission-grid">{missions.slice(0, 3).map((m) => <MissionCard key={m.id} mission={m} applied={applied.includes(m.id)} onOpen={() => onOpen(m)} />)}</div></> }

function MissionCard({ mission: m, applied, onOpen }: { mission: (typeof missions)[number]; applied: boolean; onOpen: () => void }) { return <button className="mission-card" onClick={onOpen}><div className="card-top"><Pill tone={m.hot ? 'gold' : 'muted'}>{m.hot && <Flame size={12} />}{m.category}</Pill><span className="reward">₹{m.reward.toLocaleString()}</span></div><h3>{m.title}</h3><p>{m.company}</p><div className="card-bottom"><span>{m.time} commitment</span><span className="arrow"><ChevronRight size={16} /></span></div>{applied && <div className="accepted"><ShieldCheck size={13} /> In your forge</div>}</button> }

function MissionBoard({ filtered, category, setCategory, query, setQuery, applied, onOpen }: { filtered: typeof missions; category: string; setCategory: (c: string) => void; query: string; setQuery: (q: string) => void; applied: number[]; onOpen: (m: (typeof missions)[number]) => void }) { return <><div className="page-title"><div><p className="kicker">THE OPEN NETWORK</p><h1>Mission Board</h1><p>Find a brief worthy of your attention.</p></div><Pill tone="green"><span className="live-dot" /> {filtered.length * 7 + 38} live missions</Pill></div><div className="board-toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search missions, skills, companies..." /></div><div className="filters">{['All', 'Design', 'Build', 'Research', 'Writing'].map((c) => <button key={c} className={category === c ? 'filter active' : 'filter'} onClick={() => setCategory(c)}>{c}</button>)}</div></div><div className="mission-grid board-grid">{filtered.map((m) => <MissionCard key={m.id} mission={m} applied={applied.includes(m.id)} onOpen={() => onOpen(m)} />)}</div></> }

function WorkView({ applied, onOpen, onView }: { applied: number[]; onOpen: (m: (typeof missions)[number]) => void; onView: (v: string) => void }) { const active = missions.filter((m) => applied.includes(m.id)); return <><div className="page-title"><div><p className="kicker">YOUR ACTIVE QUESTS</p><h1>My Missions</h1><p>Small teams. Real stakes. Work you can point to.</p></div><button className="primary-button" onClick={() => onView('missions')}>Find another mission</button></div>{active.length === 0 ? <SimpleView icon={BriefcaseBusiness} title="Your forge is ready" copy="Accept a mission from the board and it will appear here with a focused workspace and delivery checklist." action="Browse missions" onClick={() => onView('missions')} /> : <div className="work-list">{active.map((m) => <button className="work-row" key={m.id} onClick={() => onOpen(m)}><div className="work-status"><span className="status-pulse" />IN PROGRESS</div><div><h3>{m.title}</h3><p>{m.company}</p></div><div className="work-progress"><div className="progress-label"><span>Brief alignment</span><strong>32%</strong></div><div className="progress"><i style={{ width: '32%' }} /></div></div><ChevronRight size={18} /></button>)}</div>}</> }

function ForgeView({ profile }: { profile: string }) { return <><div className="profile-hero"><div className="avatar giant">{profile[0]}</div><div><p className="kicker">THE MAKER PROFILE</p><h1>{profile} Sharma</h1><p>Product designer · NIT Trichy · Chennai, India</p><div className="tag-row"><Pill tone="gold">Forge score 742</Pill><Pill tone="green"><ShieldCheck size={12} /> Verified maker</Pill></div></div><button className="secondary-button">Edit profile</button></div><div className="forge-layout"><div className="panel score-panel"><p className="eyebrow">CURRENT TIER</p><h2>Trailblazer</h2><p>258 points to <strong>Stormcaller</strong></p><div className="progress"><i style={{ width: '74%' }} /></div><div className="tier-row"><span>742</span><span>1,000</span></div><div className="score-list"><div><Star size={15} /> Delivery consistency <strong>92</strong></div><div><Flame size={15} /> Collaboration signal <strong>88</strong></div><div><Crown size={15} /> Craft depth <strong>76</strong></div></div></div><div className="panel"><p className="eyebrow">FORGED WORK</p><h2>Proof, not promises.</h2><div className="portfolio-item"><div className="portfolio-art art-one">AETHER</div><div><h3>Climate, made tangible</h3><p>Launch narrative · Aether Labs</p></div><Pill tone="green">₹850</Pill></div><div className="portfolio-item"><div className="portfolio-art art-two">SYNC</div><div><h3>Study smarter, together</h3><p>Product system · StudySync</p></div><Pill tone="green">₹1,200</Pill></div></div></div></> }

function WalletView() { return <><div className="page-title"><div><p className="kicker">THE TREASURY</p><h1>Earnings</h1><p>Every good mission leaves a trace.</p></div><button className="secondary-button">Withdraw funds</button></div><div className="wallet-hero"><div><p className="eyebrow">AVAILABLE TO WITHDRAW</p><strong>₹14,250</strong><p>Last payout · 14 August 2026</p></div><CircleDollarSign size={38} /></div><div className="stats-grid"><Stat icon={TrendingUp} label="Season total" value="₹18,450" detail="Across 6 missions" /><Stat icon={WalletCards} label="Pending release" value="₹4,200" detail="2 active missions" /><Stat icon={Trophy} label="Avg. mission" value="₹3,075" detail="Top 12% on campus" /></div><div className="panel table-panel"><div className="section-heading"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Ledger</h2></div></div>{['Aether Labs · Launch story', 'Good Signal · Tech manifesto', 'StudySync · Product system'].map((item, i) => <div className="ledger-row" key={item}><span>{item}</span><small>{i + 4} AUG 2026</small><strong>+₹{[850, 450, 1200][i].toLocaleString()}</strong></div>)}</div></> }

function InsightsView() { return <><div className="page-title"><div><p className="kicker">THE LIVING CAMPUS</p><h1>Campus Insights</h1><p>See what the network is building next.</p></div><Pill tone="green">Updated just now</Pill></div><div className="insights-grid"><div className="panel trend-panel"><p className="eyebrow">MISSION VELOCITY</p><h2>More work is moving off the syllabus.</h2><p className="muted">Campus missions completed this season</p><div className="chart"><span style={{ height: '28%' }} /><span style={{ height: '44%' }} /><span style={{ height: '39%' }} /><span style={{ height: '64%' }} /><span style={{ height: '58%' }} /><span style={{ height: '82%' }} /><span style={{ height: '100%' }} /></div><div className="chart-labels"><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span></div></div><div className="panel pulse-panel"><p className="eyebrow">SKILLS IN DEMAND</p><h2>What the network needs</h2>{[['Product thinking', 82], ['AI prototyping', 68], ['Brand systems', 54], ['Research', 41]].map(([label, width]) => <div className="skill-row" key={label as string}><div><span>{label}</span><strong>{width}%</strong></div><div className="progress"><i style={{ width: `${width}%` }} /></div></div>)}</div></div></> }

function SimpleView({ icon: Icon, title, copy, action, onClick }: { icon: typeof Bell; title: string; copy: string; action: string; onClick: () => void }) { return <div className="empty-state"><div className="empty-icon"><Icon size={25} /></div><p className="kicker">SIGNAL RECEIVED</p><h1>{title}</h1><p>{copy}</p><button className="primary-button" onClick={onClick}>{action} <ChevronRight size={16} /></button></div> }

export { missions }
