import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Services',   href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (scrolled) setMenuOpen(false)
  }, [scrolled])

  const navBg = scrolled || menuOpen ? 'rgba(242,238,235,0.96)' : 'transparent'

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: navBg,
          backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
          boxShadow: scrolled || menuOpen ? '0 1px 24px rgba(13,33,55,0.07)' : 'none',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 md:px-10 py-2">

          {/* Logo — left aligned, smaller */}
          <img
            src="/logo.png"
            alt="Veer Sai Water Solutions"
            style={{ height: 38, width: 'auto' }}
          />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium px-3 py-2 rounded-md hover:bg-black/5 transition-colors"
                style={{ color: scrolled ? '#1a3a5c' : '#fff' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side — CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+918122765100"
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ background: '#0d2a5e' }}
              onMouseEnter={e => e.currentTarget.style.background = '#091e42'}
              onMouseLeave={e => e.currentTarget.style.background = '#0d2a5e'}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="hidden sm:inline">Free Consultation</span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-md"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span style={{
                display: 'block', width: 22, height: 2,
                background: scrolled || menuOpen ? '#0d2a5e' : '#fff', borderRadius: 2,
                transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                transition: 'transform 0.25s, background 0.4s',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2,
                background: scrolled || menuOpen ? '#0d2a5e' : '#fff', borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s, background 0.4s',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2,
                background: scrolled || menuOpen ? '#0d2a5e' : '#fff', borderRadius: 2,
                transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                transition: 'transform 0.25s, background 0.4s',
              }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden" style={{ borderTop: '1px solid rgba(13,33,55,0.08)', padding: '0.5rem 1.25rem 1rem' }}>
            {LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#0d2a5e',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(13,33,55,0.06)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
