"use client";

import { motion } from "framer-motion";
import { TrollTraits } from "@/lib/traits";
import { getHairColorHex } from "@/lib/gallery-data";

interface TrollCardProps {
  traits: TrollTraits;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function TrollCard({ traits, size = "md", animate = true }: TrollCardProps) {
  const hairHex = getHairColorHex(traits.hairColor);

  const sizeClasses = {
    sm: "w-40 h-40",
    md: "w-64 h-64",
    lg: "w-80 h-80",
  };

  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, unknown>)}
      className="relative group"
    >
      {/* Card container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl overflow-hidden card-shadow bg-white border border-border`}
      >
        {/* SVG Troll Illustration */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <defs>
            <radialGradient id={`bg-${traits.seed}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFFBF5" />
              <stop offset="100%" stopColor="#F5F0EB" />
            </radialGradient>
            <radialGradient id={`hair-glow-${traits.seed}`} cx="50%" cy="30%">
              <stop offset="0%" stopColor={hairHex} stopOpacity="0.15" />
              <stop offset="100%" stopColor={hairHex} stopOpacity="0" />
            </radialGradient>
            {/* Hair fuzzy filter */}
            <filter id={`fuzz-${traits.seed}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed={traits.seed % 100} />
              <feDisplacementMap in="SourceGraphic" scale="6" />
            </filter>
          </defs>

          <rect width="300" height="300" fill={`url(#bg-${traits.seed})`} />

          {/* Hair glow ambient */}
          <circle cx="150" cy="100" r="120" fill={`url(#hair-glow-${traits.seed})`} />

          {/* HAIR — towering fuzzy mass */}
          <ellipse
            cx="150"
            cy="85"
            rx={getHairWidth(traits.hairStyle)}
            ry={getHairHeight(traits.hairStyle)}
            fill={hairHex}
            opacity="0.9"
            filter={`url(#fuzz-${traits.seed})`}
          />
          {/* Hair highlight */}
          <ellipse
            cx="140"
            cy="65"
            rx={getHairWidth(traits.hairStyle) * 0.5}
            ry={getHairHeight(traits.hairStyle) * 0.6}
            fill={hairHex}
            opacity="0.5"
            filter={`url(#fuzz-${traits.seed})`}
          />
          {/* Hair shine */}
          <ellipse
            cx="135"
            cy="60"
            rx="15"
            ry="25"
            fill="white"
            opacity="0.15"
          />

          {/* BODY — tan vinyl */}
          <ellipse cx="150" cy="215" rx="42" ry="50" fill="#DEB887" />
          {/* Body highlight */}
          <ellipse cx="142" cy="205" rx="20" ry="30" fill="#E8CFA0" opacity="0.5" />

          {/* HEAD */}
          <circle cx="150" cy="155" r="38" fill="#DEB887" />
          {/* Head highlight */}
          <ellipse cx="143" cy="148" rx="18" ry="22" fill="#E8CFA0" opacity="0.4" />

          {/* EARS — big rounded */}
          <ellipse cx="108" cy="155" rx="14" ry="12" fill="#DEB887" />
          <ellipse cx="106" cy="153" rx="8" ry="7" fill="#D4A574" opacity="0.4" />
          <ellipse cx="192" cy="155" rx="14" ry="12" fill="#DEB887" />
          <ellipse cx="190" cy="153" rx="8" ry="7" fill="#D4A574" opacity="0.4" />

          {/* EYES */}
          {renderEyes(traits.eyeStyle)}

          {/* NOSE — tiny dot */}
          <circle cx="150" cy="163" r="2.5" fill="#C49A6C" />

          {/* MOUTH — simple smile */}
          <path
            d="M 140 170 Q 150 178 160 170"
            fill="none"
            stroke="#C49A6C"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ARMS — slightly outstretched */}
          <ellipse cx="105" cy="215" rx="12" ry="8" fill="#DEB887" transform="rotate(-15, 105, 215)" />
          <ellipse cx="195" cy="215" rx="12" ry="8" fill="#DEB887" transform="rotate(15, 195, 215)" />

          {/* FEET */}
          <ellipse cx="135" cy="262" rx="14" ry="8" fill="#DEB887" />
          <ellipse cx="165" cy="262" rx="14" ry="8" fill="#DEB887" />

          {/* BELLY GEM */}
          {traits.bellyGem !== "none" && renderGem(traits.bellyGem)}

        </svg>
      </div>
    </Wrapper>
  );
}

// ── Helper Functions ──────────────────────────────────────

