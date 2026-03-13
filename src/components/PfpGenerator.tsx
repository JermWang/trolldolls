"use client";

import { useState, useRef, useCallback } from "react";
import { Download, RotateCcw, Share2 } from "lucide-react";
import Image from "next/image";
import ContractCopy from "./ContractCopy";

interface TraitOption {
  id: string;
  label: string;
  thumb: string;
  full: string;
}

interface TraitCategory {
  id: string;
  label: string;
  zIndex: number;
  options: TraitOption[];
}

const CATEGORIES: TraitCategory[] = [
  {
    id: "head",
    label: "Hair",
    zIndex: 5,
    options: [
      { id: "none", label: "None", thumb: "/pfp/common/placeholder-tile.webp", full: "" },
      { id: "goku", label: "Goku", thumb: "/pfp/head/thumb/goku.webp", full: "/pfp/head/full/goku.webp" },
      { id: "ironman", label: "Iron Man", thumb: "/pfp/head/thumb/ironman.webp", full: "/pfp/head/full/ironman.webp" },
      { id: "moncler", label: "Moncler", thumb: "/pfp/head/thumb/moncler.webp", full: "/pfp/head/full/moncler.webp" },
      { id: "adidas-hat", label: "Adidas Hat", thumb: "/pfp/head/thumb/adidas-hat.webp", full: "/pfp/head/full/adidas-hat.webp" },
      { id: "deadpool", label: "Deadpool", thumb: "/pfp/head/thumb/deadpool.webp", full: "/pfp/head/full/deadpool.webp" },
      { id: "gucci-hat", label: "Gucci Hat", thumb: "/pfp/head/thumb/gucci-hat.webp", full: "/pfp/head/full/gucci-hat.webp" },
    ],
  },
  {
    id: "body",
    label: "Top",
    zIndex: 3,
    options: [
      { id: "none", label: "None", thumb: "/pfp/common/placeholder-tile.webp", full: "" },
      { id: "gucci-dress", label: "Gucci Dress", thumb: "/pfp/body/thumb/gucci-dress.webp", full: "/pfp/body/full/gucci-dress.webp" },
      { id: "ironman", label: "Iron Man", thumb: "/pfp/body/thumb/ironman.webp", full: "/pfp/body/full/ironman.webp" },
      { id: "deadpool", label: "Deadpool", thumb: "/pfp/body/thumb/deadpool.webp", full: "/pfp/body/full/deadpool.webp" },
      { id: "hugo-boss", label: "Hugo Boss", thumb: "/pfp/body/thumb/hugo-boss.webp", full: "/pfp/body/full/hugo-boss.webp" },
      { id: "wolverine", label: "Wolverine", thumb: "/pfp/body/thumb/wolverine.webp", full: "/pfp/body/full/wolverine.webp" },
      { id: "balenciaga", label: "Balenciaga", thumb: "/pfp/body/thumb/balenciaga.webp", full: "/pfp/body/full/balenciaga.png" },
    ],
  },
  {
    id: "legs",
    label: "Bottom",
    zIndex: 2,
    options: [
      { id: "none", label: "None", thumb: "/pfp/common/placeholder-tile.webp", full: "" },
      { id: "hoolah", label: "Hoolah", thumb: "/pfp/legs/thumb/hoolah.webp", full: "/pfp/legs/full/hoolah.webp" },
      { id: "adidas-skirt", label: "Adidas Skirt", thumb: "/pfp/legs/thumb/adidas-skirt.webp", full: "/pfp/legs/full/adidas-skirt.webp" },
      { id: "hulk", label: "Hulk", thumb: "/pfp/legs/thumb/hulk.webp", full: "/pfp/legs/full/hulk.webp" },
      { id: "thong", label: "Thong", thumb: "/pfp/legs/thumb/thong.webp", full: "/pfp/legs/full/thong.webp" },
      { id: "tutu", label: "Tutu", thumb: "/pfp/legs/thumb/tutu.webp", full: "/pfp/legs/full/tutu.png" },
      { id: "barca-shorts", label: "Barca Shorts", thumb: "/pfp/legs/thumb/barca-shorts.webp", full: "/pfp/legs/full/barca-shorts.webp" },
    ],
  },
  {
    id: "feet",
    label: "Shoes",
    zIndex: 2,
    options: [
      { id: "none", label: "None", thumb: "/pfp/common/placeholder-tile.webp", full: "" },
      { id: "adidas-blue", label: "Adidas Blue", thumb: "/pfp/feet/thumb/adidas-blue.webp", full: "/pfp/feet/full/adidas-blue.webp" },
      { id: "ironman", label: "Iron Man", thumb: "/pfp/feet/thumb/ironman.webp", full: "/pfp/feet/full/ironman.webp" },
      { id: "birkenstocks", label: "Birkenstocks", thumb: "/pfp/feet/thumb/birkenstocks.webp", full: "/pfp/feet/full/birkenstocks.webp" },
      { id: "nike-tiger", label: "Nike Tiger", thumb: "/pfp/feet/thumb/nike-tiger.webp", full: "/pfp/feet/full/nike-tiger.webp" },
      { id: "nike-mbj", label: "Nike MBJ", thumb: "/pfp/feet/thumb/nike-mbj.webp", full: "/pfp/feet/full/nike-mbj.webp" },
      { id: "yeezy", label: "Yeezy", thumb: "/pfp/feet/thumb/yeezy.webp", full: "/pfp/feet/full/yeezy.png" },
    ],
  },
  {
    id: "equipment",
    label: "Accessory",
    zIndex: 6,
    options: [
      { id: "none", label: "None", thumb: "/pfp/common/placeholder-tile.webp", full: "" },
      { id: "paddle", label: "Paddle", thumb: "/pfp/equipment/thumb/paddle.webp", full: "/pfp/equipment/full/paddle.webp" },
      { id: "elder-wand", label: "Elder Wand", thumb: "/pfp/equipment/thumb/elder-wand.webp", full: "/pfp/equipment/full/elder-wand.webp" },
      { id: "supreme-brick", label: "Supreme Brick", thumb: "/pfp/equipment/thumb/supreme-brick.webp", full: "/pfp/equipment/full/supreme-brick.webp" },
      { id: "gucci-bag", label: "Gucci Bag", thumb: "/pfp/equipment/thumb/gucci-bag.webp", full: "/pfp/equipment/full/gucci-bag.webp" },
      { id: "staff", label: "Staff", thumb: "/pfp/equipment/thumb/staff.png", full: "/pfp/equipment/full/staff.png" },
      { id: "nunchucks", label: "Nunchucks", thumb: "/pfp/equipment/thumb/nunchucks.webp", full: "/pfp/equipment/full/nunchucks.webp" },
    ],
  },
];

