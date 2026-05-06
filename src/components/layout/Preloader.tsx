import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { personal } from '@/data/personal'
import './Preloader.css'

type Props = {
  /** Fires the moment the exit animation begins — use this to start animating
   *  the page underneath in parallel with the curtain reveal. */
  onAnimateOutStart?: () => void
  /** Fires once the preloader is fully offscreen — safe to unmount. */
  onComplete: () => void
  /** Minimum visible duration (ms). The preloader will not exit before this,
   *  even if assets and the 3D scene resolve faster. */
  minDuration?: number
  /** Hard ceiling — exits even if `scene:ready` never fires. */
  maxDuration?: number
}

/**
 * Premium intro screen.
 *
 * Exit conditions (all must be true):
 *   1. minDuration elapsed
 *   2. window `load` event has fired (all CSS / JS / images ready)
 *   3. a `scene:ready` window event has fired (Sketchfab viewer reports
 *      `viewerready`, broadcast by `DragonScene`)
 *
 * If condition 3 never fires, `maxDuration` forces the exit so the user is
 * never stuck on the preloader.
 */
export function Preloader({
  onAnimateOutStart,
  onComplete,
  minDuration = 1600,
  maxDuration = 14000,
}: Props) {
  const root = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.classList.add('is-preloading')
    return () => {
      document.body.classList.remove('is-preloading')
    }
  }, [])

  useEffect(() => {
    const root_ = root.current
    if (!root_) return

    // ---- Entrance timeline ----
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    if (nameRef.current) {
      const inner = nameRef.current.querySelector<HTMLElement>(
        '.reveal-line__inner',
      )
      if (inner) {
        tl.to(inner, { yPercent: 0, duration: 1.2 }, 0.1)
      }
    }
    if (captionRef.current) {
      tl.from(captionRef.current, { opacity: 0, y: 12, duration: 0.7 }, 0.45)
    }
    if (barRef.current) {
      tl.from(barRef.current.parentElement, { opacity: 0, duration: 0.5 }, 0.55)
    }

    // ---- Readiness signals ----
    // The `scene:ready` window event can fire before this listener attaches if
    // the dragon resolves very fast — we honor a window latch set by
    // DragonScene to recover from that race.
    const ready = {
      load: document.readyState === 'complete',
      scene: Boolean(window.__sceneReady),
    }

    const onWinLoad = () => {
      ready.load = true
    }
    if (!ready.load) {
      window.addEventListener('load', onWinLoad, { once: true })
    }

    const onSceneReady = () => {
      ready.scene = true
    }
    if (!ready.scene) {
      window.addEventListener('scene:ready', onSceneReady, { once: true })
    }

    // ---- Counter / bar progression ----
    const start = performance.now()
    let raf = 0
    let exiting = false

    const tick = (now: number) => {
      const elapsed = now - start
      // Visible counter is decoupled from real-load progress: it always reaches
      // ~95% by minDuration, then crawls to 100% as soon as both signals fire.
      const minRatio = Math.min(1, elapsed / minDuration)
      const easedMin = 1 - Math.pow(1 - minRatio, 3)
      const baseline = easedMin * 0.95
      const allReady = ready.load && ready.scene
      const target = allReady ? 1 : baseline
      // smooth toward target
      const current = progressRef.current
      const next = current + (target - current) * 0.12
      progressRef.current = next

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${next})`
      }
      setProgress(Math.round(next * 100))

      const beyondMin = elapsed >= minDuration
      const beyondMax = elapsed >= maxDuration
      const finished = next > 0.995

      if (!exiting && ((beyondMin && allReady && finished) || beyondMax)) {
        exiting = true
        beginExit()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const progressRef = { current: 0 }

    const beginExit = () => {
      onAnimateOutStart?.()
      const exitTl = gsap.timeline({
        onComplete: () => {
          onComplete()
        },
      })
      exitTl
        .to(
          [captionRef.current, counterRef.current?.parentElement],
          { opacity: 0, y: -10, duration: 0.45, ease: 'power2.in' },
          0,
        )
        .to(
          nameRef.current?.querySelector('.reveal-line__inner') ?? null,
          { yPercent: -110, duration: 0.9, ease: 'expo.in' },
          0.05,
        )
        .to(
          root_,
          { yPercent: -100, duration: 1.05, ease: 'expo.inOut' },
          0.35,
        )
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onWinLoad)
      window.removeEventListener('scene:ready', onSceneReady)
      tl.kill()
    }
  }, [minDuration, maxDuration, onComplete, onAnimateOutStart])

  const padded = String(progress).padStart(3, '0')

  return (
    <div ref={root} className="preloader" role="status" aria-live="polite">
      <div className="preloader__top">
        <span className="preloader__mark">{personal.initials}</span>
        <span className="preloader__sig">Portfolio · 2026</span>
      </div>

      <div className="preloader__center">
        <div ref={nameRef} className="reveal-line preloader__name">
          <span className="reveal-line__inner">{personal.name}</span>
        </div>
        <div ref={captionRef} className="preloader__caption">
          {personal.role}
        </div>
      </div>

      <div className="preloader__bottom">
        <div className="preloader__bar-wrap">
          <span ref={barRef} className="preloader__bar" />
        </div>
        <div className="preloader__counter-row">
          <span className="preloader__counter-label">Chargement</span>
          <span>
            <span ref={counterRef} className="preloader__counter">
              {padded}
            </span>
            <span className="preloader__counter-pct">%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
