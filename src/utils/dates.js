// Date helpers for the two-day / two-week ordering window.

export const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const DAY_LABELS = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// JavaScript Date.getDay(): 0 = Sunday … 6 = Saturday.
export function dayKeyOf(date) {
  return DAY_KEYS[date.getDay()];
}

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Orders must be placed at least 2 days and at most 14 days ahead.
export function minOrderDate(today = new Date()) {
  return startOfDay(addDays(today, 2));
}

export function maxOrderDate(today = new Date()) {
  return startOfDay(addDays(today, 14));
}

export function isOrderableDate(date, today = new Date()) {
  const d = startOfDay(date);
  return d >= minOrderDate(today) && d <= maxOrderDate(today);
}

export function formatLongDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
