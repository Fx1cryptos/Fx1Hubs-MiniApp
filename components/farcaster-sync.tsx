"use client"
import { useState } from "react"

interface FarcasterUser {
  fid: number
  username: string
  pfpUrl: string
  displayName: string
}

export function FarcasterSync() {
  const [user, setUser] = useState<FarcasterUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [generatingNFT, setGeneratingNFT] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)

  const connectFarcaster = async () => {
    setLoading(true)
    try {
      // This would integrate with Farcaster's OAuth or frame API
      console.log("[v0] Connecting to Farcaster...")
      // Mock user data for demonstration
      setUser({
        fid: 1234,
        username: "fx1_builder",
        pfpUrl: "/farcaster-profile-picture.jpg",
        displayName: "FX1 Builder",
      })
    } catch (error) {
      console.error("[v0] Error connecting Farcaster:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateAIFashion = async () => {
    if (!user) return
    setGeneratingNFT(true)
    try {
      console.log("[v0] Generating AI 3D fashion NFT for", user.username)
      // This would call an AI image generation API
      setGeneratedImageUrl("/futuristic-3d-fashion-nft-digital-art.jpg")
    } catch (error) {
      console.error("[v0] Error generating NFT:", error)
    } finally {
      setGeneratingNFT(false)
    }
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Sync Your Farcaster Identity</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Farcaster Connection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Connect Your FID</h3>

            {!user ? (
              <button
                onClick={connectFarcaster}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#0052FF] to-[#FFCC33] text-white font-bold rounded-xl hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Connecting..." : "Connect Farcaster"}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFCC33] to-[#0052FF] flex items-center justify-center text-white font-bold text-lg">
                    FID
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">@{user.username}</p>
                    <p className="text-white font-semibold">{user.displayName}</p>
                    <p className="text-[#FFCC33] text-sm">FID: {user.fid}</p>
                  </div>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="w-full px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Right: AI NFT Generation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Generate 3D Fashion NFT</h3>

            {generatedImageUrl ? (
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#0052FF] to-[#001A3D]">
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <p>AI Generated Fashion Art</p>
                  </div>
                </div>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCC33] to-[#FFD700] text-[#0052FF] font-bold rounded-xl hover:scale-105 transition">
                  Mint on Base (0.1 ETH)
                </button>
                <button
                  onClick={() => setGeneratedImageUrl(null)}
                  className="w-full px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition"
                >
                  Generate Again
                </button>
              </div>
            ) : (
              <button
                onClick={generateAIFashion}
                disabled={!user || generatingNFT}
                className="w-full px-6 py-4 bg-white/20 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/30 transition disabled:opacity-50"
              >
                {generatingNFT ? "Generating..." : user ? "Generate AI Fashion" : "Connect Farcaster First"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
