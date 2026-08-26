import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <p className="footer__brand">
            <span aria-hidden="true">🌿</span> Hearth &amp; Harvest
          </p>
          <p className="footer__tagline">
            Homemade food, made fresh for your gathering — picked up warm and ready to serve.
          </p>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Explore</h2>
          <ul className="footer__list">
            <li><Link to="/menu">Order Menu</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Your Cart</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Contact</h2>
          <ul className="footer__list">
            <li>
              <a href="tel:+15551234567">(555) 123-4567</a>
            </li>
            <li>
              <a href="mailto:hello@hearthharvest.com">hello@hearthharvest.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="container">
          © {new Date().getFullYear()} Hearth &amp; Harvest Homemade Catering. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
