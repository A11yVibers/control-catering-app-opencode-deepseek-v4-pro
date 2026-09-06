import { useId } from 'react'
import { formatCurrency, formatDate } from '../data/menu.js'

export default function CartPage({ cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const subtotal = cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const servings = cart.items.reduce((sum, it) => sum + it.quantity, 0)

  return (
    <div className="page">
      <h1 className="page-title">Your cart</h1>

      {cart.items.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <a className="button button-primary" href="#/">
            Browse the menu
          </a>
        </div>
      ) : (
        <>
          <p className="cart-date">
            Pickup: <strong>{formatDate(cart.date)}</strong>
          </p>

          <ul className="cart-list">
            {cart.items.map((it) => (
              <CartLine
                key={it.id}
                item={it}
                onUpdate={(qty) => onUpdateQuantity(it.id, qty)}
                onRemove={() => onRemoveItem(it.id)}
              />
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <span>Total servings</span>
              <strong>{servings}</strong>
            </p>
            <p className="cart-subtotal">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </p>
            <button type="button" className="button button-primary button-large" onClick={onCheckout}>
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function CartLine({ item, onUpdate, onRemove }) {
  const qtyId = useId()
  const lineTotal = item.price * item.quantity

  return (
    <li className="cart-line">
      <img className="cart-line-image" src={item.image} alt={item.name} />
      <div className="cart-line-info">
        <h2 className="cart-line-name">{item.name}</h2>
        <p className="cart-line-price">
          {formatCurrency(item.price)} each
        </p>
      </div>
      <label className="qty-label" htmlFor={qtyId}>
        Quantity
      </label>
      <input
        id={qtyId}
        className="qty-input"
        type="number"
        min="1"
        max="30"
        value={item.quantity}
        onChange={(e) => onUpdate(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
      />
      <span className="cart-line-total">{formatCurrency(lineTotal)}</span>
      <button type="button" className="button button-ghost" onClick={onRemove}>
        Remove
      </button>
    </li>
  )
}
