import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MENU_ITEM_MAP, CATEGORIES, formatPrice } from '../data/menu.js'
import { useCart } from '../context/CartContext.jsx'
import NutritionTable from '../components/NutritionTable.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'

export default function ItemDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const item = MENU_ITEM_MAP[id]

  if (!item) {
    return (
      <div className="page">
        <div className="section">
          <div className="notice notice-warn">Item not found.</div>
          <Link to="/" className="btn btn-secondary">
            Back to menu
          </Link>
        </div>
      </div>
    )
  }

  const category = CATEGORIES[item.category]

  const handleAdd = () => {
    addItem(item.id, quantity)
    navigate('/cart')
  }

  return (
    <div className="page">
      <div className="section">
        <Link to="/" className="back-link">
          ← Back to menu
        </Link>

        <div className="item-detail">
          <div className="item-detail-media">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="item-detail-info">
            <span className="badge">{category.label}</span>
            <h1>{item.name}</h1>
            <p className="item-price">{formatPrice(item.price)} / portion</p>
            <p className="item-desc">{item.description}</p>

            <div className="add-row">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <button className="btn btn-primary" onClick={handleAdd}>
                Add {quantity} to Cart · {formatPrice(item.price * quantity)}
              </button>
            </div>
          </div>
        </div>

        <div className="item-detail-cols">
          <div className="detail-col">
            <h3>Ingredients</h3>
            <ul className="ingredient-list">
              {item.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </div>
          <div className="detail-col">
            <NutritionTable nutrition={item.nutrition} />
          </div>
        </div>
      </div>
    </div>
  )
}
