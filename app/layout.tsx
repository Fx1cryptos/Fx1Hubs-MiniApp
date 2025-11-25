// app/layout.tsx
import "./globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { base } from "wagmi/chains"

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: "FX1 Digital Hubs",
  projectId: "YOUR_WALLET_CONNECT_PROJECT_ID", // Get free at walletconnect.com
  chains: [base],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider chains={[base]}>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}