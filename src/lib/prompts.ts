// ============================================================
// TROLL DOLL IMAGE PROMPT ARCHITECTURE
// Master prompt + trait-based append system
// ============================================================

import { TrollTraits } from "./traits";

// ── Master Style Prompt (locked constants) ──────────────────

const MASTER_PROMPT = `Create a centered portrait of a classic vintage troll doll inspired by the iconic 1990s collectible troll toy aesthetic.

The troll should have the classic toy appearance:
small tan vinyl body, smooth plastic texture, simple smiling face, tiny bead-like eyes, big rounded ears, and extremely tall fuzzy troll hair standing straight upward.

Hair should be vibrant and fluffy like nylon toy fibers and be the tallest element in the image.

Visual style:
nostalgic toy catalog photography, clean studio lighting, minimal pastel background, soft shadow beneath the doll, extremely detailed fuzzy hair texture.

Composition:
• perfectly centered troll
• square format
• large head and hair filling most of the frame
• minimal background
• collectible toy figure realism
• crisp high resolution
• playful and nostalgic mood

Important constraints:
no clothing, no props, no complex environments. The troll must look like a simple collectible toy figure from the 1990s.

Output:
square profile picture, clean, colorful, and instantly recognizable as a classic troll doll.`;

// ── Negative Prompt (universal exclusions) ──────────────────

export const NEGATIVE_PROMPT = `clothing, props, complex environments, fantasy creatures, monster anatomy, realistic human body proportions, DreamWorks trolls, anime style, text, watermark, logo, low resolution, blur, deformed face, extra limbs`;

// ── Trait-to-Prompt Fragments ───────────────────────────────

function hairFragment(traits: TrollTraits): string {
  return `Hair color: ${traits.hairColor}. Hair shape: ${traits.hairShape}. Expression: ${traits.eyeVariant}.`;
}

// ── Build Full Prompt ───────────────────────────────────────

export function buildPromptFromTraits(traits: TrollTraits): string {
  return [MASTER_PROMPT, hairFragment(traits)].join("\n\n");
}

// ── Example Prompt Templates ────────────────────────────────

export const EXAMPLE_PROMPTS = {
  standardCommon: buildPromptFromTraits({
    handle: "normie",
    seed: 0,
    hairColor: "neon pink",
    hairShape: "perfect vertical spike",
    eyeVariant: "classic toy smile",
    bellyGem: "none",
    rarity: "Common",
    specialTraits: [],
    archetype: "Classic Collector",
  }),

  rareCollectible: buildPromptFromTraits({
    handle: "collector",
    seed: 0,
    hairColor: "electric blue",
    hairShape: "fluffy tower",
    eyeVariant: "mischievous playful smile",
    bellyGem: "none",
    rarity: "Rare",
    specialTraits: [],
    archetype: "Luxury Edition",
  }),

  pastelDreamy: buildPromptFromTraits({
    handle: "dreamer",
    seed: 0,
    hairColor: "lavender purple",
    hairShape: "soft rounded spike",
    eyeVariant: "relaxed sleepy eyes",
    bellyGem: "none",
    rarity: "Uncommon",
    specialTraits: [],
    archetype: "Pastel Dreamer",
  }),

  chaoticMeme: buildPromptFromTraits({
    handle: "chaos",
    seed: 0,
    hairColor: "rainbow",
    hairShape: "messy vintage frizz",
    eyeVariant: "happy cheerful smile",
    bellyGem: "none",
    rarity: "Ultra Rare",
    specialTraits: [],
    archetype: "Chaos Agent",
  }),

  legendary: buildPromptFromTraits({
    handle: "legend",
    seed: 0,
    hairColor: "bright orange",
    hairShape: "slightly windblown spike",
    eyeVariant: "classic toy smile",
    bellyGem: "none",
    rarity: "Legendary",
    specialTraits: [],
    archetype: "Mystic Sage",
  }),
};
