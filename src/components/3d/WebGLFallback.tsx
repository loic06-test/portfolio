import { useEffect, useState } from 'react'

/** Returns true once we've detected WebGL is unavailable. Used as a guard. */
export function useWebGLAvailable(): boolean {
  const [ok, setOk] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl')
      setOk(Boolean(gl))
    } catch {
      setOk(false)
    }
  }, [])

  return ok
}

/** Static, premium-looking fallback shown when WebGL is missing or fails. */
export function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(60% 60% at 65% 45%, rgba(216,58,44,0.12) 0%, rgba(8,9,11,0) 60%), radial-gradient(40% 40% at 70% 50%, #1c1e24 0%, #08090b 70%)',
      }}
    />
  )
}
