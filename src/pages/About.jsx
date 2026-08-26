import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">About Us</h1>
          <p className="about-hero__subtitle">
            A home kitchen, a family recipe box, and a love for feeding the people we care about.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-page__story">
          <div className="about-page__story-copy">
            <h2 className="section__title">Our Story</h2>
            <p>
              Hearth &amp; Harvest began in our own kitchen, where Sunday dinners for family and
              friends always seemed to grow a few extra places at the table. We cooked the food we
              grew up with — slow roasts, bright salads, and sides made from whatever the garden was
              giving that week.
            </p>
            <p>
              What started as feeding neighbors for special occasions grew into a small-batch
              catering kitchen. Today we still cook every order from scratch, the same way we always
              have: with real ingredients, generous portions, and recipes worth passing down.
            </p>
            <p>
              Because we cook in small batches and change our menu with the days of the week, we ask
              that you order at least two days in advance — and no more than two weeks out. We cook
              everything the morning of your pickup so it reaches your table warm and fresh.
            </p>
          </div>
          <ul className="about-page__values">
            <li className="about-page__value">
              <span className="about-page__value-icon" aria-hidden="true">🥕</span>
              <div>
                <h3>Made from scratch</h3>
                <p>No shortcuts, no packets. Just real cooking from real ingredients.</p>
              </div>
            </li>
            <li className="about-page__value">
              <span className="about-page__value-icon" aria-hidden="true">📅</span>
              <div>
                <h3>Fresh daily menus</h3>
                <p>A different menu for every day of the week, planned around what’s in season.</p>
              </div>
            </li>
            <li className="about-page__value">
              <span className="about-page__value-icon" aria-hidden="true">👨‍👩‍👧</span>
              <div>
                <h3>Small gatherings</h3>
                <p>We cater for parties of 6 to 30 — intimate enough to feel personal.</p>
              </div>
            </li>
            <li className="about-page__value">
              <span className="about-page__value-icon" aria-hidden="true">🏡</span>
              <div>
                <h3>Home-kitchen care</h3>
                <p>Every order gets the same attention we’d give our own dinner table.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container about-page__cta">
          <h2 className="section__title">Ready to see what’s cooking?</h2>
          <p className="section__lead">Browse this week’s menus and plan your next gathering.</p>
          <Link to="/menu" className="btn btn--primary btn--lg">Browse the Menu</Link>
        </div>
      </section>
    </div>
  )
}
