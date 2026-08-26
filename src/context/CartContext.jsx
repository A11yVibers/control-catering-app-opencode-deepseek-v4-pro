import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { MENU_ITEM_MAP } from '../data/menu.js'

const CartContext = createContext(null)

const STORAGE_KEY = 'catering-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line) => line && typeof line.id === 'string' && MENU_ITEM_MAP[line.id],
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // storage may be unavailable; ignore in-memory-only operation
    }
  }, [cart])

  const addItem = (id, quantity = 1) => {
    const item = MENU_ITEM_MAP[id]
    if (!item) return
    setCart((prev) => {
      const existing = prev.find((line) => line.id === id)
      if (existing) {
        return prev.map((line) =>
          line.id === id
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        )
      }
      return [...prev, { id, quantity }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((line) => line.id !== id)
      return prev.map((line) => (line.id === id ? { ...line, quantity } : line))
    })
  }

  const removeItem = (id) => {
    setCart((prev) => prev.filter((line) => line.id !== id))
  }

  const clearCart = () => setCart([])

  // Enrich lines with full item data + line totals.
  const lines = useMemo(
    () =>
      cart
        .map((line) => {
          const item = MENU_ITEM_MAP[line.id]
          if (!item) return null
          return { ...line, item, lineTotal: item.price * line.quantity }
        })
        .filter(Boolean),
    [cart],
  )

  const count = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart],
  )

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  )

  const value = {
    lines,
    count,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
