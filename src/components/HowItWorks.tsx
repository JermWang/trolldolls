"use client";

import { motion } from "framer-motion";
import { GreenTroll, YellowTroll } from "./TrollSVGs";

const steps = [
  { emoji: "1", title: "type ur @handle", desc: "thats it. thats the input.", color: "bg-pink" },
  { emoji: "2", title: "we pick ur traits", desc: "hair color, hair shape, gem, expression, vibe", color: "bg-blue" },
  { emoji: "3", title: "troll appears", desc: "same handle = same troll. always. forever. no takebacks.", color: "bg-purple" },
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 px-6">
      <GreenTroll className="absolute top-4 right-4 w-14 sticker animate-wobble-slow opacity-40 hidden lg:block" />
      <YellowTroll className="absolute bottom-4 left-4 w-14 sticker animate-wobble opacity-40 hidden lg:block" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            HOW IT <span className="text-green">WORKS</span> 🤔
          </h2>
          <p className="text-black/60 text-lg font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
            its really not that complicated lol
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group"
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              <div className={`${step.color} wobbly-border crayon-shadow p-5 text-white hover:rotate-1 transition-transform`}>
                <div className="text-3xl mb-2">{step.emoji}</div>
                <h3 className="font-bold text-xl mb-1">{step.title}</h3>
                <p className="text-white/80 text-sm font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trait grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white wobbly-border crayon-shadow p-6"
        >
          <h3 className="font-bold text-black text-center mb-4 text-xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            WHAT MAKES EACH TROLL UNIQUE
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Hair Color", ex: "20 colors!! neon pink, galaxy fade, etc" },
              { label: "Hair Shape", ex: "spiky, swoopy, frizzy, tall, chaotic" },
              { label: "Expression", ex: "bead eyes, sleepy, sparkly, mischievous" },
              { label: "Belly Gem", ex: "ruby, sapphire, diamond, or no gem" },
              { label: "Vibe", ex: "neon rebel, vintage OG, chaos agent" },
            ].map((cat) => (
              <div key={cat.label} className="p-3 bg-yellow/30 border-2 border-black rounded-lg">
                <p className="font-bold text-black text-sm">{cat.label}</p>
                <p className="text-xs text-black/60 font-bold mt-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                  {cat.ex}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
