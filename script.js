// script.js – FX1 Digital Hubs Mini App (2025 Ready)
console.log("FX1 Digital Hubs Mini App Loaded");

// Elements
const statusEl = document.getElementById("wallet-status");
const connectBtn = document.querySelector("button");

// Update UI
function updateUI(address) {
  if (!address) {
    connectBtn.textContent = "Connect Wallet";
    statusEl.textContent = "";
    statusEl.style.opacity = "0";
    return;
  }

  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
  connectBtn.textContent = "Wallet Connected";
  connectBtn.disabled = true;
  statusEl.textContent = `Connected: ${short}`;
  statusEl.style.opacity = "1";
  statusEl.style.color = "#a3ff6b";
}

// Main Connect Function – Smart & Future-Proof
async function connectWallet() {
  // 1. Try Farcaster Mini App native wallet (BEST experience in Warpcast)
  if (window.fc?.wallet) {
    try {
      const account = await window.fc.wallet.connect();
      updateUI(account.address);
      console.log("Farcaster native wallet:", account.address);
      return;
    } catch (err) {
      console.log("Farcaster wallet rejected");
    }
  }

  // 2. Try Base Minikit (new standard in 2025)
  if (window.minikit) {
    try {
      const { address } = await window.minikit.connectWallet();
      updateUI(address);
      console.log("Base Minikit wallet:", address);
      return;
    } catch (err) {
      console.log("Minikit rejected");
    }
  }

  // 3. Fallback: Ethereum provider (MetaMask, Coinbase Wallet mobile, etc.)
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      updateUI(accounts[0]);
      console.log("Ethereum wallet:", accounts[0]);
      return;
    } catch (err) {
      console.log("Ethereum wallet rejected");
    }
  }

  // 4. Nothing worked → Show friendly message
  statusEl.textContent = "No wallet detected. Try in Warpcast app.";
  statusEl.style.opacity = "1";
  statusEl.style.color = "#ff6b6b";
}

// Auto-connect if already authorized (Farcaster native)
if (window.fc?.wallet?.isConnected?.()) {
  const addr = window.fc.wallet.address;
  updateUI(addr);
}

// Button click
connectBtn.addEventListener("click", connectWallet);

// Optional: Listen to account changes (Farcaster + Ethereum)
if (window.fc?.wallet) {
  window.fc.wallet.on("accountChanged", (acc) => {
    updateUI(acc?.address || null);
  });
}
if (window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      updateUI(null);
      connectBtn.disabled = false;
      connectBtn.textContent = "Connect Wallet";
    } else {
      updateUI(accounts[0]);
    }
  });
}