"use client"
import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  preview: string
  link: string
  date: string
}

export function ParagraphBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const mockPosts: BlogPost[] = [
          {
            id: "1",
            title: "The Future of Onchain Fashion",
            preview: "Exploring how NFTs are revolutionizing digital identity and self-expression on Base.",
            link: "https://paragraph.com/@fx1hubs/fx1-digital-hubs",
            date: "Dec 15, 2024",
          },
          {
            id: "2",
            title: "Building with Creator Coins",
            preview: "How FX1 is using Zora creator coins to empower fashion creators and collectors.",
            link: "https://paragraph.com/@fx1hubs/fx1-digital-hubs",
            date: "Dec 10, 2024",
          },
          {
            id: "3",
            title: "AI-Generated Fashion NFTs",
            preview: "Personalized 3D fashion art generated from your Farcaster profile - the next evolution.",
            link: "https://paragraph.com/@fx1hubs/fx1-digital-hubs",
            date: "Dec 5, 2024",
          },
        ]
        setPosts(mockPosts)
      } catch (error) {
        console.error("[v0] Error fetching Paragraph posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div className="text-center text-white py-8 font-bold">Loading blog posts...</div>
  }

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">FX1 Stories</h2>
          <p className="text-white/70 font-semibold">Insights from the frontiers of onchain fashion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#F5C542] hover:bg-white/10 transition backdrop-blur-sm"
            >
              <p className="text-xs text-[#F5C542] font-bold mb-2">{post.date}</p>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-[#F5C542] transition">
                {post.title}
              </h3>
              <p className="text-white/70 font-semibold text-sm mb-4">{post.preview}</p>
              <div className="text-[#F5C542] font-bold text-sm">Read on Paragraph →</div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://paragraph.com/@fx1hubs/fx1-digital-hubs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 hover:border-[#F5C542] hover:bg-white/15 text-white rounded-xl font-extrabold transition"
          >
            View All Articles on Paragraph <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
