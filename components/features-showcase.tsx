"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function FeaturesShowcase() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
            Digital Fashion Ecosystem
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Future of Fashion NFTs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience NFT Fashion and your Digital Wardrobe on Base Chain
          </p>
        </div>

        {/* Feature 1: Marketplace */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-4">
            <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
              Marketplace
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Fashion NFT Marketplace</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover, collect, and trade exclusive fashion NFTs on the Base blockchain. Browse our curated collection
              of digital fashion items, from cyberpunk jackets to ethereal gowns, each with unique rarity and
              properties.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Low transaction fees on Base
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Cross-platform compatibility
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Instant digital delivery
              </li>
            </ul>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl rounded-2xl group-hover:blur-3xl transition-all" />
            <Image
              src="/fashion-nft-marketplace-showcase.jpg"
              alt="Fashion NFT Marketplace with tablet and smartphone displaying NFTs"
              width={500}
              height={400}
              className="relative rounded-2xl border border-primary/20 shadow-lg"
            />
          </div>
        </div>

        {/* Feature 2: Digital Wardrobe */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 blur-2xl rounded-2xl group-hover:blur-3xl transition-all" />
            <Image
              src="/digital-wardrobe-ecosystem.jpg"
              alt="3D Digital Wardrobe with fashion items and FDH logo on Base Chain"
              width={500}
              height={400}
              className="relative rounded-2xl border border-accent/20 shadow-lg"
            />
          </div>

          <div className="space-y-4 order-1 lg:order-2">
            <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
              Digital Wardrobe
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Your Digital Wardrobe</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Equip your avatar with exclusive fashion NFTs and showcase your style to the community. Earn Style Points,
              unlock rewards, and participate in Fashion Arena competitions powered by $FDH tokens.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Equip and manage fashion items
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Earn $FDH rewards daily
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Compete in Fashion Arena
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
