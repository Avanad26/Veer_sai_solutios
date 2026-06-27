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
      v.playsInline = true
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
  const { heading, tagline } = content.hero

  useDualVideoBg(containerRef)
  useHeroScrollFade(videoBgRef)

  return (
    <section id="home" className="relative w-full" style={{ height: '100vh' }}>

      {/* Video background */}
      <div
        ref={el => { videoBgRef.current = el }}
        className="absolute inset-0 overflow-hidden z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #d0dce8, #edf1f6)' }}
      >
        <div ref={containerRef} className="absolute inset-0" />
        {/* White overlay — gives the half-white effect */}
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.5)' }} />
        {/* Bottom gradient fade into next section */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: '30%', background: 'linear-gradient(to top, #edf1f6, transparent)' }}
        />
      </div>

      {/* Tagline — left aligned, vertically centered */}
      <div
        className="absolute z-10"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}
      >
        <h1
          className="hero-heading"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.4rem, 4.4vw, 4.4rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#f2eeeb',
            WebkitTextStroke: '0.6px #f2eeeb',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            transform: 'scaleY(1.4)',
            transformOrigin: 'left center',
            textShadow: '0 0 40px rgba(200,200,200,0.18)',
          }}
        >
          {heading}
        </h1>
        <p
          className="hero-tagline"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontStyle: 'italic',
            color: '#f2eeeb',
            marginTop: '0.75rem',
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Bounce arrow */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <svg
          className="bounce w-6 h-6 text-gray-400"
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  )
}
