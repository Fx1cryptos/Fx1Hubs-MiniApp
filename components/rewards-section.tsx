"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flame, Heart, MessageCircle, Repeat2, UserPlus, Trophy, Gift, Star, Zap, Calendar } from "lucide-react"

export function RewardsSection() {
  const [currentStreak, setCurrentStreak] = useState(4)
  const [claimedToday, setClaimedToday] = useState(false)

  const streakRewards = [
    { day: 1, reward: 5, completed: currentStreak >= 1 },
    { day: 2, reward: 10, completed: currentStreak >= 2 },
    { day: 3, reward: 15, completed: currentStreak >= 3 },
    { day: 4, reward: 20, completed: currentStreak >= 4 },
    { day: 5, reward: 25, completed: currentStreak >= 5 },
    { day: 6, reward: 25, completed: currentStreak >= 6 },
    { day: 7, reward: "NFT Box", completed: currentStreak >= 7 },
  ]

  const socialTasks = [
    { icon: Star, label: "Post Content", reward: "+10 $FDH", completed: 2, max: "∞" },
    { icon: Heart, label: "Like Posts", reward: "+1 $FDH", completed: 15, max: 20 },
    { icon: MessageCircle, label: "Comment", reward: "+3 $FDH", completed: 7, max: 10 },
    { icon: Repeat2, label: "Repost", reward: "+2 $FDH", completed: 5, max: 10 },
    { icon: UserPlus, label: "Follow Creator", reward: "+5 $FDH", completed: 3, max: 5 },
  ]

  const leaderboard = [
    { rank: 1, name: "StyleMaster.eth", points: 12450, reward: "1000 $FDH" },
    { rank: 2, name: "CryptoFashion", points: 11200, reward: "750 $FDH" },
    { rank: 3, name: "OnchainDrip", points: 10800, reward: "500 $FDH" },
  ]

  const handleClaim = () => {
    if (!claimedToday) {
      setClaimedToday(true)
      setCurrentStreak((prev) => Math.min(prev + 1, 7))
    }
  }

  return (
    <section id="rewards" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Earn $FDH</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Daily Streaks & <span className="text-primary">Rewards</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Complete daily tasks, maintain your streak, and climb the leaderboard to earn $FDH tokens and exclusive
            NFTs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Streak Card */}
          <Card className="bg-card/50 border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Flame className="w-5 h-5 text-orange-500" />
                Daily Lucky Streak
                <Badge className="ml-auto bg-orange-500/20 text-orange-400">Day {currentStreak}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Streak Days */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {streakRewards.map((day) => (
                  <div
                    key={day.day}
                    className={`relative p-3 rounded-xl text-center transition-all ${
                      day.completed
                        ? "bg-primary/20 border border-primary/50"
                        : currentStreak + 1 === day.day
                          ? "bg-muted border-2 border-dashed border-primary animate-pulse"
                          : "bg-muted/50 border border-border"
                    }`}
                  >
                    <Calendar
                      className={`w-4 h-4 mx-auto mb-1 ${day.completed ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <p className="text-xs text-muted-foreground">Day {day.day}</p>
                    <p className={`font-bold text-sm ${day.completed ? "text-primary" : "text-foreground"}`}>
                      {typeof day.reward === "number" ? `${day.reward}` : day.reward}
                    </p>
                    {day.completed && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={handleClaim}
                disabled={claimedToday}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                {claimedToday ? (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Claimed Today! Come Back Tomorrow
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Claim Day {currentStreak + 1} Reward
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Leaderboard Card */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Trophy className="w-5 h-5 text-primary" />
                Weekly Leaders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    user.rank === 1 ? "bg-primary/10 border border-primary/30" : "bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1
                        ? "bg-primary text-primary-foreground"
                        : user.rank === 2
                          ? "bg-gray-400 text-gray-900"
                          : "bg-amber-700 text-white"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.points.toLocaleString()} pts</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {user.reward}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Social Tasks */}
        <Card className="bg-card/50 border-border mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-primary" />
              Social Tasks
              <span className="text-sm font-normal text-muted-foreground ml-2">(Earn-to-Engage)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {socialTasks.map((task) => (
                <div
                  key={task.label}
                  className="p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <task.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground text-sm">{task.label}</span>
                  </div>
                  <p className="text-primary font-bold mb-2">{task.reward}</p>
                  <Progress
                    value={(task.completed / (task.max === "∞" ? 100 : Number(task.max))) * 100}
                    className="h-2 mb-1"
                  />
                  <p className="text-xs text-muted-foreground">
                    {task.completed}/{task.max} today
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
