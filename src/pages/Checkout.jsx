import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resolveLine } from '../data/menu.js'
import { formatCurrency, formatDate, isDateInOrderWindow } from '../lib/utils.js'
import { saveOrder, clearCart } from '../lib/storage.js'
import { useCart } from '../context/CartContext.jsx'

const TIME_SLOTS = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '1:00 PM – 3:00 PM',
  '3:00 PM – 5:00 PM',
  '5:00 PM – 7:00 PM',
]

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit / Debit card at pickup' },
  { value: 'cash', label: 'Cash at pickup' },
  { value: 'venmo', label: 'Venmo' },
  { value: 'zelle', label: 'Zelle' },
  { value: 'paypal', label: 'PayPal' },
]

export default function Checkout() {
  const { cart } = useCart()
  const navigate = useNavigate()

  const lines = cart.items.map(resolveLine).filter(Boolean)
  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.price, 0)

  const [form, setForm] = useState({
    pickupTime: TIME_SLOTS[2],
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'card',
    paymentInfo: '',
    specialInstructions: '',
  })
  const [errors, setErrors] = useState({})

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const needsPaymentInfo = ['venmo', 'zelle', 'paypal'].includes(form.paymentMethod)

  const validate = () => {
    const next = {}
    if (!cart.pickupDate) next.pickupDate = 'A pickup date is required.'
    else if (!isDateInOrderWindow(new Date(`${cart.pickupDate}T12:00:00`)))
      next.pickupDate = 'Pickup date must be between 2 days and 2 weeks from now.'

    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.phone.trim()) next.phone = 'Please enter a phone number.'
    else if (!/^[+()\-.\s\d]{7,20}$/.test(form.phone.trim()))
      next.phone = 'Please enter a valid phone number.'

    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.'

    if (needsPaymentInfo && !form.paymentInfo.trim())
      next.paymentInfo = 'Please provide your account handle for payment.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const order = {
      id: `HH-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      pickupDate: cart.pickupDate,
      pickupTime: form.pickupTime,
      guests: cart.guests,
      contact: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
      payment: {
        method: form.paymentMethod,
        info: form.paymentInfo.trim(),
      },
      specialInstructions: form.specialInstructions.trim(),
      lines: lines.map((l) => ({
        name: l.name,
        category: l.category,
        price: l.price,
        quantity: l.quantity,
        image: l.image,
      })),
      subtotal,
    }

    saveOrder(order)
    clearCart()
    navigate(`/invoice/${order.id}`, { replace: true, state: { justPlaced: true } })
  }

  if (lines.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <p className="empty-state__icon" aria-hidden="true">🧾</p>
          <h2>Nothing to check out</h2>
          <p>Your cart is empty. Add a few dishes before checking out.</p>
          <Link to="/menu" className="btn btn--primary">Browse the Menu</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <form onSubmit={handleSubmit} noValidate className="checkout-page__layout">
          <div className="checkout-page__form">
            <section className="checkout-section">
              <h2 className="checkout-section__title">Pickup Information</h2>
              <div className="field">
                <label htmlFor="pickupDate">Pickup date</label>
                <input id="pickupDate" type="text" value={cart.pickupDate ? formatDate(new Date(`${cart.pickupDate}T12:00:00`)) : 'No date selected'} disabled />
                {cart.pickupDate && (
                  <p className="field__hint">
                    <Link to="/menu">Change pickup date</Link>
                  </p>
                )}
                {errors.pickupDate && <p className="field__error">{errors.pickupDate}</p>}
              </div>
              <div className="field">
                <label htmlFor="pickupTime">Pickup time window</label>
                <select
                  id="pickupTime"
                  value={form.pickupTime}
                  onChange={(e) => update('pickupTime', e.target.value)}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section__title">Contact Information</h2>
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Jane Smith"
                  autoComplete="name"
                />
                {errors.name && <p className="field__error">{errors.name}</p>}
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="field__error">{errors.phone}</p>}
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="field__error">{errors.email}</p>}
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section__title">Payment</h2>
              <p className="checkout-section__note">
                No payment is taken online. Choose how you’ll settle up at pickup.
              </p>
              <div className="field">
                <span className="field__label">Payment method</span>
                <div className="radio-group">
                  {PAYMENT_METHODS.map((m) => (
                    <label key={m.value} className="radio">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.value}
                        checked={form.paymentMethod === m.value}
                        onChange={(e) => update('paymentMethod', e.target.value)}
                      />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {needsPaymentInfo && (
                <div className="field">
                  <label htmlFor="paymentInfo">
                    {form.paymentMethod === 'venmo'
                      ? 'Venmo username'
                      : form.paymentMethod === 'zelle'
                      ? 'Zelle email or phone'
                      : 'PayPal email'}
                  </label>
                  <input
                    id="paymentInfo"
                    type="text"
                    value={form.paymentInfo}
                    onChange={(e) => update('paymentInfo', e.target.value)}
                    placeholder="@username"
                  />
                  {errors.paymentInfo && <p className="field__error">{errors.paymentInfo}</p>}
                </div>
              )}
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section__title">Special Instructions</h2>
              <div className="field">
                <label htmlFor="instructions">Anything we should know?</label>
                <textarea
                  id="instructions"
                  rows={4}
                  value={form.specialInstructions}
                  onChange={(e) => update('specialInstructions', e.target.value)}
                  placeholder="Allergies, dietary notes, packaging requests, or delivery details…"
                />
              </div>
            </section>
          </div>

          <aside className="checkout-page__summary">
            <h2 className="checkout-page__summary-title">Your Order</h2>
            <ul className="checkout-lines">
              {lines.map((l) => (
                <li key={l.itemId} className="checkout-line">
                  <span className="checkout-line__name">
                    {l.name} <em>× {l.quantity}</em>
                  </span>
                  <span className="checkout-line__price">{formatCurrency(l.price * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <p className="checkout-total__note">
              Serves {cart.guests} guests · due at pickup
            </p>
            <button type="submit" className="btn btn--primary btn--block btn--lg">
              Place Order
            </button>
          </aside>
        </form>
      </div>
    </div>
  )
}
