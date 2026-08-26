import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, clampQuantity } from "../context/CartContext.jsx";
import { CATEGORIES, MIN_PORTIONS, MAX_PORTIONS } from "../data/menu.js";
import { formatPrice } from "../utils/format.js";
import QuantityStepper from "./QuantityStepper.jsx";

export default function MenuCard({ item, dateIso }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(MIN_PORTIONS);
  const [justAdded, setJustAdded] = useState(false);

  const categoryLabel = CATEGORIES[item.category].label;

  const handleAdd = () => {
    addItem(item.id, clampQuantity(quantity));
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <article className="menu-card">
      <Link to={`/menu/${item.id}?date=${dateIso}`} className="menu-card-link">
        <img
          className="menu-card-img"
          src={item.image.src}
          alt={item.image.alt}
          width="400"
          height="267"
          loading="lazy"
        />
        <div className="menu-card-body">
          <span className="category-badge">{categoryLabel}</span>
          <h3 className="menu-card-title">{item.name}</h3>
          <p className="menu-card-meta">
            <strong>{formatPrice(item.price)}</strong> <span>{item.portion}</span>
          </p>
        </div>
      </Link>
      <div className="menu-card-actions">
        <QuantityStepper
          id={`qty-${item.id}`}
          label={`Quantity of ${item.name}`}
          value={quantity}
          min={MIN_PORTIONS}
          max={MAX_PORTIONS}
          onChange={setQuantity}
          hint={`${MIN_PORTIONS}–${MAX_PORTIONS} portions`}
          size="compact"
        />
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          Add to cart
        </button>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {justAdded ? `${item.name} added to cart.` : ""}
      </p>
    </article>
  );
}
