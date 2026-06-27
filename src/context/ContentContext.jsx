import { createContext, useContext, useState, useCallback } from 'react'

export const DEFAULT_CONTENT = {
  hero: {
    heading: 'Veer Sai Water Solutions',
    tagline: 'Pure Solutions. Sustainable Future.',
  },
  about: {
    kicker: '// Who We Are',
    heading: 'Building Relationships. Delivering Solutions.',
    subtext: 'Creating a Sustainable Future',
    storyLead: 'We are a complete turnkey end-to-end water solution provider, delivering pure, safe and reliable water systems across India since 2014. From concept to commissioning and beyond.',
    storyBody1: 'Headquartered in Chennai with offices in Bangalore and Hyderabad, our team of 75+ experts specialises in STP, WTP, ETP, rainwater harvesting, solar-powered water systems and O&M services.',
    storyBody2: 'Under the leadership of Dushy D Veer — BNI Ambassador, Tiruvallur Region and Vice President, BNI Aditi Chapter — we have proudly served 30,000+ customers across residential, commercial and industrial sectors.',
    stats: [
      { number: '75+',     label: 'Team Members' },
      { number: '30,000+', label: 'Customers Served' },
      { number: '10+',     label: 'Years Experience' },
      { number: '3',       label: 'Cities' },
    ],
    founderName: 'Dushy D Veer',
    founderTitle: 'Founder & Director',
    founderTagline: '"Solutions that flow today for a better tomorrow"',
    founderPhoto: '/dushy-veer.png',
    founderBadges: ['Ambassador · Tiruvallur Region', 'Vice President · BNI Aditi Chapter'],
  },
  services: {
    kicker: '// What We Do',
    heading: 'Complete Turnkey Solutions',
    subtext: 'From concept to commissioning and beyond',
    cards: [
      { icon: 'water',   title: 'STP — Sewage Treatment Plants',   desc: 'Advanced STP solutions for efficient treatment & reuse of wastewater.',                                    tags: ['High Efficiency', 'Low Maintenance', 'Eco Friendly'] },
      { icon: 'factory', title: 'WTP — Water Treatment Plants',     desc: 'Reliable WTP systems delivering safe, clean & potable water.',                                             tags: ['Safe Drinking Water', 'Robust Technology', 'Consistent Performance'] },
      { icon: 'flask',   title: 'ETP — Effluent Treatment Plants',  desc: 'Effective ETP solutions to treat industrial effluents & meet environmental norms.',                        tags: ['Compliance Ready', 'Cost Effective', 'Sustainable Operations'] },
      { icon: 'rain',    title: 'Rainwater Harvesting',             desc: 'Smart rainwater harvesting solutions to conserve water for a better tomorrow.',                            tags: ['Water Conservation', 'Groundwater Recharge', 'Long Term Sustainability'] },
      { icon: 'tool',    title: 'Operation & Maintenance',          desc: 'Expert O&M services ensuring optimal performance, uptime and long-term reliability.',                      tags: ['24/7 Support', 'Skilled Team', 'Performance Assurance'] },
      { icon: 'sun',     title: 'Solar-Powered Water Systems',      desc: 'Sustainable & cost-effective solar-powered solutions for reliable water supply.',                          tags: ['Energy Efficient', 'Cost Savings', 'Environment Friendly'] },
    ],
  },
  projects: {
    kicker: '// Our Work',
    heading: 'Featured Projects',
    subtext: 'Delivering excellence across industries and geographies',
    items: [
      { image: '/STP.png',       category: 'STP Project',  name: 'Municipal Sewage Treatment',       location: 'Chennai, Tamil Nadu',    desc: 'Complete turnkey STP installation for a residential township. Designed for 500 KLD capacity with advanced biological treatment process ensuring treated water meets CPCB norms.',              stats: [{ number: '500 KLD',  label: 'Capacity' },   { number: '6 Months', label: 'Completion' },    { number: '100%', label: 'Compliance' }] },
      { image: '/Wtp.png',       category: 'WTP Project',  name: 'Industrial Water Treatment',       location: 'Bangalore, Karnataka',   desc: 'High-capacity water treatment plant for a large manufacturing facility. Delivers consistent potable water quality with automated monitoring and real-time reporting.',                       stats: [{ number: '1000 KLD', label: 'Capacity' },   { number: '24/7',     label: 'Operation' },      { number: '99.9%', label: 'Uptime' }] },
      { image: '/Etp.png',       category: 'ETP Project',  name: 'Textile Effluent Treatment',       location: 'Tiruppur, Tamil Nadu',   desc: 'Zero liquid discharge ETP for a textile dyeing unit. Advanced treatment stages including primary, secondary and tertiary treatment with colour removal and water recycling.',            stats: [{ number: 'ZLD',      label: 'Zero Discharge' }, { number: '800 KLD', label: 'Capacity' },   { number: '95%', label: 'Recycled' }] },
      { image: '/solar_Wpt.png', category: 'Solar + WTP',  name: 'Solar-Powered Village Water Supply', location: 'Hyderabad, Telangana', desc: 'Sustainable solar-powered water treatment system supplying clean drinking water to 5000+ rural households. Fully off-grid with remote monitoring capabilities.',                    stats: [{ number: '5000+',    label: 'Households' }, { number: '100%',    label: 'Solar Powered' }, { number: '200 KLD', label: 'Capacity' }] },
    ],
  },
  milestones: {
    kicker: 'Serving India since 2014',
    heading: '30,000+ Customers',
    subtext: '75+ Team Members · Chennai · Bangalore · Hyderabad',
  },
  contact: {
    kicker: '// Get In Touch',
    heading: 'Contact Us',
    subtext: "We'd love to hear from you. Reach out and we'll respond within 24 hours.",
    phone: '+91 9789909873',
    address: '45, Anna Salai, Teynampet\nChennai — 600 018\nTamil Nadu, India',
    email: 'info@veersaiwater.com\nsupport@veersaiwater.com',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed',
  },
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('vs_content')
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          hero:       { ...DEFAULT_CONTENT.hero,       ...parsed.hero },
          about:      { ...DEFAULT_CONTENT.about,      ...parsed.about },
          services:   { ...DEFAULT_CONTENT.services,   ...parsed.services },
          projects:   { ...DEFAULT_CONTENT.projects,   ...parsed.projects },
          milestones: { ...DEFAULT_CONTENT.milestones, ...parsed.milestones },
          contact:    { ...DEFAULT_CONTENT.contact,    ...parsed.contact },
        }
      }
    } catch {}
    return DEFAULT_CONTENT
  })

  const updateSection = useCallback((section, data) => {
    setContent(prev => {
      const next = { ...prev, [section]: { ...prev[section], ...data } }
      try { localStorage.setItem('vs_content', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const resetSection = useCallback((section) => {
    setContent(prev => {
      const next = { ...prev, [section]: DEFAULT_CONTENT[section] }
      try { localStorage.setItem('vs_content', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateSection, resetSection }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
