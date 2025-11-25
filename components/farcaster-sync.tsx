"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge, Sparkles, Zap, ExternalLink, Wallet, ArrowRight } from "lucide-react"
import { useAccount, useWalletClient, useReadContract } from "wagmi"
import { base } from "wagmi/chains"
import NeynarAPIClient from "neynar/nodejs-sdk"  // Neynar SDK
import { Runware } from "@runware/api"  // Runware
import { ZoraMinter1155 } from "@zoralabs/protocol-sdk"  // Zora
import Client from "coinbase-commerce-node"  // Coinbase

const neynar = new NeynarAPIClient(process.env.NEXT_PUBLIC_NEYNAR_API!)
const runware = new Runware({ apiKey: process.env.NEXT_PUBLIC_RUNWARE_API! })
Client.init(process.env.COINBASE_API_KEY!)

const FDH_ABI = [{"name": "transfer", "type": "function", "inputs": [{"type": "address"}, {"type": "uint256"}]}] as const
const MINT_PRICE = 0.0015 * 1e18  // ETH
const FDH_REWARD = 500 * 1e18  // 500 $FDH

interface FarcasterUser {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
}

interface GeneratedNFT {
  imageUrl: string
  tokenId: string
  txHash?: string
}

export function FCBuilderBadge() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [fcUser, setFcUser] = useState<FarcasterUser | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [nft, setNft] = useState<GeneratedNFT | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">("wallet")
  const [chargeId, setChargeId] = useState<string | null>(null)

  // 1. Neynar OAuth + Fetch User (Frame-Compatible)
  const syncFarcaster = async () => {
    if (!isConnected) return alert("Connect wallet first")
    setIsSyncing(true)
    try {
      // OAuth Redirect (for Frames: Embed in Mini App meta)
      const authUrl = `https://warpcast.com/~/signin?client_id=${process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}&redirect_uri=${window.location.origin}/callback`
      window.location.href = authUrl  // Or use popup for seamless

      // Callback (handle in /callback page): Extract code → Neynar exchange for FID
      // Mock for demo; real: const { fid } = await neynar.exchangeCodeForAccessToken(code)
      const { users } = await neynar.fetchUser("fx1")  // Or by wallet: fetchUserByWallet(address!)
      setFcUser({
        fid: users[0].fid,
        username: users[0].username,
        displayName: users[0].display_name,
        pfpUrl: users[0].pfp_url,
      })
    } catch (err) {
      alert("Sync failed. Ensure Warpcast installed.")
    } finally {
      setIsSyncing(false)
    }
  }

  // 2. Runware AI Gen: PFP → 3D Fashion
  const generateAIFashion = async () => {
    if (!fcUser?.pfpUrl) return
    setIsGenerating(true)
    try {
      const taskUUID = crypto.randomUUID()
      const prompt = `Transform this profile picture into a 3D futuristic fashion avatar: cyber jacket with neon glow, holographic accessories, Base chain aesthetic, high detail, cinematic lighting. PFP: ${fcUser.pfpUrl}`

      // Async Runware img2img
      await runware.tasks.create({
        taskType: "imageInference",
        taskUUID,
        input: {
          prompt,
          initImageUrl: fcUser.pfpUrl,  // PFP as seed
          width: 1024, height: 1024,
          numImages: 1,
          model: "flux-1.1-pro",  // Or your fine-tune
          deliveryMethod: "async",  // Poll for result
          projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        },
      })

      // Poll for completion
      let result
      while (!result) {
        await new Promise(r => setTimeout(r, 2000))
        result = await runware.tasks.getResponse({ taskUUID })
      }
      setNft({ ...nft, imageUrl: result.output[0].dataURI })  // Base64 or URL
    } catch (err) {
      alert("AI gen failed. Retrying...")
    } finally {
      setIsGenerating(false)
    }
  }

  // 3. Seamless Mint: Zora + Coinbase
  const mintBadge = async () => {
    if (!address || !nft?.imageUrl) return
    setIsMinting(true)

    try {
      if (paymentMethod === "card") {
        // Coinbase Charge
        const charge = Client.Charge.create({
          name: "FC Builder Badge Mint",
          description: "Your personalized 3D fashion NFT",
          local_price: { amount: "4.00", currency: "USD" },  // ~0.0015 ETH
          pricing_type: "fixed_price",
          metadata: { fid: fcUser!.fid, image: nft.imageUrl },
          redirect_url: `${window.location.origin}/success?fid=${fcUser!.fid}`,
        })
        setChargeId(charge.id)
        window.open(charge.hosted_url, "_blank")  // Seamless popup
        return
      }

      // Wallet: Zora SDK Mint (deploys if needed)
      const minter = new ZoraMinter1155(base.id, walletClient!)
      const { tokenId } = await minter.createPremint({
        name: `FC Builder #${fcUser!.fid}`,
        description: `Personalized 3D fashion badge for @${fcUser!.username}`,
        imageURI: nft.imageUrl,
        quantity: 1,
        price: MINT_PRICE,
        fundsRecipient: address,  // You get 90%
      })
      nft.tokenId = tokenId.toString()
      setNft({ ...nft })

      // 4. $FDH Reward Airdrop
      await walletClient!.writeContract({
        address: process.env.NEXT_PUBLIC_FDH_CONTRACT as `0x${string}`,
        abi: FDH_ABI,
        functionName: "transfer",
        args: [address, FDH_REWARD],
      })

      // Auto-list on Zora
      await minter.list({ tokenId, quantity: 1, price: MINT_PRICE * 1.1 })  // 10% markup
      alert("Minted! Check your wallet + $FDH reward.")
    } catch (err) {
      alert("Mint failed. Tx reverted?")
    } finally {
      setIsMinting(false)
    }
  }

  // Frame Meta (for Warpcast Mini App rendering)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const head = document.head
      const meta = document.createElement("meta")
      meta.name = "fc:miniapp"
      meta.content = JSON.stringify({
        version: "v2",
        buttons: [{ label: "Sync & Mint", action: "post" }],  // Frame interaction
        image: "/frame-preview.png",
      })
      head.appendChild(meta)
    }
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#001233] to-[#0A1F3D]">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 mb-6">
            <Badge className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-[#00D4FF] font-bold">Mini App • Frame v2</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Your <span className="text-[#00D4FF]">Farcaster PFP</span>
            <br />
            as Onchain 3D Fashion
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Sync FID → AI crafts custom avatar → Mint badge + 500 $FDH reward.
            <br />
            <span className="text-sm text-white/60">1/1 per FID • Tradable on Zora</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Sync + Gen + Mint */}
          <div className="space-y-8">
            {/* Sync */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-[#00D4FF]" />
                1. Sync Farcaster
              </h3>
              {!fcUser ? (
                <Button onClick={syncFarcaster} disabled={isSyncing || !isConnected} className="w-full h-16 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600">
                  <Image src="/farcaster-icon.svg" alt="FC" width={28} height={28} className="mr-3" />
                  {isSyncing ? "Syncing..." : "Connect via Warpcast"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Image src={fcUser.pfpUrl} alt={fcUser.username} width={80} height={80} className="rounded-full ring-4 ring-[#00D4FF]/50" />
                    <div>
                      <p className="text-white font-black">@{fcUser.username}</p>
                      <p className="text-[#00D4FF] font-mono text-sm">FID: {fcUser.fid}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setFcUser(null)} className="w-full">Disconnect</Button>
                </div>
              )}
            </div>

            {/* Gen */}
            {fcUser && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Zap className="w-7 h-7 text-yellow-400" />
                  2. Generate Avatar
                </h3>
                {nft?.imageUrl ? (
                  <Image src={nft.imageUrl} alt="AI Fashion" width={400} height={400} className="w-full rounded-2xl" />
                ) : (
                  <Button onClick={generateAIFashion} disabled={isGenerating} className="w-full h-16 text-xl font-bold bg-gradient-to-r from-[#F5C542] to-[#FFD700] text-black">
                    {isGenerating ? "Crafting..." : "Generate 3D Fashion"}
                  </Button>
                )}
              </div>
            )}

            {/* Mint */}
            {nft?.imageUrl && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Wallet className="w-7 h-7 text-[#F5C542]" />
                  3. Mint + Reward
                </h3>
                <div className="flex gap-4 mb-4">
                  <Button variant={paymentMethod === "wallet" ? "default" : "outline"} onClick={() => setPaymentMethod("wallet")}>Wallet</Button>
                  <Button variant={paymentMethod === "card" ? "default" : "outline"} onClick={() => setPaymentMethod("card")}>Card</Button>
                </div>
                <Button
                  onClick={mintBadge}
                  disabled={isMinting}
                  className="w-full h-16 text-xl font-black bg-gradient-to-r from-[#00D4FF] to-[#00FFD1] text-black"
                >
                  {isMinting ? "Minting..." : `${paymentMethod === "wallet" ? "Mint" : "Pay"} • 0.0015 ETH + 500 $FDH`}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                {chargeId && <a href={`/charge/${chargeId}`} className="text-[#00D4FF] text-sm block mt-2">Pay via Coinbase</a>}
                {nft.txHash && (
                  <a href={`https://basescan.org/tx/${nft.txHash}`} target="_blank" className="text-[#00D4FF] flex items-center gap-2 mt-2">
                    View Tx <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right: Value + Frame Preview */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#00D4FF]/10 to-purple-600/10 border border-[#00D4FF]/30 rounded-3xl p-8">
              <h3 className="text-3xl font-black text-white mb-6">Your Onchain Identity</h3>
              <ul className="space-y-4 text-lg text-white/90">
                {[
                  "AI-Powered 3D avatar from your exact PFP",
                  "10% royalties forever (you earn on resales)",
                  "$FDH airdrop + whitelist for FX1 drops",
                  "Verified in Warpcast feeds via Frames",
                  "Seamless: Wallet or card payment",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00D4FF] flex items-center justify-center mt-0.5">
                      <span className="text-black font-bold text-xs">{i + 1}</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frame Preview */}
            <div className="bg-black/30 rounded-3xl p-6 text-center">
              <p className="text-white/70 mb-4">Share in Warpcast:</p>
              <Image src="/frame-preview.png" alt="Mini App Frame" width={300} height={200} className="rounded-2xl mx-auto" />
              <p className="text-xs text-white/50 mt-2">Post → Friends mint their badges too</p>
            </div>

            <div className="text-center p-6 bg-black/30 rounded-3xl border border-[#F5C542]/30">
              <p className="text-[#F5C542] font-black text-4xl mb-2">Limited: 10K Total</p>
              <p className="text-white/70 text-sm">Price: 0.0015 ETH (rises @ 1K mints)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}