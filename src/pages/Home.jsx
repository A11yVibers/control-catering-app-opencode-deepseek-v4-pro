import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">Homemade catering · Made fresh · Pickup</p>
            <h1 className="hero__title">
              Real food, cooked at home, <em>for your table.</em>
            </h1>
            <p className="hero__subtitle">
              Hearth &amp; Harvest is a small-batch catering kitchen. We plan a fresh menu every
              single day of the week, cook it from scratch, and have it ready for you to pick up —
              for gatherings of 6 to 30 people.
            </p>
            <div className="hero__actions">
              <Link to="/menu" className="btn btn--primary btn--lg">
                Browse the Menu
              </Link>
              <Link to="/about" className="btn btn--ghost btn--lg">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">How it works</h2>
          <div className="how">
            <div className="how__step">
              <span className="how__num">1</span>
              <h3>Pick your date</h3>
              <p>Every day of the week has its own unique menu. Order 2 days to 2 weeks ahead.</p>
            </div>
            <div className="how__step">
              <span className="how__num">2</span>
              <h3>Build your meal</h3>
              <p>Choose from 10 dishes a day — proteins, vegetarian, and sides — for 6 to 30 people.</p>
            </div>
            <div className="how__step">
              <span className="how__num">3</span>
              <h3>Pick up &amp; enjoy</h3>
              <p>We cook everything fresh that morning. Pick it up warm and serve it with love.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="home__features">
            <div>
              <h2 className="section__title">A different menu every day</h2>
              <p className="section__lead">
                From Cozy Classics on Monday to Sunday Roast, there’s always something new on the
                stove. See today’s lineup and plan ahead.
              </p>
              <Link to="/menu" className="btn btn--primary">
                See This Week’s Menus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
