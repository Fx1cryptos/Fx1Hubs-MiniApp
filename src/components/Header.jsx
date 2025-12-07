import React, { useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk'; // Import SDK to access user context

export default function Header() {
  const [farcasterUser, setFarcasterUser] = useState(null);

  // Use useEffect to check the user context immediately when the Header loads
  useEffect(() => {
    if (sdk.context.isInMiniApp()) {
      const user = sdk.context.user;
      if (user && user.username) {
        setFarcasterUser(user);
      }
    }
  }, []);

  // Determine what to display in the navigation area
  const renderNavContent = () => {
    if (farcasterUser) {
      // User is connected: Show a personalized status
      return (
        <div style={{ color: 'white', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
          <span role="img" aria-label="user icon" style={{ marginRight: '8px' }}>👤</span>
          Connected as **@{farcasterUser.username}** {/* You can show the FID on hover or in a detailed profile view */}
          <a 
            href="/wardrobe" 
            style={{ color: "white", marginLeft: "20px", textDecoration: 'underline' }}
          >
            Wardrobe
          </a>
        </div>
      );
    } else {
      // User is not connected (or app not in Farcaster client)
      return (
        <nav style={{ fontSize: '14px' }}>
          <span style={{ color: "var(--light-gray)", marginRight: "20px" }}>
            Status: Disconnected 🔴
          </span>
          <a href="/wardrobe" style={{ color: "white" }}>Wardrobe</a>
        </nav>
      );
    }
  };

  return (
    <header style={{
      background: "#313131", // Changed to a darker color for better contrast/professional look
      padding: "20px 0",
      borderBottom: "2px solid var(--base-blue)" // Use Base Chain blue as an accent
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "90%",
        margin: "0 auto"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          FX1 DIGITAL HUBS 🌐
        </h1>

        {renderNavContent()}
      </div>
    </header>
  );
}
