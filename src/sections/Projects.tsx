import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealLine } from '@/components/ui/RevealText'
import { Magnetic } from '@/components/ui/Magnetic'
import { Button } from '@/components/ui/Button'
import { revealLines } from '@/animations/reveal'
import { projects } from '@/data/projects'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tween = revealLines(el, { trigger: el, start: 'top 75%' })

    const cards = gsap.utils.toArray<HTMLElement>('.project-card', el)
    const triggers = cards.map((card, i) => {
      gsap.set(card, { y: 60, opacity: 0 })
      return ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: i * 0.06,
            ease: 'expo.out',
          })
        },
      })
    })

    return () => {
      tween.kill()
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={ref} id="projects" className="projects">
      <div className="container">
        <header className="projects__head">
          <div className="projects__head-top">
            <SectionLabel index="02" label="Projets" />
            <span className="projects__head-meta">{projects.length} études de cas · 2025 — 2026</span>
          </div>
          <h2 className="display projects__title">
            <RevealLine>Études de cas</RevealLine>
            <RevealLine><em>récentes.</em></RevealLine>
          </h2>
        </header>

        <ul className="projects__list">
          {projects.map((p) => (
            <li key={p.id} className="project-card">
              <a href="#" className="project-card__link" aria-label={`Voir ${p.title}`}>
                <div className="project-card__index">{p.index}</div>

                <div className="project-card__visual" data-cursor="hover">
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={p.title}
                      className={[
                        'project-card__image',
                        p.coverFit === 'contain' && 'project-card__image--contain',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{
                        ...(p.coverPosition && { objectPosition: p.coverPosition }),
                        ...(p.coverPadding && { padding: p.coverPadding }),
                        ...(p.coverBg && p.coverBg !== 'dark' && {
                          background:
                            p.coverBg === 'white' ? '#ffffff' : p.coverBg,
                        }),
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="project-card__plate" aria-hidden="true">
                      <span className="project-card__plate-mark">{p.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="project-card__hover" aria-hidden="true">
                    <span>Voir le projet</span>
                    <span className="project-card__hover-arrow">→</span>
                  </div>
                </div>

                <div className="project-card__meta">
                  <div className="project-card__title">
                    <span>{p.title}</span>
                    <span className="project-card__year">{p.year}</span>
                  </div>
                  <span className="project-card__category">{p.category}</span>
                  <p className="project-card__excerpt">{p.excerpt}</p>
                  <ul className="project-card__scope">
                    {p.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="projects__cta">
          <Magnetic>
            <Button as="a" href="#contact" variant="ghost">
              Discuter d’un projet
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
