import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Initialize fonts using the 'variable' property to expose them as CSS variables
// This links the font to the --font-sans and --font-mono variables in globals.css
const inter = Inter({
 subsets: ["latin"],
 variable: "--font-sans",
})

const geistMono = Geist_Mono({
 subsets: ["latin"],
 variable: "--font-mono",
})

export const metadata: Metadata = {
 title: "FX1 Digital Hubs | NFT Fashion & Onchain Identity",
 description: "Styling the Blockchain with NFT Fashion & Onchain Identity. Powered by $FDH on Base.",
 generator: "v0.app",
 icons: {
   icon: [
     {
       url: "/icon-light-32x32.png",
       media: "(prefers-color-scheme: light)",
     },
     {
       url: "/icon-dark-32x32.png",
       media: "(prefers-color-scheme: dark)",
     },
     {
       url: "/icon.svg",
       type: "image/svg+xml",
     },
   ],
   apple: "/apple-icon.png",
 },
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
   // The className uses the font variables and enforces the 'dark' theme for Royal Blue background
   <html lang="en" className={`${inter.variable} ${geistMono.variable} dark`}>
     {/* The body applies the default font (font-sans) as defined by the variable */}
     <body className={`font-sans antialiased`}>
       {children}
       <Analytics />
     </body>
   </html>
 )
}