import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { BUSINESS } from '../data/menu.js'

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active' : '')

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">🍲</span>
          <span className="brand-text">
            <strong>{BUSINESS.name}</strong>
            <small>{BUSINESS.tagline}</small>
          </span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Menu
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <Link to="/cart" className="cart-link" onClick={() => setOpen(false)}>
            <span aria-hidden="true">🛒</span>
            <span>Cart</span>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