type Selections = Record<string, string>;

export default function PfpGenerator() {
  const [selections, setSelections] = useState<Selections>({
    head: "none",
    body: "none",
    legs: "none",
    feet: "none",
    equipment: "none",
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((categoryId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [categoryId]: optionId }));
  }, []);

  const reset = useCallback(() => {
    setSelections({
      head: "none",
      body: "none",
      legs: "none",
      feet: "none",
      equipment: "none",
    });
  }, []);

  const downloadPfp = useCallback(async () => {
    const canvas = document.createElement("canvas");
    const size = 1200;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw base troll character first
    const baseSrc = "/pfp/common/troll-base.webp";
    const baseImg = new window.Image();
    baseImg.crossOrigin = "anonymous";
    await new Promise<void>((resolve) => {
      baseImg.onload = () => resolve();
      baseImg.onerror = () => resolve();
      baseImg.src = baseSrc;
    });
    ctx.drawImage(baseImg, 0, 0, size, size);

    // Draw layers in z-index order (body first, then legs/feet, head, equipment)
    const sortedCategories = [...CATEGORIES].sort((a, b) => a.zIndex - b.zIndex);

    for (const cat of sortedCategories) {
      const selectedId = selections[cat.id];
      if (selectedId === "none") continue;
      const option = cat.options.find((o) => o.id === selectedId);
      if (!option || !option.full) continue;

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = option.full;
      });
      ctx.drawImage(img, 0, 0, size, size);
    }

    const link = document.createElement("a");
    link.download = "my-troll.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [selections]);

  const shareOnX = useCallback(() => {
    const equipped: string[] = [];
    CATEGORIES.forEach((cat) => {
      const sel = selections[cat.id];
      if (sel !== "none") {
        const opt = cat.options.find((o) => o.id === sel);
        if (opt) equipped.push(opt.label);
      }
    });
    const desc = equipped.length > 0 ? equipped.join(" + ") : "just vibes";
    const text = encodeURIComponent(
      `just built my troll pfp\n\ndrip check: ${desc}\n\nmake urs`
    );
    const url = encodeURIComponent("https://trolldolls.fun");
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  }, [selections]);

  return (
    <section
      id="generator"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16"
    >

      <div className="relative z-10 w-full max-w-5xl mx-auto overflow-visible">
        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-7xl md:text-[12rem] font-black leading-[0.85] mb-6 tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            <span className="rainbow-title" aria-label="TROLLS">
              <span className="rainbow-text rainbow-text-glow" aria-hidden="true">TROLLS</span>
              <span className="rainbow-text rainbow-text-main">TROLLS</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-md mx-auto font-medium" style={{ fontFamily: "'Comic Neue', cursive" }}>
            type ur @ handle. get a troll.
          </p>
        </div>

        {/* Main generator area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Preview area */}
          <div className="w-full lg:w-[45%] flex flex-col items-center gap-4">
            <div
              ref={previewRef}
              className="relative w-full aspect-square max-w-[380px] rounded-2xl overflow-hidden border-4 border-pink-hot bg-white shadow-[6px_6px_0px_rgba(155,93,229,0.6)]"
            >
              {/* Base troll character */}
              <Image
                src="/pfp/common/troll-base.webp"
                alt="Base troll"
                fill
                className="object-contain"
                style={{ zIndex: 0 }}
                priority
              />

              {/* Layered selections */}
              {CATEGORIES.map((cat) => {
                const selectedId = selections[cat.id];
                if (selectedId === "none") return null;
                const option = cat.options.find((o) => o.id === selectedId);
                if (!option || !option.full) return null;
                return (
                  <Image
                    key={cat.id}
                    src={option.full}
                    alt={option.label}
                    fill
                    className="object-contain"
                    style={{ zIndex: cat.zIndex }}
                  />
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 w-full max-w-[380px]">
              <button
                onClick={downloadPfp}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue text-white font-bold border-3 border-black crayon-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm rounded-lg"
              >
                <Download className="w-4 h-4" />
                SAVE PFP
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
              className="flex items-center justify-center gap-2 text-sm font-bold text-black/50 hover:text-pink transition-colors"
              style={{ fontFamily: "'Comic Neue', cursive" }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              reset all
            </button>

            <ContractCopy />
          </div>

          {/* Trait selector rows */}
          <div className="w-full lg:w-[55%] flex flex-col gap-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex items-center gap-2 min-w-0">
                {/* Category label */}
                <div
                  className="w-16 shrink-0 text-center text-xs font-bold text-white bg-purple/60 backdrop-blur-sm rounded-lg py-1 border border-purple/30"
                  style={{ fontFamily: "'Comic Neue', cursive" }}
                >
                  {cat.label}
                </div>

                {/* Option thumbnails */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 flex-nowrap min-w-0">
                  {cat.options.map((option) => {
                    const isSelected = selections[cat.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(cat.id, option.id)}
                        className={`relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl overflow-hidden border-3 transition-all duration-150 ${
                          isSelected
                            ? "border-pink-hot shadow-[0_0_12px_rgba(255,20,147,0.5)] scale-105"
                            : "border-black/30 hover:border-pink/60 bg-white/80"
                        }`}
                        title={option.label}
                      >
                        <Image
                          src={option.thumb}
                          alt={option.label}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
