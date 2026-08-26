import { useState } from 'react'

export default function FoodImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`food-image food-image--placeholder ${className}`} role="img" aria-label={alt}>
        <span aria-hidden="true">🍽️</span>
      </div>
    )
  }

  return (
    <img
      className={`food-image ${className}`}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
