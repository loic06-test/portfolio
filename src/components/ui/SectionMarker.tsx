import { motion } from 'framer-motion'
import './SectionMarker.css'

type Props = {
  index: string
  label: string
  meta?: string
  className?: string
}

/**
 * Editorial chapter marker: [ 03 ─── EXPERTISES ─── meta ─── ]
 * Sits at the very top of every section as a strict horizontal rule.
 */
export function SectionMarker({ index, label, meta, className }: Props) {
  return (
    <motion.div
      className={`section-marker${className ? ` ${className}` : ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-marker__index">{index}</span>
      <span className="section-marker__rule" aria-hidden="true" />
      <span className="section-marker__label">{label}</span>
      {meta && (
        <>
          <span className="section-marker__rule section-marker__rule--end" aria-hidden="true" />
          <span className="section-marker__meta">{meta}</span>
        </>
      )}
    </motion.div>
  )
}
