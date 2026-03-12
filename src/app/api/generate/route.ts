import { NextRequest, NextResponse } from "next/server";
import { generateTraitRecipe } from "@/lib/traits";
import { buildPromptFromTraits, NEGATIVE_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";

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

async function fetchReferenceImages(referenceUrls: string[], maxReferences = 4) {
  const selectedUrls = referenceUrls.slice(0, maxReferences);

  const fetched = await Promise.all(
    selectedUrls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) return null;
      const blob = await res.blob();
      return { url, blob };
    })
  );

  return fetched.filter((item): item is { url: string; blob: Blob } => item !== null);
}

async function generateWithReferenceEdits({
  apiKey,
  model,
  prompt,
  referenceUrls,
  size,
  quality,
}: {
  apiKey: string;
  model: string;
  prompt: string;
  referenceUrls: string[];
  size: string;
  quality: string;
}) {
  const refs = await fetchReferenceImages(referenceUrls);
  if (refs.length === 0) {
    return { imageDataUrl: null, error: "No reference images could be loaded for edit conditioning" };
  }

  const form = new FormData();
  form.append("model", model);
  form.append("prompt", prompt);
  form.append("size", size);
  form.append("quality", quality);

  refs.forEach((ref, i) => {
    form.append("image[]", ref.blob, `og-troll-ref-${i + 1}.png`);
  });

  const response = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
  });

  if (!response.ok) {
    const failureText = await response.text();
    return {
      imageDataUrl: null,
      error: `OpenAI image edit failed (${response.status}): ${failureText.slice(0, 240)}`,
    };
  }

  const data = await response.json();
  const b64 = data?.data?.[0]?.b64_json;

  if (!b64) {
    return { imageDataUrl: null, error: "Image edit API returned no image payload" };
  }

  return { imageDataUrl: `data:image/png;base64,${b64}`, error: null };
}

async function generateWithPromptOnly({
  apiKey,
  model,
  prompt,
  size,
  quality,
}: {
  apiKey: string;
  model: string;
  prompt: string;
  size: string;
  quality: string;
}) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      quality,
    }),
  });

  if (!response.ok) {
    const failureText = await response.text();
    return {
      imageDataUrl: null,
      error: `OpenAI image generation failed (${response.status}): ${failureText.slice(0, 240)}`,
    };
  }

  const data = await response.json();
  const b64 = data?.data?.[0]?.b64_json;

  if (!b64) {
    return { imageDataUrl: null, error: "Image API returned no image payload" };
  }

  return { imageDataUrl: `data:image/png;base64,${b64}`, error: null };
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
    const imageSize = process.env.OPENAI_IMAGE_SIZE || "1024x1024";
    const imageQuality = process.env.OPENAI_IMAGE_QUALITY || "medium";

    let imageDataUrl: string | null = null;
    let imageError: string | null = null;

    if (apiKey) {
      const styledPrompt = buildOpenAiPrompt(prompt);
      const referenceUrls = buildReferenceUrls();

      const editResult = await generateWithReferenceEdits({
        apiKey,
        model: imageModel,
        prompt: styledPrompt,
        referenceUrls,
        size: imageSize,
        quality: imageQuality,
      });

      if (editResult.imageDataUrl) {
        imageDataUrl = editResult.imageDataUrl;
      } else {
        const fallbackResult = await generateWithPromptOnly({
          apiKey,
          model: imageModel,
          prompt: styledPrompt,
          size: imageSize,
          quality: imageQuality,
        });

        imageDataUrl = fallbackResult.imageDataUrl;
        imageError = fallbackResult.error
          ? `${editResult.error || "Reference edit path failed"}; ${fallbackResult.error}`
          : `Reference edit path unavailable; used prompt-only generation.`;
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
