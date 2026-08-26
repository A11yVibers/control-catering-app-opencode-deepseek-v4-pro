import { useState } from 'react'

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: '📸' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: '👍' },
  { label: 'X (Twitter)', href: 'https://x.com/', icon: '🐦' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__subtitle">
            Questions about a menu, an ingredient, or a special request? We’d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-page__layout">
          <div className="contact-page__channels">
            <div className="contact-channel">
              <span className="contact-channel__icon" aria-hidden="true">📞</span>
              <div>
                <h2>Call or text</h2>
                <p>
                  <a href="tel:+15551234567">(555) 123-4567</a>
                </p>
                <p className="contact-channel__muted">Mon–Sat, 9am–6pm</p>
              </div>
            </div>

            <div className="contact-channel">
              <span className="contact-channel__icon" aria-hidden="true">✉️</span>
              <div>
                <h2>Email</h2>
                <p>
                  <a href="mailto:hello@hearthharvest.com">hello@hearthharvest.com</a>
                </p>
                <p className="contact-channel__muted">We reply within one business day.</p>
              </div>
            </div>

            <div className="contact-channel">
              <span className="contact-channel__icon" aria-hidden="true">🌐</span>
              <div>
                <h2>Follow along</h2>
                <ul className="contact-page__socials">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        <span aria-hidden="true">{s.icon}</span> {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-form-success" role="status">
                <p className="contact-form-success__icon" aria-hidden="true">✅</p>
                <h2>Message sent</h2>
                <p>Thanks, {form.name.split(' ')[0] || 'friend'}! We’ll get back to you soon.</p>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', message: '' })
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <h2 className="contact-form__title">Send a message</h2>
                <div className="field">
                  <label htmlFor="c-name">Name</label>
                  <input
                    id="c-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="field__error">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="field__error">{errors.email}</p>}
                </div>
                <div className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="How can we help?"
                  />
                  {errors.message && <p className="field__error">{errors.message}</p>}
                </div>
                <button type="submit" className="btn btn--primary btn--block">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
