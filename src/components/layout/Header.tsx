import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '@/data/navigation'
import { personal } from '@/data/personal'
import './Header.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll while mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <motion.header
      className={`header${scrolled ? ' is-scrolled' : ''}`}
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header__inner">
        <a href="#top" className="header__brand" aria-label="Retour en haut">
          <span className="header__brand-mark">{personal.initials}</span>
          <span className="header__brand-name">{personal.nameUpper}</span>
        </a>

        <nav className="header__nav" aria-label="Sections">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a href={item.href}>
                  <span className="header__nav-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="header__nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__right">
          {personal.available && (
            <span className="header__status">
              <span className="header__status-dot" aria-hidden="true" />
              Alternance 2026
            </span>
          )}
          <button
            type="button"
            className="header__menu-btn"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="header__sheet"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <ul className="header__sheet-nav">
              {navItems.map((item, i) => (
                <li key={item.id}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    <span className="header__sheet-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="header__sheet-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="header__sheet-foot">
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
              <span>{personal.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
