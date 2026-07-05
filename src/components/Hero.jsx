import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

/* ----------------------------------------------------------
   Node diagram — three disciplines radiating from a center hub.
   Drawn on load like a circuit being traced.
   Honors prefers-reduced-motion.
   ---------------------------------------------------------- */

const NODES = [
  {
    id: 'CE',
    code: 'CE-01',
    label: 'Civil Engineering',
    angle: -90, // top
    description: 'Structures, systems, foundations',
  },
  {
    id: 'GD',
    code: 'GD-01',
    label: 'Graphic Design',
    angle: 30, // bottom-right
    description: 'Identity, print, visual systems',
  },
  {
    id: 'WD',
    code: 'WD-01',
    label: 'Web & Dev',
    angle: 150, // bottom-left
    description: 'Interfaces, applications, code',
  },
]

function polarToCartesian(angle, radius) {
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

function NodeDiagram() {
  const reduce = useReducedMotion()
  const [drawn, setDrawn] = useState(false)

  // Trigger the draw once on mount
  useEffect(() => {
    if (reduce) {
      setDrawn(true)
      return
    }
    const t = setTimeout(() => setDrawn(true), 200)
    return () => clearTimeout(t)
  }, [reduce])

  const center = { x: 0, y: 0 }
  const radius = 130

  return (
    <div className="relative mx-auto w-full max-w-[480px] aspect-square">
      {/* Coordinate crosshair — engineering-drawing flourish */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="-200 -200 400 400"
        aria-hidden="true"
      >
        {/* Outer frame — like a drawing border */}
        <rect
          x="-180"
          y="-180"
          width="360"
          height="360"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Corner tick marks */}
        {[
          [-180, -180],
          [180, -180],
          [-180, 180],
          [180, 180],
        ].map(([x, y], i) => (
          <g key={i} stroke="var(--accent-soft)" strokeWidth="1.5">
            <line x1={x} y1={y} x2={x + (x < 0 ? 12 : -12)} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + (y < 0 ? 12 : -12)} />
          </g>
        ))}

        {/* Concentric guide circles — faint, technical */}
        <circle
          cx="0"
          cy="0"
          r={radius + 35}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.6"
        />
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Connection lines — drawn on load */}
        {NODES.map((node) => {
          const pos = polarToCartesian(node.angle, radius)
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={center.x}
              y1={center.y}
              x2={pos.x}
              y2={pos.y}
              stroke="var(--accent)"
              strokeWidth="1.5"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={
                reduce
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }
              }
              transition={{
                duration: 0.9,
                delay: 0.3 + NODES.indexOf(node) * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )
        })}

        {/* Tick marks along each spoke — halfway point */}
        {NODES.map((node) => {
          const pos = polarToCartesian(node.angle, radius / 2)
          return (
            <motion.circle
              key={`tick-${node.id}`}
              cx={pos.x}
              cy={pos.y}
              r="2"
              fill="var(--accent-soft)"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: drawn ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />
          )
        })}

        {/* Center hub — the practitioner */}
        <motion.g
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={reduce ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx="0" cy="0" r="22" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="6" fill="var(--accent)" />
        </motion.g>

        {/* Three outer nodes */}
        {NODES.map((node, i) => {
          const pos = polarToCartesian(node.angle, radius)
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={reduce ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.8 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="18"
                fill="var(--bg-panel)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill="var(--accent-soft)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em' }}
              >
                {node.id}
              </text>
            </motion.g>
          )
        })}

        {/* Code labels outside the diagram — like drawing annotations */}
        {NODES.map((node) => {
          const pos = polarToCartesian(node.angle, radius + 55)
          const anchor =
            node.angle === 30 ? 'start' : node.angle === 150 ? 'end' : 'middle'
          return (
            <motion.g
              key={`label-${node.id}`}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: drawn ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 1.2 + NODES.indexOf(node) * 0.1 }}
            >
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor={anchor}
                fill="var(--text-mono)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em' }}
              >
                {node.code}
              </text>
              <text
                x={pos.x}
                y={pos.y + 8}
                textAnchor={anchor}
                fill="var(--text-primary)"
                style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 500 }}
              >
                {node.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

function LagosAnnotation() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-6 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-mono md:block">
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 bg-accent" />
        <span>06.5244° N · 03.3792° E</span>
      </div>
      <div className="mt-1 pl-3.5 text-mono/70">Lagos, Nigeria</div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()

  const fadeUp = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center px-6 pt-24 md:pt-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Left — text stack */}
        <div className="relative">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
              Portfolio · 2026
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="font-display text-[40px] font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Oguru Ifeakachukwu
            <br />
            <span className="text-primary">Prince</span>
            <span className="ml-3 align-middle font-mono text-base font-normal tracking-[0.2em] text-accent md:text-lg">
              / champs
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="mt-6 max-w-[55ch] text-[15px] leading-relaxed text-mono md:text-base"
          >
            Civil engineering student building interfaces, identities, and
            interactive work. Where the math meets the mark.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-base transition-all hover:bg-accent-soft hover:border-accent-soft"
            >
              View Work
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 border border-line bg-transparent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary transition-all hover:border-accent hover:text-accent"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Mobile coordinate tag */}
          <div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mono md:hidden">
            <span className="inline-block h-1.5 w-1.5 bg-accent" />
            <span>06.5244° N · 03.3792° E · Lagos, Nigeria</span>
          </div>
        </div>

        {/* Right — node diagram */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <NodeDiagram />
        </motion.div>
      </div>

      <LagosAnnotation />
    </section>
  )
}
