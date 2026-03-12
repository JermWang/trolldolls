// ============================================================
// TROLL DOLL IMAGE PROMPT ARCHITECTURE
// Master prompt + trait-based append system
// ============================================================

import { TrollTraits } from "./traits";

// ── Master Style Prompt (locked constants) ──────────────────

const MASTER_PROMPT = `Create a centered portrait of a classic vintage troll doll inspired by the iconic 1990s collectible troll toy aesthetic.

The troll should have the classic toy appearance:
vinyl body, smooth plastic texture, big rounded ears, and extremely tall fuzzy troll hair standing straight upward.

Hair should be vibrant and fluffy like nylon toy fibers and be the tallest element in the image.

Visual style:
nostalgic toy catalog photography, clean studio lighting, extremely detailed fuzzy hair texture.

Composition:
• perfectly centered troll
• square format
• large head and hair filling most of the frame
• collectible toy figure realism
• crisp high resolution
• playful and nostalgic mood

Output:
square profile picture, clean, colorful, and instantly recognizable as a classic troll doll.`;

// ── Negative Prompt (universal exclusions) ──────────────────

export const NEGATIVE_PROMPT = `realistic human body proportions, DreamWorks trolls, anime style, text, watermark, logo, low resolution, blur, deformed face, extra limbs`;

// ── Trait-to-Prompt Fragments ───────────────────────────────

function hairFragment(traits: TrollTraits): string {
  return `Hair color: ${traits.hairColor}. Hair style: ${traits.hairStyle}.`;
}

function faceFragment(traits: TrollTraits): string {
  return `Eyes/expression: ${traits.eyeStyle}. Mouth: ${traits.mouth}.`;
}

function hatFragment(traits: TrollTraits): string {
  if (traits.hat === "none") return "";
  return `Hat/headwear: ${traits.hat}. IMPORTANT: The hair must interact realistically with the hat — hair should be compressed, tucked, or spilling out from under the hat naturally. Do NOT show hair clipping through or ignoring the hat. The hat sits on top of the head and the hair conforms around it.`;
}

function costumeFragment(traits: TrollTraits): string {
  if (traits.costume === "none (classic nude troll)") return "";
  return `Costume/outfit: ${traits.costume}.`;
}

function accessoryFragment(traits: TrollTraits): string {
  if (traits.accessory === "none") return "";
  return `Accessory: ${traits.accessory}.`;
}

function gemFragment(traits: TrollTraits): string {
  if (traits.bellyGem === "none") return "";
  return `Belly gem: small ${traits.bellyGem} embedded in the troll's belly.`;
}

function skinFragment(traits: TrollTraits): string {
  return `Skin/body: ${traits.skinTone}.`;
}

function backgroundFragment(traits: TrollTraits): string {
  return `Background: ${traits.background}.`;
}

function effectFragment(traits: TrollTraits): string {
  if (traits.specialEffect === "none") return "";
  return `Special effect: ${traits.specialEffect}.`;
}

function memeFragment(traits: TrollTraits): string {
  if (traits.memeTrait === "none") return "";
  return `Meme trait: ${traits.memeTrait}.`;
}

function specialTraitsFragment(traits: TrollTraits): string {
  if (traits.specialTraits.length === 0) return "";
  return `Additional features: ${traits.specialTraits.join(", ")}.`;
}

function vibeFragment(traits: TrollTraits): string {
  return `Overall vibe: ${traits.vibe}.`;
}

// ── Build Full Prompt ───────────────────────────────────────

export function buildPromptFromTraits(traits: TrollTraits): string {
  const fragments = [
    MASTER_PROMPT,
    hairFragment(traits),
    faceFragment(traits),
    hatFragment(traits),
    costumeFragment(traits),
    accessoryFragment(traits),
    gemFragment(traits),
    skinFragment(traits),
    backgroundFragment(traits),
    effectFragment(traits),
    memeFragment(traits),
    specialTraitsFragment(traits),
    vibeFragment(traits),
  ].filter(Boolean);
  return fragments.join("\n\n");
}
