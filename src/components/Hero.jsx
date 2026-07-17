import { useEffect, useRef } from 'react'
import { useContent } from '../context/ContentContext'

// ─── Dual-video seamless crossfade ───────────────────────────────────────────
// Two instances of the same video play simultaneously, offset by half duration.
// Their opacities are computed per-frame via smoothstep so one is always visible.
function useDualVideoBg(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'
    const FADE_LEAD = 1.5

    const style = `
      position:absolute;left:50%;top:0;
      transform:translateX(-50%);
      width:120%;height:120%;
      object-fit:cover;object-position:top;
      opacity:0;transition:none;will-change:opacity;
    `

    function makeVideo() {
      const v = document.createElement('video')
      v.muted = true
      v.setAttribute('playsinline', '')
      v.setAttribute('webkit-playsinline', '')
      v.preload = 'auto'
      v.loop = true
      v.crossOrigin = 'anonymous'
      v.style.cssText = style
      const s = document.createElement('source')
      s.src = SRC
      s.type = 'video/mp4'
      v.appendChild(s)
      container.appendChild(v)
      return v
    }

    const vA = makeVideo()
    const vB = makeVideo()
    let started = false
    let rafId = null

    function smoothstep(x) {
      x = Math.max(0, Math.min(1, x))
      return x * x * (3 - 2 * x)
    }

    function getOpacity(video) {
      if (!video.duration || !isFinite(video.duration)) return 0
      const t = video.currentTime
      const dur = video.duration
      return Math.min(smoothstep(t / FADE_LEAD), smoothstep((dur - t) / FADE_LEAD))
    }

    function tick() {
      if (started) {
        const oA = getOpacity(vA)
        const oB = getOpacity(vB)
        const total = oA + oB || 1
        vA.style.opacity = oA / total
        vB.style.opacity = oB / total
      }
      rafId = requestAnimationFrame(tick)
    }

    function startBoth() {
      vA.currentTime = 0
      vA.play().catch(() => {})
      const setOffset = () => {
        if (vB.duration && isFinite(vB.duration)) {
          vB.currentTime = vB.duration / 2
          vB.play().catch(() => {})
          started = true
        } else {
          setTimeout(setOffset, 100)
        }
      }
      if (vB.readyState >= 1) setOffset()
      else { vB.addEventListener('loadedmetadata', setOffset, { once: true }); vB.load() }
    }

    if (vA.readyState >= 1) startBoth()
    else { vA.addEventListener('loadedmetadata', startBoth, { once: true }); vA.load() }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      vA.pause(); vB.pause()
      vA.remove(); vB.remove()
    }
  }, [containerRef])
}

// ─── Hero scroll fade ─────────────────────────────────────────────────────────
function useHeroScrollFade(videoBgRef) {
  useEffect(() => {
    function onScroll() {
      if (!videoBgRef.current) return
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.9))
      videoBgRef.current.style.opacity = fade
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [videoBgRef])
}

export default function Hero() {
  const containerRef = useRef(null)
  const videoBgRef   = useRef(null)
  const { content }  = useContent()
  const { heading, subtitle, description, tagline } = content.hero

  useDualVideoBg(containerRef)
  useHeroScrollFade(videoBgRef)

  return (
    <section id="home" className="relative w-full" style={{ height: '100vh' }}>

      {/* Video background */}
      <div
        ref={el => { videoBgRef.current = el }}
        className="absolute inset-0 overflow-hidden z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #0f2d52, #07141f)' }}
      >
        <div ref={containerRef} className="absolute inset-0" />
        {/* Dark overlay — keeps video consistently dark */}
        <div className="absolute inset-0" style={{ background: 'rgba(5,15,30,0.55)' }} />
        {/* Bottom gradient fade into next section */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: '30%', background: 'linear-gradient(to top, #edf1f6, transparent)' }}
        />
      </div>

      {/* Hero content — vertically centered */}
      <div
        className="absolute z-10"
        style={{ top: '58%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '92%', maxWidth: 1100 }}
      >
        <h1
          className="hero-heading"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.4rem, 3.8vw, 3.8rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#f2eeeb',
            WebkitTextStroke: '0.6px #f2eeeb',
            lineHeight: 1.1,
            transform: 'scaleY(1.4)',
            transformOrigin: 'center center',
            textShadow: '0 0 40px rgba(200,200,200,0.18)',
          }}
        >
          {heading}
        </h1>

        {subtitle && (
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(242,238,235,0.75)',
            marginTop: '1rem',
          }}>
            {subtitle}
          </p>
        )}

        {tagline && (
          <p className="hero-tagline" style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.78rem, 1.2vw, 1rem)',
            letterSpacing: '0.06em',
            color: 'rgba(242,238,235,0.9)',
            marginTop: '0.6rem',
          }}>
            {tagline}
          </p>
        )}

        {description && (
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)',
            color: 'rgba(242,238,235,0.7)',
            maxWidth: '72ch',
            margin: '1.25rem auto 0',
            lineHeight: 1.85,
            letterSpacing: '0.01em',
          }}>
            {description}
          </p>
        )}

        <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <a
            href="#contact"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fff',
              background: '#0d2a5e',
              border: '1px solid #0d2a5e',
              padding: '0.8rem 1.75rem',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#091e42'}
            onMouseLeave={e => e.currentTarget.style.background = '#0d2a5e'}
          >
            Get a Free Expert Consultation
          </a>
          <a
            href="#services"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#f2eeeb',
              background: 'transparent',
              border: '1px solid rgba(242,238,235,0.5)',
              padding: '0.8rem 1.75rem',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(242,238,235,0.9)'; e.currentTarget.style.background = 'rgba(242,238,235,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(242,238,235,0.5)'; e.currentTarget.style.background = 'transparent' }}
          >
            Explore Our Solutions
          </a>
        </div>
      </div>

    </section>
  )
}
