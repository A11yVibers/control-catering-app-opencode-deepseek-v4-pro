import { useMemo, useState } from 'react'
import {
  addDays,
  toLocalISO,
  formatDate,
  getMenuForDate,
  isPickupDateValid,
  CATEGORIES,
  ORDER_RULES,
} from '../data/menu.js'
import FoodCard from '../components/FoodCard.jsx'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'protein', label: CATEGORIES.protein.label },
  { id: 'vegetarian', label: CATEGORIES.vegetarian.label },
  { id: 'sides', label: CATEGORIES.sides.label },
]

export default function MenuPage() {
  const today = useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const minDate = addDays(today, ORDER_RULES.minLeadDays)
  const maxDate = addDays(today, ORDER_RULES.maxLeadDays)

  const [dateStr, setDateStr] = useState(toLocalISO(minDate))
  const [filter, setFilter] = useState('all')

  const selectedDate = useMemo(() => {
    const [y, m, d] = dateStr.split('-').map(Number)
    return new Date(y, m - 1, d)
  }, [dateStr])

  const valid = isPickupDateValid(selectedDate)
  const menu = valid ? getMenuForDate(selectedDate) : null

  const visibleItems = useMemo(() => {
    if (!menu) return []
    if (filter === 'all') return menu.items
    return menu.items.filter((it) => it.category === filter)
  }, [menu, filter])

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-inner">
          <h1>Pick your day, pick your menu</h1>
          <p>
            Every day of the week we cook a different menu. Choose your pickup
            date to see what&rsquo;s being served.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="date-picker-row">
          <label className="date-picker">
            <span className="date-picker-label">Pickup date</span>
            <input
              type="date"
              value={dateStr}
              min={toLocalISO(minDate)}
              max={toLocalISO(maxDate)}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </label>
          <p className="date-hint muted">
            Order at least {ORDER_RULES.minLeadDays} days ahead, up to{' '}
            {ORDER_RULES.maxLeadDays} days in advance.
          </p>
        </div>

        {!valid && (
          <div className="notice notice-warn">
            Please choose a date between {formatDate(minDate)} and{' '}
            {formatDate(maxDate)}.
          </div>
        )}

        {valid && menu && (
          <>
            <div className="menu-heading">
              <h2>{menu.title}</h2>
              <p className="muted">
                {formatDate(selectedDate)} · {menu.items.length} items
              </p>
              <p>{menu.blurb}</p>
            </div>

            <div className="filter-row" role="tablist" aria-label="Filter by category">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`filter-chip ${filter === f.id ? 'active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {FILTERS.filter((f) => f.id !== 'all' && (filter === 'all' || filter === f.id)).map(
              (f) => {
                const items = visibleItems.filter((it) => it.category === f.id)
                if (items.length === 0) return null
                return (
                  <section key={f.id} className="category-section">
                    <div className="category-heading">
                      <h3>{CATEGORIES[f.id].label}</h3>
                      <p className="muted">{CATEGORIES[f.id].description}</p>
                    </div>
                    <div className="food-grid">
                      {items.map((item) => (
                        <FoodCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                )
              },
            )}
          </>
        )}
      </section>
    </div>
  )
}
