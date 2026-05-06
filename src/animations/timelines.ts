import { gsap } from 'gsap'
import { splitChars } from './reveal'

/** Hero entrance: eyebrow, display title (per-line), subtitle, CTAs, meta. */
export function heroIntro(scope: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => {
      // Drop will-change once animation is done — keeping it forever pins the
      // elements to their own composite layer for nothing.
      scope
        .querySelectorAll<HTMLElement>(
          '[data-hero="eyebrow"], .hero__sub, .hero__ctas > span, .hero__meta',
        )
        .forEach((el) => {
          el.style.willChange = 'auto'
        })
    },
  })

  const eyebrow = scope.querySelector<HTMLElement>('[data-hero="eyebrow"]')
  const lines = scope.querySelectorAll<HTMLElement>('[data-hero="line"]')
  const sub = scope.querySelector<HTMLElement>('[data-hero="sub"]')
  const ctas = scope.querySelectorAll<HTMLElement>('[data-hero="cta"]')
  const meta = scope.querySelectorAll<HTMLElement>('[data-hero="meta"]')

  if (eyebrow) {
    tl.fromTo(
      eyebrow,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.85 },
      0.15,
    )
  }

  lines.forEach((line, i) => {
    const inner = line.parentElement
    if (inner?.classList.contains('reveal-line__inner')) {
      tl.to(inner, { yPercent: 0, duration: 1.15 }, 0.25 + i * 0.08)
    }
  })

  if (sub) {
    const chars = splitChars(sub)
    gsap.set(sub, { opacity: 1 })
    gsap.set(chars, { opacity: 0, y: 12 })
    tl.to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.012 }, 0.85)
  }

  if (ctas.length) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
      1.05,
    )
  }

  if (meta.length) {
    tl.fromTo(
      meta,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
      1.15,
    )
  }

  return tl
}
