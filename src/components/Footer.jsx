import { Link } from "react-router-dom";
import { BUSINESS } from "../data/menu.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h2 className="footer-heading">{BUSINESS.name}</h2>
          <p>{BUSINESS.tagline}</p>
          <address className="footer-address">
            {BUSINESS.address}
            <br />
            {BUSINESS.hours}
          </address>
        </div>

        <nav className="footer-col" aria-label="Footer navigation">
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="footer-heading">Get in touch</h2>
          <ul className="footer-links">
            <li>
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            {BUSINESS.social.map((s) => (
              <li key={s.id}>
                <a href={s.href} rel="noopener noreferrer" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="footer-legal">
        &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </p>
    </footer>
  );
}
