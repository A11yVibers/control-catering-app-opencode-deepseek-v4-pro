const CART_KEY = "hearth-cart-v1"
const ORDERS_KEY = "hearth-orders-v1"

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage may be unavailable (private mode); the app still works in-memory
  }
}

export function loadCart() {
  const cart = readJSON(CART_KEY, null)
  if (
    cart &&
    typeof cart.date === "string" &&
    Array.isArray(cart.items) &&
    cart.items.every(
      (it) =>
        it &&
        typeof it.id === "string" &&
        typeof it.name === "string" &&
        typeof it.price === "number" &&
        Number.isFinite(it.quantity) &&
        it.quantity > 0,
    )
  ) {
    return { date: cart.date, items: cart.items }
  }
  return { date: "", items: [] }
}

export function saveCart(cart) {
  writeJSON(CART_KEY, cart)
}

export function loadOrders() {
  const orders = readJSON(ORDERS_KEY, [])
  return Array.isArray(orders) ? orders : []
}

export function saveOrder(order) {
  const orders = loadOrders()
  orders.unshift(order)
  writeJSON(ORDERS_KEY, orders)
  return orders
}

export function findOrder(id) {
  return loadOrders().find((o) => o.id === id) || null
}

export function clearCart() {
  try {
    window.localStorage.removeItem(CART_KEY)
  } catch {
    // ignore
  }
}
