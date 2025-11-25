"use client"

import { useEffect, useRef } from "react"

// Define core brand colors for the animation
const BRAND_COLORS = {
 ROYAL_BLUE: "#0504AA", // Base Background (though the body provides this)
 BRIGHT_BLUE: "#00A8E1", // Secondary circuit/particle color
 WHITE: "#FFFFFF",       // Main particle color
 GOLD: "#F5C542",        // Primary circuit color
}

export function AnimatedBackground() {
 const canvasRef = useRef<HTMLCanvasElement>(null)

 useEffect(() => {
   const canvas = canvasRef.current
   if (!canvas) return

   const ctx = canvas.getContext("2d")
   if (!ctx) return

   // Function to handle canvas resize
   const handleResize = () => {
     canvas.width = window.innerWidth
     canvas.height = window.innerHeight
   }

   // Set initial dimensions and listen for resize events
   handleResize()
   window.addEventListener("resize", handleResize)

   // Particle structure and color array using brand colors
   const particles: Array<{
     x: number
     y: number
     size: number
     speedX: number
     speedY: number
     opacity: number
     color: string
   }> = []

   // Use a mix of White (for primary) and Gold/Bright Blue (for accent)
   const colors = [BRAND_COLORS.WHITE, BRAND_COLORS.GOLD, BRAND_COLORS.BRIGHT_BLUE]

   // Create particles (mostly white, moving subtly)
   for (let i = 0; i < 120; i++) { // Increased particle count slightly for density
     particles.push({
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height,
       size: Math.random() * 2 + 0.5, // Smaller particles
       speedX: (Math.random() - 0.5) * 0.3, // Slower movement
       speedY: (Math.random() - 0.5) * 0.3,
       opacity: Math.random() * 0.4 + 0.1, // Very subtle opacity
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

   for (let i = 0; i < 20; i++) { // Increased circuit count
     const startX = Math.random() * canvas.width
     const startY = Math.random() * canvas.height
     const segments: Array<{ x: number; y: number }> = [{ x: startX, y: startY }]

     let currentX = startX
     let currentY = startY

     for (let j = 0; j < 6; j++) { // Slightly longer circuit paths
       const angle = Math.random() * Math.PI * 2
       currentX += Math.cos(angle) * (50 + Math.random() * 150) // More random, larger segments
       currentY += Math.sin(angle) * (50 + Math.random() * 150)
       segments.push({ x: currentX, y: currentY })
     }

     circuits.push({
       startX,
       startY,
       segments,
       progress: Math.random(),
       speed: 0.001 + Math.random() * 0.002, // Slightly slower, more deliberate speed
       color: [BRAND_COLORS.GOLD, BRAND_COLORS.BRIGHT_BLUE][Math.floor(Math.random() * 2)], // Only Gold or Bright Blue circuits
     })
   }

   function animate() {
     if (!ctx || !canvas) return

     // Clear the canvas with a slight royal blue tint for a ghosting trail effect
     ctx.fillStyle = `rgba(5, 4, 170, 0.05)` // ROYAL_BLUE with high transparency
     ctx.fillRect(0, 0, canvas.width, canvas.height)

     // Draw circuit lines
     circuits.forEach((circuit) => {
       ctx.beginPath()
       ctx.strokeStyle = circuit.color
       ctx.lineWidth = 1
       ctx.globalAlpha = 0.2 // Very subtle line opacity

       for (let i = 0; i < circuit.segments.length - 1; i++) {
         const progress = Math.min(1, Math.max(0, circuit.progress * (circuit.segments.length - 1) - i))
         if (progress > 0) {
           ctx.moveTo(circuit.segments[i].x, circuit.segments[i].y)
           const nextX = circuit.segments[i].x + (circuit.segments[i + 1].x - circuit.segments[i].x) * progress
           const nextY = circuit.segments[i].y + (circuit.segments[i + 1].y - circuit.segments[i].y) * progress
           ctx.lineTo(nextX, nextY)
         }
       }
       ctx.stroke()

       // Draw glowing dot at the end of the line segment
       const segmentCount = circuit.segments.length - 1
       const currentSegment = Math.floor(circuit.progress * segmentCount)
       const segmentProgress = (circuit.progress * segmentCount) % 1

       if (currentSegment < segmentCount) {
         const dotX =
           circuit.segments[currentSegment].x +
           (circuit.segments[currentSegment + 1].x - circuit.segments[currentSegment].x) * segmentProgress
         const dotY =
           circuit.segments[currentSegment].y +
           (circuit.segments[currentSegment + 1].y - circuit.segments[currentSegment].y) * segmentProgress

         // Draw bright dot
         ctx.beginPath()
         ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
         ctx.fillStyle = circuit.color
         ctx.globalAlpha = 0.9
         ctx.fill()

         // Draw surrounding glow
         const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 10)
         gradient.addColorStop(0, circuit.color + 'FF')
         gradient.addColorStop(1, circuit.color + '00') // Transparent end
         ctx.fillStyle = gradient
         ctx.globalAlpha = 0.3
         ctx.fill()
       }

       circuit.progress += circuit.speed
       if (circuit.progress >= 1) {
         circuit.progress = 0
         // Re-randomize circuit path for dynamic effect
         // This keeps the background fresh and non-repeating
         const startX = Math.random() * canvas.width
         const startY = Math.random() * canvas.height
         circuit.segments = [{ x: startX, y: startY }]
         let currentX = startX
         let currentY = startY
         for (let j = 0; j < 6; j++) {
             const angle = Math.random() * Math.PI * 2
             currentX += Math.cos(angle) * (50 + Math.random() * 150)
             currentY += Math.sin(angle) * (50 + Math.random() * 150)
             circuit.segments.push({ x: currentX, y: currentY })
         }
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

       // Wrap particles when they go off-screen
       if (particle.x < 0) particle.x = canvas.width
       if (particle.x > canvas.width) particle.x = 0
       if (particle.y < 0) particle.y = canvas.height
       if (particle.y > canvas.height) particle.y = 0
     })

     ctx.globalAlpha = 1
     requestAnimationFrame(animate)
   }

   animate()

   return () => window.removeEventListener("resize", handleResize)
 }, [])

 return (
   <canvas
     ref={canvasRef}
     className="fixed inset-0 z-0 pointer-events-none"
     // The canvas style is set to transparent to allow the main body background
     // (with the 3D grid effect from globals.css) to show through.
     style={{ background: "transparent" }}
   />
 )
}