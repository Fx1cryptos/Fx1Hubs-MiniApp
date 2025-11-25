"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, Zap, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00D4FF]/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text & Stats */}
          <div className="text-center lg:text-left space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              <span className="text-sm font-bold text-[#00D4FF] tracking-wider">ONCHAIN FASHION ECOSYSTEM</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">FX1 DIGITAL</span>
              <br />
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#00FFD1] bg-clip-text text-transparent">
                HUBS
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto lg:mx-0">
              The heart of digital creativity, NFT fashion, and onchain culture — 
              powered by <span className="text-[#00D4FF] font-black">$FDH</span> on Base.
            </p>

            {/* Live Price Bar */}
            <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0088FF] flex items-center justify-center">
                  <span className="text-black font-black text-lg">$</span>
                </div>
                <div>
                  <p className="text-white/60 text-xs">FDH Price</p>
                  <p className="text-2xl font-black text-white">$0.002648</p>
                </div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-xs">Market Cap</p>
                <p className="text-xl font-bold text-white">$26.78K</p>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-xs">Chain</p>
                <p className="text-[#00D4FF] font-black">Base</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#00D4FF] to-[#00FFD1] text-black font-black hover:scale-105 transition shadow-lg"
              >
                <a href="https://zora.co/@fx1_hubs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Explore NFT Fashion
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#00D4FF]/50 text-white hover:bg-[#00D4FF]/10 backdrop-blur"
              >
                <a
                  href="https://rainbow.me/token/base/0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Buy $FDH Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { value: "10M", label: "Max Supply" },
                { value: "Live", label: "On Base" },
                { value: "Growing", label: "Community" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
                  <div className="text-2xl font-black text-[#00D4FF]">{stat.value}</div>
                  <div className="text-xs text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div Without
          </div>

          {/* Right — Visual Hero */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-10 bg-[#00D4FF]/30 rounded-full blur-3xl animate-pulse" />

              {/* Main Logo */}
              <div className="relative animate-float-slow">
                <div className="p-2 bg-gradient-to-br from-[#00D4FF]/20 to-transparent rounded-3xl backdrop-blur">
                  <div className="p-8 bg-black/40 rounded-3xl border border-[#00D4FF]/40 backdrop-blur-xl">
                    <Image
                      src="/images/img-5845.png"
                      alt="FX1 Digital Hubs"
                      width={520}
                      height={520}
                      className="rounded-2xl shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Floating Tags */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#00D4FF] text-black font-black rounded-full text-lg shadow-xl animate-bounce">
                $FDH
              </div>
              <div className="absolute bottom-4 -right-8 px-5 py-2 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-full text-sm">
                Built on Base
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}