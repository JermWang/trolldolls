"use client";

import { motion } from "framer-motion";
import { BlueTroll, OrangeTroll, PurpleTroll } from "./TrollSVGs";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 px-6 bg-blue/10 border-y-4 border-black">
      <BlueTroll className="absolute top-4 left-4 w-12 sticker animate-wobble opacity-30 hidden lg:block" />
      <OrangeTroll className="absolute bottom-4 right-4 w-12 sticker animate-wobble-slow opacity-30 hidden lg:block" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-block px-4 py-1.5 bg-orange text-white text-sm font-bold border-3 border-black crayon-shadow-sm mb-4 rotate-[2deg] rounded-lg">
            wtf is this
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            ITS A <span className="text-orange">TRIBUTE</span> OK
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white wobbly-border crayon-shadow p-6 md:p-8 rotate-[-0.5deg]"
        >
          <div className="space-y-4 text-black/80 font-bold leading-relaxed" style={{ fontFamily: "'Comic Neue', cursive" }}>
            <p className="text-lg">
              remember when the best toys were just{" "}
              <span className="text-pink">naked vinyl bodies with GIANT fuzzy hair</span>?? 
              no lore. no cinematic universe. just vibes.
            </p>

            <p>
              troll dolls were the OG collectibles. traded on playgrounds. 
              lined up on shelves. each one a lil different but all part of the same weird family.
            </p>

            <p>
              this is a love letter to that energy. were not a toy company. 
              were internet ppl who thought &quot;what if trolls but on the blockchain timeline&quot; and just... did it.
            </p>

            <p className="text-xl text-black pt-2">
              big hair. tiny chaos. pure nostalgia.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 bg-yellow/50 border-2 border-black rounded-lg p-3 text-center rotate-[0.5deg]"
        >
          <p className="text-xs text-black/50 font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
            not affiliated with any toy company btw!! this is fan art basically. 
            we just love these lil guys. dont sue us pls 🙏
          </p>
        </motion.div>
      </div>
    </section>
  );
}
