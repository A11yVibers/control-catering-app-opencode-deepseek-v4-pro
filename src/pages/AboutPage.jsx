import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { Link } from "react-router-dom";
import { BUSINESS } from "../data/menu.js";

export default function AboutPage() {
  useDocumentTitle("About");

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "About" },
        ]}
      />

      <h1>About {BUSINESS.name}</h1>

      <div className="prose">
        <p className="lede">
          We are a small, family-run kitchen cooking homemade food in small
          batches — the way you&apos;d make it at home, only for a crowd.
        </p>

        <h2>Our story</h2>
        <p>
          {BUSINESS.name} began at a kitchen table, cooking for neighbors,
          birthdays and church potlucks. Word spread, and soon we were catering
          gatherings across town. We still cook every order from scratch, using
          the same recipes our family has passed down for generations.
        </p>

        <h2>How we cook</h2>
        <p>
          Every dish is prepared to order in small batches. We shop for seasonal
          produce each morning, marinate and season by hand, and never cut
          corners. Because we cook in small batches, each day of the week has
          its own focused menu — so everything is always fresh.
        </p>

        <h2>Our promise</h2>
        <ul>
          <li>Homemade recipes made from scratch</li>
          <li>Fresh, seasonal ingredients</li>
          <li>Careful packaging, ready for pickup</li>
          <li>A warm, personal touch with every order</li>
        </ul>

        <p>
          <Link to="/menu" className="btn btn-primary">
            See what&apos;s on the menu this week
          </Link>
        </p>
      </div>
    </div>
  );
}
