import { useMemo, useState } from 'react'
import { DAYS, CATEGORIES, getDayMenu } from '../data/menu.js'
import {
  getOrderWindow,
  addDays,
  startOfDay,
  toDayKey,
  toISODate,
  formatDate,
} from '../lib/utils.js'
import { useCart } from '../context/CartContext.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import ItemDetailModal from '../components/ItemDetailModal.jsx'

export default function Menu() {
  const { cart, setPickupDate, clearCart, setGuests, minGuests, maxGuests } = useCart()
  const { minDate, maxDate } = getOrderWindow()

  const [selectedDate, setSelectedDate] = useState(() =>
    cart.pickupDate ? new Date(`${cart.pickupDate}T12:00:00`) : null
  )
  const [detailItem, setDetailItem] = useState(null)

  const days = useMemo(() => {
    const list = []
    let d = minDate
    while (d <= maxDate) {
      list.push(new Date(d))
      d = addDays(d, 1)
    }
    return list
  }, [minDate, maxDate])

  const dayKey = selectedDate ? toDayKey(selectedDate) : null
  const dayInfo = dayKey ? DAYS.find((d) => d.key === dayKey) : null
  const menuItems = dayKey ? getDayMenu(dayKey) : []

  const handlePickDate = (date) => {
    const iso = toISODate(startOfDay(date))
    const currentIso = cart.pickupDate

    if (currentIso && currentIso !== iso && cart.items.length > 0) {
      const ok = window.confirm(
        'Your cart contains items for a different pickup date. Changing the date will clear your cart. Continue?'
      )
      if (!ok) return
      clearCart()
    }

    setPickupDate(iso)
    setSelectedDate(startOfDay(date))
  }

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: menuItems.filter((i) => i.category === cat.key),
  }))

  const selectedIso = selectedDate ? toISODate(selectedDate) : null

  return (
    <div className="menu-page">
      <section className="menu-page__header">
        <div className="container">
          <h1 className="menu-page__title">Daily Menu</h1>
          <p className="menu-page__intro">
            Choose your pickup date to see that day’s menu. Orders are accepted between 2 days and 2
            weeks in advance.
          </p>

          <div className="day-strip" role="group" aria-label="Choose a pickup date">
            {days.map((d) => {
              const iso = toISODate(d)
              const isSelected = iso === selectedIso
              const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(d)
              const dayNum = d.getDate()
              const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d)
              return (
                <button
                  key={iso}
                  type="button"
                  className={`day-strip__day ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handlePickDate(d)}
                  aria-pressed={isSelected}
                >
                  <span className="day-strip__weekday">{weekday}</span>
                  <span className="day-strip__num">{dayNum}</span>
                  <span className="day-strip__month">{month}</span>
                </button>
              )
            })}
          </div>

          {selectedDate && dayInfo && (
            <p className="menu-page__selection">
              <strong>{formatDate(selectedDate)}</strong> · {dayInfo.theme} menu
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!selectedDate ? (
            <div className="empty-state">
              <p className="empty-state__icon" aria-hidden="true">📅</p>
              <h2>Choose your pickup date</h2>
              <p>
                Select a date above to see the menu for that day. Each day of the week features its
                own lineup of 10 homemade dishes.
              </p>
            </div>
          ) : (
            <>
              <div className="menu-page__guests">
                <span className="menu-page__guests-label">Planning for how many guests?</span>
                <div className="stepper" role="group" aria-label="Number of guests">
                  <button
                    type="button"
                    className="stepper__btn"
                    onClick={() => setGuests(cart.guests - 1)}
                    disabled={cart.guests <= minGuests}
                    aria-label="Decrease guests"
                  >
                    −
                  </button>
                  <span className="stepper__value">{cart.guests}</span>
                  <button
                    type="button"
                    className="stepper__btn"
                    onClick={() => setGuests(cart.guests + 1)}
                    disabled={cart.guests >= maxGuests}
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
                <span className="menu-page__guests-note">6–30 guests · prices are per person</span>
              </div>

              {grouped.map((cat) => (
                <section key={cat.key} className="menu-category">
                  <header className="menu-category__header">
                    <h2 className="menu-category__title">{cat.label}</h2>
                    <p className="menu-category__blurb">{cat.blurb}</p>
                  </header>
                  <div className="menu-category__grid">
                    {cat.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        dayKey={dayKey}
                        onSelect={setDetailItem}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </section>

      <ItemDetailModal
        item={detailItem}
        dayKey={dayKey}
        onClose={() => setDetailItem(null)}
      />
    </div>
  )
}
