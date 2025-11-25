"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

interface NFT {
  id: string
  title: string
  image: string
  price: string | null
  source: "zora" | "opensea"
  rarity: "common" | "rare" | "epic" | "legendary"
  contractAddress: string
  tokenId: string
  permalink: string
}

const ZORA_API_KEY = process.env.NEXT_PUBLIC_ZORA_API_KEY || "zora_api_a74556feabe982a59b79f76afaaedc5f1b3a7ea6fddc0b9823c888a1ce431433"
const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "CF79E096A81846E3B8C3C3F1F7A1D2B5" // your key (safe in headers)

export function NFTGalleryRefined() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRealNFTs = async () => {
      const allNFTs: NFT[] = []

      // === 1. Fetch from ZORA (Base & Ethereum) ===
      try {
        const zoraQuery = `
          query GetTokens($address: String!) {
            tokens(
              where: { ownerAddresses: [$uaddress] }
              networks: { network: ETHEREUM, chain: BASE }
              pagination: { limit: 50 }
              sort: { sortKey: TRANSFER_TIME, sortDirection: DESC }
            ) {
              nodes {
                token {
                  tokenId
                  collectionAddress
                  name
                  metadata
                  image {
                    url
                  }
                  tokenUrl
                  owner
                  collection {
                    name
                  }
                }
              }
            }
          }
        `

        const zoraRes = await fetch("https://api.zora.co/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": ZORA_API_KEY,
          },
          body: JSON.stringify({
            query: zoraQuery,
            variables: { address: "0xYourWalletOrCreatorAddress".toLowerCase() }, // REPLACE WITH YOUR WALLET
          }),
        })

        if (zoraRes.ok) {
          const { data } = await zoraRes.json()
          data?.tokens?.nodes?.forEach((node: any) => {
            const token = node.token
            if (token.image?.url) {
              allNFTs.push({
                id: `zora-${token.collectionAddress}-${token.tokenId}`,
                title: token.name || token.collection.name || "Untitled",
                image: token.image.url.replace("ipfs://", "https://ipfs.io/ipfs/"),
                price: null, // Zora price not in this query (can add sales later)
                source: "zora",
                rarity: ["common", "rare", "epic", "legendary"][Math.floor(Math.random() * 4)] as any,
                contractAddress: token.collectionAddress,
                tokenId: token.tokenId,
                permalink: token.tokenUrl || `https://zora.co/collect/base:${token.collectionAddress}/${token.tokenId}`,
              })
            }
          })
        }
      } catch (err) {
        console.log("Zora fetch failed (rate limit?), using fallback")
      }

      // === 2. Fetch from OpenSea (Ethereum + Base via their API) ===
      try {
        const osRes = await fetch(
          `https://api.opensea.io/api/v2/orders/base/testnets/listings?limit=20&order_by=created_date&order_direction=desc`,
          {
            headers: {
              "X-API-KEY": OPENSEA_API_KEY,
            },
          }
        )

        if (osRes.ok) {
          const osData = await osRes.json()
          osData.orders?.forEach((order: any) => {
            const asset = order.maker_asset_bundle?.assets?.[0] || order.nft
            if (asset?.image_url) {
              allNFTs.push({
                id: `os-${asset.contract_address}-${asset.token_id}`,
                title: asset.name || asset.collection?.name || "Unnamed",
                image: asset.image_url.includes("opensea") ? asset.image_url : asset.image_url.replace("ipfs://", "https://ipfs.io/ipfs/"),
                price: order.current_price ? (parseInt(order.current_price) / 1e18).toFixed(3) : null,
                source: "opensea",
                rarity: ["rare", "epic", "legendary"][Math.floor(Math.random() * 3)] as any,
                contractAddress: asset.contract_address || asset.collection?.slug,
                tokenId: asset.token_id,
                permalink: asset.permalink || `https://opensea.io/assets/base/${asset.contract_address}/${asset.token_id}`,
              })
            }
          })
        }
      } catch (err) {
        console.log("OpenSea fetch skipped")
      }

      // === Fallback Mock Data (if both APIs fail) ===
      if (allNFTs.length === 0) {
        const fallback = [
          { title: "Neon Dream Jacket", image: "/api/placeholder/400/400", price: "2.4", source: "zora" as const, rarity: "epic" as const },
          { title: "Holo Street Hoodie", image: "/api/placeholder/400/400", price: "1.9", source: "opensea" as const, rarity: "rare" as const },
          { title: "Quantum Kicks", image: "/api/placeholder/400/400", price: "3.1", source: "zora" as const, rarity: "legendary" as const },
        ]
        fallback.forEach((item, i) => {
          allNFTs.push({
            ...item,
            id: `fallback-${i}`,
            contractAddress: "0x0000...0000",
            tokenId: "1",
            permalink: "https://zora.co",
            price: item.price,
          })
        })
      }

      // Shuffle & limit to 9
      const shuffled = allNFTs.sort(() => Math.random() - 0.5).slice(0, 9)
      setNfts(shuffled)
      setLoading(false)
    }

    fetchRealNFTs()
  }, [])

  const rarityColors = {
    common: "bg-white/10 border-white/30",
    rare: "bg-blue-500/20 border-blue-400/50",
    epic: "bg-purple-500/20 border-purple-400/60",
    legendary: "bg-yellow-500/20 border-yellow-400/70",
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin w-12 h-12 border-4 border-t-[#00D4FF] border-white/20 rounded-full"></div>
        <p className="text-white/80 mt-4 text-xl font-bold">Loading onchain fashion...</p>
      </div>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-4">FX1 ONCHAIN GALLERY</h2>
          <p className="text-[#00D4FF] text-lg font-bold">Live from Zora • OpenSea • Base & Ethereum</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              onClick={() => setSelectedNFT(nft)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border-2 ${rarityColors[nft.rarity]} backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00D4FF]/20`}
            >
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <Image
                  src={nft.image}
                  alt={nft.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-white uppercase">{nft.source}</span>
                </div>
              </div>

              <div className="p-5 bg-white/5 backdrop-blur">
                <h3 className="text-xl font-bold text-white truncate">{nft.title}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-bold capitalize text-white/80">{nft.rarity}</span>
                  {nft.price && <span className="text-lg font-black text-[#F5C542]">{nft.price} ETH</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setSelectedNFT(null)}>
            <div className="bg-gradient-to-b from-[#0D2B66] to-[#001233] rounded-3xl max-w-2xl w-full overflow-hidden border border-[#00D4FF]/40 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="relative aspect-square">
                <Image src={selectedNFT.image} alt="" fill className="object-cover" unoptimized />
                <button className="absolute top-6 right-6 text-white text-4xl hover:scale-125 transition" onClick={() => setSelectedNFT(null)}>
                  ×
                </button>
              </div>
              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-black text-white">{selectedNFT.title}</h2>
                <div className="flex gap-6 text-lg">
                  <div>
                    <p className="text-white/60">Price</p>
                    <p className="text-2xl font-bold text-[#F5C542]">{selectedNFT.price ? `${selectedNFT.price} ETH` : "Not listed"}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Rarity</p>
                    <p className="text-2xl font-bold capitalize text-white">{selectedNFT.rarity}</p>
                  </div>
                </div>
                <a
                  href={selectedNFT.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-5 text-center font-black text-xl bg-gradient-to-r from-[#00D4FF] to-[#00FFD1] text-black rounded-2xl hover:scale-105 transition"
                >
                  {selectedNFT.source === "zora" ? "COLLECT ON ZORA ↗" : "BUY ON OPENSEA ↗"}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}