import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/menu.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <strong>{BUSINESS.name}</strong>
          <p>{BUSINESS.tagline}</p>
          <p className="muted">{BUSINESS.address}</p>
        </div>
        <div className="footer-col">
          <strong>Hours</strong>
          <p>{BUSINESS.hours}</p>
        </div>
        <div className="footer-col">
          <strong>Contact</strong>
          <p>
            <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
          </p>
          <p>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </p>
          <div className="social-row">
            <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              Instagram
            </a>
            <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              Facebook
            </a>
          </div>
        </div>
        <div className="footer-col">
          <strong>Quick Links</strong>
          <Link to="/">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
      <div className="footer-bottom muted">
        © {new Date().getFullYear()} {BUSINESS.name}. Made with care.
      </div>
    </footer>
  )
}
