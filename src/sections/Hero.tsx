import { motion } from 'framer-motion'
import { RevealLine } from '@/components/ui/RevealLine'
import { BigArrow } from '@/components/ui/BigArrow'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { personal } from '@/data/personal'
import './Hero.css'

type Props = {
  ready: boolean
}

const KEYWORDS = [
  'Communication',
  'Création',
  'Stratégie',
  'Identité',
  'Digital',
  'Alternance 2026',
]

export function Hero({ ready }: Props) {
  const reduced = useReducedMotion()
  const animate = ready

  return (
    <section id="top" className="hero">
      <div className="hero__frame">
        <div className="hero__corner hero__corner--tl">
          <span className="mono">Édition 01 — Vol. 2026</span>
        </div>
        <div className="hero__corner hero__corner--tr">
          <span className="mono">{personal.role}</span>
        </div>

        <h1 className="hero__title billboard">
          {animate ? (
            <>
              <span className="hero__line hero__line--1">
                <RevealLine delay={0.1}>Communication</RevealLine>
              </span>
              <span className="hero__line hero__line--2">
                <span className="hero__amp">
                  <RevealLine delay={0.22}>&amp;</RevealLine>
                </span>
                <RevealLine delay={0.28}>Création</RevealLine>
              </span>
              <span className="hero__line hero__line--3">
                <RevealLine delay={0.4}>Digitale.</RevealLine>
              </span>
            </>
          ) : (
            <>
              <span className="hero__line hero__line--1" style={{ opacity: 0 }}>
                Communication
              </span>
              <span className="hero__line hero__line--2" style={{ opacity: 0 }}>
                <span className="hero__amp">&amp;</span> Création
              </span>
              <span className="hero__line hero__line--3" style={{ opacity: 0 }}>
                Digitale.
              </span>
            </>
          )}
        </h1>

        <div className="hero__bottom">
          <motion.div
            className="hero__lead"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.85, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Étudiant à <strong>l’IUT Nice Côte d’Azur</strong> (BUT GEA · GEMA),
              je conçois en <em>autodidacte</em> des supports de communication
              et des identités pour des univers très différents.
            </p>
          </motion.div>

          <motion.div
            className="hero__ctas"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.05, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <BigArrow as="a" href="#projects">Voir les projets</BigArrow>
            <BigArrow as="a" href="#contact" variant="outline">
              Prendre contact
            </BigArrow>
          </motion.div>
        </div>

        {/* Static keyword strip — replaces the previous infinite marquee. */}
        <motion.ul
          className="hero__keywords"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          {KEYWORDS.map((k, i) => (
            <li key={k}>
              <span className="hero__keywords-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{k}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
