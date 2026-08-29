import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { returnRecords } from "@/lib/returns-data";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.7-flash";

function dataset() {
  return returnRecords
    .map(
      (r) =>
        `${r.orderId} | ${r.product} | ${r.category} | ${r.severity} | "${r.comment}"`,
    )
    .join("\n");
}

async function callGateway(body: Record<string, unknown>) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured for this workspace.");

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model: MODEL, ...body }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 429) throw new Error("Rate limited — try again in a moment.");
    if (res.status === 402)
      throw new Error("AI credits exhausted. Add credits in Lovable to keep analyzing.");
    throw new Error(`AI request failed (${res.status}). ${text.slice(0, 180)}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content ?? "";
}

export interface AnalysisResult {
  headline: string;
  mood: string;
  recoverableReturns: number;
  themes: { theme: string; count: number; insight: string }[];
  actions: {
    product: string;
    issue: string;
    action: string;
    severity: "high" | "medium" | "low";
    impact: string;
    confidence: number;
  }[];
  watchouts: string[];
  generatedAt: string;
}

export const analyzeReturns = createServerFn({ method: "POST" }).handler(
  async (): Promise<AnalysisResult> => {
    const content = await callGateway({
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are Boomerang, a returns-intelligence agent for an e-commerce ops team. You read raw return comments and produce sharp, specific, non-generic operational guidance. Reply with JSON only.",
        },
        {
          role: "user",
          content: `Here are this month's returns (order | product | category | severity | comment):\n\n${dataset()}\n\nReturn JSON with this exact shape:
{
  "headline": "one punchy sentence naming the dominant root cause and the fix",
  "mood": "2-4 word read on customer sentiment, e.g. 'frustrated but forgiving'",
  "recoverableReturns": number (how many of these returns a fix would have prevented),
  "themes": [{"theme": "short label", "count": number, "insight": "one line, specific"}] (3-5 items),
  "actions": [{"product": "exact product name", "issue": "one line", "action": "concrete next step an ops team can do this week", "severity": "high|medium|low", "impact": "e.g. 'prevents ~4 returns/mo'", "confidence": number 0-100}] (4-5 items, highest priority first),
  "watchouts": ["early signal worth monitoring", ...] (2-3 items)
}`,
        },
      ],
    });

    const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(cleaned) as Omit<AnalysisResult, "generatedAt">;
    return { ...parsed, generatedAt: new Date().toISOString() };
  },
);

export const askAgent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ question: z.string().min(2).max(500) }).parse(input))
  .handler(async ({ data }) => {
    const answer = await callGateway({
      messages: [
        {
          role: "system",
          content:
            "You are Boomerang, a returns-intelligence agent. Answer only from the return data provided. Be concrete, cite order ids or products when useful, and keep it under 120 words. Plain text, no markdown headings.",
        },
        {
          role: "user",
          content: `Return data (order | product | category | severity | comment):\n\n${dataset()}\n\nQuestion: ${data.question}`,
        },
      ],
    });
    return { answer: answer.trim() };
  });
