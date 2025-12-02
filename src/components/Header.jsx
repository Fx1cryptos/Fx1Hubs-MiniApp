export default function Header() {
  return (
    <header style={{
      background: "var(--base-blue)",
      padding: "20px 0",
      borderBottom: "2px solid white"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          FX1 DIGITAL HUBS
        </h1>

        <nav>
          <a href="/" style={{ color: "white", marginRight: "20px" }}>Home</a>
          <a href="/wardrobe" style={{ color: "white" }}>Wardrobe</a>
        </nav>
      </div>
    </header>
  );
}
