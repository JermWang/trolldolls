"use client";

import { PinkTroll } from "./TrollSVGs";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-yellow border-b-4 border-black">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
        <a href="#" className="flex items-center gap-2 group">
          <PinkTroll className="w-10 h-10 sticker" />
          <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            TROLLS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-base font-bold text-black">
          <a href="#generator" className="hover:text-pink transition-colors hover:rotate-2 inline-block">
            make a troll!!
          </a>
          <a href="#gallery" className="hover:text-purple transition-colors hover:-rotate-2 inline-block">
            troll army
          </a>
          <a
            href="https://x.com/i/communities/2032483917899448654/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink transition-colors hover:scale-110 inline-block"
            title="Join our X Community"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <a
          href="#generator"
          className="px-3 py-1.5 md:px-5 md:py-2 bg-pink text-white text-xs md:text-base font-bold border-2 md:border-3 border-black crayon-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-lg"
        >
          GET UR TROLL
        </a>
      </div>
    </nav>
  );
}
