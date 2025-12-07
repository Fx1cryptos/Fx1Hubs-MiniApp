// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Header3D } from "@/components/header-3d"
import { FeaturesGallery } from "@/components/features-gallery"
import { SocialTasks } from "@/components/social-tasks"
import { NFTGalleryRefined } from "@/components/nft-gallery-refined"
import { ParagraphBlog } from "@/components/paragraph-blog"
import { FlaunchPool } from "@/components/flaunch-pool"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isWarpcast, setIsWarpcast] = useState(false)

  // Auto-detect if opened in Warpcast Mini App
  useEffect(() => {
    const inWarpcast = !!window.fc?.miniapp || !!window.minikit
    setIsWarpcast(inWarpcast)

    if (inWarpcast) {
      document.documentElement.style.height = "100dvh"
      document.body.style.height = "100dvh"
      document.body.style.overflow = "hidden"
    }
  }, [])

  // Smart Wallet Connect – Works in Warpcast + Browser
  const connectWallet = async () => {
    // 1. Farcaster Native (best experience)
    if (window.fc?.wallet) {
      try {
        const acc = await window.fc.wallet.connect()
        setWalletAddress(acc.address)
        return
      } catch (e) {}
    }

    // 2. Base Minikit
    if (window.minikit) {
      try {
        const { address } = await window.minikit.connectWallet()
        setWalletAddress(address)
        return
      } catch (e) {}
    }

    // 3. MetaMask / Coinbase Wallet
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletAddress(accounts[0])
      } catch (e) {
        alert("Wallet connection rejected")
      }
    } else {
      alert("No wallet found. Try opening in Warpcast.")
    }
  }

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#001428] via-[#0a2a54] to-[#001428] -z-10" />

      {/* Hero */}
      <Header3D />

      {/* Wallet Connect Bar – Fixed when in Warpcast */}
      {isWarpcast && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm opacity-80">FX1 Digital Hubs</p>
            {walletAddress ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/50">
                <span className="text-green-400 font-bold text-sm">{shortAddress}</span>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-[#0038FF] to-[#F5C542] hover:scale-105 transition font-bold"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Content – Add padding if Warpcast bar exists */}
      <div className={isWarpcast ? "pt-20" : ""}>
        {/* About & Stats */}
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-extrabold mb-4">The Onchain Fashion Engine</h2>
            <p className="text-white/70 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              FX1 Digital Hubs is a Web3 creative ecosystem built on Base, combining AI-generated fashion NFTs,
              personalized digital wardrobe management, and a gamified reward system.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { num: "500+", label: "NFTs Minted" },
                { num: "1.2K+", label: "Community" },
                { num: "$FDH", label: "Powered by Base" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#F5C542] transition">
                  <p className="text-4xl font-extrabold text-[#F5C542]">{stat.num}</p>
                  <p className="text-white/60 text-sm font-bold mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white/5 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-center mb-12">Featured Collections</h2>
            <FeaturesGallery />
          </div>
        </section>

        {/* Social Tasks */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Earn $FDH Token</h2>
            <p className="text-white/70 mb-10">Complete tasks. Grow the ecosystem. Get rewarded.</p>
            <SocialTasks />
          </div>
        </section>

        {/* NFT Gallery */}
        <section className="py-20 bg-white/5 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-center mb-12">Explore Collections</h2>
            <NFTGalleryRefined />
          </div>
        </section>

        <FlaunchPool />

        <section className="py-20 border-t border-white/10">
          <ParagraphBlog />
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-[#0038FF]/20 to-[#F5C542]/20 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Ready to Style the Blockchain?</h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Connect your Base wallet and step into the future of onchain fashion.
            </p>

            {!walletAddress && !isWarpcast && (
              <Button
                size="lg"
                onClick={connectWallet}
                className="bg-gradient-to-r from-[#0038FF] to-[#F5C542] font-extrabold text-lg px-10 py-6 hover:scale-105 transition shadow-2xl"
              >
                <Wallet className="w-5 h-5 mr-3" />
                Connect Wallet Now
              </Button>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}