import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

export default function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <div className="page">
      <h1>Page not found</h1>
      <p>The page you were looking for doesn&apos;t exist.</p>
      <p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </p>
    </div>
  );
}
