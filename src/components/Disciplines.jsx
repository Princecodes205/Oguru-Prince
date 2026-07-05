import { motion, useReducedMotion } from 'motion/react'

/* ----------------------------------------------------------
   Disciplines — three spec-sheet panels.
   Drawing-sheet conventions: sheet code (top-left),
   rev tag (top-right), title block at the bottom.
   ---------------------------------------------------------- */

const disciplines = [
  {
    code: 'CE-01',
    rev: 'A',
    title: 'Civil Engineering',
    role: 'Foundation discipline',
    description:
      'Structures, systems, and the math that holds things up. Where the rest of the practice is grounded.',
    skills: [
      'Structural analysis',
      'CAD / drafting',
      'Surveying',
      'Materials science',
      'Project planning',
    ],
  },
  {
    code: 'GD-01',
    rev: 'A',
    title: 'Graphic Design',
    role: 'Visual language',
    description:
      'Identity systems, print, and visual logic. The work that makes ideas legible at a glance.',
    skills: [
      'Brand identity',
      'Typography',
      'Print design',
      'Layout systems',
      'Visual research',
    ],
  },
  {
    code: 'WD-01',
    rev: 'A',
    title: 'Web Design & Dev',
    role: 'Practice',
    description:
      'Interfaces and the code underneath them. From static pages to interactive applications.',
    skills: [
      'UI / UX design',
      'React / Next.js',
      'Tailwind CSS',
      'Motion / interaction',
      'Responsive systems',
    ],
  },
]

function Panel({ d, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col border border-line bg-panel transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_0_1px_var(--accent),0_8px_30px_-12px_rgba(124,58,237,0.25)]"
    >
      {/* Sheet corner brackets — like a real drawing sheet */}
      <span
        className="absolute left-0 top-0 h-2 w-2 border-l border-t border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute right-0 top-0 h-2 w-2 border-r border-t border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent"
        aria-hidden="true"
      />

      {/* Sheet header — sheet code + rev tag */}
      <header className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {d.code}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mono">
          REV {d.rev}
        </span>
      </header>

      {/* Body — title, role, description */}
      <div className="flex-1 px-5 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
          {d.role}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-medium leading-tight text-primary">
          {d.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-mono">
          {d.description}
        </p>
      </div>

      {/* Title block — separator + skills list */}
      <div className="border-t border-line px-5 py-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-mono/80">
          Spec · Skills
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
          {d.skills.map((skill) => (
            <li
              key={skill}
              className="font-mono text-[11px] text-primary"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function Disciplines() {
  return (
    <section
      id="disciplines"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
              Sheet 02 / 06
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              Three disciplines,
              <br />
              <span className="text-mono">one practice.</span>
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-mono md:text-right">
            Each sheet is a working surface. They cross-reference, they
            borrow, and they keep the work honest.
          </p>
        </div>

        {/* Panel grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {disciplines.map((d, i) => (
            <Panel key={d.code} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
