import { motion } from 'framer-motion'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { RevealLine } from '@/components/ui/RevealLine'
import { FadeIn } from '@/components/ui/FadeIn'
import { skillGroups, tools } from '@/data/skills'
import './Skills.css'

export function Skills() {
  return (
    <section id="expertises" className="section section--skills">
      <div className="container">
        <SectionMarker index="04" label="Expertises" meta="Stratégie · Création · Digital" />

        <div className="skills__head">
          <h2 className="skills__title display">
            <RevealLine inView delay={0}>Trois axes,</RevealLine>
            <RevealLine inView delay={0.08} italic accent>
              un seul fil rouge —
            </RevealLine>
            <RevealLine inView delay={0.16}>la cohérence.</RevealLine>
          </h2>
        </div>

        <div className="skills__grid">
          {skillGroups.map((g, i) => (
            <FadeIn key={g.title} delay={i * 0.08}>
              <article className="skill-col">
                <div className="skill-col__head">
                  <span className="skill-col__num">0{i + 1}</span>
                  <h3 className="skill-col__title display">{g.title}</h3>
                </div>
                <p className="skill-col__desc">{g.description}</p>
                <ul className="skill-col__list">
                  {g.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-8% 0px' }}
                      transition={{
                        delay: i * 0.08 + j * 0.04,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="skill-col__bullet" aria-hidden="true">
                        ✱
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="skills__tools">
            <div className="skills__tools-label">
              <span className="mono">Outils maîtrisés</span>
              <span className="skills__tools-rule" aria-hidden="true" />
              <span className="mono">{tools.length} logiciels</span>
            </div>
            <ul className="skills__tools-grid">
              {tools.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="skills__tools-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="skills__tools-name">{t}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
