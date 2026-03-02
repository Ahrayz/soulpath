import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let stars = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    function initStars() {
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 4000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          hue: Math.random() > 0.8 ? Math.random() * 60 + 200 : 0,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      )
      gradient.addColorStop(0, 'rgba(20, 25, 60, 0.3)')
      gradient.addColorStop(0.5, 'rgba(15, 10, 35, 0.2)')
      gradient.addColorStop(1, 'rgba(10, 14, 26, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        star.opacity += star.twinkleSpeed * star.twinkleDir
        if (star.opacity >= 1) { star.opacity = 1; star.twinkleDir = -1 }
        if (star.opacity <= 0.1) { star.opacity = 0.1; star.twinkleDir = 1 }

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        if (star.hue > 0) {
          ctx.fillStyle = `hsla(${star.hue}, 60%, 70%, ${star.opacity * 0.8})`
        } else {
          ctx.fillStyle = `rgba(220, 230, 255, ${star.opacity * 0.7})`
        }
        ctx.fill()

        // Glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(180, 200, 255, ${star.opacity * 0.08})`
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'linear-gradient(180deg, #0a0e1a 0%, #0f0a23 50%, #0a0e1a 100%)' }}
    />
  )
}
