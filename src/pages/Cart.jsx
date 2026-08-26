import { Link } from 'react-router-dom'
import { resolveLine } from '../data/menu.js'
import { formatCurrency, formatDate } from '../lib/utils.js'
import { useCart } from '../context/CartContext.jsx'
import FoodImage from '../components/FoodImage.jsx'

export default function Cart() {
  const { cart, setGuests, updateQuantity, removeItem, minGuests, maxGuests } = useCart()

  const lines = cart.items
    .map(resolveLine)
    .filter(Boolean)

  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.price, 0)
  const servings = lines.reduce((sum, l) => sum + l.quantity, 0)

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>

        {lines.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__icon" aria-hidden="true">🛒</p>
            <h2>Your cart is empty</h2>
            <p>Browse the daily menu and add a few dishes for your gathering.</p>
            <Link to="/menu" className="btn btn--primary">Browse the Menu</Link>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__items">
              <div className="cart-summary-card">
                <div className="cart-summary-card__row">
                  <span className="cart-summary-card__label">Pickup date</span>
                  <span className="cart-summary-card__value">
                    {cart.pickupDate ? (
                      formatDate(new Date(`${cart.pickupDate}T12:00:00`))
                    ) : (
                      <Link to="/menu">Choose a date</Link>
                    )}
                  </span>
                </div>
                <div className="cart-summary-card__row cart-summary-card__row--guests">
                  <span className="cart-summary-card__label">Number of guests</span>
                  <div className="stepper" role="group" aria-label="Number of guests">
                    <button
                      type="button"
                      className="stepper__btn"
                      onClick={() => setGuests(cart.guests - 1)}
                      disabled={cart.guests <= minGuests}
                      aria-label="Decrease guests"
                    >
                      −
                    </button>
                    <span className="stepper__value">{cart.guests}</span>
                    <button
                      type="button"
                      className="stepper__btn"
                      onClick={() => setGuests(cart.guests + 1)}
                      disabled={cart.guests >= maxGuests}
                      aria-label="Increase guests"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="cart-summary-card__hint">
                  We cater for parties of {minGuests} to {maxGuests} guests.
                </p>
              </div>

              <ul className="cart-lines">
                {lines.map((line) => (
                  <li key={line.itemId} className="cart-line">
                    <div className="cart-line__media">
                      <FoodImage src={line.image} alt={line.name} />
                    </div>
                    <div className="cart-line__info">
                      <h3 className="cart-line__name">{line.name}</h3>
                      <p className="cart-line__meta">{formatCurrency(line.price)} per person</p>
                      <div className="cart-line__controls">
                        <div className="stepper stepper--sm" role="group" aria-label={`Servings of ${line.name}`}>
                          <button
                            type="button"
                            className="stepper__btn"
                            onClick={() => updateQuantity(line.itemId, line.quantity - 1)}
                            disabled={line.quantity <= 1}
                            aria-label={`Decrease servings of ${line.name}`}
                          >
                            −
                          </button>
                          <span className="stepper__value">{line.quantity}</span>
                          <button
                            type="button"
                            className="stepper__btn"
                            onClick={() => updateQuantity(line.itemId, line.quantity + 1)}
                            aria-label={`Increase servings of ${line.name}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-line__servings">{line.quantity} servings</span>
                        <button
                          type="button"
                          className="cart-line__remove"
                          onClick={() => removeItem(line.itemId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-line__total">{formatCurrency(line.quantity * line.price)}</div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="cart-totals">
              <h2 className="cart-totals__title">Order Summary</h2>
              <div className="cart-totals__row">
                <span>Items</span>
                <span>{lines.length}</span>
              </div>
              <div className="cart-totals__row">
                <span>Total servings</span>
                <span>{servings}</span>
              </div>
              <div className="cart-totals__row">
                <span>Guests</span>
                <span>{cart.guests}</span>
              </div>
              <div className="cart-totals__row cart-totals__row--total">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="cart-totals__note">
                Final total is calculated at checkout. Payment is handled on pickup.
              </p>
              <Link
                to="/checkout"
                className={`btn btn--primary btn--block ${!cart.pickupDate ? 'btn--disabled' : ''}`}
                aria-disabled={!cart.pickupDate}
              >
                Proceed to Checkout
              </Link>
              {!cart.pickupDate && (
                <p className="cart-totals__warn">
                  <Link to="/menu">Choose a pickup date</Link> to continue.
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