function getHairWidth(style: string): number {
  const map: Record<string, number> = {
    "perfect vertical spike": 35,
    "fluffy tower": 42,
    "slightly windblown spike": 40,
    "messy vintage frizz": 48,
    "soft rounded spike": 38,
    "wild explosion burst": 55,
    "sleek swept back": 45,
    "dual split spikes": 50,
    "curly perm tower": 45,
    "mohawk ridge": 30,
  };
  return map[style] || 40;
}

function getHairHeight(style: string): number {
  const map: Record<string, number> = {
    "perfect vertical spike": 75,
    "fluffy tower": 65,
    "slightly windblown spike": 60,
    "messy vintage frizz": 55,
    "soft rounded spike": 62,
    "wild explosion burst": 55,
    "sleek swept back": 50,
    "dual split spikes": 70,
    "curly perm tower": 68,
    "mohawk ridge": 80,
  };
  return map[style] || 65;
}

function renderEyes(variant: string) {
  switch (variant) {
    case "sleepy eyes":
      return (
        <>
          <ellipse cx="140" cy="155" rx="4" ry="2.5" fill="#3D2B1F" />
          <ellipse cx="160" cy="155" rx="4" ry="2.5" fill="#3D2B1F" />
        </>
      );
    case "mischievous eyes":
      return (
        <>
          <circle cx="140" cy="155" r="3.5" fill="#3D2B1F" />
          <circle cx="160" cy="155" r="3.5" fill="#3D2B1F" />
          <circle cx="141" cy="154" r="1" fill="white" opacity="0.8" />
          <circle cx="161" cy="154" r="1" fill="white" opacity="0.8" />
        </>
      );
    case "glossy big-eyed":
      return (
        <>
          <circle cx="140" cy="155" r="5" fill="#3D2B1F" />
          <circle cx="160" cy="155" r="5" fill="#3D2B1F" />
          <circle cx="142" cy="153" r="2" fill="white" opacity="0.9" />
          <circle cx="162" cy="153" r="2" fill="white" opacity="0.9" />
        </>
      );
    case "sparkle-eyed":
      return (
        <>
          <circle cx="140" cy="155" r="4" fill="#3D2B1F" />
          <circle cx="160" cy="155" r="4" fill="#3D2B1F" />
          <circle cx="141" cy="153" r="1.5" fill="white" />
          <circle cx="161" cy="153" r="1.5" fill="white" />
          <circle cx="139" cy="156" r="0.8" fill="white" opacity="0.6" />
          <circle cx="159" cy="156" r="0.8" fill="white" opacity="0.6" />
        </>
      );
    case "wide wonder eyes":
      return (
        <>
          <circle cx="140" cy="155" r="5.5" fill="#3D2B1F" />
          <circle cx="160" cy="155" r="5.5" fill="#3D2B1F" />
          <circle cx="142" cy="153" r="2.5" fill="white" opacity="0.85" />
          <circle cx="162" cy="153" r="2.5" fill="white" opacity="0.85" />
        </>
      );
    case "tiny smirk":
      return (
        <>
          <circle cx="140" cy="155" r="3" fill="#3D2B1F" />
          <circle cx="160" cy="155" r="3" fill="#3D2B1F" />
        </>
      );
    default: // classic bead eyes, pure classic smile
      return (
        <>
          <circle cx="140" cy="155" r="3.5" fill="#3D2B1F" />
          <circle cx="160" cy="155" r="3.5" fill="#3D2B1F" />
        </>
      );
  }
}

function renderGem(gem: string) {
  const gemColors: Record<string, string> = {
    ruby: "#E31B23",
    sapphire: "#0F52BA",
    emerald: "#50C878",
    diamond: "#B9F2FF",
    amethyst: "#9966CC",
    "heart gem": "#FF1493",
    "star gem": "#FFD700",
    "moon gem": "#C0C0FF",
    "chrome gem": "#C0C0C0",
  };
  const color = gemColors[gem] || "#FFD700";

  if (gem === "heart gem") {
    return (
      <path
        d="M 150 218 C 150 214 144 210 144 214 C 144 218 150 224 150 224 C 150 224 156 218 156 214 C 156 210 150 214 150 218 Z"
        fill={color}
        opacity="0.85"
      />
    );
  }
  if (gem === "star gem") {
    return (
      <polygon
        points="150,210 152,216 158,216 153,220 155,226 150,222 145,226 147,220 142,216 148,216"
        fill={color}
        opacity="0.85"
      />
    );
  }
  return (
    <>
      <circle cx="150" cy="218" r="5" fill={color} opacity="0.85" />
      <circle cx="148" cy="216" r="1.5" fill="white" opacity="0.5" />
    </>
  );
}
