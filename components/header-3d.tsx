"use client"
import { useEffect, useRef } from "react"

export function Header3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 500

    let animationId: number

    // Particle system for animated background
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Grid lines animation
    const gridLines: Array<{ x: number; y: number; angle: number }> = []
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        gridLines.push({
          x: (i / 5) * canvas.width,
          y: (j / 5) * canvas.height,
          angle: Math.random() * Math.PI * 2,
        })
      }
    }

    let time = 0

    const animate = () => {
      time += 0.01

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0052FF")
      gradient.addColorStop(0.5, "#001A3D")
      gradient.addColorStop(1, "#0052FF")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      ctx.strokeStyle = "rgba(74, 123, 167, 0.15)"
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i + Math.sin(time) * 10, 0)
        ctx.lineTo(i + Math.sin(time + 1) * 10, canvas.height)
        ctx.stroke()
      }

      // Draw animated glowing lines
      ctx.strokeStyle = "rgba(255, 204, 51, 0.3)"
      ctx.lineWidth = 2
      for (const line of gridLines) {
        ctx.beginPath()
        const x1 = line.x + Math.cos(time + line.angle) * 50
        const y1 = line.y + Math.sin(time + line.angle) * 50
        const x2 = line.x + Math.cos(time + line.angle + Math.PI) * 50
        const y2 = line.y + Math.sin(time + line.angle + Math.PI) * 50
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Draw and update particles
      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.fillStyle = `rgba(255, 204, 51, ${particle.opacity * 0.3})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw floating 3D shapes (simplified)
      ctx.strokeStyle = "rgba(74, 123, 167, 0.4)"
      ctx.lineWidth = 2

      // Cube outline
      const cubeSize = 40
      const cubeX = canvas.width / 4 + Math.sin(time) * 20
      const cubeY = canvas.height / 3 + Math.cos(time * 0.7) * 15

      ctx.strokeRect(cubeX, cubeY, cubeSize, cubeSize)
      ctx.strokeRect(cubeX - 15, cubeY - 15, cubeSize, cubeSize)
      ctx.beginPath()
      ctx.moveTo(cubeX, cubeY)
      ctx.lineTo(cubeX - 15, cubeY - 15)
      ctx.moveTo(cubeX + cubeSize, cubeY)
      ctx.lineTo(cubeX + cubeSize - 15, cubeY - 15)
      ctx.moveTo(cubeX, cubeY + cubeSize)
      ctx.lineTo(cubeX - 15, cubeY + cubeSize - 15)
      ctx.moveTo(cubeX + cubeSize, cubeY + cubeSize)
      ctx.lineTo(cubeX + cubeSize - 15, cubeY + cubeSize - 15)
      ctx.stroke()

      // Octahedron on right side
      const octaX = (canvas.width * 3) / 4
      const octaY = canvas.height / 2 + Math.sin(time * 0.8) * 20
      const octaSize = 50

      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)"
      ctx.beginPath()
      ctx.moveTo(octaX, octaY - octaSize)
      ctx.lineTo(octaX + octaSize, octaY)
      ctx.lineTo(octaX, octaY + octaSize)
      ctx.lineTo(octaX - octaSize, octaY)
      ctx.closePath()
      ctx.stroke()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
    }

    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      <canvas ref={canvasRef} className="w-full block" />
      {/* Overlay with text and logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#FFCC33] to-[#FFD700] rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
            <div className="text-5xl font-bold text-[#0052FF]">FDH</div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg max-w-3xl">
          Where Digital Fashion Meets Onchain Innovation
        </h1>
        <p className="text-white/80 text-lg mt-4 drop-shadow-lg">
          Generate AI NFTs, build your 3D wardrobe, earn $FDH rewards on Base
        </p>
      </div>
    </div>
  )
}
