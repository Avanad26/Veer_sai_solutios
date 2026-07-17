import { useEffect, useRef } from 'react'

const REASONS = [
  { title: 'Turnkey Project Execution',  desc: 'We manage the complete project from initial assessment and system design to installation, commissioning and handover.' },
  { title: 'Customised Engineering',      desc: 'Every solution is designed based on the actual water quality, project capacity, available space and operational requirement.' },
  { title: 'Decades of Experience',        desc: 'Our team of more than 75 professionals brings technical knowledge, project experience and practical understanding.' },
  { title: 'Cost-Effective Systems',      desc: 'We focus on reducing water wastage, energy consumption, operating costs and unnecessary maintenance.' },
  { title: '24×7 O&M Support',           desc: 'Our team is available around the clock to support plant operation, maintenance and emergency requirements.' },
  { title: 'Sustainable Solutions',       desc: 'We help customers conserve water, recycle wastewater, recharge groundwater and reduce environmental impact.' },
  { title: 'Proven Track Record',         desc: 'We have served more than 30,000 customers and successfully completed over 600 projects.' },
  { title: 'Complete South India',         desc: 'We serve customers across Chennai, Bengaluru, Hyderabad, Coimbatore and other regions with dedicated support teams.' },
]

const PROBLEMS = [
  'Poor water quality',
  'Water shortage or inconsistency',
  'High operating costs',
  'Excess electricity consumption',
  'STP not meeting PCB requirements',
  'Frequent plant breakdowns',
  'Scaling and fouling',
  'Poor treated-water output',
  'Unpleasant odour from treatment plants',
  'Lack of trained plant operators',
  'Need for an annual maintenance contract',
  'Planning a new water treatment project',
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

function ReasonCard({ reason, index }) {
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
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(26,58,92,0.1)',
        borderRadius: 16,
        padding: '1.75rem',
        animationDelay: `${index * 0.04}s`,
      }}
    >
      <div style={{
        width: 32, height: 32,
        background: 'rgba(26,58,92,0.07)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem',
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, fontSize: '0.7rem', color: '#1a3a5c', letterSpacing: '0.05em' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p style={{
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.9rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#0d2137',
        marginBottom: '0.6rem',
        textAlign: 'center',
      }}>
        {reason.title}
      </p>
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 300,
        fontSize: '0.875rem',
        lineHeight: 1.7,
        color: 'rgba(26,58,92,0.72)',
        textAlign: 'center',
      }}>
        {reason.desc}
      </p>
    </div>
  )
}

export default function SectionThree() {
  const headerRef  = useSlide()
  const rightRef   = useSlide()
  const probRef    = useSlide()
  const probRightRef = useSlide()

  return (
    <>
      {/* ── Why Choose Us ── */}
      <section style={{ width: '100%', padding: '6rem 5%' }}>
        <div ref={headerRef} className="slide-left" style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0d2137', marginBottom: '0.75rem' }}>
            // Why Choose Us
          </p>
          <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#07141f', lineHeight: 1.1 }}>
            One Partner for Your Complete Water Requirement
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#0d2137', letterSpacing: '0.08em', marginTop: '0.75rem' }}>
            Proven experience. Reliable support. Sustainable solutions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '4rem', alignItems: 'stretch', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 520px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {REASONS.map((r, i) => <ReasonCard key={r.title} reason={r} index={i} />)}
            </div>
          </div>

          <div ref={rightRef} className="slide-right" style={{ flex: '1 1 280px', maxWidth: 380, display: 'flex' }}>
            <div style={{ background: '#0d2a5e', borderRadius: 20, padding: '2.5rem', width: '100%' }}>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
                Why It Matters
              </p>
              <h3 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Why the Right Water Solution Matters
              </h3>
              {[
                'Provides clean, safe and reliable water',
                'Reduces water wastage and supports reuse',
                'Protects natural resources',
                'Improves operational efficiency',
                'Reduces long-term costs',
                'Supports environmental compliance',
                'Builds a sustainable future',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{ width: 18, height: 18, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55 }}>
                    {item}
                  </span>
                </div>
              ))}
              <div style={{
                marginTop: 'auto',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.6)',
                  fontStyle: 'italic',
                }}>
                  "The right water solution saves cost, protects resources and keeps your project running."
                </p>

                <div style={{ position: 'relative', marginTop: '2rem', height: '140px' }}>
                  {/* Left drop — medium, sits lower */}
                  <svg width={70} height={70} viewBox="0 0 24 24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"
                    style={{ position: 'absolute', bottom: 0, left: '18%' }}>
                    <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0016 0c0-2.5-2-7-8-14z"/>
                  </svg>
                  {/* Center drop — largest, sits highest */}
                  <svg width={95} height={95} viewBox="0 0 24 24" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round"
                    style={{ position: 'absolute', top: 0, left: '35%' }}>
                    <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0016 0c0-2.5-2-7-8-14z"/>
                  </svg>
                  {/* Right drop — smallest, sits middle */}
                  <svg width={50} height={50} viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"
                    style={{ position: 'absolute', bottom: '10px', right: '14%' }}>
                    <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0016 0c0-2.5-2-7-8-14z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problems We Solve ── */}
      <section style={{ width: '100%', padding: '6rem 5%', background: 'rgba(13,42,94,0.04)' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          <div ref={probRef} className="slide-left" style={{ flex: '1 1 320px', maxWidth: 420 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0d2137', marginBottom: '0.75rem' }}>
              // Common Challenges
            </p>
            <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#07141f', lineHeight: 1.1, marginBottom: '1rem' }}>
              Are You Facing Any of These Problems?
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(26,58,92,0.75)', marginBottom: '2rem' }}>
              Speak with our engineers and receive a recommendation based on your site, project type and actual requirement.
            </p>
            <a
              href="#contact"
              style={{
                display: 'inline-block',
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                background: '#0d2a5e',
                padding: '0.85rem 2rem',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Speak With a Water Expert
            </a>
          </div>

          <div ref={probRightRef} className="slide-right" style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {PROBLEMS.map(p => (
                <div key={p} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(26,58,92,0.09)',
                  borderRadius: 10,
                  padding: '0.85rem 1rem',
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1a6eb5', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: '0.82rem', color: '#0d2137', lineHeight: 1.4 }}>
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
