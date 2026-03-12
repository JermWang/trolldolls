import { NextRequest, NextResponse } from "next/server";
import { generateTraitRecipe } from "@/lib/traits";
import { buildPromptFromTraits, NEGATIVE_PROMPT } from "@/lib/prompts";

function buildReferenceUrls() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://trolldolls.vercel.app";

  const normalized = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;

  return Array.from({ length: 9 }, (_, i) => `${normalized}/trolls/troll-classic-${i + 1}.png`);
}

function buildOpenAiPrompt(basePrompt: string) {
  const refs = buildReferenceUrls();
  return `${basePrompt}

Style anchoring instruction:
Match the exact collectible-vintage look, proportions, material quality, and toy-photography realism of these OG troll references:
${refs.map((url) => `- ${url}`).join("\n")}

Do not create a modern/cartoon reinterpretation. Keep it photoreal collectible toy style.`;
}

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

    const apiKey = process.env.OPENAI_API_KEY;
    const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";

    let imageDataUrl: string | null = null;
    let imageError: string | null = null;

    if (apiKey) {
      const openAiResponse = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: imageModel,
          prompt: buildOpenAiPrompt(prompt),
          size: "1024x1024",
          quality: "high",
        }),
      });

      if (openAiResponse.ok) {
        const data = await openAiResponse.json();
        const b64 = data?.data?.[0]?.b64_json;

        if (b64) {
          imageDataUrl = `data:image/png;base64,${b64}`;
        } else {
          imageError = "Image API returned no image payload";
        }
      } else {
        const failureText = await openAiResponse.text();
        imageError = `OpenAI image generation failed (${openAiResponse.status}): ${failureText.slice(0, 240)}`;
      }
    } else {
      imageError = "OPENAI_API_KEY is not configured";
    }

    return NextResponse.json({
      traits,
      prompt,
      negativePrompt: NEGATIVE_PROMPT,
      imageDataUrl,
      imageError,
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
