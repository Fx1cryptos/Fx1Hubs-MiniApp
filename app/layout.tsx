// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Full Farcaster Mini App metadata (2025 spec)
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FX1 Digital Hubs",
    description: "Fashion × Art × Blockchain · Powered by $FDH on Base",
    manifest: "/manifest.json",
    themeColor: "#0504AA",
    icons: {
      icon: "/favicon.ico",
      apple: "/splash.png",
    },
    other: {
      // THIS is what makes your Mini App show up beautifully in Warpcast
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: "https://fx1-hubs.vercel.app/embed-preview.png",        // 1200×630
        postUrl: "https://fx1-hubs.vercel.app/",
        button: {
          title: "Launch FX1 Digital Hubs",
          action: {
            type: "launch_miniapp",
            name: "FX1 Digital Hubs",
            url: "https://fx1-hubs.vercel.app/",
            splashImageUrl: "https://fx1-hubs.vercel.app/splash.png",      // 800×800 or 600×800
            splashBackgroundColor: "#0504AA",
          },
        },
      }),
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* PWA & Theme */}
        <meta name="theme-color" content="#0504AA" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Hide browser chrome when opened in Warpcast */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>

      <body
        className={`${inter.variable} font-sans antialiased min-h-full bg-black text-white flex flex-col`}
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}