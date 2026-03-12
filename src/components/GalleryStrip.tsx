"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// CT KOLs as troll dolls - each gets a unique base + CSS filter combo
// Floating background uses trolls 1-4, KOLs use 5-9 with unique styling
const CT_KOLS = [
  { src: "/trolls/troll-classic-5.png", handle: "@cobie", filter: "none", flip: false },
  { src: "/trolls/troll-classic-6.png", handle: "@hsaka", filter: "none", flip: false },
  { src: "/trolls/troll-classic-7.png", handle: "@loomdart", filter: "none", flip: false },
  { src: "/trolls/troll-classic-3.png", handle: "@blknoiz06", filter: "hue-rotate(40deg) saturate(1.4)", flip: true },
  { src: "/trolls/troll-classic-9.png", handle: "@inversebrah", filter: "none", flip: false },
  { src: "/trolls/troll-classic-8.png", handle: "@degenharambe", filter: "hue-rotate(260deg) saturate(1.3)", flip: false },
  { src: "/trolls/troll-classic-5.png", handle: "@zachxbt", filter: "hue-rotate(90deg) saturate(1.2)", flip: true },
];

export default function GalleryStrip() {
  return (
    <section id="gallery" className="relative py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black/80" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            CT TROLL ARMY
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
          {CT_KOLS.map((kol, i) => (
            <motion.div
              key={kol.handle}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <KOLCard kol={kol} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KOLCard({ kol }: { kol: { src: string; handle: string; filter: string; flip: boolean } }) {
  return (
    <div className="group flex flex-col items-center">
      <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
        <Image
          src={kol.src}
          alt={kol.handle}
          width={144}
          height={144}
          className="w-full h-full object-contain"
          style={{
            filter: kol.filter,
            transform: kol.flip ? "scaleX(-1)" : "none",
          }}
          draggable={false}
        />
      </div>
      <p className="text-sm md:text-base font-bold text-black/70" style={{ fontFamily: "'Comic Neue', cursive" }}>
        {kol.handle}
      </p>
    </div>
  );
}
