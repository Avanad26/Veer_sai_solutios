import { useEffect, useRef } from 'react'
import { useContent } from '../context/ContentContext'

const INFO_ICONS = {
  location: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#1a6eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#1a6eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.09 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.27 7.69a16 16 0 006.06 6.06l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  email: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#1a6eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  hours: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#1a6eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

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

const inputStyle = {
  width: '100%',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 300,
  fontSize: '0.875rem',
  color: '#0d2137',
  background: 'rgba(255,255,255,0.6)',
  border: '1px solid rgba(26,58,92,0.15)',
  borderRadius: 10,
  padding: '0.85rem 1rem',
  outline: 'none',
  letterSpacing: '0.02em',
}

export default function ContactSection() {
  const { content } = useContent()
  const c = content.contact
  const headerRef = useSlide()
  const leftRef   = useSlide()
  const rightRef  = useSlide()

  const INFO = [
    { icon: INFO_ICONS.location, label: 'Head Office',     value: c.address },
    { icon: INFO_ICONS.phone,    label: 'Phone',           value: c.phone },
    { icon: INFO_ICONS.email,    label: 'Email',           value: c.email },
    { icon: INFO_ICONS.hours,    label: 'Working Hours',   value: c.hours },
  ]

  return (
    <section id="contact" style={{
      width: '100%',
      padding: '6rem 5%',
      background: '#d6e4f0',
    }}>

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
          {c.kicker}
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
          {c.heading}
        </h2>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#0d2137',
          letterSpacing: '0.08em',
          marginTop: '0.75rem',
        }}>
          {c.subtext}
        </p>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* LEFT — Contact form */}
        <div ref={leftRef} className="slide-left" style={{ flex: '1 1 420px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(26,58,92,0.12)',
            borderRadius: 20,
            padding: '2.5rem',
          }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(26,58,92,0.6)',
                  marginBottom: '0.4rem',
                }}>
                  First Name
                </label>
                <input style={inputStyle} type="text" placeholder="Ravi" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(26,58,92,0.6)',
                  marginBottom: '0.4rem',
                }}>
                  Last Name
                </label>
                <input style={inputStyle} type="text" placeholder="Kumar" />
              </div>
            </div>

            {[
              { label: 'Email Address', type: 'email',  placeholder: 'ravi.kumar@example.com' },
              { label: 'Phone Number', type: 'tel',    placeholder: '+91 98765 43210' },
              { label: 'Company / Organisation', type: 'text', placeholder: 'Kumar Industries Pvt. Ltd.' },
            ].map(field => (
              <div key={field.label} style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(26,58,92,0.6)',
                  marginBottom: '0.4rem',
                }}>
                  {field.label}
                </label>
                <input style={inputStyle} type={field.type} placeholder={field.placeholder} />
              </div>
            ))}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(26,58,92,0.6)',
                marginBottom: '0.4rem',
              }}>
                Message
              </label>
              <textarea
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Tell us about your project or requirements..."
              />
            </div>

            <button style={{
              width: '100%',
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#fff',
              background: 'linear-gradient(135deg, #1a6eb5, #0e4a82)',
              border: 'none',
              borderRadius: 10,
              padding: '0.9rem 1.5rem',
              cursor: 'pointer',
            }}>
              Send Message
            </button>
          </div>
        </div>

        {/* RIGHT — Info cards */}
        <div ref={rightRef} className="slide-right" style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {INFO.map(item => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(26,58,92,0.12)',
              borderRadius: 16,
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 40, height: 40,
                background: 'rgba(26,110,181,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#0d2137',
                  marginBottom: '0.35rem',
                }}>
                  {item.label}
                </p>
                {item.value.split('\n').map((line, i) => (
                  <p key={i} style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.875rem',
                    color: 'rgba(13,33,55,0.75)',
                    lineHeight: 1.6,
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office strip */}
      <div style={{
        marginTop: '5rem',
        marginLeft: 'calc(-5%)',
        marginRight: 'calc(-5%)',
        background: '#0d2a5e',
        padding: '1.25rem 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        flexWrap: 'wrap',
      }}>
        {/* Have offices at label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>

          {/* Chennai */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/>
              <polyline points="5 10 5 3 10 3 10 10"/><polyline points="14 3 19 3 19 10"/>
              <rect x="9" y="14" width="6" height="7"/>
            </svg>
            <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:'0.72rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.85)' }}>
              Chennai
            </span>
          </div>

          {/* Divider */}
          <div style={{ width:1, height:28, background:'rgba(255,255,255,0.15)' }} />

          {/* Bangalore */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/>
              <polyline points="5 10 5 3 10 3 10 10"/><polyline points="14 3 19 3 19 10"/>
              <rect x="9" y="14" width="6" height="7"/>
            </svg>
            <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:'0.72rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.85)' }}>
              Bangalore
            </span>
          </div>

          {/* Have offices at — center label */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'0 0.5rem' }}>
            <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:300, fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:'0.15rem' }}>
              Have Offices At
            </span>
            <div style={{ width:40, height:1, background:'rgba(255,255,255,0.2)' }} />
          </div>

          {/* Hyderabad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/>
              <polyline points="5 10 5 3 10 3 10 10"/><polyline points="14 3 19 3 19 10"/>
              <rect x="9" y="14" width="6" height="7"/>
            </svg>
            <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:'0.72rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.85)' }}>
              Hyderabad
            </span>
          </div>

          {/* Divider */}
          <div style={{ width:1, height:28, background:'rgba(255,255,255,0.15)' }} />

          {/* Contact */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.09 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.27 7.69a16 16 0 006.06 6.06l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontWeight:300, fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}>
                Contact
              </div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', color:'#fff' }}>
                {c.phone}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
