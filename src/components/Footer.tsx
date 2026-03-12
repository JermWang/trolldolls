"use client";

import { PinkTroll, BlueTroll, GreenTroll, OrangeTroll, PurpleTroll, YellowTroll, RedTroll, SantaTroll } from "./TrollSVGs";

export default function Footer() {
  return (
    <footer className="bg-purple border-t-4 border-black py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Troll parade */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <PinkTroll className="w-12 sticker" />
          <BlueTroll className="w-12 sticker" />
          <GreenTroll className="w-12 sticker" />
          <OrangeTroll className="w-12 sticker" />
          <PurpleTroll className="w-12 sticker" />
          <YellowTroll className="w-12 sticker" />
          <RedTroll className="w-12 sticker" />
          <SantaTroll className="w-12 sticker" />
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            TROLL<span className="text-yellow">DOLLS</span>
          </span>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-white/80">
            <a href="#generator" className="hover:text-yellow transition-colors">make a troll</a>
            <span className="text-white/30">·</span>
            <a href="#gallery" className="hover:text-yellow transition-colors">troll army</a>
            <span className="text-white/30">·</span>
            <a href="#about" className="hover:text-yellow transition-colors">wtf is this</a>
            <span className="text-white/30">·</span>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow transition-colors"
            >
              X / Twitter
            </a>
          </div>

          <div className="bg-black/20 rounded-lg px-4 py-2 mt-2 max-w-lg">
            <p className="text-[11px] text-white/40 font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
              independent tribute project. not affiliated w any toy company. 
              $TROLL is a meme token — not financial advice. no promises. just trolls. DYOR
            </p>
          </div>

          <p className="text-white/30 text-xs font-bold mt-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
            made with love and ms paint energy
          </p>
        </div>
      </div>
    </footer>
  );
}
