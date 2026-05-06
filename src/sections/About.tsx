import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealLine } from '@/components/ui/RevealText'
import { revealFade, revealLines } from '@/animations/reveal'
import { personal } from '@/data/personal'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t1 = revealLines(el, { trigger: el, start: 'top 75%' })
    const t2 = revealFade(el, { trigger: el, start: 'top 70%', delay: 0.25 })
    return () => {
      t1.kill()
      t2.kill()
    }
  }, [])

  return (
    <section ref={ref} id="about" className="about">
      <div className="container about__inner">
        <header className="about__head">
          <SectionLabel index="01" label="À propos" />
          <span className="about__head-meta">Approche & méthode</span>
        </header>

        <div className="about__grid">
          <h2 className="display about__title">
            <RevealLine>Autodidacte,</RevealLine>
            <RevealLine>franco-américain,</RevealLine>
            <RevealLine><em>23 ans.</em></RevealLine>
          </h2>

          <div className="about__body">
            {personal.long.map((p) => (
              <p key={p} className="reveal-fade about__p">
                {p}
              </p>
            ))}

            <ul className="about__stats">
              <li className="reveal-fade">
                <span className="about__stat-value">23</span>
                <span className="about__stat-label">ans · BUT GEA · GEMA</span>
              </li>
              <li className="reveal-fade">
                <span className="about__stat-value">06</span>
                <span className="about__stat-label">univers couverts</span>
              </li>
              <li className="reveal-fade">
                <span className="about__stat-value">100%</span>
                <span className="about__stat-label">autodidacte</span>
              </li>
            </ul>

            <div className="about__personal reveal-fade">
              <span className="about__personal-label">Hors écran</span>
              <p className="about__personal-text">
                {personal.interests.join(' · ')}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
