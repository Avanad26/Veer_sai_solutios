import { useState, useRef } from 'react'
import { useContent, DEFAULT_CONTENT } from '../context/ContentContext'

const ADMIN_PASSWORD = 'veer2024'

const s = {
  sidebar: { position: 'fixed', top: 0, left: 0, width: 220, height: '100vh', background: '#dce8f5', borderRight: '1px solid #c5d9ee', padding: '2rem 0', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 100, overflowY: 'auto' },
  main: { marginLeft: 220, flex: 1, background: '#f0f4f8', minHeight: '100vh', padding: '2rem 2.5rem', overflowY: 'auto' },
  card: { background: '#fff', borderRadius: 14, padding: '1.75rem', marginBottom: '1.25rem', boxShadow: '0 1px 8px rgba(13,42,94,0.07)' },
  label: { fontFamily: "'Barlow',sans-serif", fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a7499', marginBottom: '0.4rem', display: 'block' },
  input: { width: '100%', fontFamily: "'Barlow',sans-serif", fontSize: '0.875rem', color: '#0d2137', border: '1px solid #d1dae5', borderRadius: 8, padding: '0.6rem 0.85rem', outline: 'none', boxSizing: 'border-box', background: '#fafbfd' },
  textarea: { width: '100%', fontFamily: "'Barlow',sans-serif", fontSize: '0.875rem', color: '#0d2137', border: '1px solid #d1dae5', borderRadius: 8, padding: '0.6rem 0.85rem', outline: 'none', boxSizing: 'border-box', background: '#fafbfd', resize: 'vertical', lineHeight: 1.6 },
  btn: { fontFamily: "'Barlow',sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: '#1a6eb5', color: '#fff', border: 'none', borderRadius: 8, padding: '0.65rem 1.5rem', cursor: 'pointer' },
  btnGhost: { fontFamily: "'Barlow',sans-serif", fontWeight: 500, fontSize: '0.78rem', background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.55rem 1.1rem', cursor: 'pointer' },
  sectionTitle: { fontFamily: "'Josefin Sans',sans-serif", fontWeight: 600, fontSize: '1.1rem', color: '#0d2137', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.5rem' },
  row: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  field: { display: 'flex', flexDirection: 'column', flex: 1, marginBottom: '0.85rem' },
  saved: { display: 'inline-block', marginLeft: '0.75rem', color: '#22c55e', fontFamily: "'Barlow',sans-serif", fontSize: '0.8rem', fontWeight: 500 },
}

function Field({ label, value, onChange, textarea, rows = 3 }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      {textarea
        ? <textarea style={s.textarea} rows={rows} value={value} onChange={e => onChange(e.target.value)} />
        : <input style={s.input} value={value} onChange={e => onChange(e.target.value)} />
      }
    </div>
  )
}

function ImageUpload({ label, current, onChange }) {
  const ref = useRef()
  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={current} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, border: '1px solid #d1dae5' }} />
        <button style={{ ...s.btn, background: '#5a7499', fontSize: '0.72rem' }} onClick={() => ref.current.click()}>
          Change Image
        </button>
        <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      </div>
    </div>
  )
}

function SaveBar({ onSave, onReset, saved }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
      <button style={s.btn} onClick={onSave}>Save Changes</button>
      <button style={{ ...s.btn, background: '#e5ebf4', color: '#5a7499' }} onClick={onReset}>Reset to Default</button>
      {saved && <span style={s.saved}>✓ Saved</span>}
    </div>
  )
}

// ── Tab: Hero ──────────────────────────────────────────────────────────────────
function HeroTab() {
  const { content, updateSection, resetSection } = useContent()
  const [form, setForm] = useState(content.hero)
  const [saved, setSaved] = useState(false)
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const save = () => { updateSection('hero', form); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div>
      <p style={s.sectionTitle}>Hero Section</p>
      <div style={s.card}>
        <Field label="Main Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Tagline" value={form.tagline} onChange={set('tagline')} />
        <SaveBar onSave={save} onReset={() => { resetSection('hero'); setForm(DEFAULT_CONTENT.hero) }} saved={saved} />
      </div>
    </div>
  )
}

