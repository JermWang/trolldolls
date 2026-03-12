"use client";

import Image from "next/image";

// Real classic troll doll PNGs with transparent backgrounds
// Downloaded from free PNG sources — classic Thomas Dam / 90s troll dolls

interface TrollProps {
  className?: string;
  style?: React.CSSProperties;
}

function TrollImg({ src, alt, className, style }: TrollProps & { src: string; alt: string }) {
  return (
    <div className={className} style={style}>
      <Image src={src} alt={alt} width={200} height={200} className="w-full h-auto object-contain" draggable={false} />
    </div>
  );
}

// Clown troll — classic Thomas Dam style with hat and outfit
export function PinkTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-1.png" alt="Classic troll doll with hat" className={className} style={style} />;
}

// Vampire Dracula troll — black hair, cape
export function BlueTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-2.png" alt="Vampire troll doll with cape" className={className} style={style} />;
}

// Classic naked troll — orange/red hair, arms out (THE iconic troll)
export function GreenTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-3.png" alt="Classic orange hair troll doll" className={className} style={style} />;
}

// Pink outfit troll — green eyes, pink dress
export function OrangeTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-4.png" alt="Troll doll in pink outfit" className={className} style={style} />;
}

// Thomas Dam original — overalls, brown hair, holding tools
export function PurpleTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-5.png" alt="Thomas Dam original troll doll" className={className} style={style} />;
}

// Rainbow hair troll — classic naked troll with multicolor hair
export function YellowTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-6.png" alt="Rainbow hair classic troll doll" className={className} style={style} />;
}

// Santa Christmas troll — red suit, white hair, classic Thomas Dam style
export function RedTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-7.png" alt="Santa Christmas troll doll" className={className} style={style} />;
}

// Rainbow multicolor hair troll — classic 90s naked troll
export function SantaTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-8.png" alt="Rainbow multicolor troll doll" className={className} style={style} />;
}

// Classic naked troll — orange/auburn swoopy hair, tan body
export function CopperTroll({ className, style }: TrollProps) {
  return <TrollImg src="/trolls/troll-classic-9.png" alt="Classic orange swoopy hair troll doll" className={className} style={style} />;
}

// Array of all trolls for easy random access
export const ALL_TROLLS = [PinkTroll, BlueTroll, GreenTroll, OrangeTroll, PurpleTroll, YellowTroll, RedTroll, SantaTroll, CopperTroll];
