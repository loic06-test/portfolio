import { personal } from '@/data/personal'
import { socialLinks } from '@/data/social'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <span className="eyebrow">Contact</span>
          <a className="footer__line footer__link" href={`mailto:${personal.email}`}>
            {personal.email}
          </a>
          <a className="footer__line footer__link" href={`tel:${personal.phone.replace(/\s/g, '')}`}>
            {personal.phone}
          </a>
          <p className="footer__line footer__line--soft">
            {personal.location} · {personal.origin}
          </p>
        </div>

        <div className="footer__col">
          <span className="eyebrow">Réseaux</span>
          <ul>
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

        <div className="footer__col footer__col--end">
          <span className="eyebrow">Colophon</span>
          <p className="footer__line">
            Étudiant BUT GEA · option GEMA — IUT Nice Côte d’Azur. Disponible en
            alternance dès la rentrée 2026.
          </p>
        </div>
      </div>

      <div className="container footer__legal">
        <span>© {year} {personal.name}</span>
        <span>Tous droits réservés.</span>
      </div>
    </footer>
  )
}
