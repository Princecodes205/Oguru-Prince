import Nav from './components/Nav'
import Hero from './components/Hero'
import Disciplines from './components/Disciplines'
import Work from './components/Work'

/* ============================================================
   v1.0 — single page
   Sections:
     [x] Nav
     [x] Hero
     [x] Disciplines
     [x] Selected Work
     [ ] About
     [ ] Contact
     [ ] Footer
   ============================================================ */

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Disciplines />
        <Work />
      </main>
    </>
  )
}
