import { personal } from '@/data/personal'
import { socialLinks } from '@/data/social'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__status">
        <span className="footer__status-item">
          <span className="footer__status-dot" aria-hidden="true" />
          Disponible · Alternance 2026
        </span>
        <span className="footer__status-item">★ {personal.email}</span>
        <span className="footer__status-item">★ {personal.location}</span>
      </div>

      <div className="footer__inner">
        <div className="footer__col">
          <span className="mono">Index</span>
          <div className="footer__index">{personal.initials}</div>
        </div>

        <div className="footer__col">
          <span className="mono">Contact</span>
          <a className="footer__link" href={`mailto:${personal.email}`}>
            {personal.email}
          </a>
          <a
            className="footer__link"
            href={`tel:${personal.phone.replace(/\s/g, '')}`}
          >
            {personal.phone}
          </a>
        </div>

        <div className="footer__col">
          <span className="mono">Réseaux</span>
          <ul className="footer__socials">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <span>{s.label}</span>
                  <span className="footer__handle">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <span className="mono">Localisation</span>
          <p className="footer__line">{personal.location}</p>
          <p className="footer__line footer__line--soft">{personal.origin}</p>
        </div>
      </div>

      <div className="footer__legal">
        <span>© {year} {personal.name}</span>
        <span>Brutalist Billboard / Edition 2026</span>
        <span>Site conçu et codé sur-mesure.</span>
      </div>
    </footer>
  )
}
