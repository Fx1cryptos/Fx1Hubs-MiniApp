"use client"
import { Header3D } from "@/components/header-3d"
import { FeaturesGallery } from "@/components/features-gallery"
import { SocialTasks } from "@/components/social-tasks"
import { NFTGalleryRefined } from "@/components/nft-gallery-refined"
import { ParagraphBlog } from "@/components/paragraph-blog"
import { FlaunchPool } from "@/components/flaunch-pool"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#001428] via-[#0a2a54] to-[#001428]">
      {/* 1. Hero Header Section */}
      <Header3D />

      {/* Main Content */}
      <div className="relative z-10">
        {/* 2. About & Stats Section - Quick Value Proposition */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-white mb-4">The Onchain Fashion Engine</h2>
              <p className="text-white/70 leading-relaxed font-semibold text-lg">
                FX1 Digital Hubs is a Web3 creative ecosystem built on Base, combining AI-generated fashion NFTs,
                personalized digital wardrobe management, and a gamified reward system.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-12">
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-[#F5C542] transition">
                <p className="text-3xl font-extrabold text-[#F5C542]">500+</p>
                <p className="text-white/60 text-sm font-bold mt-2">NFTs Minted</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-[#F5C542] transition">
                <p className="text-3xl font-extrabold text-[#F5C542]">1.2K+</p>
                <p className="text-white/60 text-sm font-bold mt-2">Community Members</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-[#F5C542] transition">
                <p className="text-3xl font-extrabold text-[#F5C542]">$FDH</p>
                <p className="text-white/60 text-sm font-bold mt-2">Powered by Base</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features Gallery - Showcase What Users Get */}
        <section className="py-20 border-t border-white/10 bg-white/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">Featured Collections</h2>
            <FeaturesGallery />
          </div>
        </section>

        {/* 4. Earn $FDH - Social Quest Section (PRIMARY CTA) */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white mb-3">Earn $FDH Token</h2>
              <p className="text-white/70 font-semibold">Complete social tasks and earn rewards</p>
            </div>
            <SocialTasks />
          </div>
        </section>

        {/* 5. NFT Gallery - Collections Showcase */}
        <section className="py-20 border-t border-white/10 bg-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">Explore Our Collections</h2>
            <NFTGalleryRefined />
          </div>
        </section>

        <FlaunchPool />

        <section className="py-20 border-t border-white/10">
          <ParagraphBlog />
        </section>

        {/* 8. Final CTA Section */}
        <section className="py-20 border-t border-white/10 bg-gradient-to-r from-[#0038FF]/20 to-[#F5C542]/20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Style the Blockchain?</h2>
            <p className="text-white/70 mb-10 font-semibold text-lg">
              Connect your Base wallet, join the community, and start your onchain fashion journey today.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#0038FF] to-[#F5C542] rounded-xl font-extrabold text-white hover:scale-105 transition shadow-lg">
                Connect Base Wallet
              </button>
              <button className="px-8 py-4 border-2 border-[#F5C542] text-[#F5C542] rounded-xl font-extrabold hover:bg-[#F5C542]/10 transition">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        {/* 9. Footer */}
        <Footer />
      </div>
    </main>
  )
}
