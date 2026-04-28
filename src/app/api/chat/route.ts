import { NextRequest, NextResponse } from "next/server";
import { SILVERBOT_SYSTEM_PROMPT } from "@/data/silverbot-knowledge";

export const runtime = "edge";

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Cap context to last 10 messages to control cost
    const trimmed = messages.slice(-10);

    const apiKey = process.env.GROQ_API_KEY;

    // No key configured — return a helpful fallback so the UI still works
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "I'm not fully connected yet — my AI backend needs a Groq API key to be configured. " +
          "In the meantime, check out the site pages for everything about Silver Prime and the AIPC drone! " +
          "Join the waitlist at silverprime.netlify.app/#waitlist and we'll keep you posted. 🚀",
      });
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SILVERBOT_SYSTEM_PROMPT },
            ...trimmed,
          ],
          max_tokens: 350,
          temperature: 0.65,
        }),
      }
    );

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error("Groq API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const reply: string =
      data.choices?.[0]?.message?.content?.trim() ??
      "Sorry, I didn't get a response. Please try again!";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("SilverBot API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
