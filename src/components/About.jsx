import { motion, useReducedMotion } from 'motion/react'
import SheetCorners from './SheetCorners'

/* ----------------------------------------------------------
   About — long-form bio + facts sidebar.
   Sheet 04 / 06. Reuses the spec-sheet panel convention from
   Disciplines and Work; same fade-up motion recipe.
   ---------------------------------------------------------- */

const facts = [
  { label: 'Based in', value: 'Lagos, Nigeria' },
  { label: 'Currently', value: 'B.Sc. Civil Engineering · freelance design/dev' },
  { label: 'Stack', value: 'React, Tailwind, Motion, Figma, AutoCAD' },
  { label: 'Reading', value: 'TBD' },
  { label: 'Coords', value: '06.5244° N · 03.3792° E' },
  { label: 'Availability', value: 'Open to freelance' },
]

function SectionHeader() {
  return (
    <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
          Sheet 04 / 06
        </p>
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          About the
          <br />
          <span className="text-mono">practitioner.</span>
        </h2>
      </div>
      <p className="max-w-md text-[14px] leading-relaxed text-mono md:text-right">
        One head, three drafts. The drawing is the same — load paths,
        visual logic, and shipped interfaces.
      </p>
    </div>
  )
}

function BioColumn() {
  const reduce = useReducedMotion()

  const fadeUp = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }

  return (
    <motion.div {...fadeUp} className="space-y-5 text-[15px] leading-relaxed text-mono md:text-base">
      <p>
        I'm <span className="text-primary">Oguru Ifeakachukwu Prince</span> —
        a civil engineering student in Lagos who got pulled into design and
        front-end work and never quite climbed back out. The site you're
        reading is the practice that fell out of that pull.
      </p>
      <p>
        The day job is structural analysis, surveying, and the math that
        holds buildings up. The night job is identity systems, editorial
        spreads, and the small interactive work that ships on the web.
        Same instincts, different mediums — load paths become visual
        hierarchy, drafting conventions become design systems.
      </p>
      <p>
        I take on a small number of freelance projects each year, mostly
        for studios and founders who need someone who can think in
        sections and write the markup too. If that sounds like your
        problem, the contact sheet is one click away.
      </p>
      <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mono/80">
        General notes · drafted in Lagos · last revised 2026
      </p>
    </motion.div>
  )
}

function FactsPanel() {
  const reduce = useReducedMotion()

  return (
    <motion.aside
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col border border-line bg-panel"
    >
      <SheetCorners />

      {/* Sheet header */}
      <header className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          ABOUT-01
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mono">
          REV A
        </span>
      </header>

      {/* Facts list */}
      <dl className="divide-y divide-line">
        {facts.map((f) => (
          <div
            key={f.label}
            className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
              {f.label}
            </dt>
            <dd className="text-[14px] text-primary">{f.value}</dd>
          </div>
        ))}
      </dl>
    </motion.aside>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <BioColumn />
          <FactsPanel />
        </div>
      </div>
    </section>
  )
}
