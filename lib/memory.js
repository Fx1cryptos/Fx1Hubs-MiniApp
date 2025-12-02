export async function getIdentity(walletOrEns) {
  try {
    const apiKey = process.env. MEMORY_PROTOCOL_API_KEY=mem_07aa278f2b901c469313ee4fe7d077;

    const res = await fetch(`https://api.memoryproto.co/identities/wallet/${walletOrEns}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      throw new Error(`Memory API error: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("Memory Protocol Error:", error);
    return null;
  }
}