// ── Tab: About ─────────────────────────────────────────────────────────────────
function AboutTab() {
  const { content, updateSection, resetSection } = useContent()
  const [form, setForm] = useState(content.about)
  const [saved, setSaved] = useState(false)
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const setStat = (i, k) => v => setForm(p => { const stats = [...p.stats]; stats[i] = { ...stats[i], [k]: v }; return { ...p, stats } })
  const save = () => { updateSection('about', form); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div>
      <p style={s.sectionTitle}>About Section</p>
      <div style={s.card}>
        <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>HEADER</p>
        <Field label="Kicker" value={form.kicker} onChange={set('kicker')} />
        <Field label="Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Subtext" value={form.subtext} onChange={set('subtext')} />
      </div>
      <div style={s.card}>
        <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>STORY</p>
        <Field label="Lead Paragraph" value={form.storyLead} onChange={set('storyLead')} textarea rows={4} />
        <Field label="Body Paragraph 1" value={form.storyBody1} onChange={set('storyBody1')} textarea rows={3} />
        <Field label="Body Paragraph 2" value={form.storyBody2} onChange={set('storyBody2')} textarea rows={3} />
      </div>
      <div style={s.card}>
        <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>STATS</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {form.stats.map((stat, i) => (
            <div key={i} style={{ padding: '1rem', background: '#f5f8fc', borderRadius: 10 }}>
              <Field label="Number" value={stat.number} onChange={setStat(i, 'number')} />
              <Field label="Label"  value={stat.label}  onChange={setStat(i, 'label')} />
            </div>
          ))}
        </div>
      </div>
      <div style={s.card}>
        <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>FOUNDER</p>
        <ImageUpload label="Founder Photo" current={form.founderPhoto} onChange={set('founderPhoto')} />
        <div style={s.row}>
          <Field label="Name"  value={form.founderName}  onChange={set('founderName')} />
          <Field label="Title" value={form.founderTitle} onChange={set('founderTitle')} />
        </div>
        <Field label="Tagline Quote" value={form.founderTagline} onChange={set('founderTagline')} />
        {form.founderBadges.map((badge, i) => (
          <Field key={i} label={`Badge ${i + 1}`} value={badge} onChange={v => setForm(p => { const b = [...p.founderBadges]; b[i] = v; return { ...p, founderBadges: b } })} />
        ))}
      </div>
      <SaveBar onSave={save} onReset={() => { resetSection('about'); setForm(DEFAULT_CONTENT.about) }} saved={saved} />
    </div>
  )
}

// ── Tab: Services ──────────────────────────────────────────────────────────────
function ServicesTab() {
  const { content, updateSection, resetSection } = useContent()
  const [form, setForm] = useState(content.services)
  const [saved, setSaved] = useState(false)
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const setCard = (i, k) => v => setForm(p => { const cards = [...p.cards]; cards[i] = { ...cards[i], [k]: v }; return { ...p, cards } })
  const setTags = i => v => setCard(i, 'tags')(v.split(',').map(t => t.trim()).filter(Boolean))
  const save = () => { updateSection('services', form); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div>
      <p style={s.sectionTitle}>Services Section</p>
      <div style={s.card}>
        <Field label="Kicker"  value={form.kicker}  onChange={set('kicker')} />
        <Field label="Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Subtext" value={form.subtext} onChange={set('subtext')} />
      </div>
      {form.cards.map((card, i) => (
        <div key={i} style={s.card}>
          <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>CARD {i + 1}</p>
          <Field label="Title"       value={card.title} onChange={setCard(i, 'title')} />
          <Field label="Description" value={card.desc}  onChange={setCard(i, 'desc')} textarea rows={2} />
          <Field label="Tags (comma separated)" value={card.tags.join(', ')} onChange={setTags(i)} />
        </div>
      ))}
      <SaveBar onSave={save} onReset={() => { resetSection('services'); setForm(DEFAULT_CONTENT.services) }} saved={saved} />
    </div>
  )
}

