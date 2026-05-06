import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import './ProjectModal.css'

type Props = {
  project: Project
  onClose: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export function ProjectModal({ project, onClose }: Props) {
  // Lock scroll + close on ESC
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const imgBg =
    project.coverBg && project.coverBg !== 'dark'
      ? project.coverBg === 'white'
        ? '#ffffff'
        : project.coverBg
      : '#14110f'

  return (
    <motion.div
      className="pmodal"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pmodal-title"
    >
      <motion.div
        className="pmodal__panel"
        variants={panelVariants}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="pmodal__close"
          aria-label="Fermer"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
          Fermer
        </button>

        <div className="pmodal__head">
          <span className="pmodal__index">{project.index}</span>
          <span className="pmodal__category">{project.category}</span>
          <span className="pmodal__year">{project.year}</span>
        </div>

        <h3 id="pmodal-title" className="pmodal__title display">
          {project.title}
        </h3>

        <div className="pmodal__client">{project.client}</div>

        <div
          className="pmodal__visual"
          style={{ background: imgBg }}
        >
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title}
              className={`pmodal__img${
                project.coverFit === 'contain' ? ' pmodal__img--contain' : ''
              }`}
              style={{
                objectPosition: project.coverPosition ?? 'center',
                padding:
                  project.coverFit === 'contain'
                    ? project.coverPadding ?? 'clamp(1rem, 4vw, 3rem)'
                    : 0,
              }}
              loading="eager"
              decoding="async"
            />
          ) : (
            <span className="pmodal__placeholder display">
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        <p className="pmodal__excerpt">{project.excerpt}</p>

        <div className="pmodal__scope">
          <span className="mono">Périmètre</span>
          <ul>
            {project.scope.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
