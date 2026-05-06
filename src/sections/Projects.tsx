import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { RevealLine } from '@/components/ui/RevealLine'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { projects } from '@/data/projects'
import './Projects.css'

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = projects.find((p) => p.id === activeId) ?? null

  return (
    <section id="projects" className="section section--projects">
      <div className="container">
        <SectionMarker
          index="03"
          label="Projets"
          meta={`${projects.length} études de cas — 2025 / 2026`}
        />

        <div className="projects__head">
          <h2 className="projects__title display">
            <RevealLine inView delay={0}>Sélection</RevealLine>
            <RevealLine inView delay={0.08} italic accent>
              éditoriale.
            </RevealLine>
          </h2>
          <p className="projects__intro">
            De la chaîne Twitch au cabinet médical, du club sportif au projet
            musical — chaque projet raconte la même obsession :{' '}
            <em>la cohérence</em>.
            <br />
            <span className="projects__intro-hint">
              Cliquez sur un projet pour voir le visuel et le détail.
            </span>
          </p>
        </div>
      </div>

      <ul className="projects__list">
        {projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            onSelect={() => setActiveId(p.id)}
          />
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

type RowProps = {
  project: (typeof projects)[number]
  index: number
  onSelect: () => void
}

function ProjectRow({ project, index, onSelect }: RowProps) {
  const reduced = useReducedMotion()

  return (
    <motion.li
      className="project-row-wrap"
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{
        duration: 0.85,
        delay: (index % 4) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        className="project-row"
        onClick={onSelect}
        aria-label={`Ouvrir le projet ${project.title}`}
      >
        <span className="project-row__index">{project.index}</span>
        <span className="project-row__title">{project.title}</span>
        <span className="project-row__category">{project.category}</span>
        <span className="project-row__year">{project.year}</span>
        <span className="project-row__arrow" aria-hidden="true">
          ↗
        </span>
      </button>
    </motion.li>
  )
}
