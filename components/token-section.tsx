"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Coins, Users, Zap, Copy, Check } from "lucide-react"
import { useState } from "react"

export function TokenSection() {
  const [copied, setCopied] = useState(false)

  const zoraCreatorCoin = "0x24c42adfb620f3835fcb31fbdf3c1773fac76970"
  const baseAppAddress = "0x5f188E67C374feF892Cc3BaC4aE0689166C6a620"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const utilities = [
    {
      icon: Coins,
      title: "Unlock In-App Features",
      description: "Spend $fx1_hubs to unlock exclusive wardrobe boxes and premium content",
    },
    {
      icon: Zap,
      title: "Earn from Gameplay",
      description: "Win $fx1_hubs rewards from the NFT Fashion Crush Game and daily streaks",
    },
    {
      icon: Users,
      title: "Wear to Warn Missions",
      description: "Participate in fashion missions and earn tokens for community participation",
    },
    {
      icon: TrendingUp,
      title: "Item Upgrades",
      description: "Use $fx1_hubs to upgrade and enhance your digital wardrobe items",
    },
  ]

  return (
    <section id="token" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Creator Coin</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            <span className="text-primary">$fx1_hubs</span> Creator Coin
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            The Zora Creator Coin powering FX1 Digital Hubs. Earn rewards, unlock exclusives, and upgrade your digital
            fashion.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Token Info Card */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">$fx1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">fx1_hubs</h3>
                  <p className="text-sm text-muted-foreground">Zora Creator Coin</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Creator Coin Address */}
              <div className="p-4 bg-muted/50 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground mb-2">Creator Coin Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-foreground break-all flex-1 font-mono">{zoraCreatorCoin}</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(zoraCreatorCoin)}>
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Base App Address */}
              <div className="p-4 bg-muted/50 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground mb-2">Base App Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-foreground break-all flex-1 font-mono">{baseAppAddress}</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(baseAppAddress)}>
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Platform", value: "Zora" },
                  { label: "Chain", value: "Base" },
                  { label: "Type", value: "Creator Coin" },
                  { label: "Status", value: "Active" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 bg-muted/30 rounded-lg text-center border border-border">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-bold text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Buy Button */}
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <a
                  href="https://zora.co/@fx1_hubs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Buy $fx1_hubs on Zora
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Utilities Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4">Token Utility</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {utilities.map((utility) => (
                <Card
                  key={utility.title}
                  className="bg-card/50 border-border hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <utility.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{utility.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{utility.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
