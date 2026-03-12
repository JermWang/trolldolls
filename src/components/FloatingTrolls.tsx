"use client";

import Image from "next/image";

// Full collection of all 9 trolls floating across the screen
const FLOATING_TROLLS = [
  { src: "/trolls/troll-classic-1.png", size: 90, top: "8%", duration: 26, delay: 0 },
  { src: "/trolls/troll-classic-2.png", size: 75, top: "22%", duration: 30, delay: 3 },
  { src: "/trolls/troll-classic-3.png", size: 100, top: "55%", duration: 23, delay: 7 },
  { src: "/trolls/troll-classic-4.png", size: 65, top: "38%", duration: 28, delay: 11 },
  { src: "/trolls/troll-classic-5.png", size: 85, top: "72%", duration: 32, delay: 5 },
  { src: "/trolls/troll-classic-6.png", size: 70, top: "15%", duration: 27, delay: 14 },
  { src: "/trolls/troll-classic-7.png", size: 95, top: "48%", duration: 25, delay: 9 },
  { src: "/trolls/troll-classic-8.png", size: 55, top: "82%", duration: 34, delay: 17 },
  { src: "/trolls/troll-classic-9.png", size: 80, top: "65%", duration: 29, delay: 2 },
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
