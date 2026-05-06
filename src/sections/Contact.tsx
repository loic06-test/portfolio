import { SectionMarker } from '@/components/ui/SectionMarker'
import { RevealLine } from '@/components/ui/RevealLine'
import { FadeIn } from '@/components/ui/FadeIn'
import { BigArrow } from '@/components/ui/BigArrow'
import { personal } from '@/data/personal'
import { socialLinks } from '@/data/social'
import './Contact.css'

export function Contact() {
  return (
    <section id="contact" className="section section--contact section--paper">
      <div className="container">
        <SectionMarker
          index="06"
          label="Contact"
          meta="Alternance & projets — 2026"
        />

        <h2 className="contact__title display">
          <RevealLine inView delay={0}>Travaillons</RevealLine>
          <RevealLine inView delay={0.1} italic accent>
            ensemble.
          </RevealLine>
        </h2>

        <FadeIn delay={0.15}>
          <p className="contact__lead">
            Recherche d’une alternance pour ma 3ème année de BUT GEA, ou simple
            envie de collaborer sur un projet de communication ou de création —
            l’email et le téléphone sont juste en dessous.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="contact__cta">
            <BigArrow as="a" href={`mailto:${personal.email}`}>
              Écrire un email
            </BigArrow>
            <BigArrow
              as="a"
              href={socialLinks[0].href}
              variant="outline"
            >
              Voir le LinkedIn
            </BigArrow>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <a
            href={`mailto:${personal.email}`}
            className="contact__email-huge billboard"
          >
            <span className="contact__email-arrow" aria-hidden="true">↗</span>
            <span>{personal.email}</span>
          </a>
        </FadeIn>

        <div className="contact__grid">
          <FadeIn delay={0.45}>
            <div className="contact__card">
              <span className="mono">Téléphone</span>
              <a
                className="contact__big-link"
                href={`tel:${personal.phone.replace(/\s/g, '')}`}
              >
                {personal.phone}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="contact__card">
              <span className="mono">Localisation</span>
              <p className="contact__big-link">
                {personal.location}<br />
                <span className="contact__soft">{personal.origin}</span>
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.55}>
            <div className="contact__card">
              <span className="mono">Réseaux</span>
              <ul className="contact__socials">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      <span>{s.label}</span>
                      <span className="contact__handle">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
