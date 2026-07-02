import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dailyPromptsTable = pgTable("daily_prompts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  goalIds: jsonb("goal_ids").$type<number[]>().notNull().default([]),
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
});

export const insertDailyPromptSchema = createInsertSchema(dailyPromptsTable).omit({ id: true, generatedAt: true });
export type InsertDailyPrompt = z.infer<typeof insertDailyPromptSchema>;
export type DailyPrompt = typeof dailyPromptsTable.$inferSelect;
