import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, dailyPromptsTable, goalsTable, userProfileTable } from "@workspace/db";
import {
  GetTodaysPromptResponse,
  ListPromptsResponse,
} from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";
import { buildCulturalSystemPrompt } from "../cultural-contexts";
import { buildKnowledgePrompt } from "../knowledge-base/index.js";

const router: IRouter = Router();

router.get("/prompts/today", async (req, res): Promise<void> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [prompt] = await db
    .select()
    .from(dailyPromptsTable)
    .orderBy(desc(dailyPromptsTable.generatedAt))
    .limit(1);

  if (prompt && new Date(prompt.generatedAt) >= today) {
    res.json(GetTodaysPromptResponse.parse(prompt));
    return;
  }

  res.status(404).json({ error: "No prompt for today" });
});

router.get("/prompts", async (req, res): Promise<void> => {
  const prompts = await db
    .select()
    .from(dailyPromptsTable)
    .orderBy(desc(dailyPromptsTable.generatedAt))
    .limit(30);

  res.json(ListPromptsResponse.parse(prompts));
});

router.post("/prompts/generate", async (req, res): Promise<void> => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const [profile] = await db.select().from(userProfileTable).limit(1);
  const goals = await db
    .select()
    .from(goalsTable)
    .orderBy(desc(goalsTable.updatedAt))
    .limit(5);

  const profileContext = profile
    ? `User: ${profile.name}
Personality traits: ${profile.personalityTraits?.join(", ") || "not specified"}
Motivation style: ${profile.motivationStyle}
Ambitions: ${profile.ambitions?.join(", ") || "not specified"}`
    : "New user — write a general inspiring prompt";

  const goalsContext =
    goals.length > 0
      ? `Active goals:\n${goals.map((g) => `- ${g.title} (${g.completionRate.toFixed(0)}% complete, streak: ${g.currentStreak} days)`).join("\n")}`
      : "No active goals yet";

  const culturalPrompt = buildCulturalSystemPrompt(profile?.culturalBackground);
  const knowledgePrompt = buildKnowledgePrompt({
    goals: goals.map(g => g.title),
    ambitions: profile?.ambitions ?? [],
    personalityTraits: profile?.personalityTraits ?? [],
    habits: profile?.habits ?? [],
    motivationStyle: profile?.motivationStyle ?? "",
    culturalBackground: profile?.culturalBackground ?? "general",
  });

  const systemPrompt = `You are a world-class motivational coach specializing in behavioral psychology and habit formation.
Write a single, powerful, personalized daily motivational prompt (3-5 sentences) for this user.
The prompt should:
- Reference their specific goals and progress
- Connect to their personality, motivation style, and cultural background
- Draw on evidence-based psychology and habit research naturally — mention specific findings when they land well
- Be inspiring without being generic or cliché
- End with a concrete action for today
- Feel like it was written specifically for them, not a template

${culturalPrompt}

${knowledgePrompt}`;

  const userPrompt = `${profileContext}

${goalsContext}

Write their daily motivational prompt for today (${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}).`;

  let fullContent = "";
  const goalIds = goals.map((g) => g.id);

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_completion_tokens: 512,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullContent += content;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  const [saved] = await db
    .insert(dailyPromptsTable)
    .values({ content: fullContent, goalIds })
    .returning();

  res.write(`data: ${JSON.stringify({ done: true, prompt: saved })}\n\n`);
  res.end();
});

export default router;
