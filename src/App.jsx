import React, { useEffect, useState } from 'react'; // 🛑 ADDED: useEffect and useState
import { sdk } from '@farcaster/miniapp-sdk'; // 🛑 ADDED: Farcaster SDK
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  // 🛑 ADDED: State to manage the loading status while waiting for the Farcaster client
  const [isFarcasterReady, setIsFarcasterReady] = useState(false);
  
  useEffect(() => {
    // 1. CRITICAL FIX: Signal to the Farcaster client (Warpcast/Base app) that the mini app is loaded.
    sdk.actions.ready();
    console.log("FX1 Digital Hubs Mini App: Farcaster SDK 'ready' signal sent.");

    // 2. Set the state to true, allowing the app content to render
    // You might want to delay this slightly if you have other async loading in 'Home'
    setIsFarcasterReady(true); 
    
    // Note: If you need to fetch the actual user ID, you'll need another SDK call here.

  }, []); // Empty dependency array ensures this runs only once on mount

  // 🛑 ADDED: A professional loading screen check
  if (!isFarcasterReady) {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Loading FX1 DIGITAL HUBS...</h1>
            <p>Awaiting Farcaster identity connection.</p>
        </div>
    );
  }

  // Once ready, render your main components
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
