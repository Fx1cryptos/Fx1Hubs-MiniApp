"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Twitter, Globe, Youtube, MessageCircle, Send, Users, ExternalLink } from "lucide-react"

export function CommunitySection() {
  const socialLinks = [
    {
      name: "Twitter / X",
      icon: Twitter,
      url: "https://x.com/fx1_hubs",
      color: "hover:bg-sky-500/20 hover:border-sky-500/50",
    },
    {
      name: "Farcaster",
      icon: MessageCircle,
      url: "https://warpcast.com/fx1hubs",
      color: "hover:bg-purple-500/20 hover:border-purple-500/50",
    },
    {
      name: "Discord",
      icon: Users,
      url: "https://discord.gg/fx1hubs",
      color: "hover:bg-indigo-500/20 hover:border-indigo-500/50",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@fx1hubs",
      color: "hover:bg-red-500/20 hover:border-red-500/50",
    },
    {
      name: "Website",
      icon: Globe,
      url: "https://fx1hubs.com",
      color: "hover:bg-primary/20 hover:border-primary/50",
    },
  ]

  return (
    <section id="community" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Join Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Community <span className="text-primary">Hub</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connect with fellow fashion innovators, share your style, and collaborate on the future of digital fashion.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Social Links */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border transition-all ${social.color}`}
                  >
                    <social.icon className="w-6 h-6 text-foreground" />
                    <span className="font-medium text-foreground">{social.name}</span>
                    <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>
                ))}
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: "Twitter", value: "5.2K" },
                  { label: "Discord", value: "2.8K" },
                  { label: "Farcaster", value: "1.5K" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label} Followers</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Collaboration Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                    <Input placeholder="Your name" className="bg-muted/50 border-border focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-muted/50 border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Subject</label>
                  <Input
                    placeholder="Collaboration, Partnership, etc."
                    className="bg-muted/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="bg-muted/50 border-border focus:border-primary resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
