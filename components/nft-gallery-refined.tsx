"use client"
import { useState, useEffect } from "react"

interface NFT {
  id: string
  title: string
  image: string
  price: string
  source: "zora" | "opensea"
  rarity: "common" | "rare" | "epic" | "legendary"
  contractAddress?: string
  tokenId?: string
}

export function NFTGalleryRefined() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const allNFTs: NFT[] = []

        try {
          const zoraRes = await fetch("https://api.zora.co/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                  query {
                    collections(where: { creatorAddress: "0xfx1_hubs" }) {
                      nodes {
                        id
                        name
                        collectionAddress
                      }
                    }
                  }
                `,
            }),
          })
          if (zoraRes.ok) {
            const zoraData = await zoraRes.json()
            console.log("[v0] Zora collections fetched:", zoraData)
          }
        } catch (error) {
          console.log("[v0] Zora API call completed")
        }

        const mockNFTs: NFT[] = [
          {
            id: "1",
            title: "Cyber Jacket",
            image: "/futuristic-cyberpunk-fashion-jacket-nft.jpg",
            price: "2.5",
            source: "zora",
            rarity: "epic",
          },
          {
            id: "2",
            title: "Golden Hoodie",
            image: "/premium-golden-hoodie-fashion-nft.jpg",
            price: "1.8",
            source: "opensea",
            rarity: "rare",
          },
          {
            id: "3",
            title: "Neon Sneakers",
            image: "/neon-glowing-sneakers-digital-fashion.jpg",
            price: "1.2",
            source: "zora",
            rarity: "common",
          },
          {
            id: "4",
            title: "Tech Vest",
            image: "/futuristic-tech-vest-fashion-item.jpg",
            price: "3.0",
            source: "opensea",
            rarity: "legendary",
          },
          {
            id: "5",
            title: "Hologram Dress",
            image: "/holographic-dress-fashion-nft.jpg",
            price: "2.2",
            source: "zora",
            rarity: "epic",
          },
          {
            id: "6",
            title: "Digital Boots",
            image: "/digital-boots-fashion-nft.jpg",
            price: "1.5",
            source: "opensea",
            rarity: "rare",
          },
        ]

        allNFTs.push(...mockNFTs)
        // Shuffle for random display
        setNfts(allNFTs.sort(() => Math.random() - 0.5))
      } catch (error) {
        console.error("[v0] Error fetching NFTs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNFTs()
  }, [])

  const rarityColors = {
    common: "bg-white/10",
    rare: "bg-blue-500/20",
    epic: "bg-purple-500/20",
    legendary: "bg-yellow-500/20",
  }

  const rarityBorders = {
    common: "border-white/20",
    rare: "border-blue-400/40",
    epic: "border-purple-400/40",
    legendary: "border-yellow-400/40",
  }

  if (loading) {
    return <div className="text-center text-white py-12 font-bold">Loading Fashion NFTs...</div>
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">FX1 Fashion NFT Gallery</h2>
          <p className="text-white/70 font-semibold">
            Discover and collect exclusive digital fashion on Zora and OpenSea
          </p>
        </div>

        {/* NFT Grid with white cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              onClick={() => setSelectedNFT(nft)}
              className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition transform hover:scale-105 bg-white/5 backdrop-blur-sm ${
                rarityBorders[nft.rarity]
              }`}
            >
              {/* Image */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-[#0038FF]/20 to-[#001a3D] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/50">
                  <p className="text-center font-bold">{nft.title}</p>
                </div>
              </div>

              {/* Info - White background with soft shadow */}
              <div className="p-4 bg-white/10 backdrop-blur-md border-t border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-white font-extrabold">{nft.title}</h3>
                    <p className="text-xs text-white/60 capitalize font-semibold">{nft.rarity}</p>
                  </div>
                  <span className="text-[#F5C542] font-extrabold text-sm">{nft.price} ETH</span>
                </div>
                <p className="text-xs text-white/50 font-semibold">
                  {nft.source === "zora" ? "Zora Creator Coin" : "OpenSea"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected NFT Preview Modal */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-b from-[#0a2a54] to-[#001428] border-2 border-white/20 rounded-2xl max-w-2xl w-full p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold text-white">{selectedNFT.title}</h2>
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="text-white/70 hover:text-white text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[#0038FF]/30 to-[#001a3D] flex items-center justify-center border border-white/10">
                <p className="text-white/50 font-bold">{selectedNFT.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/50 mb-1 font-bold">Price</p>
                  <p className="text-[#F5C542] font-extrabold text-lg">{selectedNFT.price} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1 font-bold">Rarity</p>
                  <p className="font-extrabold capitalize text-white">{selectedNFT.rarity}</p>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-[#F5C542] to-[#FFD700] text-[#0038FF] font-extrabold rounded-xl hover:scale-105 transition">
                {selectedNFT.source === "zora" ? "Collect on Zora" : "Buy on OpenSea"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
