"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, RotateCcw } from "lucide-react";
import TrollCard from "./TrollCard";
import TraitChips from "./TraitChips";
import { generateTraitRecipe, TrollTraits } from "@/lib/traits";
import { LOADING_MESSAGES } from "@/lib/gallery-data";

type GeneratorState = "idle" | "loading" | "done";

export default function HeroGenerator() {
  const [handle, setHandle] = useState("");
  const [state, setState] = useState<GeneratorState>("idle");
  const [traits, setTraits] = useState<TrollTraits | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("");

  const generate = useCallback(async () => {
    const clean = handle.replace(/^@/, "").trim();
    if (!clean) return;

    setState("loading");

    for (let i = 0; i < 4; i++) {
      setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      await new Promise((r) => setTimeout(r, 600));
    }

    const result = generateTraitRecipe(clean);
    setTraits(result);
    setState("done");
  }, [handle]);

  const reset = () => {
    setState("idle");
    setTraits(null);
    setHandle("");
  };

  const shareOnX = () => {
    if (!traits) return;
    const text = encodeURIComponent(
      `lol i got trollified\n\nim a "${traits.archetype}" with ${traits.hairColor} hair!!! big hair energy\n\nget urs`
    );
    const url = encodeURIComponent("https://trolldolls.fun");
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const downloadCard = () => {
    const svg = document.querySelector("#troll-result svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 1200, 1200);
      const link = document.createElement("a");
      link.download = `troll-${traits?.handle || "doll"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <section
      id="generator"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        {/* Headline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl md:text-[12rem] font-black leading-[0.85] mb-8 tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            <span className="rainbow-text">TROLLS</span>
          </h1>

          <p className="text-lg md:text-xl text-black/60 max-w-md mx-auto mb-8 font-medium" style={{ fontFamily: "'Comic Neue', cursive" }}>
            type ur @ handle. get a troll.
          </p>
        </motion.div>

        {/* Generator Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="bg-white wobbly-border crayon-shadow p-5 space-y-4">
                  {/* Question mark placeholder PFP */}
                  <div className="flex justify-center">
                    <div className="w-40 h-40 bg-yellow/30 border-4 border-dashed border-black/30 rounded-2xl flex items-center justify-center rotate-[1deg]">
                      <span className="text-7xl animate-wobble-slow select-none">❓</span>
                    </div>
                  </div>
                  <p className="text-center text-black/40 font-bold text-sm" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    ur troll is waiting...
                  </p>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-bold text-pink">@</span>
                    <input
                      type="text"
                      placeholder="your_handle"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && generate()}
                      className="w-full pl-10 pr-4 py-3.5 bg-yellow/30 border-3 border-black text-black text-lg font-bold placeholder:text-black/30 focus:outline-none focus:bg-yellow/50 transition-all rounded-lg"
                      style={{ fontFamily: "'Comic Neue', cursive" }}
                    />
                  </div>

                  <button
                    onClick={generate}
                    disabled={!handle.replace(/^@/, "").trim()}
                    className="w-full py-4 bg-pink text-white text-xl font-bold border-3 border-black crayon-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg"
                  >
                    MAKE MY TROLL
                  </button>
                </div>

                <p className="text-sm text-black/50 font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
                  same handle = same troll. always. its deterministic bb
                </p>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-4 py-10"
              >
                <div className="text-4xl font-bold animate-wiggle text-pink">...</div>
                <motion.p
                  key={loadingMsg}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-black font-bold text-xl"
                  style={{ fontFamily: "'Comic Neue', cursive" }}
                >
                  {loadingMsg}
                </motion.p>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-pink border-2 border-black rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {state === "done" && traits && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-5"
              >
                <div className="bg-white wobbly-border crayon-shadow p-5">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-lg font-bold text-black" style={{ fontFamily: "'Comic Neue', cursive" }}>
                      @{traits.handle}&apos;s troll:
                    </div>

                    <div id="troll-result" className="animate-bounce-float">
                      <TrollCard traits={traits} size="lg" />
                    </div>

                    <div className="bg-yellow/50 border-3 border-black px-4 py-2 rounded-lg rotate-[-1deg]">
                      <p className="text-lg font-bold text-black">
                        &quot;{traits.archetype}&quot;
                      </p>
                    </div>

                    <TraitChips traits={traits} />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={downloadCard}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue text-white font-bold border-3 border-black crayon-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                    SAVE IT
                  </button>
                  <button
                    onClick={shareOnX}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white font-bold border-3 border-black crayon-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm rounded-lg"
                  >
                    <Share2 className="w-4 h-4" />
                    SHARE ON X
                  </button>
                </div>

                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-black/50 hover:text-pink transition-colors mx-auto"
                  style={{ fontFamily: "'Comic Neue', cursive" }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  try another handle
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
