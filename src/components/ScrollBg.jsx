import { useEffect, useRef } from 'react'

// Scroll-driven frame-by-frame canvas background
export default function ScrollBg() {
  const canvasRef  = useRef(null)
  const videoRef   = useRef(null)
  const stateRef   = useRef({ frames: [], framesReady: false, lastIdx: -1 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const state  = stateRef.current

    // VIDEO_URL: replace with your own hosted bubble video URL
    // Embed as base64 or host on a CDN — see README for instructions
    const VIDEO_URL = '/bubble.mp4'

    function resize() {
      const dpr = Math.min(devicePixelRatio, 2)
      const r   = canvas.getBoundingClientRect()
      canvas.width  = Math.round(r.width  * dpr)
      canvas.height = Math.round(r.height * dpr)
      state.lastIdx = -1
    }

    function getProgress() {
      const vh    = window.innerHeight
      const start = vh * 0.5
      const end   = document.documentElement.scrollHeight - vh
      const range = end - start
      if (range <= 0) return 0
      return Math.max(0, Math.min(1, (window.scrollY - start) / range))
    }

    function drawFrame(frame) {
      const cw = canvas.width, ch = canvas.height
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = '#edf1f6'
      ctx.fillRect(0, 0, cw, ch)
      ctx.restore()
      const s  = Math.max(cw / frame.width, ch / frame.height)
      const dw = frame.width * s, dh = frame.height * s
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      if (canvas.style.visibility !== 'visible') canvas.style.visibility = 'visible'
    }

    async function extractFrames() {
      try {
        const response  = await fetch(VIDEO_URL, { mode: 'cors' })
        const blob      = await response.blob()
        const objectUrl = URL.createObjectURL(blob)

        const video        = document.createElement('video')
        video.muted        = true
        video.playsInline  = true
        video.crossOrigin  = 'anonymous'
        video.preload      = 'auto'
        video.src          = objectUrl

        await new Promise((res, rej) => {
          video.onloadedmetadata = res
          video.onerror          = rej
          setTimeout(rej, 15000)
        })

        const screenW = window.innerWidth  * Math.min(devicePixelRatio, 2)
        const screenH = window.innerHeight * Math.min(devicePixelRatio, 2)
        const scale   = Math.min(screenW / video.videoWidth, screenH / video.videoHeight, 1)
        const sw      = Math.max(Math.round(video.videoWidth  * scale), 640)
        const sh      = Math.max(Math.round(video.videoHeight * scale), 360)
        const count   = 40

        for (let i = 0; i < count; i++) {
          const time = (i / (count - 1)) * (video.duration - 0.05)
          video.currentTime = time
          await new Promise((res, rej) => {
            const h = () => { video.removeEventListener('seeked', h); res() }
            video.addEventListener('seeked', h)
            setTimeout(() => { video.removeEventListener('seeked', h); rej() }, 8000)
          })
          const bitmap = await createImageBitmap(video, { resizeWidth: sw, resizeHeight: sh })
          state.frames.push(bitmap)
          if (state.frames.length === 1) state.framesReady = true
        }
        URL.revokeObjectURL(objectUrl)
      } catch (e) {
        console.warn('Frame extraction failed:', e)
      }
    }

    function tick() {
      const progress = getProgress()
      if (state.framesReady && state.frames.length > 0) {
        const idx = Math.round(progress * (state.frames.length - 1))
        if (idx !== state.lastIdx) {
          state.lastIdx = idx
          if (state.frames[idx]) drawFrame(state.frames[idx])
        }
      }
      requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.style.visibility = 'hidden'
    requestAnimationFrame(tick)
    extractFrames()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div
      id="scroll-video-container"
      className="fixed inset-0 -z-10"
      style={{ background: '#edf1f6' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          background: '#edf1f6',
        }}
      />
      {/* White overlay to lighten the bubble video */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(240,244,248,0.55)' }}
      />
    </div>
  )
}
