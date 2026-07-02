import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, goalsTable, milestonesTable, userProfileTable } from "@workspace/db";
import {
  ListGoalsResponse,
  CreateGoalBody,
  CreateGoalResponse,
  GetGoalParams,
  GetGoalResponse,
  UpdateGoalParams,
  UpdateGoalBody,
  UpdateGoalResponse,
  DeleteGoalParams,
  GetGoalsDashboardResponse,
} from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.get("/goals/dashboard", async (req, res): Promise<void> => {
  const goals = await db.select().from(goalsTable);
  const milestones = await db.select().from(milestonesTable);

  const totalGoals = goals.length;
  const activeGoals = goals.filter((g) => g.status === "active").length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const overallCompletionRate =
    totalGoals > 0
      ? goals.reduce((sum, g) => sum + g.completionRate, 0) / totalGoals
      : 0;
  const longestStreak =
    goals.length > 0 ? Math.max(...goals.map((g) => g.currentStreak)) : 0;
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(
    (m) => m.status === "completed"
  ).length;

  const recentMilestones = milestones
    .filter((m) => m.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    )
    .slice(0, 5)
    .map((m) => ({
      type: "milestone_completed",
      description: `Completed milestone: ${m.title}`,
      timestamp: m.completedAt!,
    }));

  const recentGoals = goals
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3)
    .map((g) => ({
      type: "goal_created",
      description: `Created goal: ${g.title}`,
      timestamp: g.createdAt,
    }));

  const recentActivity = [...recentMilestones, ...recentGoals]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 8);

  res.json(
    GetGoalsDashboardResponse.parse({
      totalGoals,
      activeGoals,
      completedGoals,
      overallCompletionRate,
      longestStreak,
      totalMilestones,
      completedMilestones,
      recentActivity,
    })
  );
});

router.get("/goals", async (req, res): Promise<void> => {
  const goals = await db
    .select()
    .from(goalsTable)
    .orderBy(desc(goalsTable.createdAt));
  res.json(ListGoalsResponse.parse(goals));
});

router.post("/goals", async (req, res): Promise<void> => {
  const parsed = CreateGoalBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [goal] = await db
    .insert(goalsTable)
    .values({ ...parsed.data, difficulty: parsed.data.difficulty ?? "medium" })
    .returning();

  res.status(201).json(CreateGoalResponse.parse(goal));
});

router.get("/goals/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetGoalParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [goal] = await db
    .select()
    .from(goalsTable)
    .where(eq(goalsTable.id, params.data.id));

  if (!goal) {
    res.status(404).json({ error: "Goal not found" });
    return;
  }

  const milestones = await db
    .select()
    .from(milestonesTable)
    .where(eq(milestonesTable.goalId, params.data.id))
    .orderBy(milestonesTable.order);

  res.json(GetGoalResponse.parse({ ...goal, milestones }));
});

router.patch("/goals/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateGoalParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateGoalBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [goal] = await db
    .update(goalsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(goalsTable.id, params.data.id))
    .returning();

  if (!goal) {
    res.status(404).json({ error: "Goal not found" });
    return;
  }

  res.json(UpdateGoalResponse.parse(goal));
});

router.delete("/goals/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteGoalParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [goal] = await db
    .delete(goalsTable)
    .where(eq(goalsTable.id, params.data.id))
    .returning();

  if (!goal) {
    res.status(404).json({ error: "Goal not found" });
    return;
  }

  res.sendStatus(204);
});

router.post("/goals/:id/decompose", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const goalId = parseInt(raw, 10);

  const [goal] = await db
    .select()
    .from(goalsTable)
    .where(eq(goalsTable.id, goalId));

  if (!goal) {
    res.status(404).json({ error: "Goal not found" });
    return;
  }

  const [profile] = await db.select().from(userProfileTable).limit(1);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const systemPrompt = `You are an expert behavioral coach and goal decomposition specialist.
Your task is to break down a user's goal into 5-8 progressive milestones that build on each other.
Each milestone should be concrete, actionable, and appropriately challenging.
Milestones should escalate in difficulty to maintain long-term engagement.

${profile ? `User profile: ${profile.name}
Personality traits: ${profile.personalityTraits?.join(", ") || "not specified"}
Habits: ${profile.habits?.join(", ") || "not specified"}
Ambitions: ${profile.ambitions?.join(", ") || "not specified"}
Motivation style: ${profile.motivationStyle}` : ""}

Respond ONLY with a JSON array of milestones in this exact format:
[
  {
    "title": "Milestone title",
    "description": "Specific actionable description",
    "order": 1,
    "difficulty": "easy|medium|hard"
  },
  ...
]`;

  const userPrompt = `Goal: ${goal.title}
${goal.description ? `Description: ${goal.description}` : ""}
Category: ${goal.category}
Difficulty: ${goal.difficulty}

Break this goal into 5-8 progressive milestones.`;

  let fullResponse = "";

  res.write(`data: ${JSON.stringify({ content: "Analyzing your goal and creating personalized milestones..." })}\n\n`);

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_completion_tokens: 2048,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullResponse += content;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  try {
    const jsonMatch = fullResponse.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const milestonesData = JSON.parse(jsonMatch[0]) as Array<{
        title: string;
        description: string;
        order: number;
        difficulty: string;
      }>;

      await db.delete(milestonesTable).where(eq(milestonesTable.goalId, goalId));

      const inserted = await db
        .insert(milestonesTable)
        .values(
          milestonesData.map((m, i) => ({
            goalId,
            title: m.title,
            description: m.description,
            order: i + 1,
            difficulty: m.difficulty || "medium",
            status: "pending",
          }))
        )
        .returning();

      res.write(`data: ${JSON.stringify({ done: true, milestones: inserted })}\n\n`);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to parse milestones");
    res.write(`data: ${JSON.stringify({ done: true, milestones: [] })}\n\n`);
  }

  res.end();
});

export default router;
