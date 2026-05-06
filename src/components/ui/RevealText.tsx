import type { ReactNode } from 'react'

type RevealLineProps = {
  children: ReactNode
  className?: string
  /** Render the outer wrapper as a `div` instead of a `span`. */
  block?: boolean
}

/**
 * Wraps a single line of text in the masked-reveal markup.
 * Pair with `revealLines()` from animations/reveal.ts.
 */
export function RevealLine({ children, className, block }: RevealLineProps) {
  const cls = `reveal-line${className ? ` ${className}` : ''}`
  if (block) {
    return (
      <div className={cls}>
        <span className="reveal-line__inner">{children}</span>
      </div>
    )
  }
  return (
    <span className={cls}>
      <span className="reveal-line__inner">{children}</span>
    </span>
  )
}
