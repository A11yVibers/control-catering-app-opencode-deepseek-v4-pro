import { useEffect, useId, useRef, useState } from 'react'
import { CATEGORIES, formatCurrency } from '../data/menu.js'

const NUTRITION_ORDER = [
  ['servingSize', 'Serving size'],
  ['calories', 'Calories'],
  ['totalFat', 'Total fat'],
  ['saturatedFat', 'Saturated fat'],
  ['cholesterol', 'Cholesterol'],
  ['sodium', 'Sodium'],
  ['totalCarbohydrate', 'Total carbohydrate'],
  ['dietaryFiber', 'Dietary fiber'],
  ['totalSugars', 'Total sugars'],
  ['protein', 'Protein'],
]

export default function ItemDetailDialog({ item, onAdd, onClose }) {
  const dialogRef = useRef(null)
  const [quantity, setQuantity] = useState(1)
  const titleId = useId()
  const qtyId = useId()

  useEffect(() => {
    if (item && dialogRef.current && !dialogRef.current.open) {
      setQuantity(1)
      dialogRef.current.showModal()
    }
  }, [item])

  if (!item) return null

  return (
    <dialog
      ref={dialogRef}
      className="item-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
    >
      <div className="dialog-inner">
        <img className="dialog-image" src={item.image} alt="" />
        <div className="dialog-body">
          <p className="item-category">{CATEGORIES[item.category]}</p>
          <h2 id={titleId} className="dialog-title">
            {item.name}
          </h2>
          <p className="dialog-price">{formatCurrency(item.price)} per serving</p>
          <p className="dialog-description">{item.description}</p>

          <h3 className="dialog-subheading">Ingredients</h3>
          <ul className="ingredient-list">
            {item.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <h3 className="dialog-subheading">Nutrition facts</h3>
          <table className="nutrition-table">
            <caption className="visuallyhidden">Nutrition facts for {item.name}</caption>
            <tbody>
              {NUTRITION_ORDER.map(([key, label]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  <td>{item.nutrition[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="dialog-actions">
            <label htmlFor={qtyId} className="qty-label">
              Quantity
            </label>
            <input
              id={qtyId}
              className="qty-input"
              type="number"
              min="1"
              max="30"
              value={quantity}
              onChange={(e) => {
                const v = Math.max(1, Math.min(30, Number(e.target.value) || 1))
                setQuantity(v)
              }}
            />
            <button
              type="button"
              className="button button-secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                onAdd(item, quantity)
                dialogRef.current?.close()
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="dialog-close"
        aria-label="Close"
        onClick={() => dialogRef.current?.close()}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </dialog>
  )
}
