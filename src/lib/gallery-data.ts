// ============================================================
// MOCK GALLERY DATA
// Pre-generated troll entries for the gallery strip
// ============================================================

import { generateTraitRecipe, TrollTraits } from "./traits";

const SAMPLE_HANDLES = [
  "elonmusk",
  "vitalik",
  "punk6529",
  "cobie",
  "inversebrah",
  "loomdart",
  "blknoiz06",
  "rewkang",
  "deaborah",
  "himgajria",
  "notthreadguy",
  "CryptoCobain",
  "GiganticRebirth",
  "daborahanux",
  "moonoverlord",
  "based16z",
];

export const GALLERY_TROLLS: TrollTraits[] = SAMPLE_HANDLES.map((h) =>
  generateTraitRecipe(h)
);

// Color map for rendering placeholder troll avatars
export const HAIR_COLOR_HEX: Record<string, string> = {
  "neon pink": "#FF1493",
  "bubblegum pink": "#FF69B4",
  "fire red": "#FF2D2D",
  "orange blast": "#FF6B35",
  "electric blue": "#007BFF",
  "royal blue": "#4169E1",
  "lemon yellow": "#FFF44F",
  "lime green": "#32CD32",
  "lavender": "#B57EDC",
  "pastel pink": "#FFB6C1",
  "frost white": "#F0F8FF",
  "silver mist": "#C0C0C0",
  "rainbow blend": "#FF6B9D",
  "duo-tone chaos": "#FF00FF",
  "galaxy fade": "#6B3FA0",
  "black with neon tips": "#333333",
  "coral sunset": "#FF7F50",
  "mint green": "#98FB98",
  "deep violet": "#6A0DAD",
  "golden honey": "#DAA520",
};

export function getHairColorHex(color: string): string {
  return HAIR_COLOR_HEX[color] || "#FF69B4";
}

// Loading messages for generation animation
export const LOADING_MESSAGES = [
  "Brushing hair...",
  "Teasing fluff...",
  "Picking gem...",
  "Charging nostalgia...",
  "Setting troll energy...",
  "Polishing vinyl...",
  "Spiking the 'do...",
  "Finding your vibe...",
  "Calibrating chaos...",
  "Summoning the 90s...",
];
