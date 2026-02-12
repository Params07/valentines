import { useEffect, useRef } from "react"

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })

    let animationId: number
    const particles: Particle[] = []

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      alpha = 1
      color: string

      constructor(x: number, y: number) {
        const angle = random(0, Math.PI * 2)
        const speed = random(5, 13)

        this.x = x
        this.y = y
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed

        const colors = ["#ff4d6d", "#ff85a1", "#ffd166", "#ffffff"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.07
        this.alpha -= 0.008
      }

      draw() {
        ctx.globalAlpha = this.alpha
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2)
        ctx.stroke()
      }
    }

    function explode() {
      const x = random(width * 0.1, width * 0.9)
      const y = random(height * 0.1, height * 0.5)

      for (let i = 0; i < 220; i++) {
        particles.push(new Particle(x, y))
      }
    }

    let lastExplosion = 0

    function animate(timestamp: number) {
      animationId = requestAnimationFrame(animate)

      // 🔥 Continuous explosion every ~600ms
      if (timestamp - lastExplosion > 600) {
        explode()
        lastExplosion = timestamp
      }

      // Softer fade trail (no hard clear)
      ctx.fillStyle = "linear-gradient(180deg, #ffffff, #ffe6f4)"
      ctx.fillRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()
        p.draw()

        if (p.alpha <= 0) {
          particles.splice(i, 1)
        }
      }
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1
      }}
    />
  )
}
