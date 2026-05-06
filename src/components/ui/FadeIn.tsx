import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
  /** Override threshold/margin */
  margin?: string
}

/** Vanilla fade-up on first viewport intersection. */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className,
  margin = '-8% 0px',
}: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{
        delay,
        duration: reduced ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
