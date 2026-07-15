import { useEffect, useRef } from 'react'

export default function ScrollBg() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(160deg, #dce8f4 0%, #edf1f6 50%, #d8e6f0 100%)' }}
    >
      {/* Video — desktop only; iOS blocks autoplay on fixed elements */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="desktop-bg-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      >
        <source src="/bubble.mp4" type="video/mp4" />
      </video>

      {/* Light overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(240,244,248,0.55)' }}
      />
    </div>
  )
}
