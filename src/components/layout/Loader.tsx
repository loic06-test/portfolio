import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { personal } from '@/data/personal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Loader.css'

type Props = {
  onComplete: () => void
  onAnimateOut?: () => void
  minDuration?: number
}

/**
 * Brutalist Billboard loader.
 *
 *  - Counter 000 → 100 (mono, top-right)
 *  - Massive name (Anton, billboard) revealed via mask
 *  - Bottom: marquee word
 *  - Exit: panel slides up (curtain)
 */
export function Loader({ onComplete, onAnimateOut, minDuration = 1700 }: Props) {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const controls = useAnimationControls()

  useEffect(() => {
    document.body.classList.add('is-loading')
    return () => {
      document.body.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const loadFired = { current: document.readyState === 'complete' }
    const onLoad = () => {
      loadFired.current = true
    }
    if (!loadFired.current) window.addEventListener('load', onLoad, { once: true })

    const tick = (now: number) => {
      const elapsed = now - start
      const ratio = Math.min(1, elapsed / minDuration)
      const eased = 1 - Math.pow(1 - ratio, 3)
      const value = Math.round(eased * (loadFired.current ? 100 : 95))
      setProgress(value)
      if (value < 100 || !loadFired.current) {
        raf = requestAnimationFrame(tick)
      } else {
        beginExit()
      }
    }

    const beginExit = async () => {
      onAnimateOut?.()
      if (reduced) {
        onComplete()
        return
      }
      await controls.start({
        y: '-100%',
        transition: { duration: 0.95, ease: [0.83, 0, 0.17, 1] },
      })
      onComplete()
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
    }
  }, [controls, minDuration, onAnimateOut, onComplete, reduced])

  const padded = String(progress).padStart(3, '0')

  return (
    <motion.div
      ref={root}
      className="loader"
      animate={controls}
      initial={{ y: 0 }}
      role="status"
      aria-live="polite"
    >
      <div className="loader__top">
        <span className="loader__mark">{personal.initials}</span>
        <span className="loader__counter">
          [ <span className="loader__counter-num">{padded}</span> /100 ]
        </span>
      </div>

      <div className="loader__center">
        <motion.span
          className="loader__name"
          aria-label={personal.name}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: reduced ? 0 : 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {personal.nameUpper}
        </motion.span>
      </div>

      <div className="loader__bottom">
        <span className="loader__sig">PORTFOLIO — ÉDITION 2026</span>
        <span className="loader__progress" aria-hidden="true">
          <span
            className="loader__progress-bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </span>
        <span className="loader__caption">{personal.role}</span>
      </div>
    </motion.div>
  )
}
