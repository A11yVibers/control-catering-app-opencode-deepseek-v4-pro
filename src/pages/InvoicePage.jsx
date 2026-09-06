import { BUSINESS, formatCurrency, formatDate } from '../data/menu.js'
import { paymentLabel } from '../lib/payments.js'

export default function InvoicePage({ order }) {
  if (!order) {
    return (
      <div className="page page-narrow">
        <h1 className="page-title">Invoice not found</h1>
        <p>We couldn't find that order. It may have been placed in a different browser.</p>
        <a className="button button-primary" href="#/">
          Back to the menu
        </a>
      </div>
    )
  }

  return (
    <div className="page page-narrow">
      <div className="invoice-heading">
        <h1 className="page-title">Order confirmation</h1>
        <button type="button" className="button button-secondary" onClick={() => window.print()}>
          Print invoice
        </button>
      </div>

      <div className="invoice-card">
        <header className="invoice-header">
          <div>
            <p className="footer-brand">{BUSINESS.name}</p>
            <p className="muted">{BUSINESS.tagline}</p>
          </div>
          <div className="invoice-meta">
            <p>
              <strong>Invoice #{order.id}</strong>
            </p>
            <p>Placed {new Date(order.placedAt).toLocaleString()}</p>
          </div>
        </header>

        <dl className="invoice-details">
          <div>
            <dt>Pickup date</dt>
            <dd>{formatDate(order.pickupDate)}</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>{order.guests}</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              {order.name}
              <br />
              {order.phone}
              <br />
              {order.email}
            </dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{paymentLabel(order.payment)}</dd>
          </div>
          {order.instructions && (
            <div>
              <dt>Special instructions</dt>
              <dd>{order.instructions}</dd>
            </div>
          )}
        </dl>

        <table className="invoice-table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.id}>
                <th scope="row">{it.name}</th>
                <td>{it.quantity}</td>
                <td>{formatCurrency(it.price)}</td>
                <td>{formatCurrency(it.price * it.quantity)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="3">
                Total
              </th>
              <td>{formatCurrency(order.total)}</td>
            </tr>
          </tfoot>
        </table>

        <p className="invoice-note">
          Thank you for your order. A copy of this invoice has been saved for {BUSINESS.name}.
        </p>
      </div>

      <p className="muted">
        Questions? Call {BUSINESS.phone} or email {BUSINESS.email}.
      </p>

      <a className="button button-primary" href="#/">
        Back to the menu
      </a>
    </div>
  )
}
