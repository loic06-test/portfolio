import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialise Lenis once and sync it with GSAP ScrollTrigger.
 *
 * Skipped on touch devices: Lenis fights iOS / Android native momentum and
 * caused the page to crash ("Impossible d'ouvrir cette page") under load on
 * top of the rest of the animation pipeline.
 */
export function useLenis(): void {
  const ref = useRef<Lenis | null>(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    ref.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      ref.current = null
    }
  }, [])
}
