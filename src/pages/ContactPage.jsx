import { useRef, useState } from 'react'
import { BUSINESS } from '../data/menu.js'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const summaryRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = true
    if (!values.message.trim()) next.message = true
    setErrors(next)
    if (Object.keys(next).length > 0) {
      summaryRef.current?.focus()
      return
    }
    setSent(true)
  }

  return (
    <div className="page page-narrow">
      <h1 className="page-title">Contact us</h1>

      <p className="contact-intro">
        We'd love to hear from you — about an order, a custom menu, or just to say hello.
      </p>

      <section aria-labelledby="reach-heading" className="contact-reach">
        <h2 id="reach-heading">Reach us directly</h2>
        <ul className="contact-list">
          <li>
            <a href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, '')}`}>{BUSINESS.phone}</a>
          </li>
          <li>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </li>
          <li>{BUSINESS.address}</li>
        </ul>
        <ul className="social-list">
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="form-heading">
        <h2 id="form-heading">Send us a message</h2>

        {sent ? (
          <p role="status" className="status-box">
            Thanks for your message — we'll get back to you soon.
          </p>
        ) : (
          <>
            {Object.keys(errors).length > 0 && (
              <div className="error-summary" ref={summaryRef} tabIndex="-1">
                <h2>Please fix the following before sending</h2>
                <ul>
                  {errors.name && (
                    <li>
                      <a href="#contact-name">Enter your name.</a>
                    </li>
                  )}
                  {errors.email && (
                    <li>
                      <a href="#contact-email">Enter a valid email address.</a>
                    </li>
                  )}
                  {errors.message && (
                    <li>
                      <a href="#contact-message">Enter a message.</a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  aria-invalid={errors.name ? 'true' : undefined}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  aria-invalid={errors.email ? 'true' : undefined}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  value={values.message}
                  aria-invalid={errors.message ? 'true' : undefined}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                />
              </div>
              <button type="submit" className="button button-primary">
                Send message
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
