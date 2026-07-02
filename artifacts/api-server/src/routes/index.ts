import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profileRouter from "./profile";
import goalsRouter from "./goals";
import milestonesRouter from "./milestones";
import promptsRouter from "./prompts";
import openaiRouter from "./openai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(profileRouter);
router.use(goalsRouter);
router.use(milestonesRouter);
router.use(promptsRouter);
router.use(openaiRouter);

export default router;
