/* ----------------------------------------------------------
   SheetCorners — four hairline corner brackets for spec panels.
   Used on the spec-sheet panels in Disciplines, Work, About, and
   Contact so the drawing convention stays consistent.
   ---------------------------------------------------------- */

export default function SheetCorners() {
  return (
    <>
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
    </>
  )
}
