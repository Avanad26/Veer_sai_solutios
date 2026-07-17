import { useEffect, useRef, useState } from 'react'

function getMonthlyAddition(year, month) {
  const seed = year * 100 + month
  return Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * 70 + 20)
}

function useCounter(target, triggered, duration = 2000, delay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const timer = setTimeout(() => {
      const start = performance.now()
      function tick(ts) {
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [triggered, target, duration, delay])
  return value
}

export default function CustomerCounter() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const now = new Date()
  const thisMonthAddition = getMonthlyAddition(now.getFullYear(), now.getMonth())

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const mainCount    = useCounter(30000, triggered, 1000, 0)
  const projectCount = useCounter(500,   triggered, 800,  100)

  return (
    <section
      ref={ref}
      style={{ background: 'transparent', padding: '5rem 5%', textAlign: 'center' }}
    >
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 700,
        fontSize: '0.72rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#1a3a5c',
        marginBottom: '1.25rem',
      }}>
        // Total Customers Served
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0.4rem' }}>
        <p style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          letterSpacing: '0.04em',
          color: '#07141f',
          lineHeight: 1,
        }}>
          {mainCount.toLocaleString('en-IN')}
        </p>
        <p style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          color: '#07141f',
          lineHeight: 1,
          paddingBottom: '0.15em',
        }}>
          +
        </p>
      </div>

      <p style={{
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#1a3a5c',
        marginTop: '1rem',
      }}>
        Customers Served Across India
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: '3.5rem',
        flexWrap: 'wrap',
      }}>
        {/* 500+ Projects */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '2rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              color: '#07141f',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}>
              {projectCount}+
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#1a3a5c',
              marginTop: '0.4rem',
            }}>
              Projects Completed
            </p>
          </div>
        </div>

        {/* Decades of Experience */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '2rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              color: '#07141f',
              letterSpacing: '0.06em',
              lineHeight: 1.6,
            }}>
              Decades of Experience
            </p>
          </div>
        </div>

        {/* Cities */}
        <div style={{ textAlign: 'center', padding: '2rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            color: '#07141f',
            letterSpacing: '0.06em',
            lineHeight: 1.6,
          }}>
            Chennai · Bengaluru<br />Hyderabad · Coimbatore<br />& Other Regions in South India
          </p>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 600,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#1a3a5c',
            marginTop: '0.4rem',
          }}>
            Cities Served
          </p>
        </div>
      </div>
    </section>
  )
}
