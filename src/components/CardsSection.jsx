import { useEffect, useRef, useState } from 'react'

const CARDS = [
  {
    title: 'Complete Turnkey Solutions',
    body:  'End-to-end water solution providers — from concept to commissioning and beyond. STP, WTP, ETP and more.',
  },
  {
    title: 'Pure. Safe. Reliable.',
    body:  'Ensuring clean, safe and reliable water for people. Reducing water wastage while protecting natural resources.',
  },
  {
    title: 'Sustainable Future',
    body:  'Solar-powered systems, rainwater harvesting, and smart O&M services building a sustainable future for generations.',
  },
]

export default function CardsSection() {
  const triggerRef = useRef(null)
  const gridRef    = useRef(null)
  const [opacity, setOpacity]   = useState(0)
  const [revealPct, setReveal]  = useState(0)

  useEffect(() => {
    function onScroll() {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect        = trigger.getBoundingClientRect()
      const triggerTop  = rect.top + window.scrollY
      const triggerH    = rect.height
      const scrollY     = window.scrollY
      const vh          = window.innerHeight

      const start = triggerTop - vh * 0.5
      const end   = triggerTop + triggerH - vh * 0.3
      const range = end - start

      const progress   = range > 0 ? Math.max(0, Math.min(1, (scrollY - start) / range)) : 0
      const fadeIn     = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)))
      const fadeOut    = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)))
      const isActive   = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3

      setOpacity(isActive ? Math.min(fadeIn, fadeOut) : 0)
      setReveal(progress * 130)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const maskImage = isMobile
    ? `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
    : `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`

  return (
    <>
      {/* Trigger zone */}
      <div ref={triggerRef} style={{ height: '200vh' }} />

      {/* Fixed cards */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 px-10 pb-8"
        style={{ opacity, pointerEvents: opacity > 0.1 ? 'auto' : 'none', transition: 'none' }}
      >
        <div
          ref={gridRef}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          {CARDS.map(card => (
            <div key={card.title}>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: '#1a3a5c', fontFamily: "'Barlow', sans-serif" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
