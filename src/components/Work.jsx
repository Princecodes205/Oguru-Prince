import { motion, useReducedMotion } from 'motion/react'

/* ----------------------------------------------------------
   Selected Work — placeholder project grid.
   Swap in real projects by editing the `projects` array.
   Each entry: reference code, title, category, description,
   href (placeholder), and a `featured` flag for the
   larger first card.
   ---------------------------------------------------------- */

const projects = [
  {
    code: 'WD-024',
    title: 'Apex Logistics Brand System',
    category: 'Brand · Web',
    description:
      'Identity and web presence for a Lagos-based freight forwarder. Logo, type system, and a 6-page marketing site.',
    href: '#',
    featured: true,
  },
  {
    code: 'GD-018',
    title: 'Tarkwa Editorial Spread',
    category: 'Print · Layout',
    description:
      '12-page editorial feature on regional mining infrastructure. Custom grid, mono type pairings.',
    href: '#',
  },
  {
    code: 'WD-031',
    title: 'Strata Field Dashboard',
    category: 'Web · Tooling',
    description:
      'Internal field-data interface for a civil engineering consultancy. Tables, charts, offline-first.',
    href: '#',
  },
  {
    code: 'GD-022',
    title: 'Eko Music Festival Posters',
    category: 'Print · Identity',
    description:
      'Series of three posters for a Lagos music festival. Risograph-inspired palette, modular type system.',
    href: '#',
  },
]

function ProjectCard({ p, index }) {
  const reduce = useReducedMotion()

  // First card is featured: spans 2 cols on desktop, larger headline
  const isFeatured = p.featured

  return (
    <motion.a
      href={p.href}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col border border-line bg-panel transition-all duration-300 hover:border-accent/50 ${
        isFeatured
          ? 'md:col-span-2'
          : ''
      }`}
    >
      {/* Top row: reference code + category */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {p.code}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mono">
          {p.category}
        </span>
      </div>

      {/* Placeholder image area — hairline-bordered, mono tag inside */}
      <div
        className={`relative flex items-center justify-center border-b border-line bg-base/40 ${
          isFeatured ? 'aspect-[16/7]' : 'aspect-[4/3]'
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-mono/60">
          Visual · Pending
        </span>
        {/* Hairline crosshair — drawing convention */}
        <span className="absolute left-1/2 top-0 h-full w-px bg-line" aria-hidden="true" />
        <span className="absolute top-1/2 left-0 w-full h-px bg-line" aria-hidden="true" />
      </div>

      {/* Title + description + view link */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className={`font-display font-medium leading-tight text-primary ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {p.title}
        </h3>
        <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-mono">
          {p.description}
        </p>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-accent">
            View
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-line px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
              Sheet 03 / 06
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              Selected work,
              <br />
              <span className="text-mono">2018 to present.</span>
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-mono md:text-right">
            Real Projects will be added soon.
          </p>
        </div>

        {/* 2x2 bento grid, first card featured (spans 2 cols) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.code} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
