import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES, MIN_PORTIONS, MAX_PORTIONS } from "../data/menu.js";
import { formatPrice } from "../utils/format.js";

export default function CartPage() {
  useDocumentTitle("Your Cart");
  const { detailed, subtotal, totalItems, setQuantity, removeItem, isEmpty } = useCart();

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Menu", to: "/menu" },
          { label: "Cart" },
        ]}
      />

      <h1>Your cart</h1>

      {isEmpty ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <p>
            <Link to="/menu" className="btn btn-primary">
              Browse the menu
            </Link>
          </p>
        </div>
      ) : (
        <div className="cart-layout">
          <section aria-label="Cart items">
            <ul className="cart-list">
              {detailed.map((entry) => (
                <li key={entry.itemId} className="cart-row">
                  <img
                    className="cart-thumb"
                    src={entry.item.image.src}
                    alt={entry.item.image.alt}
                    width="120"
                    height="80"
                  />
                  <div className="cart-row-info">
                    <h2 className="cart-item-name">
                      <Link to={`/menu/${entry.item.id}`}>{entry.item.name}</Link>
                    </h2>
                    <p className="cart-item-meta">
                      {CATEGORIES[entry.item.category].label} ·{" "}
                      {formatPrice(entry.item.price)} {entry.item.portion}
                    </p>
                    <div className="cart-row-controls">
                      <QuantityStepper
                        id={`cart-qty-${entry.itemId}`}
                        label={`Quantity of ${entry.item.name}`}
                        value={entry.quantity}
                        min={MIN_PORTIONS}
                        max={MAX_PORTIONS}
                        onChange={(q) => setQuantity(entry.itemId, q)}
                      />
                      <p className="cart-line-total">{formatPrice(entry.lineTotal)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-text btn-remove"
                    onClick={() => removeItem(entry.itemId)}
                  >
                    Remove <span className="visually-hidden">{entry.item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <aside className="cart-summary" aria-labelledby="summary-heading">
            <h2 id="summary-heading">Order summary</h2>
            <dl className="summary-list">
              <div>
                <dt>Total portions</dt>
                <dd>{totalItems}</dd>
              </div>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <p className="summary-note">
              Each dish serves {MIN_PORTIONS}–{MAX_PORTIONS} portions.
            </p>
            <Link to="/checkout" className="btn btn-primary btn-block">
              Proceed to checkout
            </Link>
            <Link to="/menu" className="btn btn-secondary btn-block">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
