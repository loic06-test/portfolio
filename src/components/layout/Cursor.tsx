import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { damp } from '@/utils/math'
import './Cursor.css'

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor="hover"]'

/**
 * Premium custom cursor — minimal dot + outline ring with damped follow.
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)')

  useEffect(() => {
    if (reduced || coarse) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let dotX = targetX
    let dotY = targetY
    let ringX = targetX
    let ringY = targetY
    let raf = 0
    let last = performance.now()
    let lastInteractive: Element | null = null
    let isHover = false
    let firstMove = false

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      // Defer making the cursor visible until the user moves the mouse, so we
      // don't briefly flash a centered dot before the first real position.
      if (!firstMove) {
        firstMove = true
        // Snap follower positions to first known location to avoid the long
        // tween in from the screen center.
        dotX = targetX
        dotY = targetY
        ringX = targetX
        ringY = targetY
        dot.classList.add('is-active')
        ring.classList.add('is-active')
      }
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')

    // Hover detection — only does DOM work when the closest interactive
    // ancestor actually changes. Closest() on every pointermove was the bulk
    // of the previous overhead.
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      const interactive = target?.closest(INTERACTIVE_SELECTOR) ?? null
      if (interactive === lastInteractive) return
      lastInteractive = interactive
      const next = Boolean(interactive)
      if (next !== isHover) {
        isHover = next
        ring.classList.toggle('is-hover', next)
      }
    }

    const tick = () => {
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      dotX = damp(dotX, targetX, 30, dt)
      dotY = damp(dotY, targetY, 30, dt)
      ringX = damp(ringX, targetX, 9, dt)
      ringY = damp(ringY, targetY, 9, dt)
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    document.body.classList.add('has-custom-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointerover', onOver, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointerover', onOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [reduced, coarse])

  if (reduced || coarse) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
