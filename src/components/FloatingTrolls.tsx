"use client";

import Image from "next/image";

// Trolls 1-4 for floating background (KOLs use 5-9)
const FLOATING_TROLLS = [
  { src: "/trolls/troll-classic-1.png", size: 90, top: "10%", duration: 25, delay: 0 },
  { src: "/trolls/troll-classic-2.png", size: 75, top: "35%", duration: 30, delay: 5 },
  { src: "/trolls/troll-classic-3.png", size: 100, top: "60%", duration: 22, delay: 10 },
  { src: "/trolls/troll-classic-4.png", size: 65, top: "20%", duration: 28, delay: 15 },
  { src: "/trolls/troll-classic-1.png", size: 80, top: "75%", duration: 32, delay: 8 },
  { src: "/trolls/troll-classic-2.png", size: 70, top: "45%", duration: 26, delay: 18 },
];

export default function FloatingTrolls() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {FLOATING_TROLLS.map((troll, i) => (
        <div
          key={i}
          className="absolute animate-float-across"
          style={{
            top: troll.top,
            width: troll.size,
            height: troll.size,
            animationDuration: `${troll.duration}s`,
            animationDelay: `${troll.delay}s`,
          }}
        >
          <Image
            src={troll.src}
            alt="Floating troll doll"
            width={troll.size}
            height={troll.size}
            className="w-full h-auto object-contain animate-float-bob"
            style={{
              animationDuration: `${troll.duration / 4}s`,
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
