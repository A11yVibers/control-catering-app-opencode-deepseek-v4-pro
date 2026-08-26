import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice, ORDER_RULES } from '../data/menu.js'
import QuantityStepper from '../components/QuantityStepper.jsx'

export default function CartPage() {
  const { lines, count, subtotal, updateQuantity, removeItem, clearCart } =
    useCart()

  if (lines.length === 0) {
    return (
      <div className="page">
        <div className="section empty-state">
          <h1>Your cart is empty</h1>
          <p className="muted">
            Add some homemade goodness from the menu to get started.
          </p>
          <Link to="/" className="btn btn-primary">
            Browse the menu
          </Link>
        </div>
      </div>
    )
  }

  const overLimit = count > ORDER_RULES.maxPortions
  const underLimit = count < ORDER_RULES.minPortions

  return (
    <div className="page">
      <div className="section">
        <h1>Your Cart</h1>

        <div className="cart-layout">
          <div className="cart-list">
            {lines.map((line) => (
              <div className="cart-line" key={line.id}>
                <Link to={`/item/${line.id}`} className="cart-line-img">
                  <img src={line.item.image} alt={line.item.name} />
                </Link>
                <div className="cart-line-info">
                  <Link to={`/item/${line.id}`} className="cart-line-name">
                    {line.item.name}
                  </Link>
                  <span className="muted">{formatPrice(line.item.price)} / portion</span>
                </div>
                <div className="cart-line-actions">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(q) => updateQuantity(line.id, q)}
                    min={1}
                    max={ORDER_RULES.maxPortions}
                  />
                  <span className="cart-line-total">
                    {formatPrice(line.lineTotal)}
                  </span>
                  <button
                    className="btn-link danger"
                    onClick={() => removeItem(line.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Total portions</span>
              <span>{count}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {underLimit && (
              <p className="notice notice-warn">
                Minimum order is {ORDER_RULES.minPortions} portions. Add{' '}
                {ORDER_RULES.minPortions - count} more to check out.
              </p>
            )}
            {overLimit && (
              <p className="notice notice-warn">
                Maximum order is {ORDER_RULES.maxPortions} portions. Reduce your
                order by {count - ORDER_RULES.maxPortions}.
              </p>
            )}

            <Link
              to="/checkout"
              className={`btn btn-primary btn-block ${
                underLimit || overLimit ? 'btn-disabled' : ''
              }`}
              aria-disabled={underLimit || overLimit}
            >
              Proceed to Checkout
            </Link>
            <button className="btn-link danger btn-block" onClick={clearCart}>
              Clear cart
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}
