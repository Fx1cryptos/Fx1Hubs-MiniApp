"use client"

import Image from "next/image"

export function FeaturesGallery() {
  const features = [
    {
      id: 1,
      title: "Digital Wardrobe on Base",
      subtitle: "Wear to Earn • Mint to Own • Build Onchain",
      description: "Collect 3D fashion items and build your digital wardrobe with blockchain ownership",
      image: "/images/1b074770-d642-4143-811d.jpeg",
    },
    {
      id: 2,
      title: "Wear to Earn on Base",
      subtitle: "Onchain Fashion Runway",
      description: "Powered by $FDH – The Future of Digital Couture. Mint it. Wear it. Earn it.",
      image: "/images/1462d10b-b13e-4ac0-97fd.jpeg",
    },
    {
      id: 3,
      title: "FDH x Base Collection",
      subtitle: "Pixel Art Fashion NFTs",
      description: "Curated collection of fashion items showcased on desktop and mobile",
      image: "/images/800f235a-6100-4bfe-8d22.jpeg",
    },
    {
      id: 4,
      title: "Pixelated Drips",
      subtitle: "Voxel Fashion Collection",
      description: "Exclusive pixel-art style clothing and accessories in your digital wardrobe",
      image: "/images/1b7183d0-a2ee-4669-bc58.jpeg",
    },
  ]

  return (
    <section className="py-16 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-extrabold text-white text-center mb-4">Fashion Collections</h2>
        <p className="text-white/70 text-center mb-12 font-semibold max-w-2xl mx-auto">
          Explore our curated collections of digital fashion on Base
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#F5C542] transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5C542]/20"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-b from-[#0038FF]/20 to-transparent">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-transparent to-transparent" />
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-2xl font-extrabold text-white mb-2">{feature.title}</h3>
                <p className="text-[#F5C542] font-bold text-sm mb-3">{feature.subtitle}</p>
                <p className="text-white/70 font-semibold leading-relaxed">{feature.description}</p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#0038FF] to-[#F5C542] rounded-lg font-extrabold text-white hover:scale-105 transition-transform">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
