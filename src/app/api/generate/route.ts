import { NextRequest, NextResponse } from "next/server";
import { generateTraitRecipe } from "@/lib/traits";
import { buildPromptFromTraits, NEGATIVE_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const { handle } = await req.json();

    if (!handle || typeof handle !== "string") {
      return NextResponse.json(
        { error: "A valid handle is required" },
        { status: 400 }
      );
    }

    const clean = handle.replace(/^@/, "").toLowerCase().trim();
    if (!clean || clean.length > 50) {
      return NextResponse.json(
        { error: "Invalid handle format" },
        { status: 400 }
      );
    }

    // Generate deterministic traits
    const traits = generateTraitRecipe(clean);

    // Build the image prompt
    const prompt = buildPromptFromTraits(traits);

    return NextResponse.json({
      traits,
      prompt,
      negativePrompt: NEGATIVE_PROMPT,
    });
  } catch {
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Troll Doll Generator API",
    status: "active",
    endpoints: {
      "POST /api/generate": "Generate troll traits from a handle",
    },
  });
}
