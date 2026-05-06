import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealLine } from '@/components/ui/RevealText'
import { revealFade, revealLines, splitChars } from '@/animations/reveal'
import { personal } from '@/data/personal'
import { socialLinks } from '@/data/social'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t1 = revealLines(el, { trigger: el, start: 'top 75%' })
    const t2 = revealFade(el, { trigger: el, start: 'top 75%', delay: 0.2 })

    const huge = el.querySelector<HTMLElement>('[data-contact="huge"]')
    let hugeTrigger: ScrollTrigger | null = null
    if (huge) {
      const chars = splitChars(huge)
      gsap.set(chars, { opacity: 0, y: 40 })
      hugeTrigger = ScrollTrigger.create({
        trigger: huge,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.012,
            ease: 'expo.out',
          })
        },
      })
    }

    return () => {
      t1.kill()
      t2.kill()
      hugeTrigger?.kill()
    }
  }, [])

  return (
    <section ref={ref} id="contact" className="contact">
      <div className="container">
        <header className="contact__head">
          <SectionLabel index="04" label="Contact" />
          <span className="contact__head-meta">Alternance & projets · 2026</span>
        </header>

        <h2 className="display contact__title">
          <RevealLine>Une alternance,</RevealLine>
          <RevealLine>un projet ? <em>Parlons-en.</em></RevealLine>
        </h2>

        <p className="contact__lead reveal-fade">
          Recherche d’une alternance pour ma 3ème année de BUT GEA, ou simple
          envie de collaborer sur un projet de communication / création — le
          mail et le téléphone sont juste en dessous.
        </p>

        <div className="contact__actions">
          <span className="reveal-fade">
            <Magnetic>
              <Button as="a" href={`mailto:${personal.email}`}>
                Écrire un email
              </Button>
            </Magnetic>
          </span>
          <span className="reveal-fade">
            <Magnetic>
              <Button as="a" href={socialLinks[0].href} variant="ghost">
                Voir le LinkedIn
              </Button>
            </Magnetic>
          </span>
        </div>

        <div className="contact__huge" aria-hidden="true">
          <span data-contact="huge">{personal.email}</span>
        </div>

        <div className="contact__grid">
          <div className="contact__col reveal-fade">
            <span className="eyebrow">Email</span>
            <a className="contact__big-link" href={`mailto:${personal.email}`}>
              {personal.email}
            </a>
          </div>
          <div className="contact__col reveal-fade">
            <span className="eyebrow">Téléphone</span>
            <a className="contact__big-link" href={`tel:${personal.phone.replace(/\s/g, '')}`}>
              {personal.phone}
            </a>
          </div>
          <div className="contact__col reveal-fade">
            <span className="eyebrow">Réseaux</span>
            <ul className="contact__socials">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
