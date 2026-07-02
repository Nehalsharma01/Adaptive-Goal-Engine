import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, milestonesTable, goalsTable } from "@workspace/db";
import {
  UpdateMilestoneParams,
  UpdateMilestoneBody,
  UpdateMilestoneResponse,
  ListMilestonesParams,
  ListMilestonesResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.patch("/milestones/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateMilestoneParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateMilestoneBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updates: Record<string, unknown> = { ...parsed.data };

  if (parsed.data.status === "completed") {
    updates.completedAt = new Date();
  } else if (parsed.data.status === "pending") {
    updates.completedAt = null;
  }

  const [milestone] = await db
    .update(milestonesTable)
    .set(updates)
    .where(eq(milestonesTable.id, params.data.id))
    .returning();

  if (!milestone) {
    res.status(404).json({ error: "Milestone not found" });
    return;
  }

  // Recalculate goal completion rate
  const allMilestones = await db
    .select()
    .from(milestonesTable)
    .where(eq(milestonesTable.goalId, milestone.goalId));

  const total = allMilestones.length;
  const completed = allMilestones.filter((m) => m.status === "completed").length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  await db
    .update(goalsTable)
    .set({
      completionRate,
      completedDays: completed,
      totalDays: total,
      updatedAt: new Date(),
    })
    .where(eq(goalsTable.id, milestone.goalId));

  res.json(UpdateMilestoneResponse.parse(milestone));
});

router.get("/goals/:id/milestones", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = ListMilestonesParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const milestones = await db
    .select()
    .from(milestonesTable)
    .where(eq(milestonesTable.goalId, params.data.id))
    .orderBy(milestonesTable.order);

  res.json(ListMilestonesResponse.parse(milestones));
});

export default router;
