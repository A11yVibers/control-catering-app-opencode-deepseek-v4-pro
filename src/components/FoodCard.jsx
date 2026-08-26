import { Link } from 'react-router-dom'
import { CATEGORIES, formatPrice } from '../data/menu.js'
import { useCart } from '../context/CartContext.jsx'

export default function FoodCard({ item }) {
  const { addItem } = useCart()
  const category = CATEGORIES[item.category]

  return (
    <article className="food-card">
      <Link to={`/item/${item.id}`} className="food-card-media">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="food-card-cat">{category.label}</span>
      </Link>
      <div className="food-card-body">
        <h3 className="food-card-title">
          <Link to={`/item/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="food-card-desc">{item.description}</p>
        <div className="food-card-foot">
          <span className="price">{formatPrice(item.price)}</span>
          <span className="muted">/ portion</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addItem(item.id, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
