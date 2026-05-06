import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { navItems } from '@/data/navigation'
import { personal } from '@/data/personal'
import './Header.css'

export function Header() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { y: -32, opacity: 0 })
    gsap.to(el, { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'expo.out' })
  }, [])

  return (
    <header ref={ref} className="header">
      <div className="header__inner container">
        <a href="#top" className="header__brand" aria-label="Retour en haut">
          <span className="header__brand-mark">{personal.initials}</span>
          <span className="header__brand-name">{personal.name}</span>
        </a>

        <nav
          className={`header__nav${open ? ' is-open' : ''}`}
          aria-label="Navigation principale"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <span className="header__nav-num">·</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__right">
          {personal.available && (
            <span className="header__status">
              <span className="header__status-dot" aria-hidden="true" />
              Disponible
            </span>
          )}
          <button
            type="button"
            className="header__menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
