"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-black text-black" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            TROLLS
          </span>
        </a>

        <div className="flex items-center gap-6 text-sm font-bold text-black/60">
          <a href="#generator" className="hover:text-black transition-colors">
            generator
          </a>
          <a href="#gallery" className="hover:text-black transition-colors">
            gallery
          </a>
        </div>
      </div>
    </nav>
  );
}
