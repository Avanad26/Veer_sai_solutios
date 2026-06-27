import { useEffect, useRef } from 'react'
import { useContent } from '../context/ContentContext'

const SERVICES = [
  {
    icon: 'water',
    title: 'STP — Sewage Treatment Plants',
    desc: 'Advanced STP solutions for efficient treatment & reuse of wastewater.',
    tags: ['High Efficiency', 'Low Maintenance', 'Eco Friendly'],
  },
  {
    icon: 'factory',
    title: 'WTP — Water Treatment Plants',
    desc: 'Reliable WTP systems delivering safe, clean & potable water.',
    tags: ['Safe Drinking Water', 'Robust Technology', 'Consistent Performance'],
  },
  {
    icon: 'flask',
    title: 'ETP — Effluent Treatment Plants',
    desc: 'Effective ETP solutions to treat industrial effluents & meet environmental norms.',
    tags: ['Compliance Ready', 'Cost Effective', 'Sustainable Operations'],
  },
  {
    icon: 'rain',
    title: 'Rainwater Harvesting',
    desc: 'Smart rainwater harvesting solutions to conserve water for a better tomorrow.',
    tags: ['Water Conservation', 'Groundwater Recharge', 'Long Term Sustainability'],
  },
  {
    icon: 'tool',
    title: 'Operation & Maintenance',
    desc: 'Expert O&M services ensuring optimal performance, uptime and long-term reliability.',
    tags: ['24/7 Support', 'Skilled Team', 'Performance Assurance'],
  },
  {
    icon: 'sun',
    title: 'Solar-Powered Water Systems',
    desc: 'Sustainable & cost-effective solar-powered solutions for reliable water supply.',
    tags: ['Energy Efficient', 'Cost Savings', 'Environment Friendly'],
  },
]

function Icon({ type }) {
  const s = { width: 22, height: 22, stroke: '#1a3a5c', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'water':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0C19 10 12 2 12 2z" />
        </svg>
      )
    case 'factory':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <path d="M2 20V10l6-4v4l6-4v4l6-4v14H2z" />
          <path d="M6 20v-4h3v4M11 20v-4h3v4" />
        </svg>
      )
    case 'flask':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <path d="M9 3h6M9 3v7L4 20h16L15 10V3" />
          <path d="M6.5 17.5h4" />
        </svg>
      )
    case 'rain':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 15.25" />
          <line x1="8" y1="19" x2="8" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="16" y1="19" x2="16" y2="21" />
        </svg>
      )
    case 'tool':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" />
        </svg>
      )
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )
    default:
      return null
  }
}

function ServiceCard({ service, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="blur-in"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(26,58,92,0.1)',
        borderRadius: 16,
        padding: '2rem',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(26,58,92,0.25)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.65)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(26,58,92,0.1)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.45)'
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: 44, height: 44,
        background: 'rgba(26,58,92,0.08)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto',
      }}>
        <Icon type={service.icon} />
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#1a3a5c',
        marginTop: '1rem',
        marginBottom: '0.5rem',
        textAlign: 'center',
      }}>
        {service.title}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 300,
        fontSize: '0.875rem',
        lineHeight: 1.65,
        color: 'rgba(26,58,92,0.6)',
        textAlign: 'center',
      }}>
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '0.72rem',
            background: 'rgba(26,58,92,0.06)',
            color: 'rgba(26,58,92,0.7)',
            padding: '0.25rem 0.75rem',
            borderRadius: 9999,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function useSlide(className) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function ServicesSection() {
  const { content } = useContent()
  const { kicker, heading, subtext, cards } = content.services
  const headerRef = useSlide('slide-left')
  const gridRef   = useSlide('slide-right')

  return (
    <section id="services" style={{ width: '100%', minHeight: '100vh', padding: '6rem 5%' }}>
      {/* Header — slides in from left */}
      <div ref={headerRef} className="slide-left" style={{ marginBottom: '4rem' }}>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0d2137',
          marginBottom: '0.75rem',
        }}>
          {kicker}
        </p>
        <h2 style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#07141f',
          lineHeight: 1.1,
        }}>
          {heading}
        </h2>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#0d2137',
          letterSpacing: '0.08em',
          marginTop: '0.75rem',
        }}>
          {subtext}
        </p>
      </div>

      {/* Card grid — slides in from right */}
      <div ref={gridRef} className="slide-right" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {cards.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  )
}
