import LogoMark from './LogoMark'

/* ----------------------------------------------------------
   Footer — three-column site footer + colophon row.
   Sheet 06 / 06. Static; the sheet-rev language lives here.
   ---------------------------------------------------------- */

const sections = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const elsewhere = [
  { label: 'GitHub', handle: '@champs', href: '#' },
  { label: 'LinkedIn', handle: '/in/champs', href: '#' },
  { label: 'X / Twitter', handle: '@champs', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12 md:py-16">
        {/* Brand column */}
        <div>
          <a href="#top" className="group inline-flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-primary">
              CHAMPS
            </span>
          </a>
          <p className="mt-5 max-w-xs font-mono text-[12px] leading-relaxed text-mono">
            Civil engineering, graphic design, and the web — drafted in
            Lagos, shipped everywhere.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-mono/80">
            © {year} Oguru Ifeakachukwu Prince
          </p>
        </div>

        {/* Sections column */}
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
            Sections
          </p>
          <ul className="flex flex-col gap-3">
            {sections.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="group inline-flex items-center font-mono text-[12px] uppercase tracking-[0.18em] text-mono transition-colors hover:text-primary"
                >
                  {s.label}
                  <span className="ml-2 inline-block h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Elsewhere column */}
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
            Elsewhere
          </p>
          <ul className="flex flex-col gap-3">
            {elsewhere.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={`${s.label} (${s.handle})`}
                  className="font-mono text-[12px] text-primary transition-colors hover:text-accent"
                >
                  {s.label} <span className="text-mono">— {s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Colophon row */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mono md:flex-row md:items-center md:justify-between md:gap-4">
          <p>
            <span className="text-primary/80">Set in</span>{' '}
            Space Grotesk, JetBrains Mono, Inter
          </p>
          <p>
            <span className="text-primary/80">Built with</span>{' '}
            Vite · React 19 · Tailwind v4 · Motion
          </p>
          <p>
            <span className="text-primary/80">Sheet</span> 06 / 06 ·{' '}
            <span className="text-primary/80">Rev</span> 1.0
          </p>
        </div>
      </div>
    </footer>
  )
}
