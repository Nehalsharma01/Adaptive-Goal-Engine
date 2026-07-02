import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, userProfileTable } from "@workspace/db";
import { GetProfileResponse, UpsertProfileBody, UpsertProfileResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/profile", async (req, res): Promise<void> => {
  const [profile] = await db.select().from(userProfileTable).limit(1);
  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }
  res.json(GetProfileResponse.parse(profile));
});

router.put("/profile", async (req, res): Promise<void> => {
  const parsed = UpsertProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db.select().from(userProfileTable).limit(1);
  let profile;
  if (existing) {
    [profile] = await db
      .update(userProfileTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(userProfileTable.id, existing.id))
      .returning();
  } else {
    [profile] = await db
      .insert(userProfileTable)
      .values({ ...parsed.data, updatedAt: new Date() })
      .returning();
  }

  res.json(UpsertProfileResponse.parse(profile));
});

export default router;
