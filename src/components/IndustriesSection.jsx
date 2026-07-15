import { useEffect, useRef } from 'react'

const INDUSTRIES = [
  {
    title: 'Apartments & Gated Communities',
    desc: 'STP, WTP, rainwater harvesting, water recycling and maintenance solutions for residential developments.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Manufacturing Industries',
    desc: 'Customised ETP, WTP, process-water solutions, water recycling, plant upgrades and O&M services.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V10l6-4v4l6-4v4l6-4v14H2z"/><path d="M6 20v-4h3v4M11 20v-4h3v4"/>
      </svg>
    ),
  },
  {
    title: 'Commercial Buildings',
    desc: 'Reliable water systems for offices, shopping centres, business parks and mixed-use buildings.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/>
        <polyline points="5 10 5 3 10 3 10 10"/><polyline points="14 3 19 3 19 10"/>
        <rect x="9" y="14" width="6" height="7"/>
      </svg>
    ),
  },
  {
    title: 'Hotels & Resorts',
    desc: 'Water treatment, wastewater recycling, water softening and plant maintenance for hospitality properties.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <rect x="9" y="14" width="6" height="7"/>
        <line x1="12" y1="3" x2="12" y2="9"/>
      </svg>
    ),
  },
  {
    title: 'Hospitals',
    desc: 'Water management systems designed for high-usage and quality-sensitive healthcare environments.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Educational Institutions',
    desc: 'WTP, STP, rainwater harvesting, water recycling and AMC support for schools, colleges and universities.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    title: 'IT Parks',
    desc: 'Large-capacity STP, WTP, water reuse, rainwater harvesting and 24×7 plant operation for tech campuses.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Government Projects',
    desc: 'Turnkey water management solutions for public-sector and government requirements.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V11h6v10"/>
      </svg>
    ),
  },
  {
    title: 'Manufacturing Plants',
    desc: 'ETP, WTP and water recycling systems based on process water and effluent conditions.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
      </svg>
    ),
  },
  {
    title: 'Builders & Developers',
    desc: 'Design support, technical consultation, equipment supply, installation, commissioning and maintenance for new developments.',
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"/>
      </svg>
    ),
  },
]

function useSlide() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function IndustryCard({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="blur-in"
      style={{
        display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(26,58,92,0.1)',
        borderRadius: 14,
        padding: '1.5rem',
        animationDelay: `${index * 0.04}s`,
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(26,58,92,0.2)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(26,58,92,0.1)' }}
    >
      <div style={{ width: 44, height: 44, flexShrink: 0, background: 'rgba(26,58,92,0.07)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {item.icon}
      </div>
      <div>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#0d2137', marginBottom: '0.35rem' }}>
          {item.title}
        </p>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(26,58,92,0.65)' }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

export default function IndustriesSection() {
  const headerRef = useSlide()

  return (
    <section id="industries" style={{ width: '100%', padding: '6rem 5%' }}>
      <div ref={headerRef} className="slide-left" style={{ marginBottom: '4rem' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0d2137', marginBottom: '0.75rem' }}>
          // Industries We Serve
        </p>
        <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#07141f', lineHeight: 1.1 }}>
          Water Solutions for Every Sector
        </h2>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#0d2137', letterSpacing: '0.08em', marginTop: '0.75rem' }}>
          Customised water management solutions across a wide range of sectors
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {INDUSTRIES.map((item, i) => (
          <IndustryCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
