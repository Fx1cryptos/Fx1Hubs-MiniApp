import React, { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk'; // Need to import the SDK here too

export default function Home() {
  // State to store the Farcaster user data (FID, username)
  const [farcasterUser, setFarcasterUser] = useState(null);
  // State to store the fetched Memory Protocol identity data
  const [memoryIdentity, setMemoryIdentity] = useState(null);
  const [loadingIdentity, setLoadingIdentity] = useState(false);
  const [error, setError] = useState(null);

  // 🛑 Your API Key (It's better to store this in an environment variable on Vercel)
  const MEMORY_PROTOCOL_API_KEY = "mem_07aa278f2b901c469313ee4fe7d077";

  // Function to fetch Memory Identity (using the user's FID)
  const fetchMemoryIdentity = async (fid) => {
    setLoadingIdentity(true);
    setError(null); // Clear previous errors
    
    // NOTE: We assume Memory Protocol supports looking up by FID (Farcaster ID).
    // If it only supports wallet address, the URL here will need to change,
    // and we'll need to use a Farcaster connector library to get the wallet.
    
    try {
      const res = await fetch(
        // Assuming this endpoint supports FID or you swap to a wallet address endpoint later
        `https://api.memoryproto.co/identities/fid/${fid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MEMORY_PROTOCOL_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) {
        throw new Error("Memory Protocol: No identity data found or API error.");
      }

      const data = await res.json();
      setMemoryIdentity(data);
    } catch (err) {
      setError(err.message);
      setMemoryIdentity(null);
    } finally {
      setLoadingIdentity(false);
    }
  };

  // useEffect runs when the component mounts
  useEffect(() => {
    // 1. Check if we are inside a Farcaster Mini App client
    if (sdk.context.isInMiniApp()) {
      // 2. Get the authenticated user's data
      const user = sdk.context.user; 
      
      if (user && user.fid) {
        setFarcasterUser(user);
        // 3. Immediately fetch data based on the Farcaster ID
        fetchMemoryIdentity(user.fid); 
      } else {
        setError("Farcaster identity available, but FID is missing.");
      }
    } else {
      setError("This app is not running inside a Farcaster client.");
      setLoadingIdentity(false);
    }
  }, []); // Runs only once when the component mounts

  // --- RENDERING SECTION ---
  return (
    <div className="home-panel" style={{ padding: '20px' }}>
      <h2>FX1 DIGITAL HUBS — Onchain Identity</h2>
      
      {/* Farcaster Status */}
      <div style={{ margin: '15px 0', border: '1px solid #ddd', padding: '10px' }}>
        {farcasterUser ? (
          <p>
            **Farcaster Connected:** @**{farcasterUser.username}** <br/>
            <small>FID: {farcasterUser.fid}</small>
          </p>
        ) : (
          <p>
            **Farcaster Status:** Not authenticated. Please view inside a Farcaster client.
          </p>
        )}
      </div>

      {/* Memory Protocol Status */}
      <div id="memory-panel" style={{ marginTop: '20px' }}>
        <h3>Memory Protocol Identity</h3>

        {loadingIdentity && <p>Fetching onchain identity from Memory Protocol…</p>}

        {error && (
          <p style={{ color: 'red' }}>Error: {error}</p>
        )}

        {memoryIdentity && (
          <>
            <p><strong>Identity:</strong> {memoryIdentity.identity || "Unknown"}</p>
            <p><strong>Profile:</strong> {memoryIdentity.profile || "No profile set"}</p>
          </>
        )}
      </div>

      {/* Since Farcaster handles wallet connection, remove any manual 'Connect Wallet' button here. */}
      
    </div>
  );
}
