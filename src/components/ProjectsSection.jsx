import { useEffect, useRef } from 'react'
import { useContent } from '../context/ContentContext'

const PROJECTS = [
  {
    image: '/STP.png',
    category: 'STP Project',
    name: 'Municipal Sewage Treatment',
    location: 'Chennai, Tamil Nadu',
    desc: 'Complete turnkey STP installation for a residential township. Designed for 500 KLD capacity with advanced biological treatment process ensuring treated water meets CPCB norms.',
    stats: [
      { number: '500 KLD', label: 'Capacity' },
      { number: '6 Months', label: 'Completion' },
      { number: '100%', label: 'Compliance' },
    ],
  },
  {
    image: '/Wtp.png',
    category: 'WTP Project',
    name: 'Industrial Water Treatment',
    location: 'Bangalore, Karnataka',
    desc: 'High-capacity water treatment plant for a large manufacturing facility. Delivers consistent potable water quality with automated monitoring and real-time reporting.',
    stats: [
      { number: '1000 KLD', label: 'Capacity' },
      { number: '24/7', label: 'Operation' },
      { number: '99.9%', label: 'Uptime' },
    ],
  },
  {
    image: '/Etp.png',
    category: 'ETP Project',
    name: 'Textile Effluent Treatment',
    location: 'Tiruppur, Tamil Nadu',
    desc: 'Zero liquid discharge ETP for a textile dyeing unit. Advanced treatment stages including primary, secondary and tertiary treatment with colour removal and water recycling.',
    stats: [
      { number: 'ZLD', label: 'Zero Discharge' },
      { number: '800 KLD', label: 'Capacity' },
      { number: '95%', label: 'Recycled' },
    ],
  },
  {
    image: '/solar_Wpt.png',
    category: 'Solar + WTP',
    name: 'Solar-Powered Village Water Supply',
    location: 'Hyderabad, Telangana',
    desc: 'Sustainable solar-powered water treatment system supplying clean drinking water to 5000+ rural households. Fully off-grid with remote monitoring capabilities.',
    stats: [
      { number: '5000+', label: 'Households' },
      { number: '100%', label: 'Solar Powered' },
      { number: '200 KLD', label: 'Capacity' },
    ],
  },
]

function useSlideIn(direction) {
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

function ProjectImage({ image, slideClass }) {
  const ref = useSlideIn()
  return (
    <div
      ref={ref}
      className={slideClass}
      style={{
        flex: '1 1 340px',
        minWidth: 0,
        height: 420,
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(13,33,55,0.12)',
        background: 'linear-gradient(135deg, rgba(13,33,55,0.08), rgba(13,33,55,0.18))',
      }}
    >
      <img
        src={image}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
      />
    </div>
  )
}

function ProjectContent({ project, slideClass }) {
  const ref = useSlideIn()
  return (
    <div
      ref={ref}
      className={slideClass}
      style={{ flex: '1 1 300px', minWidth: 0, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* Category pill */}
      <span style={{
        display: 'inline-block',
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 500,
        fontSize: '0.72rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: 'rgba(13,33,55,0.07)',
        color: '#0d2137',
        padding: '0.25rem 0.75rem',
        borderRadius: 9999,
        marginBottom: '1rem',
      }}>
        {project.category}
      </span>

      {/* Project name */}
      <h3 style={{
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#0d2137',
        lineHeight: 1.15,
        marginBottom: '0.75rem',
      }}>
        {project.name}
      </h3>

      {/* Location */}
      <p style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 300,
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(13,33,55,0.8)',
        marginBottom: '1rem',
      }}>
        <svg width={11} height={11} viewBox="0 0 24 24" fill="none"
          stroke="rgba(13,33,55,0.8)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {project.location}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 300,
        fontSize: '0.875rem',
        lineHeight: 1.75,
        color: 'rgba(13,33,55,0.88)',
        marginBottom: '1.5rem',
      }}>
        {project.desc}
      </p>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {project.stats.map(stat => (
          <div key={stat.label}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: '1.5rem',
              color: '#0d2137',
              lineHeight: 1,
            }}>
              {stat.number}
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(13,33,55,0.75)',
              marginTop: '0.35rem',
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GatedProjectRow({ project }) {
  const leftRef  = useSlideIn()
  const rightRef = useSlideIn()

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '2rem' }}>

      {/* LEFT — two images stacked */}
      <div ref={leftRef} className="slide-left" style={{
        flex: '1 1 340px', minWidth: 0,
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        borderRadius: 20, overflow: 'hidden',
        border: '1px solid rgba(13,33,55,0.12)',
      }}>
        <div style={{ flex: 1, overflow: 'hidden', minHeight: 200 }}>
          <img src={project.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden', minHeight: 200 }}>
          <img src={project.imageRight} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        </div>
      </div>

      {/* RIGHT — content */}
      <ProjectContent project={project} slideClass="slide-right" />
    </div>
  )
}

function ProjectRow({ project, index }) {
  const reversed = index % 2 !== 0

  return (
    <div style={{
      display: 'flex',
      flexDirection: reversed ? 'row-reverse' : 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      gap: '2rem',
    }}>
      <ProjectImage image={project.image} slideClass={reversed ? 'slide-right' : 'slide-left'} />
      <ProjectContent project={project} slideClass={reversed ? 'slide-left' : 'slide-right'} />
    </div>
  )
}

export default function ProjectsSection() {
  const { content } = useContent()
  const { kicker, heading, subtext, items } = content.projects
  const headerRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" style={{ width: '100%', padding: '6rem 5%' }}>
      {/* Header — same style as ServicesSection */}
      <div ref={headerRef} className="slide-left" style={{ marginBottom: '5rem' }}>
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

      {/* Projects list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {items.map((project, i) =>
          project.imageRight
            ? <GatedProjectRow key={project.name} project={project} />
            : <ProjectRow key={project.name} project={project} index={i} />
        )}
      </div>
    </section>
  )
}
