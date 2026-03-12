// ============================================================
// TROLL DOLL IMAGE PROMPT ARCHITECTURE
// Master prompt + trait-based append system
// ============================================================

import { TrollTraits } from "./traits";

// ── Master Style Prompt (locked constants) ──────────────────

const MASTER_PROMPT = `You are generating portraits of classic vintage troll dolls inspired by the original 1990s collectible troll toy aesthetic.

The dolls must strongly resemble the classic troll dolls: small tan vinyl toy bodies, simple smiling faces, big rounded ears, tiny bead-like eyes, minimal facial features, and extremely tall fuzzy hair standing straight upward.

STYLE RULES (must remain consistent in every generation):
• smooth tan vinyl toy body
• small classic troll proportions
• nude toy body (no clothing)
• simple smile
• big rounded ears
• tiny toy eyes
• arms slightly out to the sides
• neutral toy stance
• extremely tall fuzzy troll hair
• hair texture looks like fluffy nylon toy fibers
• hair should be the tallest element in the image
• the doll should look like a real collectible toy figure

VISUAL PRESENTATION:
• centered composition
• square format (profile picture friendly)
• studio toy photography lighting
• soft neutral or pastel background
• minimal environment
• subtle shadow under the toy
• high detail on hair fibers
• crisp high-resolution image
• nostalgic toy catalog photography aesthetic

The doll design must remain consistent across all images so they appear to belong to the same collectible toy line. Only small variations are allowed.`;

// ── Negative Prompt (universal exclusions) ──────────────────

export const NEGATIVE_PROMPT = `clothing, props, complex environments, monster features, realistic human anatomy, exaggerated cartoon style, creepy expressions, fantasy creature redesigns, modern cartoon characters, DreamWorks Trolls style, anime, text, watermark, low quality, blurry, distorted face, extra fingers, deformed body`;

// ── Trait-to-Prompt Fragments ───────────────────────────────

function hairFragment(traits: TrollTraits): string {
  return `${traits.hairColor} colored towering fuzzy hair in a ${traits.hairShape} style`;
}

function eyeFragment(traits: TrollTraits): string {
  return `with ${traits.eyeVariant} expression`;
}

function gemFragment(traits: TrollTraits): string {
  if (traits.bellyGem === "none") return "";
  return `, a small ${traits.bellyGem} embedded in the belly`;
}

function specialFragment(traits: TrollTraits): string {
  if (traits.specialTraits.length === 0) return "";
  return `, featuring ${traits.specialTraits.join(", ")}`;
}

function backgroundFragment(): string {
  return ", clean soft cream white studio background";
}

// ── Build Full Prompt ───────────────────────────────────────

export function buildPromptFromTraits(traits: TrollTraits): string {
  const fragments = [
    MASTER_PROMPT,
    hairFragment(traits),
    eyeFragment(traits),
    gemFragment(traits),
    specialFragment(traits),
    backgroundFragment(),
  ]
    .filter(Boolean)
    .join(". ");

  return fragments;
}

// ── Example Prompt Templates ────────────────────────────────

export const EXAMPLE_PROMPTS = {
  standardCommon: buildPromptFromTraits({
    handle: "normie",
    seed: 0,
    hairColor: "bubblegum pink",
    hairShape: "perfect vertical spike",
    eyeVariant: "classic bead eyes",
    bellyGem: "none",
    rarity: "Common",
    specialTraits: [],
    archetype: "Classic Collector",
  }),

  rareCollectible: buildPromptFromTraits({
    handle: "collector",
    seed: 0,
    hairColor: "royal blue",
    hairShape: "ultra-straight collector spike",
    eyeVariant: "sparkle-eyed",
    bellyGem: "sapphire",
    rarity: "Rare",
    specialTraits: ["pearlescent body"],
    archetype: "Luxury Edition",
  }),

  pastelDreamy: buildPromptFromTraits({
    handle: "dreamer",
    seed: 0,
    hairColor: "lavender",
    hairShape: "soft rounded tower",
    eyeVariant: "sleepy eyes",
    bellyGem: "moon gem",
    rarity: "Uncommon",
    specialTraits: ["stardust particles"],
    archetype: "Pastel Dreamer",
  }),

  chaoticMeme: buildPromptFromTraits({
    handle: "chaos",
    seed: 0,
    hairColor: "duo-tone chaos",
    hairShape: "wild static burst",
    eyeVariant: "mischievous eyes",
    bellyGem: "star gem",
    rarity: "Ultra Rare",
    specialTraits: ["glitch troll variant", "neon edge light", "confetti backdrop"],
    archetype: "Chaos Agent",
  }),

  legendary: buildPromptFromTraits({
    handle: "legend",
    seed: 0,
    hairColor: "galaxy fade",
    hairShape: "fluffy chaos spike",
    eyeVariant: "glossy big-eyed",
    bellyGem: "diamond",
    rarity: "Legendary",
    specialTraits: ["golden body", "holographic sheen", "glitter halo", "rainbow aura"],
    archetype: "Mystic Sage",
  }),
};
