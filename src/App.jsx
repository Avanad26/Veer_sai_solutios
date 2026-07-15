import { useEffect, useState } from 'react'
import { ContentProvider } from './context/ContentContext'
import Navbar            from './components/Navbar'
import Hero              from './components/Hero'
import ScrollBg          from './components/ScrollBg'
import AboutSection      from './components/AboutSection'
import ServicesSection   from './components/ServicesSection'
import ProjectsSection   from './components/ProjectsSection'
import SectionThree      from './components/SectionThree'
import IndustriesSection from './components/IndustriesSection'
import ProcessSection    from './components/ProcessSection'
import ContactSection    from './components/ContactSection'
import CustomerCounter   from './components/CustomerCounter'
import Footer            from './components/Footer'
import AdminPanel        from './pages/AdminPanel'

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
        <CustomerCounter />
        <ServicesSection />
        <SectionThree />
        <IndustriesSection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
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
