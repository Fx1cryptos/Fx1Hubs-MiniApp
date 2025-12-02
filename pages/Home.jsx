import Hero from "../components/Hero.jsx";
import Gallery from "../components/Gallery.jsx";

export default function Home() {
  const sampleNFTs = [
    { name: "Surreal Blue Fashion", image: "/logo.png" },
    { name: "Cyber Wardrobe", image: "/logo.png" }
  ];

  return (
    <>
      <Hero />
      <Gallery nfts={sampleNFTs} />
    </>
  );
}
