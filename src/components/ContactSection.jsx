import { useEffect, useRef, useState } from 'react'
import { useContent } from '../context/ContentContext'

const WEB3FORMS_KEY = 'bca74971-65ae-4264-a15f-365e66509d6c'

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

const EMPTY = { name: '', company: '', phone: '', email: '', city: '', requirement: '', projectType: '', capacity: '', message: '' }

export default function ContactSection() {
  const { content } = useContent()
  const c = content.contact
  const headerRef = useSlide()
  const leftRef   = useSlide()
  const rightRef  = useSlide()

  const [form,    setForm]    = useState(EMPTY)
  const [status,  setStatus]  = useState('idle') // idle | sending | success | error

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    const line = (label, value) => value ? `${label.padEnd(16)}: ${value}` : ''
    const divider = '─'.repeat(48)

    const plainMessage = [
      divider,
      'VEER SAI WATER SOLUTIONS — NEW ENQUIRY',
      divider,
      '',
      '  CONTACT DETAILS',
      line('  Name', form.name),
      line('  Company', form.company),
      line('  Phone', form.phone),
      line('  Email', form.email),
      line('  City', form.city),
      '',
      '  PROJECT DETAILS',
      line('  Requirement', form.requirement),
      line('  Project Type', form.projectType),
      line('  Capacity', form.capacity),
      form.message ? `\n  MESSAGE\n  ${form.message}` : '',
      '',
      divider,
      'Veer Sai Water Solutions',
      '+91 8122765100  |  support@veersaiwatertech.com',
      divider,
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Enquiry — ${form.name}${form.company ? ' / ' + form.company : ''}${form.requirement ? ' | ' + form.requirement : ''}`,
          from_name: form.name || 'Veer Sai Website',
          replyto: form.email || '',
          message: plainMessage,
        }),
      })
      const data = await res.json()
      if (data.success) { setStatus('success'); setForm(EMPTY) }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const INFO = [
    { icon: INFO_ICONS.location, label: 'Service Area', value: c.address },
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
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(26,58,92,0.12)',
              borderRadius: 20,
              padding: '2.5rem',
            }}
          >
            {/* Name + Company */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Name *</label>
                <input required style={inputStyle} type="text" placeholder="Your name" value={form.name} onChange={set('name')} />
              </div>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Company Name</label>
                <input style={inputStyle} type="text" placeholder="Company / Organisation" value={form.company} onChange={set('company')} />
              </div>
            </div>

            {/* Phone + Email */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Phone Number *</label>
                <input required style={inputStyle} type="tel" placeholder="+91 8122765100" value={form.phone} onChange={set('phone')} />
              </div>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Email Address</label>
                <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
              </div>
            </div>

            {/* City + Requirement */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>City</label>
                <input style={inputStyle} type="text" placeholder="Chennai" value={form.city} onChange={set('city')} />
              </div>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Type of Requirement</label>
                <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={form.requirement} onChange={set('requirement')}>
                  <option value="">Select solution type</option>
                  <option>STP — Sewage Treatment Plant</option>
                  <option>WTP — Water Treatment Plant</option>
                  <option>ETP — Effluent Treatment Plant</option>
                  <option>Rainwater Harvesting</option>
                  <option>Operation & Maintenance</option>
                  <option>Solar-Powered Water System</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Project Type + Capacity */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Project Type</label>
                <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={form.projectType} onChange={set('projectType')}>
                  <option value="">New or existing?</option>
                  <option>New Project</option>
                  <option>Existing Plant Upgrade</option>
                  <option>Operation & Maintenance</option>
                </select>
              </div>
              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Required Capacity</label>
                <input style={inputStyle} type="text" placeholder="e.g. 100 KLD" value={form.capacity} onChange={set('capacity')} />
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,58,92,0.6)', marginBottom: '0.4rem' }}>Message</label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your project or requirement..." value={form.message} onChange={set('message')} />
            </div>

            {/* Success / Error message */}
            {status === 'success' && (
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.85rem', color: '#16a34a', marginBottom: '1rem', fontWeight: 500 }}>
                ✓ Thank you! We will get back to you shortly.
              </p>
            )}
            {status === 'error' && (
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.85rem', color: '#dc2626', marginBottom: '1rem', fontWeight: 500 }}>
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#fff',
                background: status === 'sending' ? 'rgba(14,74,130,0.6)' : 'linear-gradient(135deg, #1a6eb5, #0e4a82)',
                border: 'none',
                borderRadius: 10,
                padding: '0.9rem 1.5rem',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Submit Your Requirement'}
            </button>
          </form>
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

    </section>
  )
}
