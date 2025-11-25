"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">NFT Fashion on Base</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              <span className="text-foreground">Styling the</span> <span className="text-primary">Blockchain</span>{" "}
              <span className="text-foreground">with NFT Fashion</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              FX1 Digital Hubs is your creative hub for NFT Fashion, Surreal Art, and the Digital Wardrobe — powered by{" "}
              <span className="text-primary font-semibold">$FDH</span> on Base.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                <a
                  href="https://zora.co/@fx1_hubs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Explore NFTs
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent text-accent-foreground hover:bg-accent/10 group bg-transparent"
              >
                <a
                  href="https://rainbow.me/token/base/0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Buy $FDH on Base
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { label: "NFTs Created", value: "500+" },
                { label: "Collectors", value: "1.2K" },
                { label: "Total Volume", value: "50 ETH" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card/50 border border-border">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Logo Display */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150" />

              {/* Logo container */}
              <div className="relative animate-float">
                <div className="animate-glow rounded-2xl p-1">
                  <Image
                    src="/images/img-5845.png"
                    alt="FX1 Digital Hubs"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full animate-bounce">
                $FDH
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                Base Chain
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
