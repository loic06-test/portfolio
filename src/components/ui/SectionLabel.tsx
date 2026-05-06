type Props = {
  index: string
  label: string
  className?: string
}

/** Editorial chapter mark — large italic display index + small mono label. */
export function SectionLabel({ index, label, className }: Props) {
  return (
    <div className={`section-label${className ? ` ${className}` : ''}`}>
      <span className="section-label__index" aria-hidden="true">
        {index}.
      </span>
      <span className="section-label__text">{label}</span>
    </div>
  )
}
