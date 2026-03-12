import Navbar from "@/components/Navbar";
import HeroGenerator from "@/components/HeroGenerator";
import GalleryStrip from "@/components/GalleryStrip";
import FloatingTrolls from "@/components/FloatingTrolls";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating trolls in background at varying depths */}
      <FloatingTrolls />
      
      <Navbar />
      <main className="relative z-10">
        <HeroGenerator />
        <GalleryStrip />
      </main>
      <Footer />
    </div>
  );
}
