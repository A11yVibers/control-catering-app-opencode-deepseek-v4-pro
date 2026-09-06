import { BUSINESS } from '../data/menu.js'
import { APPROVED_IMAGES } from '../approved-images.js'

export default function AboutPage() {
  return (
    <div className="page page-narrow">
      <h1 className="page-title">About {BUSINESS.name}</h1>

      <img className="about-image" src={APPROVED_IMAGES.about} alt="Preparing food in the kitchen" />

      <section aria-labelledby="story-heading">
        <h2 id="story-heading">Our story</h2>
        <p>
          {BUSINESS.name} started in a home kitchen with a simple belief: food made from scratch,
          with care, brings people together. What began as cooking for neighbors and family
          gatherings has grown into a small catering service rooted in the same homemade recipes.
        </p>
        <p>
          Every dish is prepared in small batches, using seasonal ingredients and time-honored
          techniques. We never freeze, never cut corners, and always cook like we're expecting you
          at our own table.
        </p>
      </section>

      <section aria-labelledby="values-heading">
        <h2 id="values-heading">What we stand for</h2>
        <ul className="about-list">
          <li>
            <strong>Made from scratch.</strong> Sauces, stocks, and doughs are made in-house, from
            whole ingredients.
          </li>
          <li>
            <strong>Seasonal and local.</strong> Our menus shift with the week and the harvest, so
            every day tastes a little different.
          </li>
          <li>
            <strong>Homegrown hospitality.</strong> We treat every order like a gathering of friends
            — generous portions, warm service, and a table set with care.
          </li>
        </ul>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading">How ordering works</h2>
        <ol className="about-list">
          <li>Pick a pickup date (at least 2 days, up to 2 weeks out).</li>
          <li>Choose your dishes from that day's menu — every weekday has its own.</li>
          <li>Check out with your details and pickup time. We prepare everything fresh for you.</li>
        </ol>
        <p>
          Every order serves between 6 and 30 people, and each dish is priced per serving. Have a
          question? <a href="#/contact">Get in touch</a>.
        </p>
      </section>
    </div>
  )
}
