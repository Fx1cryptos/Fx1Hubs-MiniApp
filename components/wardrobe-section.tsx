"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shirt, Sparkles, Package, TrendingUp, Award, Swords, Lock } from "lucide-react"

export function WardrobeSection() {
  const stylePoints = 450
  const nextTier = 500

  const equippedItems = [
    {
      slot: "Head",
      name: "Digital Crown",
      rarity: "Legendary",
      level: 5,
      xp: 80,
    },
    {
      slot: "Body",
      name: "Onchain Jacket",
      rarity: "Epic",
      level: 3,
      xp: 45,
    },
    {
      slot: "Feet",
      name: "Cyber Sneakers",
      rarity: "Rare",
      level: 2,
      xp: 60,
    },
  ]

  const wardrobeBoxes = [
    { name: "Common Box", price: "50 $FDH", odds: "70% Common, 25% Rare, 5% Epic" },
    { name: "Premium Box", price: "200 $FDH", odds: "40% Rare, 45% Epic, 15% Legendary" },
    { name: "Legendary Box", price: "500 $FDH", odds: "60% Epic, 40% Legendary" },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-primary bg-primary/20 border-primary/30"
      case "Epic":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      case "Rare":
        return "text-accent-foreground bg-accent/20 border-accent/30"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Gamified Fashion</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Digital <span className="text-primary">Wardrobe</span> System
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Equip NFT wearables, earn Style Points, and compete in Fashion Battles. Level up your items for exclusive
            rewards.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar & Style Points */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shirt className="w-5 h-5 text-primary" />
                Your Avatar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Display */}
              <div className="aspect-square rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/digital-avatar-silhouette-fashion.jpg')] bg-cover bg-center opacity-30" />
                <div className="relative text-center p-4">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Connect wallet to view avatar</p>
                </div>
              </div>

              {/* Style Points */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Style Points</span>
                  <span className="text-primary font-bold">{stylePoints} SP</span>
                </div>
                <Progress value={(stylePoints / nextTier) * 100} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Next tier: {nextTier} SP</span>
                  <span className="text-primary">+10% $FDH boost</span>
                </div>
              </div>

              {/* Equipped Items */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Equipped Items</p>
                {equippedItems.map((item) => (
                  <div key={item.slot} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Shirt className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <Badge className={`text-xs ${getRarityColor(item.rarity)}`}>{item.rarity}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Lvl {item.level}</span>
                        <Progress value={item.xp} className="h-1 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wardrobe Boxes */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Package className="w-5 h-5 text-primary" />
                Wardrobe Boxes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wardrobeBoxes.map((box) => (
                <div
                  key={box.name}
                  className="p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{box.name}</h4>
                    <Badge className="bg-primary/20 text-primary">{box.price}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{box.odds}</p>
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Package className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Features & Modes */}
          <div className="space-y-6">
            {/* Fashion Battle */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Swords className="w-5 h-5 text-primary" />
                  Fashion Arena
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <Award className="w-12 h-12 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Weekly Fashion Battle</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Compete with your styled avatar for exclusive rewards
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground">Enter Battle</Button>
                </div>
              </CardContent>
            </Card>

            {/* VIP Access */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Lock className="w-5 h-5 text-primary" />
                  VIP Fashion Arena
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-xl border-2 border-dashed border-primary/30">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-center text-sm text-muted-foreground">
                    Reach <span className="text-primary font-bold">1000 SP</span> to unlock VIP exclusive features and
                    rewards
                  </p>
                  <Progress value={(stylePoints / 1000) * 100} className="h-2 mt-3" />
                  <p className="text-center text-xs text-muted-foreground mt-2">{stylePoints}/1000 SP</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
