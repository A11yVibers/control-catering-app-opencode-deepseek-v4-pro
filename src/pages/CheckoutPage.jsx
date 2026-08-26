import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import {
  addDays,
  toLocalISO,
  formatDate,
  getMenuForDate,
  isPickupDateValid,
  formatPrice,
  formatDateShort,
  ORDER_RULES,
  BUSINESS,
} from '../data/menu.js'
import { generateOrderId, saveOrder } from '../data/orders.js'

const EMPTY_FORM = {
  pickupDate: '',
  pickupTime: '12:00 PM',
  name: '',
  email: '',
  phone: '',
  paymentMethod: '',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  instructions: '',
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { lines, count, subtotal, clearCart } = useCart()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const today = useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const minDate = addDays(today, ORDER_RULES.minLeadDays)
  const maxDate = addDays(today, ORDER_RULES.maxLeadDays)

  const selectedDate = useMemo(() => {
    if (!form.pickupDate) return null
    const [y, m, d] = form.pickupDate.split('-').map(Number)
    return new Date(y, m - 1, d)
  }, [form.pickupDate])

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const setPayment = (method) =>
    setForm((f) => ({ ...f, paymentMethod: method }))

  if (lines.length === 0) {
    return (
      <div className="page">
        <div className="section empty-state">
          <h1>Nothing to check out</h1>
          <p className="muted">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Browse the menu
          </Link>
        </div>
      </div>
    )
  }

  const validate = () => {
    const errs = {}

    if (!form.pickupDate) {
      errs.pickupDate = 'Pickup date is required.'
    } else if (!selectedDate || !isPickupDateValid(selectedDate)) {
      errs.pickupDate = `Pickup must be between ${ORDER_RULES.minLeadDays} and ${ORDER_RULES.maxLeadDays} days from today.`
    }

    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone is required.'
    } else if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) {
      errs.phone = 'Enter a valid phone number.'
    }

    if (!form.paymentMethod) errs.paymentMethod = 'Select a payment method.'

    if (count < ORDER_RULES.minPortions) {
      errs.portions = `Minimum order is ${ORDER_RULES.minPortions} portions.`
    } else if (count > ORDER_RULES.maxPortions) {
      errs.portions = `Maximum order is ${ORDER_RULES.maxPortions} portions.`
    }

    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const menu = getMenuForDate(selectedDate)
    const order = {
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      pickup: {
        date: form.pickupDate,
        dateLabel: formatDate(selectedDate),
        time: form.pickupTime,
        menuTitle: menu.title,
      },
      contact: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      payment: {
        method: form.paymentMethod,
        cardName: form.paymentMethod === 'card' ? form.cardName.trim() : '',
        cardNumber:
          form.paymentMethod === 'card' ? form.cardNumber.trim() : '',
        cardExpiry:
          form.paymentMethod === 'card' ? form.cardExpiry.trim() : '',
      },
      instructions: form.instructions.trim(),
      lines: lines.map((line) => ({
        id: line.id,
        name: line.item.name,
        category: line.item.category,
        price: line.item.price,
        quantity: line.quantity,
        lineTotal: line.lineTotal,
      })),
      totals: {
        portions: count,
        subtotal,
        tax: 0,
        total: subtotal,
      },
    }

    saveOrder(order)
    clearCart()
    navigate(`/invoice/${order.id}`, { state: { order } })
  }

  return (
    <div className="page">
      <div className="section">
        <h1>Checkout</h1>

        {errors.portions && (
          <div className="notice notice-warn">{errors.portions}</div>
        )}

        <form onSubmit={handleSubmit} className="checkout-layout" noValidate>
          <div className="checkout-main">
            <fieldset className="form-section">
              <legend>1 · Pickup</legend>
              <div className="form-row">
                <label className="field">
                  <span>Pickup date</span>
                  <input
                    type="date"
                    min={toLocalISO(minDate)}
                    max={toLocalISO(maxDate)}
                    value={form.pickupDate}
                    onChange={set('pickupDate')}
                  />
                  {errors.pickupDate && (
                    <em className="field-error">{errors.pickupDate}</em>
                  )}
                </label>
                <label className="field">
                  <span>Pickup time</span>
                  <select value={form.pickupTime} onChange={set('pickupTime')}>
                    {ORDER_RULES.pickupTimes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {selectedDate && isPickupDateValid(selectedDate) && (
                <p className="muted pickup-preview">
                  Menu for {formatDateShort(form.pickupDate)}:{' '}
                  <strong>{getMenuForDate(selectedDate).title}</strong>
                </p>
              )}
            </fieldset>

            <fieldset className="form-section">
              <legend>2 · Contact information</legend>
              <div className="form-row">
                <label className="field">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  {errors.name && <em className="field-error">{errors.name}</em>}
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="(555) 012-3456"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <em className="field-error">{errors.phone}</em>
                  )}
                </label>
              </div>
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="jane@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <em className="field-error">{errors.email}</em>
                )}
              </label>
            </fieldset>

            <fieldset className="form-section">
              <legend>3 · Payment</legend>
              <div className="payment-options">
                {ORDER_RULES.paymentMethods.map((m) => (
                  <label key={m.id} className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={form.paymentMethod === m.id}
                      onChange={() => setPayment(m.id)}
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <em className="field-error">{errors.paymentMethod}</em>
              )}

              {form.paymentMethod === 'card' && (
                <div className="form-row card-fields">
                  <label className="field">
                    <span>Name on card</span>
                    <input
                      type="text"
                      value={form.cardName}
                      onChange={set('cardName')}
                      placeholder="Jane Q. Doe"
                    />
                  </label>
                  <label className="field">
                    <span>Card number</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.cardNumber}
                      onChange={set('cardNumber')}
                      placeholder="1234 5678 9012 3456"
                    />
                  </label>
                  <label className="field">
                    <span>Expiry</span>
                    <input
                      type="text"
                      value={form.cardExpiry}
                      onChange={set('cardExpiry')}
                      placeholder="MM/YY"
                    />
                  </label>
                </div>
              )}

              <p className="muted">
                No payment is processed on this site. You&rsquo;ll finalize
                payment when you pick up your order at {BUSINESS.address}.
              </p>
            </fieldset>

            <fieldset className="form-section">
              <legend>4 · Special instructions</legend>
              <label className="field">
                <span>Notes, allergies, dietary requests</span>
                <textarea
                  rows="4"
                  value={form.instructions}
                  onChange={set('instructions')}
                  placeholder="Anything we should know about your order?"
                />
              </label>
            </fieldset>
          </div>

          <aside className="checkout-summary">
            <h2>Your Order</h2>
            <ul className="summary-lines">
              {lines.map((line) => (
                <li key={line.id}>
                  <span>
                    {line.quantity}× {line.item.name}
                  </span>
                  <span>{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="summary-row">
              <span>Portions</span>
              <span>{count}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row total">
              <span>Total due</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Place Order
            </button>
            <Link to="/cart" className="btn btn-secondary btn-block">
              Back to cart
            </Link>
          </aside>
        </form>
      </div>
    </div>
  )
}
