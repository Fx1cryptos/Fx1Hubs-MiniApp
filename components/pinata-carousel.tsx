"use client"
import { useState, useEffect } from "react"

interface PinataImage {
  ipfsHash: string
  name: string
  size: number
}

export function PinataCarousel() {
  const [images, setImages] = useState<PinataImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeImages = async () => {
      try {
        setImages([
          {
            ipfsHash: "QmExample1",
            name: "Futuristic Cyberpunk Jacket",
            size: 1024000,
          },
          {
            ipfsHash: "QmExample2",
            name: "Golden Tech Hoodie",
            size: 1024000,
          },
          {
            ipfsHash: "QmExample3",
            name: "Neon Digital Vest",
            size: 1024000,
          },
          {
            ipfsHash: "QmExample4",
            name: "Holographic Streetwear",
            size: 1024000,
          },
          {
            ipfsHash: "QmExample5",
            name: "Premium Fashion NFT",
            size: 1024000,
          },
        ])
      } catch (error) {
        console.error("[v0] Error initializing images:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeImages()
  }, [])

  useEffect(() => {
    if (images.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  if (loading) {
    return <div className="text-center text-white py-12">Loading Fashion NFTs...</div>
  }

  if (images.length === 0) {
    return (
      <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/20">
        <p className="text-white/70">Connect your Pinata account to display fashion NFTs</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div className="relative">
      <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0052FF] to-[#001A3D] border border-white/20">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white/50">
            <p className="text-lg font-semibold">{currentImage.name}</p>
            <p className="text-sm">IPFS: {currentImage.ipfsHash.substring(0, 20)}...</p>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        >
          →
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${index === currentIndex ? "bg-[#FFCC33]" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  )
}
