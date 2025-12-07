import React, { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { AuthKitProvider } from '@farcaster/auth-kit'; // 🛑 NEW IMPORT
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";

// 🛑 Configuration object for AuthKit
// If your app is deployed to fx1-hubs.vercel.app, this is all you need:
const config = {
  domain: 'fx1-hubs.vercel.app',
  siweUri: 'https://fx1-hubs.vercel.app/siwe', // Standard SIWE URI
  relay: 'passkey', // Recommended relay type
};

export default function App() {
  const [isFarcasterReady, setIsFarcasterReady] = useState(false);
  
  useEffect(() => {
    // 1. CRITICAL FIX: Signal to the Farcaster client that the mini app is loaded.
    sdk.actions.ready();
    console.log("FX1 Mini App: Farcaster SDK 'ready' signal sent.");

    // 2. Allow the app content to render once the signal is sent
    setIsFarcasterReady(true); 

  }, []);

  if (!isFarcasterReady) {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Loading FX1 DIGITAL HUBS...</h1>
            <p>Awaiting Farcaster identity connection.</p>
        </div>
    );
  }

  // 🛑 WRAPPER FIX: All components are now wrapped in the AuthKitProvider.
  return (
    <AuthKitProvider config={config}>
      <Header />
      <Home />
      <Footer />
    </AuthKitProvider>
  );
}
