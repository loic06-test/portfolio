import { motion } from 'framer-motion'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { RevealLine } from '@/components/ui/RevealLine'
import { FadeIn } from '@/components/ui/FadeIn'
import './Experience.css'

type Item = {
  year: string
  role: string
  org: string
  location: string
  blurb: string
  status?: 'current' | 'past' | 'upcoming'
}

const items: Item[] = [
  {
    year: '2026 →',
    role: 'Alternance · BUT GEA 3ème année',
    org: 'En recherche active',
    location: 'France',
    blurb:
      'Recherche d’une alternance pour ma 3ème année : communication digitale, marketing, création de contenu, identité de marque.',
    status: 'upcoming',
  },
  {
    year: '07.04 → 29.05.26',
    role: 'Stage en communication',
    org: 'MyCenterSolution',
    location: 'Antibes / France',
    blurb:
      '2 mois en immersion communication chez MyCenterSolution à Antibes : production de contenu, supports digitaux, ligne éditoriale et accompagnement de la marque sur ses canaux.',
    status: 'current',
  },
  {
    year: '2025 — 2026',
    role: 'BUT GEA — option GEMA',
    org: 'IUT Nice Côte d’Azur',
    location: 'Nice / France',
    blurb:
      'Gestion des Entreprises et des Administrations, parcours Gestion et Management. 2ème année en cours.',
    status: 'current',
  },
  {
    year: '2024 →',
    role: 'Designer freelance · autodidacte',
    org: 'Projets indépendants',
    location: 'Twitch · Médical · Sport · Musique',
    blurb:
      'Identités, supports digitaux, sites et campagnes pour un panel volontairement large d’univers — pour apprendre les codes en faisant.',
    status: 'past',
  },
]

export function Experience() {
  return (
    <section id="parcours" className="section section--exp">
      <div className="container">
        <SectionMarker index="05" label="Parcours" meta="Formation · expérience · trajectoire" />

        <div className="exp__head">
          <h2 className="exp__title display">
            <RevealLine inView delay={0}>Une trajectoire</RevealLine>
            <RevealLine inView delay={0.08} italic accent>
              construite,
            </RevealLine>
            <RevealLine inView delay={0.16}>non subie.</RevealLine>
          </h2>
        </div>

        <ol className="exp__list">
          {items.map((item, i) => (
            <FadeIn key={item.year + item.role} delay={i * 0.08}>
              <li className={`exp-item exp-item--${item.status ?? 'past'}`}>
                <div className="exp-item__year">
                  <span>{item.year}</span>
                  {item.status === 'current' && (
                    <motion.span
                      className="exp-item__pulse"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="exp-item__body">
                  <h3 className="exp-item__role display">{item.role}</h3>
                  <div className="exp-item__meta">
                    <span>{item.org}</span>
                    <span className="exp-item__sep" aria-hidden="true">/</span>
                    <span>{item.location}</span>
                  </div>
                  <p className="exp-item__blurb">{item.blurb}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
