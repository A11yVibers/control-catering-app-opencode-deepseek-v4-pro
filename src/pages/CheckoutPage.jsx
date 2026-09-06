import { useRef, useState } from 'react'
import { BUSINESS, formatCurrency, formatDate } from '../data/menu.js'
import { PAYMENT_OPTIONS } from '../lib/payments.js'

const FIELD_IDS = {
  guests: 'checkout-guests',
  name: 'checkout-name',
  phone: 'checkout-phone',
  email: 'checkout-email',
  payment: 'checkout-payment',
}

const ERROR_MESSAGES = {
  guests: 'Enter a number of guests between 6 and 30.',
  name: 'Enter your full name.',
  phone: 'Enter a valid phone number.',
  email: 'Enter a valid email address.',
  payment: 'Choose a payment method.',
}

function validate(values) {
  const errors = {}
  const guests = Number(values.guests)
  if (!Number.isInteger(guests) || guests < 6 || guests > 30) errors.guests = true
  if (!values.name.trim()) errors.name = true
  if (values.phone.trim().replace(/\D/g, '').length < 7) errors.phone = true
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = true
  if (!values.payment) errors.payment = true
  return errors
}

export default function CheckoutPage({ cart, onPlaceOrder }) {
  const [values, setValues] = useState({
    guests: '',
    name: '',
    phone: '',
    email: '',
    payment: '',
    instructions: '',
  })
  const [errors, setErrors] = useState({})
  const summaryRef = useRef(null)

  const subtotal = cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      summaryRef.current?.focus()
      return
    }
    onPlaceOrder({
      guests: Number(values.guests),
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      payment: values.payment,
      instructions: values.instructions.trim(),
    })
  }

  return (
    <div className="page page-narrow">
      <h1 className="page-title">Checkout</h1>

      <p className="cart-date">
        Pickup: <strong>{formatDate(cart.date)}</strong>{" "}
        <a href="#/" className="inline-link">
          Change date
        </a>
      </p>

      {Object.keys(errors).length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex="-1">
          <h2>Please fix the following before placing your order</h2>
          <ul>
            {Object.keys(errors).map((field) => (
              <li key={field}>
                <a href={`#${FIELD_IDS[field]}`}>{ERROR_MESSAGES[field]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <section className="form-section" aria-labelledby="order-details-heading">
          <h2 id="order-details-heading" className="form-section-heading">
            Order details
          </h2>

          <div className="field">
            <label htmlFor={FIELD_IDS.guests}>Number of guests</label>
            <input
              id={FIELD_IDS.guests}
              type="number"
              inputMode="numeric"
              min="6"
              max="30"
              value={values.guests}
              aria-invalid={errors.guests ? 'true' : undefined}
              aria-describedby={errors.guests ? 'guests-error' : 'guests-hint'}
              onChange={(e) => setField('guests', e.target.value)}
            />
            <p className="field-hint" id="guests-hint">
              Between 6 and 30 people.
            </p>
            {errors.guests && (
              <p className="field-error" id="guests-error">
                {ERROR_MESSAGES.guests}
              </p>
            )}
          </div>
        </section>

        <section className="form-section" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="form-section-heading">
            Contact information
          </h2>

          <div className="field">
            <label htmlFor={FIELD_IDS.name}>Full name</label>
            <input
              id={FIELD_IDS.name}
              type="text"
              autoComplete="name"
              value={values.name}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
              onChange={(e) => setField('name', e.target.value)}
            />
            {errors.name && (
              <p className="field-error" id="name-error">
                {ERROR_MESSAGES.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={FIELD_IDS.phone}>Phone number</label>
            <input
              id={FIELD_IDS.phone}
              type="tel"
              autoComplete="tel"
              value={values.phone}
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              onChange={(e) => setField('phone', e.target.value)}
            />
            {errors.phone && (
              <p className="field-error" id="phone-error">
                {ERROR_MESSAGES.phone}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={FIELD_IDS.email}>Email address</label>
            <input
              id={FIELD_IDS.email}
              type="email"
              autoComplete="email"
              value={values.email}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onChange={(e) => setField('email', e.target.value)}
            />
            {errors.email && (
              <p className="field-error" id="email-error">
                {ERROR_MESSAGES.email}
              </p>
            )}
          </div>
        </section>

        <section className="form-section" aria-labelledby="payment-heading">
          <h2 id="payment-heading" className="form-section-heading">
            Payment
          </h2>

          <fieldset id={FIELD_IDS.payment} className="field fieldset" tabIndex="-1">
            <legend>Payment method</legend>
            {PAYMENT_OPTIONS.map((opt) => (
              <label key={opt.value} className="radio-label">
                <input
                  type="radio"
                  name="payment"
                  value={opt.value}
                  checked={values.payment === opt.value}
                  onChange={(e) => setField('payment', e.target.value)}
                />
                {opt.label}
              </label>
            ))}
            {errors.payment && (
              <p className="field-error" id="payment-error">
                {ERROR_MESSAGES.payment}
              </p>
            )}
          </fieldset>
          <p className="field-hint">No payment is taken online. You settle at pickup or by transfer.</p>
        </section>

        <section className="form-section" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="form-section-heading">
            Special instructions
          </h2>
          <div className="field">
            <label htmlFor="checkout-instructions">
              Allergies, dietary notes, or pickup requests
            </label>
            <textarea
              id="checkout-instructions"
              rows="4"
              value={values.instructions}
              onChange={(e) => setField('instructions', e.target.value)}
            />
          </div>
        </section>

        <div className="order-summary">
          <h2>Order summary</h2>
          <ul className="summary-lines">
            {cart.items.map((it) => (
              <li key={it.id}>
                <span>
                  {it.name} × {it.quantity}
                </span>
                <span>{formatCurrency(it.price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="cart-subtotal">
            <span>Total</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </p>
        </div>

        <button type="submit" className="button button-primary button-large">
          Place order
        </button>
      </form>

      <p className="muted">
        Questions? Call {BUSINESS.phone} or email {BUSINESS.email}.
      </p>
    </div>
  )
}
