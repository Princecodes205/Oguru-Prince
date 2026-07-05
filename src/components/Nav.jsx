import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import LogoMark from './LogoMark'

/* ----------------------------------------------------------
   Site revision tag — bump this as the site evolves.
   Rendered in mono, styled like a drawing revision number.
   ---------------------------------------------------------- */
const SITE_REV = '1.0'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-primary">
        CHAMPS
      </span>
    </a>
  )
}

function DesktopNav() {
  return (
    <nav className="flex items-center gap-8" aria-label="Primary">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="group relative font-mono text-[12px] uppercase tracking-[0.18em] text-mono transition-colors hover:text-primary"
        >
          {link.label}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>
      ))}
    </nav>
  )
}

function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-full border-b border-line bg-base/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-line py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-mono last:border-b-0 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Close mobile menu on resize past md breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-base/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px]">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          <DesktopNav />
          <span
            className="border border-line bg-panel px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mono"
            title="Drawing revision"
          >
            REV {SITE_REV}
          </span>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="block h-4 w-6 relative" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-full bg-primary transition-transform duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-primary transition-transform duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </span>
        </button>

        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  )
}
