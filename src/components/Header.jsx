import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { BUSINESS } from "../data/menu.js";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="header-bar">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            HK
          </span>
          <span className="brand-text">
            <span className="brand-name">{BUSINESS.name}</span>
            <span className="brand-tagline">{BUSINESS.tagline}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/cart" className="nav-link nav-cart">
                Cart
                <span className="cart-count" aria-label={`${totalItems} portions in cart`}>
                  {totalItems}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
