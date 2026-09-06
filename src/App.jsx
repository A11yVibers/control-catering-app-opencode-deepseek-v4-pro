import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ItemDetailDialog from './components/ItemDetailDialog.jsx'
import MenuPage from './pages/MenuPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import InvoicePage from './pages/InvoicePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { BUSINESS } from './data/menu.js'
import { useHashRoute, navigate } from './lib/router.js'
import { clearCart, findOrder, loadCart, saveCart, saveOrder } from './lib/storage.js'

function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `HH-${stamp}-${rand}`
}

export default function App() {
  const route = useHashRoute()
  const [cart, setCart] = useState(loadCart)
  const [detail, setDetail] = useState(null)
  const mainRef = useRef(null)
  const prevPathRef = useRef(null)

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  useEffect(() => {
    const titles = {
      '': `${BUSINESS.name} — Homemade catering`,
      about: `About — ${BUSINESS.name}`,
      contact: `Contact — ${BUSINESS.name}`,
      cart: `Cart — ${BUSINESS.name}`,
      checkout: `Checkout — ${BUSINESS.name}`,
      invoice: `Order confirmation — ${BUSINESS.name}`,
    }
    document.title = titles[route.path] || titles['']
  }, [route.path])

  useEffect(() => {
    const currentPath = `${route.path}/${route.param}`
    if (prevPathRef.current === null) {
      prevPathRef.current = currentPath
      return
    }
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [route.path, route.param])

  const cartCount = useMemo(() => cart.items.reduce((s, it) => s + it.quantity, 0), [cart.items])

  const addItem = (item, quantity, dateISO) => {
    if (cart.date && cart.date !== dateISO && cart.items.length > 0) {
      const ok = window.confirm(
        "Your cart has items for a different pickup date. Starting a new order will clear those items. Continue?",
      )
      if (!ok) return
    }
    const line = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
    }
    setCart((prev) => {
      if (!prev.date || prev.date !== dateISO) {
        return { date: dateISO, items: [line] }
      }
      const existing = prev.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id ? { ...i, quantity: Math.min(30, i.quantity + quantity) } : i,
          ),
        }
      }
      return { ...prev, items: [...prev.items, line] }
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }))
  }

  const removeItem = (id) => {
    setCart((prev) => {
      const items = prev.items.filter((i) => i.id !== id)
      return { date: items.length ? prev.date : '', items }
    })
  }

  const placeOrder = (details) => {
    const subtotal = cart.items.reduce((s, it) => s + it.price * it.quantity, 0)
    const order = {
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      pickupDate: cart.date,
      guests: details.guests,
      name: details.name,
      phone: details.phone,
      email: details.email,
      payment: details.payment,
      instructions: details.instructions,
      items: cart.items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      total: subtotal,
    }
    saveOrder(order)
    setCart({ date: '', items: [] })
    clearCart()
    navigate(`#/invoice/${order.id}`)
  }

  let content
  switch (route.path) {
    case '':
      content = <MenuPage onAddItem={addItem} onViewItem={(item, date) => setDetail({ item, date })} />
      break
    case 'about':
      content = <AboutPage />
      break
    case 'contact':
      content = <ContactPage />
      break
    case 'cart':
      content = (
        <CartPage
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={() => navigate('#/checkout')}
        />
      )
      break
    case 'checkout':
      content =
        cart.items.length > 0 ? (
          <CheckoutPage cart={cart} onPlaceOrder={placeOrder} />
        ) : (
          <div className="page page-narrow">
            <h1 className="page-title">Your cart is empty</h1>
            <p>Add some dishes before checking out.</p>
            <a className="button button-primary" href="#/">
              Browse the menu
            </a>
          </div>
        )
      break
    case 'invoice':
      content = <InvoicePage order={findOrder(route.param)} />
      break
    default:
      content = <MenuPage onAddItem={addItem} onViewItem={(item, date) => setDetail({ item, date })} />
  }

  return (
    <>
      <Header route={route} cartCount={cartCount} />
      <main id="main-content" tabIndex="-1" ref={mainRef}>
        {content}
      </main>
      <Footer />
      <ItemDetailDialog
        item={detail ? detail.item : null}
        onAdd={(item, qty) => addItem(item, qty, detail.date)}
        onClose={() => setDetail(null)}
      />
    </>
  )
}
