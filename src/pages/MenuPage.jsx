import { useId, useState } from 'react'
import {
  BUSINESS,
  CATEGORIES,
  CATEGORY_ORDER,
  formatCurrency,
  formatDate,
  getMenuForISO,
  maxPickupISO,
  minPickupISO,
} from '../data/menu.js'
import { APPROVED_IMAGES } from '../approved-images.js'

function ItemCard({ item, onView, onAdd }) {
  return (
    <li className="item-card">
      <img className="item-image" src={item.image} alt={item.name} />
      <div className="item-card-body">
        <p className="item-category">{CATEGORIES[item.category]}</p>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">{formatCurrency(item.price)} / serving</p>
        <div className="item-card-actions">
          <button type="button" className="button button-secondary" onClick={() => onView(item)}>
            View details
          </button>
          <button type="button" className="button button-primary" onClick={() => onAdd(item)}>
            Add to cart
          </button>
        </div>
      </div>
    </li>
  )
}

export default function MenuPage({ onAddItem, onViewItem }) {
  const [selectedDate, setSelectedDate] = useState(minPickupISO())
  const dateId = useId()
  const menu = getMenuForISO(selectedDate)

  return (
    <>
      <section className="hero">
        <img className="hero-image" src={APPROVED_IMAGES.hero} alt="" />
        <div className="hero-overlay">
          <h1>{BUSINESS.name}</h1>
          <p className="hero-tagline">{BUSINESS.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="date-picker-panel">
          <div>
            <h2>Choose your pickup date</h2>
            <p className="muted">
              Order at least 2 days and up to 2 weeks in advance. Menus change by the day of the
              week.
            </p>
          </div>
          <label className="date-label" htmlFor={dateId}>
            Pickup date
          </label>
          <input
            id={dateId}
            className="date-input"
            type="date"
            value={selectedDate}
            min={minPickupISO()}
            max={maxPickupISO()}
            onChange={(e) => {
              if (e.target.value) setSelectedDate(e.target.value)
            }}
          />
        </div>

        <p className="menu-date-heading">
          <span className="visuallyhidden">Showing the menu for </span>
          <strong>{formatDate(selectedDate)}</strong>
          <span aria-hidden="true"> · </span>
          <span className="menu-day">{menu.label}</span>
        </p>

        {CATEGORY_ORDER.map((category) => {
          const items = menu.items.filter((it) => it.category === category)
          return (
            <section key={category} className="menu-section" aria-labelledby={`cat-${category}`}>
              <h2 id={`cat-${category}`} className="menu-section-heading">
                {CATEGORIES[category]}
              </h2>
              <ul className="item-grid">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onView={(it) => onViewItem(it, selectedDate)}
                    onAdd={() => onAddItem(item, 1, selectedDate)}
                  />
                ))}
              </ul>
            </section>
          )
        })}

        <p className="menu-note">
          Every order serves between <strong>6</strong> and <strong>30</strong> people. Prices are
          per serving.
        </p>
      </section>
    </>
  )
}
