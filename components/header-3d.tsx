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
    canvas.height = 580

    let time = 0
    let animationId: number

    // Floating particles — Base electric blue
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    const animate = () => {
      time += 0.015

      // Deep Base-style gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, "#0A1F3D")
      bgGradient.addColorStop(0.4, "#0D2B66")
      bgGradient.addColorStop(1, "#001233")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle animated grid (Base classic)
      ctx.strokeStyle = "rgba(0, 114, 255, 0.08)"
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 80) {
        ctx.beginPath()
        ctx.moveTo(i + Math.sin(time * 2) * 30, 0)
        ctx.lineTo(i + Math.cos(time * 1.5) * 30, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 80) {
        ctx.beginPath()
        ctx.moveTo(0, i + Math.cos(time * 2) * 30)
        ctx.lineTo(canvas.width, i + Math.sin(time * 1.5) * 30)
        ctx.stroke()
      }

      // Glowing floating particles — Base cobalt + white glow
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Glow
        ctx.fillStyle = "rgba(0, 114, 255, 0.4)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `rgba(0, 191, 255, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Floating 3D wireframe cube (Base style)
      const cubeSize = 90
      const cx = canvas.width / 2 + Math.sin(time) * 80
      const cy = canvas.height / 2.5 + Math.cos(time * 0.8) * 50

      ctx.strokeStyle = "rgba(0, 191, 255, 0.7)"
      ctx.lineWidth = 2

      // Front face
      ctx.strokeRect(cx - cubeSize / 2, cy - cubeSize / 2, cubeSize, cubeSize)
      // Back face (offset)
      ctx.strokeRect(cx - cubeSize / 2 - 30, cy - cubeSize / 2 - 30, cubeSize, cubeSize)
      // Connecting edges
      ctx.beginPath()
      ctx.moveTo(cx - cubeSize / 2, cy - cubeSize / 2)
      ctx.lineTo(cx - cubeSize / 2 - 30, cy - cubeSize / 2 - 30)
      ctx.moveTo(cx + cubeSize / 2, cy - cubeSize / 2)
      ctx.lineTo(cx + cubeSize / 2 - 30, cy - cubeSize / 2 - 30)
      ctx.moveTo(cx - cubeSize / 2, cy + cubeSize / 2)
      ctx.lineTo(cx - cubeSize / 2 - 30, cy + cubeSize / 2 - 30)
      ctx.moveTo(cx + cubeSize / 2, cy + cubeSize / 2)
      ctx.lineTo(cx + cubeSize / 2 - 30, cy + cubeSize / 2 - 30)
      ctx.stroke()

      animationId = requestAnimationFrame(animate)
    }

    animate()

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
    <div className="relative w-full overflow-hidden bg-[#0A1F3D]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ height: "580px" }} />

      {/* Hero Overlay – Base Brands Style */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[580px] text-center px-6">
        {/* $FDH Logo – Electric Base Blue Ring */}
        <div className="mb-10">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[#00C2FF] to-[#0088FF] p-1 shadow-2xl animate-pulse-slow">
            <div className="w-full h-full rounded-full bg-[#001233] flex items-center justify-center border-8 border-[#00D4FF]/20">
              <span className="text-6xl font-black text-white tracking-tighter">$FDH</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight max-w-5xl">
          THE FUTURE OF STYLE
          <br />
          <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFD1] bg-clip-text text-transparent">
            LIVES ON BASE
          </span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-[#00C2FF]/90 font-medium max-w-2xl">
          AI-generated fashion NFTs • 3D wearable wardrobe • Powered by $FDH on Base
        </p>

        {/* Subtle glow line */}
        <div className="mt-10 w-64 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent rounded-full" />
      </div>
    </div>
  )
}