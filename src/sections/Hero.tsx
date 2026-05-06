import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { RevealLine } from '@/components/ui/RevealText'
import { personal } from '@/data/personal'
import { heroIntro } from '@/animations/timelines'
import './Hero.css'

const DragonScene = lazy(() =>
  import('@/components/3d/DragonScene').then((m) => ({ default: m.DragonScene })),
)

type HeroProps = {
  /** When false, the hero stays in its initial hidden state until the
   *  preloader signals that the site is ready. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!ready) return
    const el = ref.current
    if (!el) return
    const ctx = heroIntro(el)
    return () => {
      ctx.kill()
    }
  }, [ready])

  return (
    <section ref={ref} id="top" className="hero">
      <div className="hero__scene">
        <Suspense fallback={<div className="hero__scene-placeholder" aria-hidden />}>
          <DragonScene className="hero__canvas" />
        </Suspense>
        <div className="hero__scene-vignette" aria-hidden="true" />
      </div>

      <div className="container hero__content">
        <div className="hero__head">
          <span className="eyebrow" data-hero="eyebrow">
            Portfolio — {personal.role}
          </span>
        </div>

        <h1 className="display hero__title">
          <RevealLine className="hero__title-line">
            <span data-hero="line">Marques <em>vivantes.</em></span>
          </RevealLine>
          <RevealLine className="hero__title-line">
            <span data-hero="line">Stratégies <em>tenues.</em></span>
          </RevealLine>
          <RevealLine className="hero__title-line">
            <span data-hero="line">Expériences <em>mémorables.</em></span>
          </RevealLine>
        </h1>

        <p className="hero__sub" data-hero="sub">
          {personal.short}
        </p>

        <div className="hero__ctas">
          <span data-hero="cta">
            <Magnetic>
              <Button as="a" href="#projects">
                Voir les projets
              </Button>
            </Magnetic>
          </span>
          <span data-hero="cta">
            <Magnetic>
              <Button as="a" href="#contact" variant="ghost">
                Prendre contact
              </Button>
            </Magnetic>
          </span>
        </div>

        <div className="hero__meta-row">
          <div className="hero__meta" data-hero="meta">
            <span className="hero__meta-label">Statut</span>
            <span className="hero__meta-value">{personal.status}</span>
          </div>
          <div className="hero__meta" data-hero="meta">
            <span className="hero__meta-label">Approche</span>
            <span className="hero__meta-value">Communication · Création · Digital</span>
          </div>
          <div className="hero__meta" data-hero="meta">
            <span className="hero__meta-label">Origine</span>
            <span className="hero__meta-value">{personal.location} · {personal.origin}</span>
          </div>
        </div>
      </div>

    </section>
  )
}
