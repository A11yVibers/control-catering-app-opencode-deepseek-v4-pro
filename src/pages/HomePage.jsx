import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { BUSINESS } from "../data/menu.js";
import { minOrderDate, maxOrderDate, formatShortDate } from "../utils/dates.js";

const STEPS = [
  {
    title: "Choose a pickup day",
    body: "Pick any day between two days and two weeks from now. Each day of the week has its own menu.",
  },
  {
    title: "Build your order",
    body: "Select dishes from the daily menu and set portions — from 6 up to 30 people.",
  },
  {
    title: "Pick up and enjoy",
    body: "Check out with your details, receive your invoice, and collect your homemade meal at your pickup time.",
  },
];

export default function HomePage() {
  useDocumentTitle("Homemade Catering for Pickup");

  const minDate = formatShortDate(minOrderDate());
  const maxDate = formatShortDate(maxOrderDate());

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Homemade catering, cooked fresh for your next gathering</h1>
          <p className="lede">{BUSINESS.tagline}</p>
          <p>
            Order for pickup between <strong>{minDate}</strong> and{" "}
            <strong>{maxDate}</strong>.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary btn-large">
              View the menu
            </Link>
            <Link to="/about" className="btn btn-secondary btn-large">
              Learn about us
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-heading">
        <h2 id="how-heading" className="section-title">
          How it works
        </h2>
        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.title} className="step">
              <h3 className="step-title">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-alt" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="section-title">
          A fresh menu every day
        </h2>
        <p className="section-intro">
          Every weekday features five proteins, three vegetarian dishes and two
          sides — so there&apos;s always something new to look forward to.
        </p>
        <p>
          <Link to="/menu" className="btn btn-primary">
            Browse this week&apos;s menus
          </Link>
        </p>
      </section>
    </>
  );
}
