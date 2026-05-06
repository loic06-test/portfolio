import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import './Button.css'

type Variant = 'primary' | 'ghost'

type ButtonAsButton = {
  as?: 'button'
  variant?: Variant
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

type ButtonAsLink = {
  as: 'a'
  href: string
  variant?: Variant
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>

type Props = ButtonAsButton | ButtonAsLink

export function Button(props: Props) {
  const variant: Variant = props.variant ?? 'primary'
  const className = `btn btn--${variant}${
    props.className ? ` ${props.className}` : ''
  }`

  const inner = (
    <>
      <span className="btn__label">{props.children}</span>
      <span className="btn__arrow" aria-hidden="true">
        →
      </span>
    </>
  )

  if (props.as === 'a') {
    const { as, variant: _v, children, className: _cls, ...rest } = props
    void as
    void _v
    void children
    void _cls
    return (
      <a {...rest} className={className}>
        {inner}
      </a>
    )
  }

  const { as, variant: _v, children, className: _cls, ...rest } = props
  void as
  void _v
  void children
  void _cls
  return (
    <button {...rest} className={className}>
      {inner}
    </button>
  )
}
