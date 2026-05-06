import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import './DragonScene.css'

const MODEL_ID = 'd942a0d167594169b3f037f562458d38'
const SDK_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js'
/** Hard ceiling for waiting the model — beyond this we let the page through. */
const HARD_TIMEOUT_MS = 13000
/** Grace period after `viewerready` before greenlighting the page — gives the
 *  viewer time to download textures and draw the first real frame of the model
 *  (the `viewerready` event itself fires before that). */
const VIEWER_BUFFER_MS = 1400

declare global {
  interface Window {
    Sketchfab?: new (iframe: HTMLIFrameElement) => SketchfabClient
    /** Latch set by DragonScene the moment scene:ready fires — used by the
     *  Preloader to recover from any mount-order race. */
    __sceneReady?: boolean
  }
}

interface SketchfabClient {
  init(modelId: string, options: SketchfabInitOptions): void
}

interface SketchfabInitOptions {
  autostart?: 0 | 1
  autospin?: number
  preload?: 0 | 1
  ui_animations?: 0 | 1
  ui_annotations?: 0 | 1
  ui_controls?: 0 | 1
  ui_help?: 0 | 1
  ui_hint?: 0 | 1 | 2
  ui_infos?: 0 | 1
  ui_inspector?: 0 | 1
  ui_loading?: 0 | 1
  ui_settings?: 0 | 1
  ui_stop?: 0 | 1
  ui_fullscreen?: 0 | 1
  ui_vr?: 0 | 1
  ui_watermark?: 0 | 1
  ui_watermark_link?: 0 | 1
  ui_theme?: 'dark' | 'light'
  transparent?: 0 | 1
  success?: (api: SketchfabApi) => void
  error?: () => void
}

interface SketchfabApi {
  start: () => void
  stop?: () => void
  pause?: () => void
  play?: () => void
  addEventListener: (event: 'viewerready' | string, cb: () => void) => void
}

let sdkPromise: Promise<void> | null = null
function loadSdk(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.Sketchfab) return Promise.resolve()
  if (sdkPromise) return sdkPromise
  sdkPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SDK_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      sdkPromise = null
      reject(new Error('Sketchfab SDK failed to load'))
    }
    document.head.appendChild(script)
  })
  return sdkPromise
}

type Props = {
  className?: string
}

export function DragonScene({ className }: Props) {
  const reduced = useReducedMotion()
  // Sketchfab's WebGL embed crashes mobile browsers ("Impossible d'ouvrir cette
  // page" on iOS, OOM kills on Android Chrome) once you stack it on top of GSAP
  // + Lenis + smooth scroll. We swap it for a static premium backdrop below
  // this width — the layout & copy stay identical.
  const isMobile = useMediaQuery('(max-width: 768px)')
  const wrapRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const apiRef = useRef<SketchfabApi | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let hardTimeoutId: number | null = null
    let bufferTimeoutId: number | null = null
    let fired = false

    const fireReady = () => {
      if (cancelled || fired) return
      fired = true
      window.__sceneReady = true
      setReady(true)
      window.dispatchEvent(new CustomEvent('scene:ready'))
    }

    // Mobile: don't even mount the Sketchfab iframe — release the preloader
    // immediately so the rest of the page can paint.
    if (isMobile) {
      fireReady()
      return () => {
        cancelled = true
      }
    }

    hardTimeoutId = window.setTimeout(fireReady, HARD_TIMEOUT_MS)

    const onViewerReady = () => {
      // Wait a beat for textures + the first real frame to draw before
      // releasing the preloader. `viewerready` fires earlier than the user
      // perceives a fully painted dragon.
      if (cancelled || fired) return
      bufferTimeoutId = window.setTimeout(fireReady, VIEWER_BUFFER_MS)
    }

    const initViewer = () => {
      const iframe = iframeRef.current
      if (cancelled || !iframe || !window.Sketchfab) return
      try {
        const client = new window.Sketchfab(iframe)
        client.init(MODEL_ID, {
          autostart: reduced ? 0 : 1,
          autospin: 0,
          preload: 1,
          ui_animations: 0,
          ui_annotations: 0,
          ui_controls: 0,
          ui_help: 0,
          ui_hint: 0,
          ui_infos: 0,
          ui_inspector: 0,
          ui_loading: 0,
          ui_settings: 0,
          ui_stop: 0,
          ui_fullscreen: 0,
          ui_vr: 0,
          ui_watermark: 0,
          ui_watermark_link: 0,
          ui_theme: 'dark',
          transparent: 0,
          success: (api) => {
            apiRef.current = api
            api.start()
            api.addEventListener('viewerready', onViewerReady)
          },
          error: fireReady,
        })
      } catch {
        fireReady()
      }
    }

    loadSdk()
      .then(() => {
        if (!cancelled) initViewer()
      })
      .catch(fireReady)

    return () => {
      cancelled = true
      apiRef.current = null
      if (hardTimeoutId !== null) window.clearTimeout(hardTimeoutId)
      if (bufferTimeoutId !== null) window.clearTimeout(bufferTimeoutId)
    }
  }, [reduced, isMobile])

  // Pause the viewer while the hero is offscreen — saves a ton of GPU/CPU
  // since the embedded Sketchfab page keeps rendering otherwise.
  useEffect(() => {
    if (isMobile) return
    const wrap = wrapRef.current
    if (!wrap) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true
        const api = apiRef.current
        if (!api) return
        try {
          if (visible) {
            api.play?.()
            api.start?.()
          } else {
            api.pause?.()
            api.stop?.()
          }
        } catch {
          // Sketchfab API can throw if not fully ready — ignore.
        }
      },
      { threshold: 0.05 },
    )
    obs.observe(wrap)
    return () => obs.disconnect()
  }, [isMobile])

  return (
    <div ref={wrapRef} className={`dragon-scene${className ? ` ${className}` : ''}`}>
      {isMobile ? (
        <div className="dragon-scene__mobile-bg" aria-hidden="true" />
      ) : (
        <>
          <div
            className={`dragon-scene__placeholder${ready ? ' is-hidden' : ''}`}
            aria-hidden="true"
          >
            <span className="dragon-scene__shimmer" />
          </div>
          <iframe
            ref={iframeRef}
            className="dragon-scene__frame"
            title="Dragon — modèle 3D animé"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            loading="lazy"
          />
          <div className="dragon-scene__mask dragon-scene__mask--top" aria-hidden="true" />
          <div className="dragon-scene__mask dragon-scene__mask--right" aria-hidden="true" />
          <div className="dragon-scene__mask dragon-scene__mask--bottom" aria-hidden="true" />
        </>
      )}
    </div>
  )
}
