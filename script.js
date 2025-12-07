// FX1 Digital Hubs Mini App Script
console.log("FX1 Mini App Loaded");

// Connect Wallet function
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const wallet = accounts[0];
            alert("Wallet Connected: " + wallet);

            document.getElementById("wallet-status").innerText =
                "Connected: " + wallet.slice(0, 6) + "..." + wallet.slice(-4);

        } catch (error) {
            alert("Connection rejected by user.");
        }
    } else {
        alert("No wallet found. Install Coinbase Wallet or MetaMask.");
    }
}

// Detect account changes
if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
        window.location.reload();
    });
}
