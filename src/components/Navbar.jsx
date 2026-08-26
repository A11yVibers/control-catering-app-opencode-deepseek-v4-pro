import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { cart } = useCart()
  const [open, setOpen] = useState(false)

  const itemCount = cart.items.length

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-mark" aria-hidden="true">🌿</span>
          <span className="navbar__brand-text">
            Hearth<span>&amp;</span>Harvest
          </span>
        </Link>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/cart" className="navbar__cart" onClick={() => setOpen(false)}>
            <span aria-hidden="true">🛒</span>
            <span>Cart</span>
            {itemCount > 0 && <span className="navbar__cart-count">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
