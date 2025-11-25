"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet, ExternalLink } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "wardrobe", label: "Wardrobe" },
    { id: "token", label: "$FDH" },
    { id: "rewards", label: "Rewards" },
    { id: "community", label: "Community" },
  ]

  const externalLinks = [
    { label: "Main Site", href: "https://site-k56xwccr3.godaddysites.com", icon: true },
    { label: "ArtStation", href: "https://fx1hubs.artstation.com", icon: true },
    {
      label: "Flaunch Pool",
      href: "https://flaunch.gg/base/group/0x50ec14dc217daae2f7f3fc4c86836e0f3a52dde4",
      icon: true,
    },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0504AA]/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center gap-4">
            <Image
              src="/fdh-logo.png"
              alt="FX1 Digital Hubs Logo"
              width={60}
              height={60}
              className="rounded-lg hover:scale-110 transition"
            />
            <div className="hidden sm:block border-l border-white/20 pl-4">
              <h1 className="text-2xl font-extrabold text-white leading-tight">FX1 Digital Hubs</h1>
              <p className="text-xs text-white/80 font-bold mt-1">Where NFT Fashion, Art & Blockchain Collide</p>
              <p className="text-xs text-white/70 font-semibold">Ok Base chain • Styling the Base metaverse</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-bold transition-colors hover:text-yellow-300 ${
                  activeSection === item.id ? "text-yellow-300" : "text-white/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* External Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/70 hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-colors"
                title={link.label}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsConnected(!isConnected)}
              className="hidden sm:flex items-center gap-2 bg-yellow-400 text-[#0504AA] hover:bg-yellow-300 font-extrabold"
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? "0x5f18...a620" : "Connect"}
            </Button>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-bold p-2 rounded-lg transition-colors ${
                    activeSection === item.id ? "text-yellow-300 bg-white/10" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-white/10 pt-3 mt-3">
                <p className="text-xs font-bold text-white/60 mb-2">External Links</p>
                {externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 text-sm font-bold text-white/80 hover:bg-white/10 rounded-lg transition-colors mb-2"
                  >
                    {link.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <Button
                onClick={() => setIsConnected(!isConnected)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-yellow-400 text-[#0504AA] font-extrabold"
              >
                <Wallet className="w-4 h-4" />
                {isConnected ? "0x5f18...a620" : "Connect Wallet"}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
