import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="section empty-state">
        <h1>Page not found</h1>
        <p className="muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to menu
        </Link>
      </div>
    </div>
  )
}
