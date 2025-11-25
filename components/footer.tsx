import Image from "next/image"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-card/30">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/images/img-5845.png" alt="FX1 Digital Hubs" width={50} height={50} className="rounded-lg" />
              <div>
                <h3 className="font-bold text-foreground">FX1 Digital Hubs</h3>
                <p className="text-xs text-muted-foreground">Powered by $FDH on Base</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Styling the Blockchain with NFT Fashion & Onchain Identity.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Explore NFTs", url: "https://zora.co/@fx1_hubs" },
                { label: "Buy $FDH", url: "https://rainbow.me/token/base/0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380" },
                { label: "OpenSea", url: "https://opensea.io/fx1_hubs" },
                { label: "Manifold", url: "https://manifold.xyz/fx1_hubs" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Contract Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contract Info</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">$FDH Token</p>
                <code className="text-xs text-primary break-all">0x1f85...E380</code>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Base App</p>
                <code className="text-xs text-primary break-all">0x5f18...a620</code>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Network</p>
                <span className="text-xs text-foreground">Base (Mainnet)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 FX1 Digital Hubs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Built on</span>
            <span className="text-xs font-semibold text-primary">Base</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
