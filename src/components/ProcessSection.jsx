import { useEffect, useRef } from 'react'

const STEPS = [
  { num: '01', title: 'Free Consultation',          desc: 'We understand your project, water-related challenges and expected requirement.' },
  { num: '02', title: 'Site Visit',                  desc: 'Our team visits the location to assess the space, water source, capacity and existing infrastructure.' },
  { num: '03', title: 'Water Analysis',              desc: 'The water or wastewater is analysed to identify the suitable treatment process and system design.' },
  { num: '04', title: 'Customised Design',           desc: 'Our engineers develop a system based on project capacity, site conditions and expected output.' },
  { num: '05', title: 'Proposal & Cost Optimisation', desc: 'We provide a clear proposal and recommend practical ways to optimise project and operating costs.' },
  { num: '06', title: 'Installation & Commissioning', desc: 'Our team installs, tests and commissions the complete system at the project location.' },
  { num: '07', title: 'AMC & Long-Term Support',     desc: 'We continue to support the plant through operation, maintenance, inspection and technical assistance.' },
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

function StepCard({ step, index }) {
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
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(26,58,92,0.1)',
        borderRadius: 16,
        padding: '1.75rem',
        animationDelay: `${index * 0.04}s`,
      }}
    >
      <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: '2rem', letterSpacing: '0.08em', color: 'rgba(13,42,94,0.18)', lineHeight: 1, marginBottom: '0.75rem' }}>
        {step.num}
      </p>
      <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0d2137', marginBottom: '0.6rem' }}>
        {step.title}
      </p>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(26,58,92,0.7)' }}>
        {step.desc}
      </p>
    </div>
  )
}

export default function ProcessSection() {
  const headerRef = useSlide()

  return (
    <section style={{ width: '100%', padding: '6rem 5%', background: 'rgba(13,42,94,0.04)' }}>
      <div ref={headerRef} className="slide-left" style={{ marginBottom: '4rem' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0d2137', marginBottom: '0.75rem' }}>
          // How We Work
        </p>
        <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#07141f', lineHeight: 1.1 }}>
          From Consultation to Long-Term Support
        </h2>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#0d2137', letterSpacing: '0.08em', marginTop: '0.75rem' }}>
          A structured approach from first consultation to continued support
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {STEPS.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
            padding: '0.85rem 2.5rem',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Start Your Project
        </a>
      </div>
    </section>
  )
}
