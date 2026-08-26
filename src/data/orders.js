const ORDERS_KEY = 'catering-orders'

export function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `HH-${ts}-${rand}`
}

export function saveOrder(order) {
  try {
    const existing = loadOrders()
    existing.push(order)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existing))
  } catch {
    // storage unavailable — order still displayed in-memory to the customer
  }
}

export function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getOrder(orderId) {
  return loadOrders().find((o) => o.id === orderId) || null
}
