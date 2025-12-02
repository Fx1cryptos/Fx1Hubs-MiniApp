export default function Gallery({ nfts = [] }) {
  return (
    <section className="container" style={{ padding: "40px 0" }}>
      <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Featured NFT Art
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {nfts.map((nft, i) => (
          <div key={i} style={{
            background: "white",
            color: "var(--base-blue)",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <img src={nft.image} alt={nft.name} style={{
              width: "100%",
              borderRadius: "10px"
            }} />
            <h4 style={{ marginTop: "10px" }}>{nft.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
