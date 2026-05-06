import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealLine } from '@/components/ui/RevealText'
import { revealLines } from '@/animations/reveal'
import { skillGroups, tools } from '@/data/skills'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

export function Skills() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tween = revealLines(el, { trigger: el, start: 'top 75%' })

    const cols = gsap.utils.toArray<HTMLElement>('.skill-col', el)
    const triggers = cols.map((c, i) =>
      ScrollTrigger.create({
        trigger: c,
        start: 'top 86%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            c,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.1, delay: i * 0.1, ease: 'expo.out' },
          )
        },
      }),
    )

    const toolItems = gsap.utils.toArray<HTMLElement>('.tools__item', el)
    const toolTrigger = ScrollTrigger.create({
      trigger: el.querySelector('.tools'),
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          toolItems,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.025, ease: 'expo.out' },
        )
      },
    })

    return () => {
      tween.kill()
      triggers.forEach((t) => t.kill())
      toolTrigger.kill()
    }
  }, [])

  return (
    <section ref={ref} id="skills" className="skills">
      <div className="container">
        <header className="skills__head">
          <div className="skills__head-top">
            <SectionLabel index="03" label="Expertises" />
            <span className="skills__head-meta">Stratégie · Création · Web</span>
          </div>
          <h2 className="display skills__title">
            <RevealLine>Trois axes,</RevealLine>
            <RevealLine>un même <em>fil rouge.</em></RevealLine>
          </h2>
        </header>

        <div className="skills__grid">
          {skillGroups.map((g, i) => (
            <article key={g.title} className="skill-col">
              <div className="skill-col__num">0{i + 1}</div>
              <h3 className="skill-col__title">{g.title}</h3>
              <p className="skill-col__desc">{g.description}</p>
              <ul className="skill-col__list">
                {g.items.map((item) => (
                  <li key={item}>
                    <span className="skill-col__bullet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="tools">
          <span className="eyebrow">Outils</span>
          <ul className="tools__list">
            {tools.map((t) => (
              <li key={t} className="tools__item">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
