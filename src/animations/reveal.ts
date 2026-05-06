import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Reveal `.reveal-line__inner` blocks (text wrapped in `.reveal-line`). */
export function revealLines(
  scope: HTMLElement,
  options: {
    trigger?: HTMLElement
    delay?: number
    stagger?: number
    duration?: number
    start?: string
  } = {},
): gsap.core.Tween {
  const targets = scope.querySelectorAll<HTMLElement>('.reveal-line__inner')
  return gsap.to(targets, {
    yPercent: 0,
    duration: options.duration ?? 1.05,
    ease: 'expo.out',
    stagger: options.stagger ?? 0.08,
    delay: options.delay ?? 0,
    scrollTrigger: options.trigger
      ? {
          trigger: options.trigger,
          start: options.start ?? 'top 80%',
          once: true,
        }
      : undefined,
  })
}

/** Fade-up reveal for arbitrary nodes marked `.reveal-fade`. */
export function revealFade(
  scope: HTMLElement,
  options: {
    trigger?: HTMLElement
    delay?: number
    stagger?: number
    start?: string
  } = {},
): gsap.core.Tween {
  const targets = scope.querySelectorAll<HTMLElement>('.reveal-fade')
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'expo.out',
    stagger: options.stagger ?? 0.1,
    delay: options.delay ?? 0,
    scrollTrigger: options.trigger
      ? {
          trigger: options.trigger,
          start: options.start ?? 'top 82%',
          once: true,
        }
      : undefined,
  })
}

/** Wrap each character of a text node in a span — used for fine-grained reveals. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  const chars: HTMLElement[] = []
  for (const ch of text) {
    const span = document.createElement('span')
    span.textContent = ch
    span.style.display = 'inline-block'
    span.style.willChange = 'transform, opacity'
    if (ch === ' ') span.innerHTML = '&nbsp;'
    el.appendChild(span)
    chars.push(span)
  }
  return chars
}
