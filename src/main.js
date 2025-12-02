// ------------------------------------------------------
// FX1 DIGITAL HUBS — Mini App Script (Vite Version)
// ------------------------------------------------------
console.log("FX1 Mini App Loaded (Vite Mode)");

// -----------------------------------------
// 1. Wallet Connect
// -----------------------------------------
export async function connectWallet() {
  if (!window.ethereum) {
    document.getElementById("wallet-status").innerText =
      "No wallet found. Install Coinbase Wallet or MetaMask.";
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const wallet = accounts[0];

    document.getElementById("wallet-status").innerText =
      `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`;

    loadMemoryIdentity(wallet); // Auto load identity after connect
  } catch (err) {
    document.getElementById("wallet-status").innerText =
      "Connection rejected by user.";
  }
}

// Detect wallet account change
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => {
    location.reload();
  });
}

// -----------------------------------------
// 2. Memory Protocol API Integration
// -----------------------------------------

// Your API Key
const MEMORY_PROTOCOL_API_KEY = "mem_07aa278f2b901c469313ee4fe7d077";

// Simple fetch wrapper
async function loadMemoryIdentity(walletAddress) {
  const panel = document.getElementById("memory-panel");

  panel.innerHTML = `
    <h3>Memory Protocol</h3>
    <p>Fetching onchain identity…</p>
  `;

  try {
    const res = await fetch(
      `https://api.memoryproto.co/identities/wallet/${walletAddress}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${MEMORY_PROTOCOL_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) {
      panel.innerHTML = `
        <h3>Memory Protocol</h3>
        <p>No identity data found for this wallet.</p>
      `;
      return;
    }

    const data = await res.json();

    panel.innerHTML = `
      <h3>Memory Protocol</h3>
      <p><strong>Wallet:</strong> ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}</p>
      <p><strong>Identity:</strong> ${data.identity || "Unknown"}</p>
      <p><strong>Profile:</strong> ${data.profile || "No profile set"}</p>
    `;
  } catch (error) {
    panel.innerHTML = `
      <h3>Memory Protocol</h3>
      <p>Error loading identity.</p>
    `;
  }
}

// -----------------------------------------
// 3. Attach button events
// -----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connect-btn");

  if (connectBtn) {
    connectBtn.addEventListener("click", connectWallet);
  }
});
