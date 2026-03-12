# trolldolls — Find Your Inner Troll

A premium memecoin landing page and deterministic PFP generator inspired by the classic 1990s troll doll aesthetic. Built as a tribute to the original toy era — not affiliated with any legacy brand.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Overview

**Core Mechanic:** User enters a Twitter/X @handle → deterministic seed → trait recipe → style-locked SVG troll avatar with rarity, archetype, and collectible traits.

Same handle always produces the same troll. The system is deterministic, not random.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge, class-variance-authority |

---

## Architecture

```
src/
├── app/
│   ├── globals.css          # Design system (colors, animations, utilities)
│   ├── layout.tsx           # Root layout with metadata + OG tags
│   ├── page.tsx             # Main landing page composition
│   └── api/
│       └── generate/
│           └── route.ts     # POST /api/generate — trait + prompt generation
├── components/
│   ├── Navbar.tsx           # Glassmorphism fixed nav with gradient CTA
│   ├── HeroGenerator.tsx    # Centerpiece: input → loading → result flow
│   ├── TrollCard.tsx        # SVG troll avatar renderer with rarity glow
│   ├── TraitChips.tsx       # Trait display pills with rarity coloring
│   ├── GalleryStrip.tsx     # Auto-scrolling dual-row gallery of pre-generated trolls
│   ├── HowItWorks.tsx       # 4-step explainer + controlled variables grid
│   ├── AboutSection.tsx     # Tribute/lore copy with legal disclaimer
│   ├── TokenCTA.tsx         # $TROLL commemorative token community CTA
│   └── Footer.tsx           # Links, social, disclaimer
└── lib/
    ├── utils.ts             # cn() helper (clsx + tailwind-merge)
    ├── traits.ts            # Deterministic seed + trait generation system
    ├── prompts.ts           # Master prompt + trait-append architecture
    └── gallery-data.ts      # Mock gallery data + hair color hex map
```

---

## Trait System

### Deterministic Seeding
`seedFromHandle(handle)` hashes the cleaned handle into a stable integer seed. A mulberry32 PRNG ensures reproducible random selections.

### Trait Categories

| Category | Pool Size | Examples |
|----------|-----------|---------|
| Hair Color | 20 | neon pink, galaxy fade, frost white, duo-tone chaos |
| Hair Shape | 10 | perfect vertical spike, wild static burst, vintage frizz |
| Eye Variant | 8 | classic bead, sparkle-eyed, mischievous, glossy big-eyed |
| Belly Gem | 12 | ruby, sapphire, diamond, moon gem, none |
| Archetype | 10 | Classic Collector, Neon Rebel, Chaos Agent, Mystic Sage |
| Special Traits | 15 | metallic vinyl, holographic sheen, rainbow aura, glitch variant |

### Rarity Distribution

| Tier | Probability | Special Traits |
|------|-------------|---------------|
| Common | 60% | 0 |
| Uncommon | 22% | 1 |
| Rare | 12% | 2 |
| Ultra Rare | 5% | 3 |
| Legendary | 1% | 4 |

### Trait JSON Structure

```json
{
  "handle": "elonmusk",
  "seed": 1234567,
  "hairColor": "fire red",
  "hairShape": "slightly messy vintage frizz",
  "eyeVariant": "tiny smirk",
  "bellyGem": "diamond",
  "rarity": "Rare",
  "specialTraits": ["glitch troll variant", "pearlescent body"],
  "archetype": "Mystic Sage"
}
```

---

## Prompt System

The image prompt architecture uses a **locked master prompt** + **trait-appended fragments**:

1. **Master Prompt** — locks silhouette, material, lighting, framing, and style
2. **Trait Fragments** — appended per-trait (hair, eyes, gem, rarity, background)
3. **Negative Prompt** — universal exclusions (horror, anime-human hybrids, clutter, etc.)

### Master Prompt Core
> "A classic vintage troll doll toy portrait inspired by original 1990s collectible troll dolls. Smooth tan vinyl body, tiny nude toy proportions, big rounded ears, simple toy smile, iconic towering fuzzy vertical hair, premium studio product photography, centered composition, clean collectible backdrop..."

