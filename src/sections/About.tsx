import { motion } from 'framer-motion'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { RevealLine } from '@/components/ui/RevealLine'
import { FadeIn } from '@/components/ui/FadeIn'
import { personal } from '@/data/personal'
import './About.css'

export function About() {
  return (
    <section id="about" className="section section--about">
      <div className="container">
        <SectionMarker index="02" label="À propos" meta="Manifeste / 2026" />

        <div className="about__grid">
          <div className="about__title-col">
            <h2 className="about__title display">
              <RevealLine inView delay={0}>Autodidacte,</RevealLine>
              <RevealLine inView delay={0.08} italic accent>
                franco-américain,
              </RevealLine>
              <RevealLine inView delay={0.16}>23 ans —</RevealLine>
              <RevealLine inView delay={0.24}>obsédé par les marques</RevealLine>
              <RevealLine inView delay={0.32} accent>
                qui se retiennent.
              </RevealLine>
            </h2>

            {/*
              ================================================================
              PORTRAIT — emplacement réservé à ta photo
              ================================================================
              Pour brancher l'image : remplace le bloc <div class="about__portrait-placeholder">
              par un <img>, par exemple :

                <img
                  src="/portfolio/portrait.jpg"   // ou l'URL distante
                  alt={personal.name}
                  className="about__portrait-img"
                />

              Ratio attendu : portrait 4 / 5 (le cadre s'y conforme).
              ================================================================
            */}
            <FadeIn delay={0.2}>
              <figure className="about__portrait">
                <div className="about__portrait-frame">
                  <div
                    className="about__portrait-placeholder"
                    aria-hidden="true"
                  >
                    <span className="about__portrait-mark">+</span>
                    <span className="about__portrait-label mono">
                      Insérer photo
                    </span>
                    <span className="about__portrait-spec mono">
                      Portrait · 4 / 5
                    </span>
                  </div>
                </div>
                <figcaption className="about__portrait-caption">
                  <span className="mono">— Loïc Karrer / Édition 2026</span>
                  <span className="mono">Nice · FR</span>
                </figcaption>
              </figure>
            </FadeIn>
          </div>

          <div className="about__body">
            {personal.long.map((p, i) => (
              <FadeIn key={p} delay={i * 0.08}>
                <p className="about__p">{p}</p>
              </FadeIn>
            ))}

            <FadeIn delay={0.2}>
              <ul className="about__stats">
                <li>
                  <span className="about__stat-value">23</span>
                  <span className="about__stat-label">
                    Ans · BUT GEA<br />option GEMA
                  </span>
                </li>
                <li>
                  <span className="about__stat-value">06</span>
                  <span className="about__stat-label">
                    Univers couverts<br />Gaming → musique
                  </span>
                </li>
                <li>
                  <span className="about__stat-value">100%</span>
                  <span className="about__stat-label">
                    Autodidacte<br />Projet par projet
                  </span>
                </li>
                <li>
                  <span className="about__stat-value">2026</span>
                  <span className="about__stat-label">
                    Alternance<br />En recherche active
                  </span>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="about__personal">
                <span className="mono">Hors écran</span>
                <p>{personal.interests.join(' · ')}.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <motion.div
        className="about__big-quote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.2 }}
      >
        <p className="serif-italic">
          “Chaque univers a ses codes — j’aime les apprendre.”
        </p>
      </motion.div>
    </section>
  )
}
