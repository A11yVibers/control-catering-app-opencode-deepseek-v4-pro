const CART_KEY = 'hearth-harvest:cart'
const ORDERS_KEY = 'hearth-harvest:orders'

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage may be unavailable (private mode / quota). Fail silently.
  }
}

export function loadCart() {
  return readJSON(CART_KEY, { pickupDate: null, items: [], guests: 10 })
}

export function saveCart(cart) {
  writeJSON(CART_KEY, cart)
}

export function loadOrders() {
  return readJSON(ORDERS_KEY, [])
}

export function saveOrder(order) {
  const orders = loadOrders()
  orders.unshift(order)
  writeJSON(ORDERS_KEY, orders)
  return order
}

export function getOrderById(orderId) {
  return loadOrders().find((o) => o.id === orderId) || null
}

export function clearCart() {
  try {
    localStorage.removeItem(CART_KEY)
  } catch {
    // noop
  }
}
