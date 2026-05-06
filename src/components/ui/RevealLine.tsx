import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  children: ReactNode
  delay?: number
  /** Trigger on viewport entry instead of immediately on mount. */
  inView?: boolean
  /** Italic serif treatment — for editorial accents inside a display title. */
  italic?: boolean
  /** Apply accent colour. */
  accent?: boolean
  className?: string
}

/**
 * Block-level title line with a fade-up reveal.
 *
 * Implementation: an outer `<span>` with hardcoded `display: block` is the
 * line container — its `display` cannot be overridden because the inline
 * style wins over class CSS, and we control its element directly (Framer
 * Motion is one layer deeper). The inner `motion.span` only runs the
 * transform animation; it never participates in the line stacking.
 */
export function RevealLine({
  children,
  delay = 0,
  inView,
  italic,
  accent,
  className,
}: Props) {
  const reduced = useReducedMotion()
  const initial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
  const target = { opacity: 1, y: 0 }
  const transition = {
    delay,
    duration: reduced ? 0 : 0.85,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  }

  const wrapStyle: CSSProperties = { display: 'block' }
  const innerStyle: CSSProperties = {
    display: 'inline-block',
    willChange: 'transform, opacity',
  }

  return (
    <span
      className={[
        'reveal-line',
        italic && 'reveal-line--italic',
        accent && 'reveal-line--accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={wrapStyle}
    >
      <motion.span
        style={innerStyle}
        initial={initial}
        {...(inView
          ? { whileInView: target, viewport: { once: true, margin: '-12% 0px' } }
          : { animate: target })}
        transition={transition}
      >
        {children}
      </motion.span>
    </span>
  )
}
