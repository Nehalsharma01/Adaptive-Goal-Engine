import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, conversations, messages, userProfileTable, goalsTable } from "@workspace/db";
import {
  ListOpenaiConversationsResponse,
  CreateOpenaiConversationBody,
  CreateOpenaiConversationResponse,
  GetOpenaiConversationParams,
  GetOpenaiConversationResponse,
  DeleteOpenaiConversationParams,
  ListOpenaiMessagesParams,
  ListOpenaiMessagesResponse,
  SendOpenaiMessageParams,
  SendOpenaiMessageBody,
} from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";
import { buildCulturalSystemPrompt, getCulturalContext } from "../cultural-contexts";
import { buildKnowledgePrompt } from "../knowledge-base/index.js";

const router: IRouter = Router();

router.get("/openai/conversations", async (req, res): Promise<void> => {
  const convs = await db.select().from(conversations).orderBy(conversations.createdAt);
  res.json(ListOpenaiConversationsResponse.parse(convs));
});

router.post("/openai/conversations", async (req, res): Promise<void> => {
  const parsed = CreateOpenaiConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [conv] = await db.insert(conversations).values({ title: parsed.data.title }).returning();
  res.status(201).json(CreateOpenaiConversationResponse.parse(conv));
});

router.get("/openai/conversations/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetOpenaiConversationParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [conv] = await db.select().from(conversations).where(eq(conversations.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, params.data.id))
    .orderBy(asc(messages.createdAt));

  res.json(GetOpenaiConversationResponse.parse({ ...conv, messages: msgs }));
});

router.delete("/openai/conversations/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteOpenaiConversationParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [conv] = await db.delete(conversations).where(eq(conversations.id, params.data.id)).returning();
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  res.sendStatus(204);
});

router.get("/openai/conversations/:id/messages", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = ListOpenaiMessagesParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, params.data.id))
    .orderBy(asc(messages.createdAt));

  res.json(ListOpenaiMessagesResponse.parse(msgs));
});

router.post("/openai/conversations/:id/messages", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = SendOpenaiMessageParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = SendOpenaiMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [conv] = await db.select().from(conversations).where(eq(conversations.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  // Save user message
  await db.insert(messages).values({
    conversationId: params.data.id,
    role: "user",
    content: parsed.data.content,
  });

  // Get conversation history
  const history = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, params.data.id))
    .orderBy(asc(messages.createdAt));

  // Get user profile and goals for personalized onboarding
  const [profile] = await db.select().from(userProfileTable).limit(1);
  const goals = await db.select().from(goalsTable).limit(10);

  const culturalCtx = getCulturalContext(profile?.culturalBackground);
  const culturalSystemPrompt = buildCulturalSystemPrompt(profile?.culturalBackground);
  const knowledgePrompt = buildKnowledgePrompt({
    goals: goals.map(g => g.title),
    ambitions: profile?.ambitions ?? [],
    personalityTraits: profile?.personalityTraits ?? [],
    habits: profile?.habits ?? [],
    motivationStyle: profile?.motivationStyle ?? "",
    culturalBackground: profile?.culturalBackground ?? "general",
  });

  const ONBOARDING_SYSTEM = `You are AdaptGoal AI, an intelligent personal coach conducting an onboarding conversation.
Your goal is to deeply understand the user through natural conversation — their personality, current habits, ambitions, and what motivates them.

${culturalSystemPrompt}

You have access to a research-backed knowledge base covering personality science, habit formation, goal-setting research, career data, mental health, and wellbeing. Use these insights naturally in your questions and reflections — not as a lecture, but as a knowledgeable friend who happens to know the research.

${knowledgePrompt}

Ask thoughtful, culturally-aware questions about:
1. Who they are and what drives them (reference relevant cultural context naturally)
2. Their current habits (good and ones they want to change)
3. Their biggest ambitions and dreams (acknowledge culturally common goals when relevant)
4. What has held them back in the past (family pressure, time, resources — validate these)
5. How they prefer to be motivated (gentle encouragement vs. direct challenge)

After gathering enough context (typically 5-8 exchanges), conclude with a culturally warm sign-off, then respond with a JSON block in this format (wrapped in <profile> tags):
<profile>
{
  "name": "their name",
  "personalityTraits": ["trait1", "trait2", "trait3"],
  "habits": ["habit1", "habit2"],
  "ambitions": ["ambition1", "ambition2"],
  "motivationStyle": "encouraging|challenging|balanced",
  "culturalBackground": "${profile?.culturalBackground || "general"}"
}
</profile>

Keep your questions conversational and empathetic. One question at a time. Be warm and curious.
Your coaching style should be: ${culturalCtx.coachingStyle}
${profile ? `Note: User already has a profile. This may be an update conversation. Current profile: ${JSON.stringify(profile)}` : ""}
${goals.length > 0 ? `User has ${goals.length} existing goals.` : ""}`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const chatMessages = [
    { role: "system" as const, content: ONBOARDING_SYSTEM },
    ...history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  let fullResponse = "";

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_completion_tokens: 1024,
    messages: chatMessages,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullResponse += content;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  // Save assistant message
  await db.insert(messages).values({
    conversationId: params.data.id,
    role: "assistant",
    content: fullResponse,
  });

  // Check if the response contains a profile extraction
  const profileMatch = fullResponse.match(/<profile>([\s\S]*?)<\/profile>/);
  if (profileMatch) {
    try {
      const profileData = JSON.parse(profileMatch[1]);
      const [existing] = await db.select().from(userProfileTable).limit(1);
      if (existing) {
        await db.update(userProfileTable).set({
          ...profileData,
          onboardingComplete: true,
          updatedAt: new Date(),
        }).where(eq(userProfileTable.id, existing.id));
      } else {
        await db.insert(userProfileTable).values({
          ...profileData,
          onboardingComplete: true,
          updatedAt: new Date(),
        });
      }
      res.write(`data: ${JSON.stringify({ done: true, profileExtracted: true })}\n\n`);
    } catch {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    }
  } else {
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  }

  res.end();
});

export default router;
