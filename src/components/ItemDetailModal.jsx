import { useEffect } from 'react'
import { formatCurrency } from '../lib/utils.js'
import { useCart } from '../context/CartContext.jsx'
import FoodImage from './FoodImage.jsx'

const NUTRITION_ROWS = [
  ['calories', 'Calories'],
  ['totalFat', 'Total Fat'],
  ['saturatedFat', 'Saturated Fat'],
  ['transFat', 'Trans Fat'],
  ['cholesterol', 'Cholesterol'],
  ['sodium', 'Sodium'],
  ['totalCarb', 'Total Carbohydrate'],
  ['fiber', 'Dietary Fiber'],
  ['sugar', 'Total Sugars'],
  ['protein', 'Protein'],
]

export default function ItemDetailModal({ item, dayKey, onClose }) {
  const { cart, addItem } = useCart()
  const inCart = item ? cart.items.some((i) => i.itemId === item.id) : false

  useEffect(() => {
    if (!item) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={item.name} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close details">
          ✕
        </button>

        <div className="modal__media">
          <FoodImage src={item.image} alt={item.name} />
        </div>

        <div className="modal__content">
          <h2 className="modal__title">{item.name}</h2>
          <p className="modal__price">
            {formatCurrency(item.price)} <span>per person</span>
          </p>

          <p className="modal__description">{item.description}</p>

          <section className="modal__section">
            <h3 className="modal__heading">Ingredients</h3>
            <ul className="modal__ingredients">
              {item.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </section>

          <section className="modal__section">
            <h3 className="modal__heading">Nutrition Facts</h3>
            <p className="modal__serving">Serving size: {item.nutrition.servingSize}</p>
            <table className="nutrition-table">
              <tbody>
                {NUTRITION_ROWS.map(([key, label]) => (
                  <tr key={key} className="nutrition-table__row">
                    <th scope="row">{label}</th>
                    <td>{item.nutrition[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="modal__actions">
            <button
              type="button"
              className={`btn ${inCart ? 'btn--secondary' : 'btn--primary'} btn--block`}
              onClick={() => (inCart ? onClose() : addItem(dayKey, item))}
              disabled={!cart.pickupDate}
            >
              {!cart.pickupDate
                ? 'Pick a date first'
                : inCart
                ? 'Added to cart'
                : `Add for ${cart.guests} guests`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
