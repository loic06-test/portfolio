import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/layout/Cursor'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'
import { Contact } from '@/sections/Contact'
import { useLenis } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const [ready, setReady] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  useLenis()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts) {
      document.fonts.ready.then(refresh)
    }
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      {showPreloader && (
        <Preloader
          onAnimateOutStart={() => setReady(true)}
          onComplete={() => setShowPreloader(false)}
        />
      )}
      {!showPreloader && <Cursor />}
      <Header />
      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
