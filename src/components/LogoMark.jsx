/* ----------------------------------------------------------
   LogoMark — geometric square mark for the brand.
   A 7×7 quadrant-divided square with a single accent pixel at
   the center. Used in the Nav header and the Footer.
   ---------------------------------------------------------- */

export default function LogoMark({ className = '' }) {
  return (
    <span
      className={`relative inline-block h-7 w-7 border border-line bg-panel transition-colors group-hover:border-accent ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-0 h-full w-px bg-line" />
      <span className="absolute top-1/2 left-0 w-full h-px bg-line" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-accent" />
    </span>
  )
}
