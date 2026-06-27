import { useEffect, useRef } from 'react'
import { useContent } from '../context/ContentContext'

export default function SectionThree() {
  const innerRef = useRef(null)
  const { content } = useContent()
  const { kicker, heading, subtext } = content.milestones

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative flex items-center justify-center"
      style={{ minHeight: '100vh', padding: '0 2.5rem' }}
    >
      <div ref={innerRef} className="slide-left text-center z-10 relative">
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#0d2137',
          marginBottom: '0.75rem',
        }}>
          {kicker}
        </p>
        <h2
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#07141f',
          }}
        >
          {heading}
        </h2>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#0d2137',
          marginTop: '0.75rem',
        }}>
          {subtext}
        </p>
      </div>
    </section>
  )
}
