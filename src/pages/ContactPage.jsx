import { useState } from 'react'
import { BUSINESS } from '../data/menu.js'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Enter a valid email address.'
    }
    if (!form.message.trim()) errs.message = 'Message is required.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSent(true)
    }
  }

  return (
    <div className="page">
      <section className="hero hero-sm">
        <div className="hero-inner">
          <h1>Contact us</h1>
          <p>Questions, custom requests, or just want to say hi?</p>
        </div>
      </section>

      <div className="section">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Reach out</h2>
            <ul className="contact-list">
              <li>
                <strong>Phone</strong>
                <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
              </li>
              <li>
                <strong>Email</strong>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
              <li>
                <strong>Visit</strong>
                <span>{BUSINESS.address}</span>
              </li>
              <li>
                <strong>Hours</strong>
                <span>{BUSINESS.hours}</span>
              </li>
            </ul>

            <h3>Social</h3>
            <div className="social-row">
              <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href={BUSINESS.social.twitter} target="_blank" rel="noreferrer">
                Twitter
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="notice notice-ok">
                Thanks, {form.name}! Your message has been sent. We&rsquo;ll get
                back to you soon.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2>Send a message</h2>
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Your name"
                  />
                  {errors.name && <em className="field-error">{errors.name}</em>}
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <em className="field-error">{errors.email}</em>
                  )}
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea
                    rows="5"
                    value={form.message}
                    onChange={set('message')}
                    placeholder="How can we help?"
                  />
                  {errors.message && (
                    <em className="field-error">{errors.message}</em>
                  )}
                </label>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
