import { Link } from 'react-router-dom'
import { BUSINESS, ORDER_RULES } from '../data/menu.js'

export default function AboutPage() {
  return (
    <div className="page">
      <section className="hero hero-sm">
        <div className="hero-inner">
          <h1>About {BUSINESS.name}</h1>
          <p>Home cooking, made from scratch, for your whole table.</p>
        </div>
      </section>

      <div className="section">
        <div className="prose">
          <h2>Our story</h2>
          <p>
            {BUSINESS.name} started in a home kitchen with one simple idea: the
            best meals are the ones made by hand, with real ingredients and a
            little extra care. What began as cooking for family and neighbors
            has grown into a small catering service that brings honest,
            homemade food to your table.
          </p>
          <p>
            Every dish is prepared fresh to order. We cook in small batches, use
            seasonal ingredients where we can, and never cut corners — the same
            way we&rsquo;d cook for our own family.
          </p>

          <h2>How it works</h2>
          <ol className="how-list">
            <li>
              <strong>Pick a day.</strong> Each day of the week has its own
              unique menu of 10 dishes.
            </li>
            <li>
              <strong>Choose your portions.</strong> Orders serve between{' '}
              {ORDER_RULES.minPortions} and {ORDER_RULES.maxPortions} people.
            </li>
            <li>
              <strong>Order ahead.</strong> Place your order at least{' '}
              {ORDER_RULES.minLeadDays} days and up to {ORDER_RULES.maxLeadDays}{' '}
              days before pickup.
            </li>
            <li>
              <strong>Pick up &amp; enjoy.</strong> Swing by our kitchen at your
              chosen time and we&rsquo;ll have everything ready.
            </li>
          </ol>

          <h2>What we cook</h2>
          <p>
            Every menu features five protein mains, three vegetarian dishes and
            two sides — a balanced spread that covers everyone at the table. You
            can view ingredients and full nutrition facts for every item right
            on the menu.
          </p>

          <div className="cta-row">
            <Link to="/" className="btn btn-primary">
              See this week&rsquo;s menus
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
