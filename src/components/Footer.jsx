import { BUSINESS } from '../data/menu.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">{BUSINESS.name}</p>
          <p className="footer-tagline">{BUSINESS.tagline}</p>
        </div>
        <div>
          <p className="footer-heading">Find us</p>
          <p>{BUSINESS.address}</p>
          <p>{BUSINESS.hours}</p>
        </div>
        <div>
          <p className="footer-heading">Get in touch</p>
          <p>
            <a href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, '')}`}>{BUSINESS.phone}</a>
          </p>
          <p>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
