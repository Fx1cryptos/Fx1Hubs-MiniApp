"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Eye, Loader2 } from "lucide-react"

interface NFT {
  id: string
  name: string
  image: string
  price?: string
  rarity: string
  likes: number
  platform: string
  contractAddress: string
  tokenId: string
}

export function NFTGallery() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [likedNFTs, setLikedNFTs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true)
        setNfts(getMockNFTs())
      } catch (error) {
        console.error("[v0] Error fetching NFTs:", error)
        setNfts(getMockNFTs())
      } finally {
        setLoading(false)
      }
    }

    fetchNFTs()
  }, [])

  const getMockNFTs = (): NFT[] => [
    {
      id: "mock-1",
      name: "Digital Couture #001",
      image: "/futuristic-fashion-nft-golden-cyberpunk-jacket.jpg",
      price: "0.05 ETH",
      rarity: "Legendary",
      likes: 234,
      platform: "Zora",
      contractAddress: "0x5f188E67C374feF892Cc3BaC4aE0689166C6a620",
      tokenId: "1",
    },
    {
      id: "mock-2",
      name: "Onchain Streetwear",
      image: "/surreal-digital-streetwear-neon-blue-hoodie.jpg",
      price: "0.02 ETH",
      rarity: "Epic",
      likes: 189,
      platform: "Zora",
      contractAddress: "0x5f188E67C374feF892Cc3BaC4aE0689166C6a620",
      tokenId: "2",
    },
    {
      id: "mock-3",
      name: "Metaverse Gown",
      image: "/ethereal-digital-gown-flowing-gold-particles.jpg",
      price: "0.08 ETH",
      rarity: "Legendary",
      likes: 456,
      platform: "Zora",
      contractAddress: "0x5f188E67C374feF892Cc3BaC4aE0689166C6a620",
      tokenId: "3",
    },
  ]

  const toggleLike = (id: string) => {
    setLikedNFTs((prev) => (prev.includes(id) ? prev.filter((nftId) => nftId !== id) : [...prev, id]))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-primary/20 text-primary border-primary/30"
      case "Epic":
        return "bg-accent/20 text-accent border-accent/30"
      case "Rare":
        return "bg-neon-blue/20 text-accent border-accent/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section id="wardrobe" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Digital Wardrobe</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            NFT Fashion <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore surreal NFT fashion art and collectibles from Zora, OpenSea, and more. Equip items and earn Style
            Points with $fx1_hubs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => (
                <Card
                  key={nft.id}
                  className="group bg-card/50 border-border hover:border-primary/50 transition-all duration-500 overflow-hidden card-3d"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className={`absolute top-3 left-3 ${getRarityColor(nft.rarity)}`}>{nft.rarity}</Badge>
                      <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">{nft.platform}</Badge>
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="flex-1 bg-primary text-primary-foreground">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/80"
                          onClick={() => toggleLike(nft.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              likedNFTs.includes(nft.id) ? "fill-red-500 text-red-500" : "text-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-foreground">{nft.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="text-primary font-bold">{nft.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Likes</p>
                          <p className="text-foreground font-medium flex items-center gap-1">
                            <Heart className="w-3 h-3 text-red-400" />
                            {nft.likes + (likedNFTs.includes(nft.id) ? 1 : 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a
                  href="https://zora.co/@fx1_hubs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Full Collection
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
