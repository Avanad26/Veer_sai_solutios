import { createContext, useContext, useState, useCallback } from 'react'

export const DEFAULT_CONTENT = {
  hero: {
    heading: 'Complete Turnkey Water Solutions',
    subtitle: 'Design. Build. Operate. Sustain.',
    tagline: 'Your Trusted Partner for Every Water Challenge',
    description: 'Veer Sai Water Solutions provides complete water and wastewater management solutions for residential, commercial, institutional and industrial projects. From Water Treatment Plants, Sewage Treatment Plants and Effluent Treatment Plants to Rainwater Harvesting, Solar-Powered Water Systems and 24×7 Operation and Maintenance support, we manage every stage of your project.',
  },
  about: {
    kicker: '// Who We Are',
    heading: 'About Veer Sai Water Solutions',
    subtext: 'A complete turnkey water and wastewater management company',
    storyLead: 'Veer Sai Water Solutions is a complete turnkey water and wastewater management company serving residential, commercial, institutional and industrial customers.',
    storyBody1: 'We provide Water Treatment Plants, Sewage Treatment Plants, Effluent Treatment Plants, Rainwater Harvesting Systems, Solar-Powered Water Systems and 24×7 Operation and Maintenance support.',
    storyBody2: 'Our team manages the complete project journey — from site assessment and water analysis to engineering, equipment supply, installation, commissioning and long-term maintenance.',
    stats: [
      { number: '75+',  label: 'Experienced Professionals' },
      { number: '600+', label: 'Successful Projects' },
      { number: '24×7', label: 'O&M Support' },
      { number: '3',    label: 'Cities Served' },
    ],
    founderName: '',
    founderTitle: '',
    founderTagline: '',
    founderPhoto: '/dushy-veer.png',
    founderBadges: [],
  },
  services: {
    kicker: '// Our Solutions',
    heading: 'Our Water Treatment Solutions',
    subtext: 'Complete turnkey water management for every requirement',
    cards: [
      {
        icon: 'factory',
        title: 'Water Treatment Plants – WTP',
        desc: 'Get safe, clean and reliable water for residential, commercial and industrial use. Our WTP systems are designed based on source-water quality, usage, required capacity and final water-quality expectations.',
        tags: ['Improved Water Quality', 'Consistent Output', 'Easy Maintenance'],
      },
      {
        icon: 'water',
        title: 'Sewage Treatment Plants – STP',
        desc: 'Recycle wastewater and reduce freshwater consumption with an efficient Sewage Treatment Plant. We provide STP systems for apartments, gated communities, hotels, hospitals, institutions, IT parks and commercial buildings.',
        tags: ['Water Reuse', 'PCB Compliance', 'Low Operational Cost'],
      },
      {
        icon: 'flask',
        title: 'Effluent Treatment Plants – ETP',
        desc: 'Treat industrial wastewater effectively while supporting environmental compliance. Our ETP systems are customised according to the type of effluent, industry process and required discharge or reuse quality.',
        tags: ['Regulatory Compliance', 'Industry-Specific', 'Reuse Ready'],
      },
      {
        icon: 'rain',
        title: 'Rainwater Harvesting',
        desc: 'Convert rainwater into a valuable resource through scientifically designed systems. Our solutions support rainwater collection, filtration, storage and groundwater recharge for residential, commercial and industrial properties.',
        tags: ['Groundwater Recharge', 'Water Conservation', 'Reduced Dependency'],
      },
      {
        icon: 'tool',
        title: 'Operation & Maintenance',
        desc: 'Improve plant performance and reduce breakdowns through professional AMC and O&M services. Our trained professionals support WTP, STP, ETP and related equipment around the clock.',
        tags: ['24×7 Support', 'Skilled Team', 'Preventive Maintenance'],
      },
      {
        icon: 'sun',
        title: 'Solar-Powered Water Systems',
        desc: 'Reduce electricity consumption by integrating suitable pumping and water treatment systems with solar power. Solutions are developed according to site conditions, system requirements and operational feasibility.',
        tags: ['Lower Energy Costs', 'Sustainable', 'Environment-Friendly'],
      },
    ],
  },
  projects: {
    kicker: '// Our Work',
    heading: 'Featured Projects',
    subtext: '600+ projects successfully delivered across residential, commercial and industrial sectors',
    items: [
      { image: '/Municipal.jpeg', category: 'STP Project',  name: 'Municipal Sewage Treatment',         location: 'Chennai, Tamil Nadu',    desc: 'Complete turnkey STP installation for a residential township. Designed for 500 KLD capacity with advanced biological treatment process ensuring treated water meets CPCB norms.',           stats: [{ number: '500 KLD',  label: 'Capacity' }, { number: '1 Year',   label: 'Completion' }, { number: '100%', label: 'Compliance' }] },
      { image: '/Wtp.png',       category: 'WTP Project',  name: 'Industrial Water Treatment',         location: 'Bangalore, Karnataka',   desc: 'High-capacity water treatment plant for a large manufacturing facility. Delivers consistent potable water quality with automated monitoring and real-time reporting.',                      stats: [{ number: '2 MLD',    label: 'Capacity' }, { number: '24/7',     label: 'Operation' },   { number: '99.9%', label: 'Uptime' }] },
      { image: '/Etp.png',       category: 'ETP Project',  name: 'Textile Effluent Treatment',         location: 'Tiruppur, Tamil Nadu',   desc: 'Zero liquid discharge ETP for a textile dyeing unit. Advanced treatment stages including primary, secondary and tertiary treatment with colour removal and water recycling.',           stats: [{ number: 'ZLD',      label: 'Zero Discharge' }, { number: '800 KLD', label: 'Capacity' }, { number: '95%', label: 'Recycled' }] },
      { image: '/solar_Wpt.png', category: 'Solar + WTP',  name: 'Solar-Powered Village Water Supply', location: 'Hyderabad, Telangana',   desc: 'Sustainable solar-powered water treatment system supplying clean drinking water to 5000+ rural households. Fully off-grid with remote monitoring capabilities.',                   stats: [{ number: '5000+',    label: 'Households' }, { number: '100%',    label: 'Solar Powered' }, { number: '200 KLD', label: 'Capacity' }] },
    ],
  },
  milestones: {
    kicker: 'Serving India since 2014',
    heading: '30,000+ Customers',
    subtext: '75+ Team Members · Chennai · Bengaluru · Hyderabad',
  },
  contact: {
    kicker: '// Contact Us',
    heading: "Let's Discuss Your Water Requirement",
    subtext: 'Planning a new water treatment project? Facing a problem with an existing plant? Looking for AMC or 24×7 O&M support? Speak with our team.',
    phone: '+91 8122765100',
    address: 'Complete South India\nChennai · Bengaluru · Hyderabad · Coimbatore & Other Regions',
    email: 'info@veersaiwater.com',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed',
  },
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const CONTENT_VERSION = 'v4'
      if (localStorage.getItem('vs_content_version') !== CONTENT_VERSION) {
        localStorage.removeItem('vs_content')
        localStorage.setItem('vs_content_version', CONTENT_VERSION)
      }
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
