import { useEffect, useState } from 'react'
import { ContentProvider } from './context/ContentContext'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import ScrollBg        from './components/ScrollBg'
import SectionThree    from './components/SectionThree'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import AboutSection    from './components/AboutSection'
import ContactSection  from './components/ContactSection'
import AdminPanel      from './pages/AdminPanel'

function Site() {
  const [showAdmin, setShowAdmin] = useState(window.location.hash === '#admin')

  useEffect(() => {
    const handler = () => setShowAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const exitAdmin = () => { window.location.hash = ''; setShowAdmin(false) }

  if (showAdmin) return <AdminPanel onExit={exitAdmin} />

  return (
    <div className="relative min-h-screen">
      <ScrollBg />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <SectionThree />
        <ContactSection />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  )
}
