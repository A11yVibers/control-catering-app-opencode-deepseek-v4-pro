import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadCart, saveCart } from '../lib/storage.js'

const CartContext = createContext(null)

const MIN_GUESTS = 6
const MAX_GUESTS = 30

function createEmptyCart() {
  return { pickupDate: null, guests: 10, items: [] }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const loaded = loadCart()
    return loaded && typeof loaded === 'object' ? { ...createEmptyCart(), ...loaded } : createEmptyCart()
  })

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const setPickupDate = (pickupDate) => setCart((c) => ({ ...c, pickupDate }))

  const setGuests = (guests) => {
    const clamped = Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, guests))
    setCart((c) => ({ ...c, guests: clamped }))
  }

  const addItem = (dayKey, item) => {
    setCart((c) => {
      const existing = c.items.find((i) => i.itemId === item.id)
      if (existing) {
        return c
      }
      return {
        ...c,
        items: [...c.items, { itemId: item.id, dayKey, quantity: c.guests }],
      }
    })
  }

  const updateQuantity = (itemId, quantity) => {
    const q = Math.max(1, Math.floor(quantity) || 1)
    setCart((c) => ({
      ...c,
      items: c.items.map((i) => (i.itemId === itemId ? { ...i, quantity: q } : i)),
    }))
  }

  const removeItem = (itemId) => {
    setCart((c) => ({ ...c, items: c.items.filter((i) => i.itemId !== itemId) }))
  }

  const clearCart = () => setCart(createEmptyCart())

  const value = useMemo(
    () => ({
      cart,
      setPickupDate,
      setGuests,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      minGuests: MIN_GUESTS,
      maxGuests: MAX_GUESTS,
    }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
