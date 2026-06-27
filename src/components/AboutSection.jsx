import { useEffect, useRef } from 'react'
import { useContent } from '../context/ContentContext'

const STATS = [
  { number: '75+',     label: 'Team Members' },
  { number: '30,000+', label: 'Customers Served' },
  { number: '10+',     label: 'Years Experience' },
  { number: '3',       label: 'Cities' },
]

const VALUES = [
  'Ensures Clean, Safe & Reliable Water for People',
  'Reduces Water Wastage & Protects Natural Resources',
  'Improves Operational Efficiency & Lowers Costs',
  'Ensures Compliance & Environmental Responsibility',
  'Builds a Sustainable Future for Generations',
]

function useSlide(cls) {
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

export default function AboutSection() {
  const { content } = useContent()
  const a = content.about
  const headerRef = useSlide()
  const leftRef   = useSlide()
  const rightRef  = useSlide()

  return (
    <section id="about" style={{ width: '100%', padding: '6rem 5%' }}>

      {/* Header */}
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
          {a.kicker}
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
          {a.heading}
        </h2>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#0d2137',
          letterSpacing: '0.08em',
          marginTop: '0.75rem',
        }}>
          {a.subtext}
        </p>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* LEFT — Story + Stats */}
        <div ref={leftRef} className="slide-left" style={{ flex: '1 1 420px' }}>

          {/* Story block */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'rgba(26,58,92,0.85)',
              marginBottom: '1.5rem',
            }}>
              {a.storyLead}
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: '0.875rem',
              lineHeight: 2,
              color: 'rgba(26,58,92,0.7)',
              marginBottom: '1rem',
            }}>
              {a.storyBody1}
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: '0.875rem',
              lineHeight: 2,
              color: 'rgba(26,58,92,0.7)',
            }}>
              {a.storyBody2}
            </p>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}>
            {a.stats.map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(26,58,92,0.1)',
                borderRadius: 14,
                padding: '1.5rem',
              }}>
                <p style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 100,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '0.05em',
                  color: '#1a3a5c',
                  lineHeight: 1,
                }}>
                  {stat.number}
                </p>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(26,58,92,0.55)',
                  marginTop: '0.4rem',
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Person card + Values */}
        <div ref={rightRef} className="slide-right" style={{ flex: '1 1 320px', maxWidth: 420 }}>

          {/* Person card */}
          <div style={{
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(26,58,92,0.12)',
            borderRadius: 20,
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            {/* Avatar */}
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              margin: '0 auto',
              overflow: 'hidden',
              border: '3px solid rgba(26,58,92,0.15)',
              flexShrink: 0,
            }}>
              <img
                src={a.founderPhoto}
                alt={a.founderName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>

            {/* Name */}
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: '1.125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#1a3a5c',
              marginTop: '1rem',
            }}>
              {a.founderName}
            </p>

            {/* Title */}
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(26,58,92,0.55)',
              marginTop: '0.25rem',
            }}>
              {a.founderTitle}
            </p>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(26,58,92,0.08)', margin: '1rem 0' }} />

            {/* Role badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              {a.founderBadges.map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: '#1a6eb5',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.75rem',
                    color: 'rgba(26,58,92,0.75)',
                  }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div style={{ borderTop: '1px solid rgba(26,58,92,0.08)', marginTop: '1rem', paddingTop: '1rem' }}>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: '0.875rem',
                color: 'rgba(26,58,92,0.6)',
                textAlign: 'center',
              }}>
                {a.founderTagline}
              </p>
            </div>
          </div>

          {/* Values list */}
          <div>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 500,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(26,58,92,0.5)',
              marginBottom: '1rem',
            }}>
              Why Choose Us
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {VALUES.map(value => (
                <div key={value} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: 20, height: 20,
                    background: 'rgba(26,58,92,0.08)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '0.05rem',
                  }}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
                      stroke="#1a6eb5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.875rem',
                    color: 'rgba(26,58,92,0.75)',
                    lineHeight: 1.5,
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
