import { useParams, Link, useLocation } from 'react-router-dom'
import { getOrder } from '../data/orders.js'
import { formatPrice, formatDateShort, BUSINESS, CATEGORIES } from '../data/menu.js'

export default function InvoicePage() {
  const { orderId } = useParams()
  const location = useLocation()

  const order = location.state?.order || getOrder(orderId)

  if (!order) {
    return (
      <div className="page">
        <div className="section empty-state">
          <h1>Invoice not found</h1>
          <p className="muted">
            We couldn&rsquo;t find that order. It may have been placed on
            another device.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="section">
        <div className="invoice-actions">
          <Link to="/" className="btn btn-secondary">
            ← Back to menu
          </Link>
          <button className="btn btn-primary" onClick={() => window.print()}>
            Print / Save Invoice
          </button>
        </div>

        <div className="invoice">
          <header className="invoice-header">
            <div>
              <h1>{BUSINESS.name}</h1>
              <p className="muted">{BUSINESS.address}</p>
              <p className="muted">{BUSINESS.phone}</p>
              <p className="muted">{BUSINESS.email}</p>
            </div>
            <div className="invoice-meta">
              <span className="invoice-title">Invoice</span>
              <p>
                <strong>Order #:</strong> {order.id}
              </p>
              <p>
                <strong>Placed:</strong>{' '}
                {new Date(order.placedAt).toLocaleString()}
              </p>
            </div>
          </header>

          <section className="invoice-block">
            <h2>Pickup</h2>
            <p>
              <strong>{order.pickup.dateLabel}</strong> at {order.pickup.time}
            </p>
            <p className="muted">
              Menu: {order.pickup.menuTitle} · {formatDateShort(order.pickup.date)}
            </p>
          </section>

          <section className="invoice-block">
            <h2>Billed to</h2>
            <p>{order.contact.name}</p>
            <p className="muted">{order.contact.email}</p>
            <p className="muted">{order.contact.phone}</p>
          </section>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th className="right">Qty</th>
                <th className="right">Price</th>
                <th className="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.lines.map((line) => (
                <tr key={line.id}>
                  <td>{line.name}</td>
                  <td>{CATEGORIES[line.category]?.label || line.category}</td>
                  <td className="right">{line.quantity}</td>
                  <td className="right">{formatPrice(line.price)}</td>
                  <td className="right">{formatPrice(line.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-totals">
            <div className="summary-row">
              <span>Total portions</span>
              <span>{order.totals.portions}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.totals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>{formatPrice(order.totals.tax)}</span>
            </div>
            <div className="summary-row total">
              <span>Total due</span>
              <span>{formatPrice(order.totals.total)}</span>
            </div>
          </div>

          <section className="invoice-block">
            <h2>Payment</h2>
            <p>
              Method:{' '}
              <strong>
                {ORDER_METHOD_LABEL[order.payment.method] || order.payment.method}
              </strong>
            </p>
            {order.payment.method === 'card' && order.payment.cardNumber && (
              <p className="muted">
                Card ending in {order.payment.cardNumber.replace(/\s/g, '').slice(-4)}
              </p>
            )}
            <p className="muted">
              No payment has been processed. Please settle at pickup.
            </p>
          </section>

          {order.instructions && (
            <section className="invoice-block">
              <h2>Special instructions</h2>
              <p>{order.instructions}</p>
            </section>
          )}

          <p className="muted invoice-thanks">
            Thank you for your order! We look forward to serving you at{' '}
            {BUSINESS.name}.
          </p>
        </div>
      </div>
    </div>
  )
}

const ORDER_METHOD_LABEL = {
  card: 'Credit / Debit Card',
  cash: 'Cash on Pickup',
  venmo: 'Venmo',
  zelle: 'Zelle',
}
