import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Initialise Lenis once and sync it with GSAP ScrollTrigger. */
export function useLenis(): void {
  const ref = useRef<Lenis | null>(null)

  useEffect(() => {
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
    // Keep GSAP's default lag smoothing — it actually helps when other
    // expensive frames (Sketchfab, etc.) cause hiccups.

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      ref.current = null
    }
  }, [])
}
