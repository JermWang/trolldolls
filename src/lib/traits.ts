// ============================================================
// DETERMINISTIC TROLL TRAIT SYSTEM
// Handle -> Seed -> Trait Recipe -> Prompt Ingredients
// ============================================================

import traitPools from "./trait-pools.json";

export interface TrollTraits {
  handle: string;
  seed: number;
  hairColor: string;
  hairStyle: string;
  hat: string;
  eyeStyle: string;
  mouth: string;
  costume: string;
  accessory: string;
  bellyGem: string;
  background: string;
  specialEffect: string;
  skinTone: string;
  vibe: string;
  memeTrait: string;
  rarity: RarityTier;
  specialTraits: string[];
}

export type RarityTier = "Common" | "Uncommon" | "Rare" | "Ultra Rare" | "Legendary";

// ── Deterministic Seed ──────────────────────────────────────

export function seedFromHandle(handle: string): number {
  const clean = handle.replace(/^@/, "").toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    const char = clean.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

// Seeded PRNG (mulberry32)
function mulberry32(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

// ── Rarity Calculation ──────────────────────────────────────

function calculateRarity(rng: () => number): RarityTier {
  const roll = rng();
  if (roll < 0.01) return "Legendary";      // 1%
  if (roll < 0.06) return "Ultra Rare";      // 5%
  if (roll < 0.18) return "Rare";            // 12%
  if (roll < 0.40) return "Uncommon";        // 22%
  return "Common";                            // 60%
}

// ── Special Trait Assignment ────────────────────────────────

function assignSpecialTraits(rarity: RarityTier, rng: () => number): string[] {
  const counts: Record<RarityTier, number> = {
    Common: 0,
    Uncommon: 1,
    Rare: 2,
    "Ultra Rare": 3,
    Legendary: 4,
  };
  const count = counts[rarity];
  const traits: string[] = [];
  const pool = [...traitPools.specialEffects];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(rng() * pool.length);
    traits.push(pool.splice(idx, 1)[0]);
  }
  return traits;
}

// ── Main Generator ──────────────────────────────────────────

export function generateTraitRecipe(handle: string): TrollTraits {
  const seed = seedFromHandle(handle);
  const rng = mulberry32(seed);

  const rarity = calculateRarity(rng);
  const specialTraits = assignSpecialTraits(rarity, rng);

  // Meme traits only for Rare+
  const memeTrait = rarity === "Common" || rarity === "Uncommon" 
    ? "none" 
    : pick(traitPools.memeTraits, rng);

  return {
    handle: handle.replace(/^@/, "").toLowerCase().trim(),
    seed,
    hairColor: pick(traitPools.hairColors, rng),
    hairStyle: pick(traitPools.hairStyles, rng),
    hat: pick(traitPools.hats, rng),
    eyeStyle: pick(traitPools.eyeStyles, rng),
    mouth: pick(traitPools.mouths, rng),
    costume: pick(traitPools.costumes, rng),
    accessory: pick(traitPools.accessories, rng),
    bellyGem: pick(traitPools.bellyGems, rng),
    background: pick(traitPools.backgrounds, rng),
    specialEffect: rarity === "Common" ? "none" : pick(traitPools.specialEffects, rng),
    skinTone: pick(traitPools.skinTones, rng),
    vibe: pick(traitPools.vibes, rng),
    memeTrait,
    rarity,
    specialTraits,
  };
}

// ── Rarity Metadata ─────────────────────────────────────────

export const RARITY_CONFIG: Record<RarityTier, { color: string; label: string; gradient: string }> = {
  Common: {
    color: "#9CA3AF",
    label: "Common",
    gradient: "from-gray-400 to-gray-500",
  },
  Uncommon: {
    color: "#34D399",
    label: "Uncommon",
    gradient: "from-emerald-400 to-teal-500",
  },
  Rare: {
    color: "#60A5FA",
    label: "Rare",
    gradient: "from-blue-400 to-indigo-500",
  },
  "Ultra Rare": {
    color: "#A78BFA",
    label: "Ultra Rare",
    gradient: "from-violet-400 to-purple-600",
  },
  Legendary: {
    color: "#FBBF24",
    label: "Legendary",
    gradient: "from-amber-400 to-orange-500",
  },
};

// ── Trait Summary for Display ───────────────────────────────

export function getTraitSummary(traits: TrollTraits) {
  const items = [
    { label: "Hair", value: `${traits.hairColor}, ${traits.hairStyle}` },
    { label: "Eyes", value: traits.eyeStyle },
    { label: "Hat", value: traits.hat },
    { label: "Costume", value: traits.costume },
    { label: "Gem", value: traits.bellyGem },
    { label: "Vibe", value: traits.vibe },
  ];
  return items;
}