// ── Tab: Projects ──────────────────────────────────────────────────────────────
function ProjectsTab() {
  const { content, updateSection, resetSection } = useContent()
  const [form, setForm] = useState(content.projects)
  const [saved, setSaved] = useState(false)
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const setItem = (i, k) => v => setForm(p => { const items = [...p.items]; items[i] = { ...items[i], [k]: v }; return { ...p, items } })
  const setStat = (i, j, k) => v => setForm(p => {
    const items = [...p.items]
    const stats = [...items[i].stats]
    stats[j] = { ...stats[j], [k]: v }
    items[i] = { ...items[i], stats }
    return { ...p, items }
  })
  const save = () => { updateSection('projects', form); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div>
      <p style={s.sectionTitle}>Projects Section</p>
      <div style={s.card}>
        <Field label="Kicker"  value={form.kicker}  onChange={set('kicker')} />
        <Field label="Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Subtext" value={form.subtext} onChange={set('subtext')} />
      </div>
      {form.items.map((item, i) => (
        <div key={i} style={s.card}>
          <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>PROJECT {i + 1}</p>
          <ImageUpload label="Project Photo" current={item.image} onChange={setItem(i, 'image')} />
          <div style={s.row}>
            <Field label="Category" value={item.category} onChange={setItem(i, 'category')} />
            <Field label="Location" value={item.location} onChange={setItem(i, 'location')} />
          </div>
          <Field label="Project Name"  value={item.name} onChange={setItem(i, 'name')} />
          <Field label="Description"   value={item.desc} onChange={setItem(i, 'desc')} textarea rows={3} />
          <p style={{ ...s.label, marginTop: '0.5rem', marginBottom: '0.75rem' }}>Stats</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {item.stats.map((stat, j) => (
              <div key={j} style={{ background: '#f5f8fc', borderRadius: 8, padding: '0.75rem' }}>
                <Field label="Number" value={stat.number} onChange={setStat(i, j, 'number')} />
                <Field label="Label"  value={stat.label}  onChange={setStat(i, j, 'label')} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <SaveBar onSave={save} onReset={() => { resetSection('projects'); setForm(DEFAULT_CONTENT.projects) }} saved={saved} />
    </div>
  )
}

// ── Tab: Milestones ────────────────────────────────────────────────────────────
function MilestonesTab() {
  const { content, updateSection, resetSection } = useContent()
  const [form, setForm] = useState(content.milestones)
  const [saved, setSaved] = useState(false)
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const save = () => { updateSection('milestones', form); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div>
      <p style={s.sectionTitle}>Milestones Section</p>
      <div style={s.card}>
        <Field label="Kicker (e.g. Serving India since 2014)" value={form.kicker}  onChange={set('kicker')} />
        <Field label="Main Stat Heading (e.g. 30,000+ Customers)"        value={form.heading} onChange={set('heading')} />
        <Field label="Subtext"                                 value={form.subtext} onChange={set('subtext')} />
        <SaveBar onSave={save} onReset={() => { resetSection('milestones'); setForm(DEFAULT_CONTENT.milestones) }} saved={saved} />
      </div>
    </div>
  )
}

// ── Tab: Contact ───────────────────────────────────────────────────────────────
function ContactTab() {
  const { content, updateSection, resetSection } = useContent()
  const [form, setForm] = useState(content.contact)
  const [saved, setSaved] = useState(false)
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const save = () => { updateSection('contact', form); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div>
      <p style={s.sectionTitle}>Contact Section</p>
      <div style={s.card}>
        <Field label="Kicker"  value={form.kicker}  onChange={set('kicker')} />
        <Field label="Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Subtext" value={form.subtext} onChange={set('subtext')} />
      </div>
      <div style={s.card}>
        <p style={{ ...s.label, fontSize: '0.75rem', color: '#1a6eb5', marginBottom: '1rem' }}>CONTACT INFO</p>
        <Field label="Phone Number (shown in strip & navbar CTA)" value={form.phone}   onChange={set('phone')} />
        <Field label="Address (use \\n for line breaks)"            value={form.address} onChange={set('address')} textarea rows={3} />
        <Field label="Email (use \\n for multiple)"                  value={form.email}   onChange={set('email')} textarea rows={2} />
        <Field label="Working Hours"                                value={form.hours}   onChange={set('hours')} textarea rows={2} />
        <SaveBar onSave={save} onReset={() => { resetSection('contact'); setForm(DEFAULT_CONTENT.contact) }} saved={saved} />
      </div>
    </div>
  )
}

// ── Login Gate ─────────────────────────────────────────────────────────────────
function LoginGate({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = e => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin(); setErr(false) }
    else { setErr(true); setPw('') }
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', width: 340, boxShadow: '0 4px 24px rgba(13,42,94,0.1)' }}>
        <img src="/logo.png" alt="Veer Sai" style={{ height: 44, marginBottom: '1.5rem' }} />
        <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 600, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d2137', marginBottom: '1.5rem' }}>
          Admin Panel
        </p>
        <form onSubmit={submit}>
          <label style={s.label}>Password</label>
          <input
            style={{ ...s.input, marginBottom: '1rem' }}
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            placeholder="Enter admin password"
            autoFocus
          />
          {err && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.75rem', fontFamily: "'Barlow',sans-serif" }}>Incorrect password</p>}
          <button type="submit" style={{ ...s.btn, width: '100%', padding: '0.75rem' }}>Login</button>
        </form>
      </div>
    </div>
  )
}

// ── Main Admin Panel ───────────────────────────────────────────────────────────
const TABS = ['Hero', 'About', 'Services', 'Projects', 'Milestones', 'Contact']

export default function AdminPanel({ onExit }) {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab]       = useState('Hero')

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />

  const TAB_COMPONENTS = { Hero: HeroTab, About: AboutTab, Services: ServicesTab, Projects: ProjectsTab, Milestones: MilestonesTab, Contact: ContactTab }
  const ActiveTab = TAB_COMPONENTS[tab]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Barlow',sans-serif" }}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        {/* Logo + title */}
        <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="Veer Sai" style={{ height: 38 }} />
          <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0d2a5e', marginTop: '0.4rem' }}>
            Admin Panel
          </p>
        </div>

        {/* View Site button — prominent at the top */}
        <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem' }}>
          <button
            onClick={onExit}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              fontFamily: "'Barlow',sans-serif", fontWeight: 600, fontSize: '0.75rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: '#1a6eb5', color: '#fff',
              border: 'none', borderRadius: 8, padding: '0.6rem 1rem', cursor: 'pointer',
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Site
          </button>
        </div>

        <div style={{ borderTop: '1px solid #b8cfe6', marginBottom: '1rem' }} />

        {/* Nav tabs */}
        <nav style={{ flex: 1 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              width: '100%', textAlign: 'left', padding: '0.75rem 1.5rem',
              fontFamily: "'Barlow',sans-serif", fontWeight: tab === t ? 600 : 400,
              fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              color: tab === t ? '#0d2a5e' : '#3a5f82',
              background: tab === t ? 'rgba(255,255,255,0.55)' : 'transparent',
              border: 'none', borderLeft: tab === t ? '3px solid #1a6eb5' : '3px solid transparent',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {t}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div style={s.main}>
        <ActiveTab />
      </div>
    </div>
  )
}
