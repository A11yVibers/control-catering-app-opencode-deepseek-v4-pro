import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../lib/storage.js'
import { formatCurrency, formatDate, formatShortDate } from '../lib/utils.js'
import FoodImage from '../components/FoodImage.jsx'

const PAYMENT_LABELS = {
  card: 'Credit / Debit card at pickup',
  cash: 'Cash at pickup',
  venmo: 'Venmo',
  zelle: 'Zelle',
  paypal: 'PayPal',
}

export default function Invoice() {
  const { id } = useParams()
  const order = useMemo(() => getOrderById(id), [id])

  if (!order) {
    return (
      <div className="container">
        <div className="empty-state">
          <p className="empty-state__icon" aria-hidden="true">🔍</p>
          <h2>Invoice not found</h2>
          <p>We couldn’t find that order in this browser. It may have been placed on another device.</p>
          <Link to="/menu" className="btn btn--primary">Back to Menu</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="invoice-page">
      <div className="container">
        <div className="invoice-actions no-print">
          <Link to="/menu" className="btn btn--ghost">← Back to Menu</Link>
          <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </div>

        <div className="invoice">
          <header className="invoice__header">
            <div className="invoice__brand">
              <span className="invoice__brand-mark" aria-hidden="true">🌿</span>
              <div>
                <h1 className="invoice__brand-name">Hearth &amp; Harvest</h1>
                <p className="invoice__brand-sub">Homemade Catering</p>
              </div>
            </div>
            <div className="invoice__meta">
              <p className="invoice__label">Invoice</p>
              <p className="invoice__id">{order.id}</p>
              <p>Placed {formatShortDate(new Date(order.createdAt))}</p>
            </div>
          </header>

          <div className="invoice__info">
            <div>
              <h2 className="invoice__info-title">Billed to</h2>
              <p className="invoice__info-name">{order.contact.name}</p>
              <p>{order.contact.phone}</p>
              <p>{order.contact.email}</p>
            </div>
            <div className="invoice__info-right">
              <h2 className="invoice__info-title">Pickup</h2>
              <p><strong>{formatDate(new Date(`${order.pickupDate}T12:00:00`))}</strong></p>
              <p>{order.pickupTime}</p>
              <p>{order.guests} guests</p>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col" className="invoice-table__num">Qty</th>
                <th scope="col" className="invoice-table__num">Price</th>
                <th scope="col" className="invoice-table__num">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.lines.map((line, i) => (
                <tr key={i}>
                  <td className="invoice-table__item">
                    <span className="invoice-table__thumb">
                      <FoodImage src={line.image} alt={line.name} />
                    </span>
                    <span>
                      <span className="invoice-table__name">{line.name}</span>
                      <span className="invoice-table__cat">{line.category}</span>
                    </span>
                  </td>
                  <td className="invoice-table__num">{line.quantity}</td>
                  <td className="invoice-table__num">{formatCurrency(line.price)}</td>
                  <td className="invoice-table__num">{formatCurrency(line.price * line.quantity)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="invoice-table__total-label">Total</td>
                <td className="invoice-table__num invoice-table__total">{formatCurrency(order.subtotal)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="invoice__details">
            <div className="invoice__detail">
              <h3>Payment</h3>
              <p>{PAYMENT_LABELS[order.payment.method] || order.payment.method}</p>
              {order.payment.info && <p>{order.payment.info}</p>}
              <p className="invoice__muted">Due at pickup — no payment collected online.</p>
            </div>
            {order.specialInstructions && (
              <div className="invoice__detail">
                <h3>Special Instructions</h3>
                <p>{order.specialInstructions}</p>
              </div>
            )}
          </div>

          <p className="invoice__thanks">
            Thank you for supporting our home kitchen. We can’t wait to cook for you!
          </p>
        </div>
      </div>
    </div>
  )
}
