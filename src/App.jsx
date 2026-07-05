import Nav from './components/Nav'
import Hero from './components/Hero'
import Disciplines from './components/Disciplines'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

/* ============================================================
   v1.0 — single page
   Sections:
     [x] Nav
     [x] Hero
     [x] Disciplines
     [x] Selected Work
     [x] About
     [x] Contact
     [x] Footer
   ============================================================ */

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Disciplines />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
