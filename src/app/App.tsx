import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Loader } from '@/components/layout/Loader'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'
import { Experience } from '@/sections/Experience'
import { Contact } from '@/sections/Contact'

export function App() {
  const [ready, setReady] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <Loader
            onAnimateOut={() => setReady(true)}
            onComplete={() => setShowLoader(false)}
          />
        )}
      </AnimatePresence>

      <Header />

      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
