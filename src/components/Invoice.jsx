import { BUSINESS, CATEGORIES } from "../data/menu.js";
import { formatPrice } from "../utils/format.js";
import { formatShortDate } from "../utils/dates.js";

export default function Invoice({ order }) {
  const taxRate = 0.0;
  const subtotal = order.items.reduce((sum, line) => sum + line.lineTotal, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="invoice">
      <header className="invoice-header">
        <div>
          <p className="invoice-brand">{BUSINESS.name}</p>
          <p className="invoice-muted">{BUSINESS.address}</p>
          <p className="invoice-muted">
            {BUSINESS.phone} · {BUSINESS.email}
          </p>
        </div>
        <div className="invoice-summary">
          <h2 className="invoice-title">Invoice</h2>
          <p>
            <strong>Order #:</strong> {order.orderId}
          </p>
          <p>
            <strong>Placed:</strong> {formatShortDate(new Date(order.placedAt))}
          </p>
          <p>
            <strong>Pickup:</strong> {formatShortDate(new Date(order.pickupDate))} ·{" "}
            {order.pickupTime}
          </p>
        </div>
      </header>

      <section className="invoice-section" aria-label="Billed to">
        <h3 className="invoice-section-title">Billed to</h3>
        <p>
          <strong>{order.contact.name}</strong>
          <br />
          {order.contact.phone}
          <br />
          {order.contact.email}
        </p>
        <p>
          <strong>Payment:</strong> {order.payment.methodLabel}
          {order.payment.detail ? ` — ${order.payment.detail}` : ""}
        </p>
      </section>

      <section className="invoice-section" aria-label="Order items">
        <h3 className="invoice-section-title">Order items</h3>
        <div className="table-scroll" tabIndex="0" role="region" aria-label="Order items table">
        <table className="invoice-table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Category</th>
              <th scope="col">Portions</th>
              <th scope="col">Unit price</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((line) => (
              <tr key={line.itemId}>
                <th scope="row">{line.name}</th>
                <td>{CATEGORIES[line.category].label}</td>
                <td>{line.quantity}</td>
                <td>{formatPrice(line.unitPrice)}</td>
                <td>{formatPrice(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="4">
                Subtotal
              </th>
              <td>{formatPrice(subtotal)}</td>
            </tr>
            <tr>
              <th scope="row" colSpan="4">
                Total
              </th>
              <td>
                <strong>{formatPrice(total)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
        </div>
      </section>

      {order.specialInstructions ? (
        <section className="invoice-section" aria-label="Special instructions">
          <h3 className="invoice-section-title">Special instructions</h3>
          <p className="invoice-notes">{order.specialInstructions}</p>
        </section>
      ) : null}

      <p className="invoice-thanks">
        Thank you for your order! Please arrive at your scheduled pickup time.
      </p>
    </div>
  );
}
