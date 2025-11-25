"use client"

import { ExternalLink, TrendingUp } from "lucide-react"

export function FlaunchPool() {
  const poolStats = [
    { label: "Total Liquidity", value: "$50K+", icon: "💰" },
    { label: "Fee Rewards", value: "0.25%", icon: "📈" },
    { label: "Your Potential APY", value: "45%+", icon: "🚀" },
  ]

  return (
    <section className="py-20 border-t border-white/10 bg-gradient-to-r from-[#0038FF]/10 to-[#F5C542]/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Earn Liquidity Rewards</h2>
          <p className="text-white/70 font-semibold text-lg">Provide liquidity on Flaunch and earn $FDH fee rewards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {poolStats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#F5C542] hover:bg-white/10 transition"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-white/70 text-sm font-bold mb-2">{stat.label}</p>
              <p className="text-3xl font-extrabold text-[#F5C542]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#0504AA]/40 to-[#0038FF]/40 border-2 border-[#F5C542]/30 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-[#F5C542]" />
                <h3 className="text-2xl font-extrabold text-white">FX1 Creator Liquidity Pool</h3>
              </div>
              <p className="text-white/80 font-semibold mb-6 leading-relaxed">
                Join the FX1 liquidity group on Flaunch and earn a share of the 0.25% swap fees from all $FDH
                transactions. Every trade contributes to your rewards.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white font-bold">
                  <span className="text-[#F5C542]">✓</span> Earn fee rewards automatically
                </li>
                <li className="flex items-center gap-3 text-white font-bold">
                  <span className="text-[#F5C542]">✓</span> High APY potential
                </li>
                <li className="flex items-center gap-3 text-white font-bold">
                  <span className="text-[#F5C542]">✓</span> Fully decentralized on Base
                </li>
                <li className="flex items-center gap-3 text-white font-bold">
                  <span className="text-[#F5C542]">✓</span> Join the community growth
                </li>
              </ul>
              <a
                href="https://flaunch.gg/base/group/0x50ec14dc217daae2f7f3fc4c86836e0f3a52dde4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F5C542] to-yellow-400 text-[#0504AA] rounded-xl font-extrabold hover:shadow-lg hover:scale-105 transition"
              >
                Join Liquidity Pool <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 font-bold">Pool Balance</span>
                  <span className="text-[#F5C542] font-extrabold">$50,000+</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F5C542] to-yellow-400 w-3/4"></div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm font-bold mb-3">Your Share (if you join)</p>
                  <div className="text-3xl font-extrabold text-white mb-2">You can earn</div>
                  <p className="text-[#F5C542] font-bold text-lg">From all swap fees on $FDH</p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-bold">Fee Per Swap</span>
                    <span className="text-white font-bold">0.25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-bold">Your % if you join</span>
                    <span className="text-white font-bold">Based on LP share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
