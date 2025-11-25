"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
    }> = []

    const colors = ["#3b82f6", "#d4af37", "#60a5fa", "#fbbf24"]

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create circuit lines
    const circuits: Array<{
      startX: number
      startY: number
      segments: Array<{ x: number; y: number }>
      progress: number
      speed: number
      color: string
    }> = []

    for (let i = 0; i < 15; i++) {
      const startX = Math.random() * canvas.width
      const startY = Math.random() * canvas.height
      const segments: Array<{ x: number; y: number }> = [{ x: startX, y: startY }]

      let currentX = startX
      let currentY = startY

      for (let j = 0; j < 5; j++) {
        const direction = Math.random() > 0.5
        if (direction) {
          currentX += (Math.random() - 0.5) * 200
        } else {
          currentY += (Math.random() - 0.5) * 200
        }
        segments.push({ x: currentX, y: currentY })
      }

      circuits.push({
        startX,
        startY,
        segments,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(10, 15, 35, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw circuit lines
      circuits.forEach((circuit) => {
        ctx.beginPath()
        ctx.strokeStyle = circuit.color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.3

        for (let i = 0; i < circuit.segments.length - 1; i++) {
          const progress = Math.min(1, Math.max(0, circuit.progress * circuit.segments.length - i))
          if (progress > 0) {
            ctx.moveTo(circuit.segments[i].x, circuit.segments[i].y)
            const nextX = circuit.segments[i].x + (circuit.segments[i + 1].x - circuit.segments[i].x) * progress
            const nextY = circuit.segments[i].y + (circuit.segments[i + 1].y - circuit.segments[i].y) * progress
            ctx.lineTo(nextX, nextY)
          }
        }
        ctx.stroke()

        // Draw glowing dot at the end
        const currentSegment = Math.floor(circuit.progress * (circuit.segments.length - 1))
        const segmentProgress = (circuit.progress * (circuit.segments.length - 1)) % 1

        if (currentSegment < circuit.segments.length - 1) {
          const dotX =
            circuit.segments[currentSegment].x +
            (circuit.segments[currentSegment + 1].x - circuit.segments[currentSegment].x) * segmentProgress
          const dotY =
            circuit.segments[currentSegment].y +
            (circuit.segments[currentSegment + 1].y - circuit.segments[currentSegment].y) * segmentProgress

          ctx.beginPath()
          ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
          ctx.fillStyle = circuit.color
          ctx.globalAlpha = 0.8
          ctx.fill()

          // Glow effect
          const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 15)
          gradient.addColorStop(0, circuit.color)
          gradient.addColorStop(1, "transparent")
          ctx.fillStyle = gradient
          ctx.globalAlpha = 0.4
          ctx.fill()
        }

        circuit.progress += circuit.speed
        if (circuit.progress > 1) {
          circuit.progress = 0
        }
      })

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "linear-gradient(135deg, #0a0f23 0%, #0d1529 50%, #0a1628 100%)" }}
    />
  )
}
