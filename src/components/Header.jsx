import { BUSINESS } from '../data/menu.js'

function NavLink({ href, current, children }) {
  return (
    <a href={href} className="nav-link" aria-current={current ? 'page' : undefined}>
      {children}
    </a>
  )
}

export default function Header({ route, cartCount }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="header-inner">
        <a href="#/" className="brand">
          <span className="brand-mark" aria-hidden="true">H&H</span>
          <span className="brand-name">{BUSINESS.name}</span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav-list">
            <li>
              <NavLink href="#/" current={route.path === '' || route.path === 'menu'}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink href="#/about" current={route.path === 'about'}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink href="#/contact" current={route.path === 'contact'}>
                Contact
              </NavLink>
            </li>
            <li>
              <a href="#/cart" className="nav-link cart-link" aria-current={route.path === 'cart' ? 'page' : undefined}>
                Cart
                {cartCount > 0 && (
                  <>
                    <span className="cart-badge">{cartCount}</span>
                    <span className="visuallyhidden"> items in cart</span>
                  </>
                )}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
