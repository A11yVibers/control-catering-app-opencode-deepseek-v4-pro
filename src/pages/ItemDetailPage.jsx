import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import NutritionTable from "../components/NutritionTable.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import { useCart, clampQuantity } from "../context/CartContext.jsx";
import { CATEGORIES, ITEM_MAP, MIN_PORTIONS, MAX_PORTIONS } from "../data/menu.js";
import { formatPrice } from "../utils/format.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(MIN_PORTIONS);
  const [added, setAdded] = useState(false);

  const item = ITEM_MAP[itemId];

  useDocumentTitle(item ? item.name : "Item not found");

  if (!item) {
    return <NotFoundPage />;
  }

  const categoryLabel = CATEGORIES[item.category].label;
  const dateIso = searchParams.get("date") || "";

  const handleAdd = () => {
    addItem(item.id, clampQuantity(quantity));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Menu", to: dateIso ? `/menu?date=${dateIso}` : "/menu" },
          { label: item.name },
        ]}
      />

      <article className="item-detail" aria-labelledby="item-name">
        <div className="item-detail-media">
          <img
            src={item.image.src}
            alt={item.image.alt}
            width="800"
            height="533"
          />
        </div>

        <div className="item-detail-info">
          <span className="category-badge">{categoryLabel}</span>
          <h1 id="item-name">{item.name}</h1>
          <p className="item-price">
            <strong>{formatPrice(item.price)}</strong> <span>{item.portion}</span>
          </p>

          <section aria-labelledby="desc-heading">
            <h2 id="desc-heading" className="detail-heading">
              Description
            </h2>
            <p>{item.description}</p>
          </section>

          <section aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading" className="detail-heading">
              Ingredients
            </h2>
            <ul className="ingredient-list">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="nutrition-heading">
            <h2 id="nutrition-heading" className="detail-heading">
              Nutrition facts
            </h2>
            <NutritionTable nutrition={item.nutrition} itemName={item.name} />
          </section>

          <div className="add-to-cart-panel">
            <QuantityStepper
              id={`detail-qty-${item.id}`}
              label="Quantity"
              value={quantity}
              min={MIN_PORTIONS}
              max={MAX_PORTIONS}
              onChange={setQuantity}
              hint={`${MIN_PORTIONS}–${MAX_PORTIONS} portions`}
            />
            <button type="button" className="btn btn-primary btn-large" onClick={handleAdd}>
              Add {quantity} portions to cart
            </button>
            <p className="visually-hidden" role="status" aria-live="polite">
              {added ? `${item.name} added to cart.` : ""}
            </p>
          </div>

          <p>
            <Link to={dateIso ? `/menu?date=${dateIso}` : "/menu"} className="back-link">
              Back to menu
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
