// --- Placeholder Components for Imports ---
// In a single-file environment, we replace the external imports with inline functional components.

const Header3DPlaceholder = () => (
  <div className="py-24 md:py-32 flex justify-center items-center text-center bg-black/30 border-b border-white/10">
    <div className="text-white">
      <h1 className="text-5xl md:text-7xl font-black mb-4">FX1 Digital Hubs</h1>
      <p className="text-xl md:text-2xl text-white/70">The Onchain Fashion Engine</p>
    </div>
  </div>
);

const FeaturesGalleryPlaceholder = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-8 h-48 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
        <p className="text-white/60 font-semibold">Feature {i} Placeholder</p>
      </div>
    ))}
  </div>
);

const SocialTasksPlaceholder = () => (
  <div className="p-8 bg-white/5 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-4 bg-black/10 rounded-lg text-white">
      <p className="font-bold">Task 1: Follow & Like</p>
      <p className="text-sm text-[#F5C542]">Reward: 5 $FDH</p>
    </div>
    <div className="p-4 bg-black/10 rounded-lg text-white">
      <p className="font-bold">Task 2: Mint AI NFT</p>
      <p className="text-sm text-[#F5C542]">Reward: 50 $FDH</p>
    </div>
  </div>
);

const NFTGalleryPlaceholder = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="aspect-square bg-white/10 rounded-lg overflow-hidden border border-white/10 hover:border-[#0038FF] transition">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white/50 text-xs">Collection Item {i}</p>
        </div>
      </div>
    ))}
  </div>
);

const FlaunchPoolPlaceholder = () => (
  <section className="py-20 border-t border-white/10 bg-[#F5C542]/5">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <h3 className="text-2xl font-extrabold text-[#F5C542]">Flaunch Pool (Staking)</h3>
      <p className="text-white/70 mt-2">Stake your $FDH to participate in new collection launches.</p>
    </div>
  </section>
);

const ParagraphBlogPlaceholder = () => (
  <div className="container mx-auto px-4 max-w-3xl text-center">
    <h3 className="text-2xl font-extrabold text-white mb-4">Latest Insights</h3>
    <p className="text-white/70 leading-relaxed">
      Dive into our latest post on the convergence of AI, 3D modeling, and onchain ownership. We believe
      that decentralized technology, specifically Base, offers the perfect canvas for creative freedom and verifiable scarcity in digital fashion.
    </p>
  </div>
);

const FooterPlaceholder = () => (
  <footer className="py-8 border-t border-white/10 bg-black/20">
    <div className="container mx-auto px-4 text-center text-sm text-white/50">
      &copy; {new Date().getFullYear()} FX1 Digital Hubs. Built on Base 🔵.
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:text-[#F5C542] transition">Docs</a>
        <a href="#" className="hover:text-[#F5C542] transition">Community</a>
        <a href="#" className="hover:text-[#F5C542] transition">GitHub</a>
      </div>
    </div>
  </footer>
);


// --- Main Application Component (equivalent to your 'Home' page) ---

export default function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#001428] via-[#0a2a54] to-[#001428] font-sans">
      {/* 1. Hero Header Section */}
      <Header3DPlaceholder />

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
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#F5C542] transition">
                <p className="text-3xl font-extrabold text-[#F5C542]">500+</p>
                <p className="text-white/60 text-sm font-bold mt-2">NFTs Minted</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#F5C542] transition">
                <p className="text-3xl font-extrabold text-[#F5C542]">1.2K+</p>
                <p className="text-white/60 text-sm font-bold mt-2">Community Members</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#F5C542] transition">
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
            <FeaturesGalleryPlaceholder />
          </div>
        </section>

        {/* 4. Earn $FDH - Social Quest Section (PRIMARY CTA) */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white mb-3">Earn $FDH Token</h2>
              <p className="text-white/70 font-semibold">Complete social tasks and earn rewards</p>
            </div>
            <SocialTasksPlaceholder />
          </div>
        </section>

        {/* 5. NFT Gallery - Collections Showcase */}
        <section className="py-20 border-t border-white/10 bg-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">Explore Our Collections</h2>
            <NFTGalleryPlaceholder />
          </div>
        </section>

        <FlaunchPoolPlaceholder />

        <section className="py-20 border-t border-white/10">
          <ParagraphBlogPlaceholder />
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
        <FooterPlaceholder />
      </div>
    </main>
  )
}
