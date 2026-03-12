// ============================================================
// DETERMINISTIC TROLL TRAIT SYSTEM
// Handle -> Seed -> Trait Recipe -> Prompt Ingredients
// ============================================================

export interface TrollTraits {
  handle: string;
  seed: number;
  hairColor: string;
  hairShape: string;
  eyeVariant: string;
  bellyGem: string;
  rarity: RarityTier;
  specialTraits: string[];
  archetype: string;
}

export type RarityTier = "Common" | "Uncommon" | "Rare" | "Ultra Rare" | "Legendary";

// ── Trait Pools ──────────────────────────────────────────────

const HAIR_COLORS = [
  "neon pink",
  "electric blue",
  "lime green",
  "bright orange",
  "lavender purple",
  "bubblegum pink",
  "rainbow",
];

const HAIR_SHAPES = [
  "perfect vertical spike",
  "fluffy tower",
  "slightly windblown spike",
  "messy vintage frizz",
  "soft rounded spike",
];

const EYE_VARIANTS = [
  "classic toy smile",
  "mischievous playful smile",
  "happy cheerful smile",
  "relaxed sleepy eyes",
];

const BELLY_GEMS = [
  "ruby",
  "sapphire",
  "emerald",
  "diamond",
  "amethyst",
  "heart gem",
  "star gem",
  "moon gem",
  "chrome gem",
  "none",
  "none",
  "none",
];

const SPECIAL_TRAITS = [
  "metallic vinyl finish",
  "translucent hair",
  "frost-tipped hair",
  "rainbow aura",
  "golden body",
  "pearlescent body",
  "dual-gem trait",
  "glitch troll variant",
  "moonlit background",
  "glitter halo",
  "chrome charm",
  "confetti backdrop",
  "neon edge light",
  "holographic sheen",
  "stardust particles",
];

const ARCHETYPES = [
  "Classic Collector",
  "Neon Rebel",
  "Pastel Dreamer",
  "Chaos Agent",
  "Luxury Edition",
  "Cyber Punk",
  "Vintage OG",
  "Sunset Cruiser",
  "Mystic Sage",
  "Party Animal",
];

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
  const pool = [...SPECIAL_TRAITS];
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

  return {
    handle: handle.replace(/^@/, "").toLowerCase().trim(),
    seed,
    hairColor: pick(HAIR_COLORS, rng),
    hairShape: pick(HAIR_SHAPES, rng),
    eyeVariant: pick(EYE_VARIANTS, rng),
    bellyGem: pick(BELLY_GEMS, rng),
    rarity,
    specialTraits,
    archetype: pick(ARCHETYPES, rng),
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
    { label: "Hair", value: `${traits.hairColor}, ${traits.hairShape}` },
    { label: "Eyes", value: traits.eyeVariant },
    { label: "Gem", value: traits.bellyGem },
    { label: "Vibe", value: traits.archetype },
  ];
  return items;
}
