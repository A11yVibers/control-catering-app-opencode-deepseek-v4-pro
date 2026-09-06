import { useEffect, useState } from "react"

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "")
  const parts = raw.split("/").filter(Boolean)
  return {
    path: parts[0] || "",
    param: parts[1] || "",
  }
}

export function navigate(hash) {
  if (window.location.hash === hash) return
  window.location.hash = hash
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  return route
}
