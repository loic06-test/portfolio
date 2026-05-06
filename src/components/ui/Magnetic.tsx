import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * Magnetic hover — single rAF loop per element with auto-pause when settled.
 *
 * Avoids the previous implementation (which spawned a `gsap.to()` tween on
 * every `pointermove`, ~120/s — heavy under load).
 */
export function Magnetic({ children, strength = 0.22, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = 0

    const tick = () => {
      curX += (targetX - curX) * 0.18
      curY += (targetY - curY) * 0.18
      el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`
      const settled =
        Math.abs(targetX - curX) < 0.05 && Math.abs(targetY - curY) < 0.05
      if (settled) {
        raf = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
    }

    const ensureRunning = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = (e.clientX - rect.left - rect.width / 2) * strength
      targetY = (e.clientY - rect.top - rect.height / 2) * strength
      ensureRunning()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      ensureRunning()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced, strength])

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