### Example Prompt Templates
Built-in examples in `src/lib/prompts.ts`:
- **Standard Common** — bubblegum pink, vertical spike, bead eyes
- **Rare Collectible** — royal blue, collector spike, sparkle-eyed, sapphire
- **Pastel Dreamy** — lavender, rounded tower, sleepy eyes, moon gem
- **Chaotic Meme** — duo-tone chaos, static burst, mischievous, glitch variant
- **Legendary** — galaxy fade, chaos spike, glossy big-eyed, diamond, golden body

---

## API

### `POST /api/generate`

**Request:**
```json
{ "handle": "elonmusk" }
```

**Response:**
```json
{
  "traits": { /* TrollTraits object */ },
  "prompt": "Full image generation prompt...",
  "negativePrompt": "Exclusion guidance..."
}
```

---

## Design System

### Color Palette
- **Background:** `#FFFBF5` (warm cream)
- **Pearl:** `#F5F0EB`
- **Pink:** `#FF6B9D` / Soft: `#FFB8D4`
- **Purple:** `#9B5DE5` / Deep: `#7B2FBE`
- **Aqua:** `#00D4AA` / Cyan: `#00C9DB`
- **Lime:** `#A8E06C` / Coral: `#FF8A65`
- **Text:** `#2D2D2D` (charcoal)

### Visual Effects
- Glassmorphism navbar
- Gradient text (pink → purple)
- Card shadows with hover elevation
- Shimmer loading animation
- Float animation for generated trolls
- Auto-scrolling gallery strips (opposite directions)
- Framer Motion entrance animations throughout

---

## Page Sections

1. **Hero Generator** — headline, handle input, generate CTA, loading states, result card with download/share
2. **Gallery Strip** — dual-row auto-scrolling showcase of pre-generated trolls
3. **How It Works** — 4-step explainer + controlled variables grid
4. **Tribute/About** — sincere lore copy + legal disclaimer
5. **Token CTA** — $TROLL commemorative token, dark card, community links
6. **Footer** — nav links, X social, full legal disclaimer

---

## Features

- **Deterministic generation** — same handle = same troll, always
- **SVG-based avatars** — crisp at any resolution, no external image dependencies
- **Rarity system** — visual glow, sparkle effects, badge colors per tier
- **Share on X** — pre-composed tweet with traits and rarity
- **Download PFP** — SVG-to-PNG export at 1200x1200
- **Responsive** — mobile-first, tested at 390px and 1280px
- **Premium animations** — Framer Motion entrance, float, loading states

---

## MVP vs. Premium Roadmap

### Current (MVP)
- [x] Deterministic trait system
- [x] SVG avatar rendering
- [x] Full landing page with 6 sections
- [x] Share on X integration
- [x] Download PFP
- [x] API route for trait generation
- [x] Mobile responsive

### Next Phase
- [ ] AI image generation integration (DALL-E / Stable Diffusion with master prompt)
- [ ] Supabase storage for generated images + gallery persistence
- [ ] Real-time community gallery ("Troll Army" wall)
- [ ] Reference-conditioned generation (LoRA / IP-Adapter for perfect style lock)
- [ ] Multi-output packs (PFP, banner, sticker)
- [ ] Collectible card view for each troll
- [ ] Reroll mechanic (free first, optional paid rerolls)
- [ ] Seasonal variant packs
- [ ] Sound design (subtle UI sounds)
- [ ] "Adopt your troll" mechanic
- [ ] On-chain minting (optional, non-required)

### Image Generation Strategy

| Approach | Pros | Cons | Recommended |
|----------|------|------|-------------|
| **A: Full AI prompt** | Fast to launch, flexible | Style drift between outputs | MVP only |
| **B: Hybrid system** | Best consistency, fastest repeat gen, strongest collectible feel | More setup work | **Yes — production** |

**Recommended path:** Start with SVG placeholders (current), then upgrade to a hybrid system using base troll references + controlled trait variance via generation or compositing.

---

## Legal Positioning

This is an independent tribute project celebrating the aesthetic and cultural legacy of classic troll doll toys. It is **not affiliated with, endorsed by, or connected to** any official troll doll brand, manufacturer, or intellectual property holder. $TROLL is a commemorative memecoin — not a financial instrument.
