import { formatCurrency } from '../lib/utils.js'
import { useCart } from '../context/CartContext.jsx'
import FoodImage from './FoodImage.jsx'

const CATEGORY_META = {
  protein: { badge: 'Protein', icon: '🍗' },
  vegetarian: { badge: 'Vegetarian', icon: '🥬' },
  side: { badge: 'Side', icon: '🥖' },
}

export default function MenuItemCard({ item, dayKey, onSelect }) {
  const { cart, addItem } = useCart()
  const inCart = cart.items.some((i) => i.itemId === item.id)
  const meta = CATEGORY_META[item.category] || { badge: item.category, icon: '🍽️' }

  return (
    <article className="menu-card">
      <button
        type="button"
        className="menu-card__media"
        onClick={() => onSelect(item)}
        aria-label={`View details for ${item.name}`}
      >
        <FoodImage src={item.image} alt={item.name} />
        <span className="menu-card__badge">{meta.icon} {meta.badge}</span>
      </button>

      <div className="menu-card__body">
        <h3 className="menu-card__name">
          <button type="button" onClick={() => onSelect(item)} className="menu-card__name-btn">
            {item.name}
          </button>
        </h3>
        <p className="menu-card__price">
          {formatCurrency(item.price)} <span className="menu-card__unit">per person</span>
        </p>
        <button
          type="button"
          className={`btn ${inCart ? 'btn--secondary' : 'btn--primary'} menu-card__add`}
          onClick={() => (inCart ? onSelect(item) : addItem(dayKey, item))}
          disabled={!cart.pickupDate}
          title={cart.pickupDate ? undefined : 'Choose a pickup date first'}
        >
          {!cart.pickupDate
            ? 'Pick a date first'
            : inCart
            ? 'In cart'
            : `Add for ${cart.guests} guests`}
        </button>
      </div>
    </article>
  )
}
