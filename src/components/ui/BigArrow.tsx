import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import './BigArrow.css'

type Common = {
  children: ReactNode
  variant?: 'default' | 'inverse' | 'outline'
}

type AsLink = Common & {
  as?: 'a'
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>

type AsButton = Common & {
  as: 'button'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

type Props = AsLink | AsButton

/**
 * Big arrow CTA — billboard label + animated arrow. Massive scale, sharp.
 */
export function BigArrow(props: Props) {
  const { children, variant = 'default' } = props
  const className = `big-arrow big-arrow--${variant}${
    'className' in props && props.className ? ` ${props.className}` : ''
  }`

  const inner = (
    <>
      <span className="big-arrow__label">{children}</span>
      <span className="big-arrow__arrow" aria-hidden="true">
        →
      </span>
    </>
  )

  if (props.as === 'button') {
    const { children: _c, variant: _v, className: _cls, as: _a, ...rest } = props
    void _c; void _v; void _cls; void _a
    return (
      <button {...rest} className={className}>
        {inner}
      </button>
    )
  }

  const { children: _c, variant: _v, className: _cls, as: _a, ...rest } = props
  void _c; void _v; void _cls; void _a
  return (
    <a {...rest} className={className}>
      {inner}
    </a>
  )
}
