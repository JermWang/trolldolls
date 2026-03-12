"use client";

import { motion } from "framer-motion";
import { PinkTroll, BlueTroll, GreenTroll, YellowTroll, RedTroll, PurpleTroll, OrangeTroll } from "./TrollSVGs";

export default function TokenCTA() {
  return (
    <section id="community" className="relative py-16 px-6">
      {/* Scattered trolls around the section */}
      <PinkTroll className="absolute top-8 left-4 w-16 sticker animate-wobble opacity-40 hidden md:block" />
      <BlueTroll className="absolute top-12 right-8 w-14 sticker animate-bounce-float opacity-40 hidden md:block" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-black wobbly-border p-8 md:p-10 text-center relative overflow-hidden"
          style={{ boxShadow: "6px 6px 0px #FF1493" }}
        >
          {/* Mini trolls inside the card - corners only */}
          <PinkTroll className="absolute top-2 left-2 w-10 opacity-30 hidden md:block" />
          <GreenTroll className="absolute bottom-2 right-2 w-10 opacity-30 hidden md:block" />

          <div className="relative z-10 pt-8">
            <div className="inline-block px-4 py-1.5 bg-yellow text-black text-sm font-bold border-3 border-white crayon-shadow-sm mb-5 rotate-[-2deg] rounded-lg">
              $TROLL TOKEN
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              JOIN THE
            </h2>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="rainbow-text">TROLL ARMY</span>
            </h2>

            <p className="text-white/60 text-lg max-w-md mx-auto mb-8 font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
              $TROLL is for fun. for nostalgia. for chaos. no promises. no roadmap. just vibes and big hair.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-pink text-white font-bold text-lg border-3 border-white hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-lg"
                style={{ boxShadow: "4px 4px 0px white" }}
              >
                JOIN COMMUNITY
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold border-3 border-white/30 hover:bg-white/20 transition-all rounded-lg"
              >
                VIEW TOKEN
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold">
              <span className="bg-pink/20 text-pink px-3 py-1 rounded-full border border-pink/30">community-driven</span>
              <span className="bg-blue/20 text-blue px-3 py-1 rounded-full border border-blue/30">no promises lol</span>
              <span className="bg-green/20 text-green px-3 py-1 rounded-full border border-green/30">just 4 fun</span>
              <span className="bg-yellow/20 text-yellow px-3 py-1 rounded-full border border-yellow/30">nostalgia-powered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
