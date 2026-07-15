const SOLUTIONS = [
  'Water Treatment Plants',
  'Sewage Treatment Plants',
  'Effluent Treatment Plants',
  'Rainwater Harvesting',
  'Operation & Maintenance',
  'Solar-Powered Water Systems',
]

const QUICK_LINKS = [
  { label: 'Home',            href: '#home' },
  { label: 'About Us',        href: '#about' },
  { label: 'Services',        href: '#services' },
  { label: 'Industries',      href: '#industries' },
  { label: 'Projects',        href: '#projects' },
  { label: 'Contact Us',      href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#07141f', color: '#fff' }}>

      {/* Final CTA strip */}
      <div style={{ background: '#0d2a5e', padding: '3rem 5%', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
          Let's Build Together
        </p>
        <h3 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '2rem' }}>
          Let's Build a Sustainable Water Future Together
        </h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="tel:+919789909873"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.8rem 1.75rem', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.09 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.27 7.69a16 16 0 006.06 6.06l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Now
          </a>
          <a
            href="https://wa.me/919789909873"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', background: '#25d366', border: '1px solid #25d366', padding: '0.8rem 1.75rem', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Our Expert
          </a>
          <a
            href="#contact"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0d2a5e', background: '#fff', border: '1px solid #fff', padding: '0.8rem 1.75rem', borderRadius: 8, textDecoration: 'none' }}
          >
            Get Free Consultation
          </a>
        </div>

        {/* Cities */}
        <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.75rem' }}>
            We Serve Across
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
            {[
              { city: 'Chennai',   state: 'Tamil Nadu' },
              { city: 'Bengaluru', state: 'Karnataka'  },
              { city: 'Hyderabad', state: 'Telangana'  },
            ].map((loc, i, arr) => (
              <div key={loc.city} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,0.35)" strokeWidth={1.5}
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, fontSize: 'clamp(1rem, 2vw, 1.3rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', lineHeight: 1, marginBottom: '0.35rem' }}>
                    {loc.city}
                  </p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                    {loc.state}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', padding: '4rem 5% 3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Company */}
        <div style={{ flex: '1 1 240px', maxWidth: 300 }}>
          <img src="/logo.png" alt="Veer Sai Water Solutions" style={{ height: 40, width: 'auto', marginBottom: '1.25rem', filter: 'brightness(0) invert(1)' }} />
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)' }}>
            Complete turnkey water and wastewater solutions — from concept and design to commissioning, operation and long-term support.
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '1.25rem', fontStyle: 'italic' }}>
            Pure Solutions. Sustainable Future.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1 1 140px' }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
            Quick Links
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {QUICK_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div style={{ flex: '1 1 200px' }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
            Our Solutions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SOLUTIONS.map(s => (
              <p key={s} style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                {s}
              </p>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ flex: '1 1 180px' }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Chennai · Bengaluru · Hyderabad
            </p>
            <a href="tel:+919789909873" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#fff', textDecoration: 'none', letterSpacing: '0.02em' }}>
              +91 97899 09873
            </a>
            <a href="mailto:info@veersaiwater.com" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
              info@veersaiwater.com
            </a>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>
              24×7 O&M Support Available
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem 5%' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} Veer Sai Water Solutions. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
          Serving India since 2014 · Chennai · Bengaluru · Hyderabad
        </p>
      </div>
    </footer>
  )
}
