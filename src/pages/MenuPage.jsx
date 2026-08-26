import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import MenuCard from "../components/MenuCard.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { CATEGORIES, getMenuForDay, MIN_PORTIONS, MAX_PORTIONS } from "../data/menu.js";
import {
  toISODate,
  fromISODate,
  dayKeyOf,
  minOrderDate,
  maxOrderDate,
  isOrderableDate,
  DAY_LABELS,
  formatLongDate,
} from "../utils/dates.js";

const CATEGORY_ORDER = ["protein", "vegetarian", "side"];

export default function MenuPage() {
  useDocumentTitle("Daily Menu");

  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => minOrderDate(today), [today]);
  const maxDate = useMemo(() => maxOrderDate(today), [today]);
  const minIso = toISODate(minDate);
  const maxIso = toISODate(maxDate);

  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("date");

  let selectedIso = minIso;
  if (raw) {
    try {
      const d = fromISODate(raw);
      if (isOrderableDate(d, today)) selectedIso = raw;
    } catch {
      selectedIso = minIso;
    }
  }

  const selectedDate = fromISODate(selectedIso);
  const dayKey = dayKeyOf(selectedDate);
  const menuItems = getMenuForDay(dayKey);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: menuItems.filter((item) => item.category === cat),
  }));

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Menu" },
        ]}
      />

      <h1>Daily menu</h1>
      <p className="lede">
        Choose a pickup date to see what&apos;s cooking that day. Each day of the
        week has its own menu.
      </p>

      <section className="date-panel" aria-labelledby="date-heading">
        <h2 id="date-heading" className="visually-hidden">
          Select pickup date
        </h2>
        <label htmlFor="pickup-date" className="date-label">
          Pickup date
        </label>
        <div className="date-controls">
          <input
            id="pickup-date"
            type="date"
            className="date-input"
            value={selectedIso}
            min={minIso}
            max={maxIso}
            onChange={(e) => {
              const v = e.target.value;
              if (v) setSearchParams({ date: v });
            }}
          />
        </div>
        <p className="date-hint" id="pickup-date-hint">
          Orders can be placed at least 2 days and at most 2 weeks ahead.
        </p>
        <p className="date-summary" role="status">
          Showing the <strong>{DAY_LABELS[dayKey]}</strong> menu for{" "}
          <strong>{formatLongDate(selectedDate)}</strong>.
        </p>
      </section>

      {grouped.map(({ cat, items }) => (
        <section
          key={cat}
          className="category-section"
          aria-labelledby={`cat-${cat}`}
        >
          <h2 id={`cat-${cat}`} className="category-heading">
            {CATEGORIES[cat].label}
            <span className="category-count" aria-hidden="true">
              {items.length}
            </span>
            <span className="visually-hidden">
              {items.length} items
            </span>
          </h2>
          <ul className="menu-grid">
            {items.map((item) => (
              <li key={item.id}>
                <MenuCard item={item} dateIso={selectedIso} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="menu-note">
        Every menu includes {MIN_PORTIONS}–{MAX_PORTIONS} portions per dish. Need a
        full event? Add several dishes and set the portions for each.
      </p>
    </div>
  );
}
