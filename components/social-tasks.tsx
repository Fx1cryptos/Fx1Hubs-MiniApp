"use client"
import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  link?: string
  icon: string
}

const SOCIAL_TASKS: Task[] = [
  {
    id: "follow-x-fx1",
    title: "Follow @fx1_hubs on X",
    description: "Follow FX1 Digital Hubs on X (Twitter)",
    points: 100,
    completed: false,
    link: "https://x.com/fx1_hubs",
    icon: "𝕏",
  },
  {
    id: "follow-x-digital",
    title: "Follow @digita_wardrobe on X",
    description: "Follow Digital Wardrobe on X (Twitter)",
    points: 100,
    completed: false,
    link: "https://x.com/digita_wardrobe",
    icon: "𝕏",
  },
  {
    id: "follow-farcaster",
    title: "Follow on Farcaster",
    description: "Follow @fx1_faucet on Farcaster",
    points: 150,
    completed: false,
    link: "https://warpcast.com/fx1_faucet",
    icon: "🎭",
  },
  {
    id: "mint-zora",
    title: "Mint Zora Creator Coin",
    description: "Mint $fx1_hubs on Zora",
    points: 250,
    completed: false,
    link: "https://zora.co/collect/base:0x24c42adfb620f3835fcb31fbdf3c1773fac76970",
    icon: "🎨",
  },
  {
    id: "repost-pinned",
    title: "Repost Pinned Post",
    description: "Repost our pinned Farcaster post",
    points: 200,
    completed: false,
    link: "https://warpcast.com/fx1_faucet",
    icon: "🔄",
  },
]

interface FarcasterPost {
  text: string
  author: string
  timestamp: string
}

export function SocialTasks() {
  const [tasks, setTasks] = useState<Task[]>(SOCIAL_TASKS)
  const [completedCount, setCompletedCount] = useState(0)
  const [farcasterPosts, setFarcasterPosts] = useState<FarcasterPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    const fetchFarcasterPosts = async () => {
      try {
        setLoadingPosts(true)
        // Mock Farcaster posts since we can't directly call the API in client components
        const mockPosts: FarcasterPost[] = [
          {
            text: "🌟 Join FX1 Digital Hubs and earn $FDH tokens! Complete social tasks to unlock exclusive NFT rewards. Mint your unique digital fashion items on Base today!",
            author: "@fx1_faucet",
            timestamp: "2 hours ago",
          },
          {
            text: "💎 $FDH Creator Coin is now live on Zora! Collect our token and become part of the fashion revolution on Base.",
            author: "@fx1_faucet",
            timestamp: "5 hours ago",
          },
          {
            text: "🚀 Build your onchain wardrobe with FX1. Wear to Earn • Mint to Own • Build Onchain. The future of digital fashion starts here.",
            author: "@fx1_faucet",
            timestamp: "1 day ago",
          },
        ]
        setFarcasterPosts(mockPosts)
      } catch (error) {
        console.log("[v0] Error fetching Farcaster posts:", error)
      } finally {
        setLoadingPosts(false)
      }
    }
    fetchFarcasterPosts()
  }, [])

  const completeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && !task.completed) {
          setCompletedCount((count) => count + 1)
          return { ...task, completed: true }
        }
        return task
      }),
    )
  }

  const totalPoints = tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0)
  const maxPoints = tasks.reduce((sum, task) => sum + task.points, 0)

  return (
    <section id="rewards" className="py-16 bg-[#0504AA]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-2">Earn $FDH Token</h2>
          <p className="text-white/80 font-bold text-lg">Complete social quests and tasks to earn rewards</p>
        </div>

        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl p-6 border-2 border-yellow-400/40">
            <p className="text-white/70 text-sm font-bold mb-2">Total Points Earned</p>
            <p className="text-3xl font-extrabold text-yellow-300">
              {totalPoints}/{maxPoints}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#0504AA]/40 to-white/10 rounded-xl p-6 border-2 border-white/20">
            <p className="text-white/70 text-sm font-bold mb-2">Tasks Completed</p>
            <p className="text-3xl font-extrabold text-white">
              {completedCount}/{tasks.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-blue-400/10 rounded-xl p-6 border-2 border-white/20">
            <p className="text-white/70 text-sm font-bold mb-2">$FDH Earned</p>
            <p className="text-3xl font-extrabold text-white">{Math.floor(totalPoints / 50)} FDH</p>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-extrabold text-white mb-6">Social Tasks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tasks.map((task) => (
              <a
                key={task.id}
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (task.completed) e.preventDefault()
                }}
                className={`rounded-xl p-5 border-2 transition transform hover:scale-105 ${
                  task.completed
                    ? "bg-green-500/20 border-green-500/40 opacity-60 cursor-default"
                    : "bg-white/10 border-white/30 hover:border-yellow-400/60 hover:bg-white/15"
                }`}
              >
                <div className="text-4xl mb-3">{task.icon}</div>
                <h3 className="text-white font-extrabold text-sm mb-1">{task.title}</h3>
                <p className="text-white/60 text-xs mb-4 font-bold">{task.description}</p>

                <div className="flex justify-between items-center">
                  <span className="text-yellow-300 font-extrabold text-sm">+{task.points}</span>
                  {task.completed ? (
                    <span className="text-green-400 text-xs font-extrabold">✓ Done</span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        completeTask(task.id)
                      }}
                      className="text-xs bg-yellow-400/80 hover:bg-yellow-300 text-[#0504AA] px-2 py-1 rounded font-extrabold transition flex items-center gap-1"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-white/20 p-8">
          <h3 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <span>🎭</span> Recent Posts from @fx1_faucet
          </h3>
          {loadingPosts ? (
            <div className="text-white/70 font-bold text-center py-8">Loading posts...</div>
          ) : (
            <div className="space-y-4">
              {farcasterPosts.map((post, index) => (
                <a
                  key={index}
                  href="https://farcaster.xyz/fx1-faucet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-yellow-400/40 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-extrabold">{post.author}</span>
                    <span className="text-white/50 text-xs font-bold">{post.timestamp}</span>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed">{post.text}</p>
                </a>
              ))}
            </div>
          )}
          <a
            href="https://farcaster.xyz/fx1-faucet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 border border-yellow-400/40 rounded-lg font-extrabold transition"
          >
            View Full Profile <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
