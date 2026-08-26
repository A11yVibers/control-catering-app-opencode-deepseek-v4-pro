import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { BUSINESS } from "../data/menu.js";

export default function ContactPage() {
  useDocumentTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Enter a message.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = document.getElementById(`contact-${firstKey}`);
      if (el) el.focus();
      return;
    }

    const subject = encodeURIComponent(
      `Message from ${form.name} via the website`
    );
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Contact" },
        ]}
      />

      <h1>Contact us</h1>

      <div className="contact-layout">
        <section aria-labelledby="reach-heading" className="contact-details">
          <h2 id="reach-heading">Reach us</h2>
          <ul className="contact-list">
            <li>
              <strong>Phone</strong>
              <br />
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </li>
            <li>
              <strong>Email</strong>
              <br />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              <strong>Address</strong>
              <br />
              {BUSINESS.address}
            </li>
            <li>
              <strong>Hours</strong>
              <br />
              {BUSINESS.hours}
            </li>
          </ul>

          <h2>Follow us</h2>
          <ul className="contact-list">
            {BUSINESS.social.map((s) => (
              <li key={s.id}>
                <a href={s.href} rel="noopener noreferrer" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="form-heading" className="contact-form-section">
          <h2 id="form-heading">Send us a message</h2>

          {sent ? (
            <p role="status" className="contact-success">
              Your email app should open with your message ready to send. If it
              didn&apos;t, email us directly at{" "}
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
            </p>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">
                  Name <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <p className="field-error" id="contact-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-email">
                  Email <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <p className="field-error" id="contact-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-message">
                  Message <span className="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows="5"
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                {errors.message && (
                  <p className="field-error" id="contact-message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Send message
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
