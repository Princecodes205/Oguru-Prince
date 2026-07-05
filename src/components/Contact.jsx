import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SheetCorners from './SheetCorners'

/* ----------------------------------------------------------
   Contact — direct email display + Web3Forms-backed form.
   Sheet 05 / 06. Form posts to Web3Forms' free endpoint, which
   forwards to princeoguru205@gmail.com. The "Open mail client"
   link is kept as a fallback for visitors with a mail handler.
   ---------------------------------------------------------- */

const EMAIL = 'princeoguru205@gmail.com'
const EMAIL_SUBJECT_PREFIX = '[Portfolio] '

// Web3Forms access key — get one at https://web3forms.com (free).
// Replace this constant if you ever rotate the key.
const WEB3FORMS_ACCESS_KEY = 'aa6cfd7a-8a42-4cea-a860-507f54aebdfa'

const socials = [
  { label: 'GitHub', handle: '@champs', href: '#' },
  { label: 'LinkedIn', handle: '/in/champs', href: '#' },
  { label: 'X / Twitter', handle: '@champs', href: '#' },
]

const initialForm = { name: '', email: '', subject: '', message: '' }

function SectionHeader() {
  return (
    <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
          Sheet 05 / 06
        </p>
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          Let's build
          <br />
          <span className="text-mono">something.</span>
        </h2>
      </div>
      <p className="max-w-md text-[14px] leading-relaxed text-mono md:text-right">
        Drop a line. Briefs, questions, and the occasional kind word
        all reach the same inbox.
      </p>
    </div>
  )
}

function CopyEmail({ value }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Older browsers / insecure contexts — fall back to a hidden
      // textarea + execCommand so the button still does something useful.
      const ta = document.createElement('textarea')
      ta.value = value
      ta.setAttribute('readonly', '')
      ta.style.position = 'absolute'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        // Give up silently — the mailto: link below still works.
      } finally {
        document.body.removeChild(ta)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="group inline-flex items-center gap-2 border border-line bg-transparent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mono transition-all hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function DirectPanel() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mono">
        Direct
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={`mailto:${EMAIL}`}
          className="font-display text-2xl font-medium leading-tight tracking-tight text-primary transition-colors hover:text-accent md:text-3xl"
        >
          {EMAIL}
        </a>
        <CopyEmail value={EMAIL} />
      </div>

      <a
        href={`mailto:${EMAIL}`}
        className="group mt-6 inline-flex w-fit items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-base transition-all hover:bg-accent-soft hover:border-accent-soft"
      >
        Open mail client
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>

      {/* Meta block */}
      <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
            Response time
          </dt>
          <dd className="mt-1 text-[14px] text-primary">Within 48 hours</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
            Timezone
          </dt>
          <dd className="mt-1 text-[14px] text-primary">WAT · UTC+1</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
            Elsewhere
          </dt>
          <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={`${s.label} (${s.handle})`}
                className="font-mono text-[12px] text-primary transition-colors hover:text-accent"
              >
                {s.label} <span className="text-mono">— {s.handle}</span>
              </a>
            ))}
          </dd>
        </div>
      </dl>
    </motion.div>
  )
}

function ContactForm() {
  const reduce = useReducedMotion()
  const [form, setForm] = useState(initialForm)
  // 'idle' | 'sending' | 'sent' | 'error' — drives the button label and
  // the inline status line below it.
  const [status, setStatus] = useState('idle')

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return // guard against double-submit

    setStatus('sending')

    const subject = `${EMAIL_SUBJECT_PREFIX}${form.subject || 'New enquiry'}`

    // Web3Forms reads these field names by convention. Botcheck is
    // a honeypot — real users don't fill it, bots do, and Web3Forms
    // silently drops submissions where it's set.
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: form.name,
      email: form.email,
      message: form.message,
      botcheck: '',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setStatus('sent')
        setForm(initialForm)
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      // Network failure / offline / CORS — surface a clear retry hint.
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const isSending = status === 'sending'
  const isSent = status === 'sent'
  const isError = status === 'error'

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col border border-line bg-panel"
    >
      <SheetCorners />

      {/* Sheet header */}
      <header className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          MSG-01
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mono">
          REV A
        </span>
      </header>

      {/* Fields */}
      <div className="flex flex-col gap-6 px-5 py-6">
        <Field
          label="Name"
          name="from_name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={update('name')}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          required
        />
        <Field
          label="Subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={update('subject')}
        />
        <Field
          label="Message"
          name="message"
          as="textarea"
          rows={5}
          value={form.message}
          onChange={update('message')}
          required
        />
      </div>

      {/* Submit row */}
      <div className="flex flex-col gap-3 border-t border-line px-5 py-4">
        <button
          type="submit"
          disabled={isSending}
          className="group inline-flex items-center justify-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-base transition-all hover:bg-accent-soft hover:border-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? 'Sending…' : isSent ? 'Message sent' : 'Send message'}
          <span
            aria-hidden="true"
            className={`inline-block transition-transform duration-300 ${
              !isSending && !isSent ? 'group-hover:translate-x-1' : ''
            }`}
          >
            {isSent ? '✓' : '→'}
          </span>
        </button>
        <p
          aria-live="polite"
          className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity ${
            isSent
              ? 'text-accent opacity-100'
              : isError
                ? 'text-accent opacity-100'
                : isSending
                  ? 'text-mono opacity-100'
                  : 'text-mono opacity-60'
          }`}
        >
          {isSent
            ? 'Got it. I’ll reply within 48 hours.'
            : isError
              ? 'Something went wrong — try again or email me directly.'
              : isSending
                ? 'Sending your message…'
                : 'Sent securely via Web3Forms — no data is stored on this site.'}
        </p>
      </div>
    </motion.form>
  )
}

function Field({ label, as = 'input', ...rest }) {
  const Tag = as
  const baseClass =
    'mt-2 w-full bg-transparent text-[15px] text-primary placeholder:text-mono/40 ' +
    'border-b border-line pb-2 ' +
    'focus:border-accent focus:outline-none transition-colors'

  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mono">
        {label}
      </span>
      <Tag className={`${baseClass} ${as === 'textarea' ? 'resize-y leading-relaxed' : ''}`} {...rest} />
    </label>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-line px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <DirectPanel />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
