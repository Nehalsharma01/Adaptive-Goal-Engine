import { personalityKnowledge } from "./personality.js";
import { careerKnowledge } from "./career.js";
import { habitsKnowledge } from "./habits.js";
import { goalSettingKnowledge } from "./goal-setting.js";
import { mentalHealthKnowledge } from "./mental-health.js";
import { wellbeingKnowledge } from "./wellbeing.js";
import { lifestyleKnowledge } from "./lifestyle.js";
import { studentPerformanceKnowledge } from "./student-performance.js";
import { workLifeBalanceKnowledge } from "./work-life-balance.js";

export interface KnowledgeContext {
  personality?: string;
  career?: string;
  habits?: string;
  goalSetting?: string;
  mentalHealth?: string;
  wellbeing?: string;
  lifestyle?: string;
  studentPerformance?: string;
  workLifeBalance?: string;
}

interface UserProfileContext {
  goals?: string[];
  ambitions?: string[];
  personalityTraits?: string[];
  habits?: string[];
  motivationStyle?: string;
  culturalBackground?: string;
}

function detectDomains(profile: UserProfileContext, goalTitle?: string): Set<string> {
  const domains = new Set<string>();
  const searchText = [
    ...(profile.goals ?? []),
    ...(profile.ambitions ?? []),
    ...(profile.personalityTraits ?? []),
    ...(profile.habits ?? []),
    profile.motivationStyle ?? "",
    goalTitle ?? "",
  ].join(" ").toLowerCase();

  // Always include these foundational domains
  domains.add("habits");
  domains.add("goalSetting");
  domains.add("wellbeing");

  // Career/job signals
  if (/\b(job|career|work|salary|promotion|company|startup|business|entrepreneur|coding|software|developer|engineer|manager|ias|upsc|iit|jee|neet|mba|iim|ca |chartered)\b/.test(searchText)) {
    domains.add("career");
  }

  // Student/learning/exam signals
  if (/\b(study|exam|test|learn|course|degree|college|university|school|marks|grade|jee|neet|upsc|coaching|tuition|student|competitive)\b/.test(searchText)) {
    domains.add("studentPerformance");
  }

  // Mental health signals
  if (/\b(stress|anxiety|depress|burnout|overwhelm|mental|therapy|counsell|emotion|sad|worry|panic|sleep problem|insomnia)\b/.test(searchText)) {
    domains.add("mentalHealth");
  }

  // Lifestyle/health signals
  if (/\b(fitness|weight|gym|diet|sleep|health|exercise|workout|run|walk|yoga|nutrition|eat|food|body)\b/.test(searchText)) {
    domains.add("lifestyle");
  }

  // Work-life balance signals
  if (/\b(balance|overwork|overtime|burnout|vacation|leave|break|rest|free time|family time|weekend)\b/.test(searchText)) {
    domains.add("workLifeBalance");
  }

  // Personality signals
  if (profile.personalityTraits && profile.personalityTraits.length > 0) {
    domains.add("personality");
  }

  return domains;
}

function buildPersonalitySection(traits: string[]): string {
  const lower = traits.map(t => t.toLowerCase()).join(" ");
  const sections: string[] = [];

  if (/organiz|disciplin|plan|systematic|conscienti/.test(lower)) {
    sections.push(`- Conscientiousness research: ${personalityKnowledge.traits.conscientiousness.researchInsights[0]}`);
    sections.push(`- Coaching approach: ${personalityKnowledge.traits.conscientiousness.coachingTips[0]}`);
  }
  if (/creativ|curious|open|innovat|artistic/.test(lower)) {
    sections.push(`- Openness research: ${personalityKnowledge.traits.openness.researchInsights[0]}`);
    sections.push(`- Coaching approach: ${personalityKnowledge.traits.openness.coachingTips[0]}`);
  }
  if (/social|outgoing|extrovert|people|energetic/.test(lower)) {
    sections.push(`- Extraversion insight: ${personalityKnowledge.traits.extraversion.coachingTips[0]}`);
  }
  if (/introvert|quiet|reflect|solo|independent/.test(lower)) {
    sections.push(`- Introversion insight: ${personalityKnowledge.traits.extraversion.coachingTips[1]}`);
  }
  if (/anxious|worry|stress|sensitive|emotional/.test(lower)) {
    sections.push(`- Neuroticism coaching: ${personalityKnowledge.traits.neuroticism.coachingTips[0]}`);
    sections.push(`- Key rule: ${personalityKnowledge.traits.neuroticism.coachingTips[1]}`);
  }
  if (/help|empathy|agreeable|kind|cooper/.test(lower)) {
    sections.push(`- Agreeableness insight: ${personalityKnowledge.traits.agreeableness.coachingTips[0]}`);
  }

  return sections.length > 0
    ? `PERSONALITY SCIENCE:\n${sections.join("\n")}`
    : "";
}

function buildCareerSection(ambitions: string[], goals: string[]): string {
  const all = [...ambitions, ...goals];
  const insights = careerKnowledge.goalToCareerInsights(all);
  if (!insights.length) return "";
  return `CAREER RESEARCH:\n${insights.map(i => `- ${i}`).join("\n")}`;
}

function buildHabitsSection(): string {
  const top3 = habitsKnowledge.coreFindings.keystrategiesRankedByEvidence.slice(0, 3);
  return `HABIT FORMATION SCIENCE:
- Habits take 18-254 days to form (avg 66 days), NOT 21 days — plan accordingly
- ${top3[0].strategy}: ${top3[0].effectSize}
- ${top3[1].strategy}: ${top3[1].effectSize}
- ${top3[2].strategy}: ${top3[2].effectSize}
- Key rule: Never miss twice. Missing once is an accident; missing twice starts a bad habit.
- Tiny Habits (BJ Fogg): design the habit so small it can be done on your worst day`;
}

function buildGoalSettingSection(): string {
  return `GOAL SETTING RESEARCH:
- Specific + hard goals lead to higher performance 90% of the time (Locke & Latham, 35yrs, 40k participants)
- Writing goals + sharing + weekly reports = 33% more achievement (Matthews 2015)
- Optimal milestone count for a 90-day goal: 5-8 milestones
- Top goal killers: vagueness, too many goals at once, no feedback loop, all-or-nothing thinking
- Implementation intentions ("I will do X at Y time in Z place") have r=0.54 effect — always specify when/where
- ${goalSettingKnowledge.optimalGoalStructure.milestoneCount}`;
}

function buildMentalHealthSection(): string {
  return `MENTAL HEALTH AWARENESS:
- 1 in 8 people globally experience a mental health condition (WHO 2022)
- Stress impairs prefrontal cortex — the planning/goal-pursuit centre of the brain
- Coaching must acknowledge emotional difficulty, not just optimise execution
- Evidence-based immediate strategies: 4-7-8 breathing, physical movement (10 min), expressive writing
- Build "minimum viable habit" versions for bad mental health days into every goal plan
- Always recommend professional support for clinical concerns`;
}

function buildWellbeingSection(): string {
  return `WELLBEING SCIENCE (PERMA Model - Seligman):
- P: Positive emotions — gratitude journaling +25% positive affect in 10 weeks
- E: Engagement (Flow) — challenge should match skill; this zone creates intrinsic motivation
- R: Relationships — Harvard 80yr study: quality of relationships is the #1 predictor of health/happiness
- M: Meaning — goals connected to a larger 'why' are sustained 3x longer
- A: Achievement — celebrating milestones activates the same neural reward circuits as big accomplishments
- Key insight: acquiring things provides fleeting happiness; activities (exercise, skills, relationships) provide sustained wellbeing`;
}

function buildLifestyleSection(): string {
  return `LIFESTYLE SCIENCE:
- Sleep: under 7 hours/night = same cognitive impairment as being drunk (Walker research). Sleep is the highest-leverage performance behaviour.
- Exercise: 30 minutes increases focus for 2-3 hours; equivalent to antidepressants for mild-moderate depression
- Spaced repetition + active recall are the top learning strategies (50-80% better retention than re-reading)
- Hydration: 1-2% dehydration measurably impairs concentration and memory`;
}

function buildStudentSection(goals: string[], ambitions: string[]): string {
  const all = [...goals, ...ambitions].join(" ").toLowerCase();
  const sections = [
    `LEARNING SCIENCE (Hattie Meta-Analysis, 800+ studies):`,
    `- Testing yourself (practice testing): 50-80% better retention than re-reading — the single most effective study strategy`,
    `- Spaced practice (spread over time): far outperforms cramming. Review at 24hr, 3 days, 1 week, 1 month.`,
    `- Highlighting/underlining: nearly zero effect despite being the most common study habit — stop doing it`,
    `- Deep work: 90-minute uninterrupted blocks for complex conceptual study; phone in another room`,
  ];

  if (/jee|iit/.test(all)) {
    sections.push(`JEE INSIGHT: Toppers average 6-8 hours of FOCUSED study, not 12-16 hours. NCERT mastery first, then reference books. Quality over quantity.`);
  }
  if (/neet|mbbs|medicine/.test(all)) {
    sections.push(`NEET INSIGHT: Biology NCERT mastery = 80% of the exam. Multiple thorough reads of NCERT beat jumping to reference books.`);
  }
  if (/upsc|ias|civil service/.test(all)) {
    sections.push(`UPSC INSIGHT: Answer writing is a distinct skill from knowledge — must be practiced explicitly. The Hindu daily is non-negotiable for current affairs.`);
  }

  return sections.join("\n");
}

function buildWorkLifeSection(): string {
  return `WORK-LIFE BALANCE RESEARCH:
- Stanford study: productivity drops to near-zero after 55 hours/week. Working more doesn't produce more.
- 4-day work week trials (61 companies, 2022): productivity +8%, burnout -71%
- Psychological detachment (mentally disconnecting from work evenings) is the strongest predictor of next-day performance
- Shutdown ritual: write tomorrow's top 3 tasks, then close laptop — signals brain that work is done
- WHO 2019: burnout is an occupational phenomenon, not a personal weakness`;
}

export function buildKnowledgePrompt(profile: UserProfileContext, goalTitle?: string): string {
  const domains = detectDomains(profile, goalTitle);
  const sections: string[] = [];

  sections.push("=== RESEARCH-BACKED COACHING KNOWLEDGE BASE ===");
  sections.push("Use the following evidence from personality research, learning science, habit formation studies, and wellbeing research to inform your coaching. Cite specific findings when they are directly relevant. Weave insights naturally — don't list them robotically.\n");

  if (domains.has("personality") && profile.personalityTraits?.length) {
    const s = buildPersonalitySection(profile.personalityTraits);
    if (s) sections.push(s);
  }

  if (domains.has("career")) {
    sections.push(buildCareerSection(profile.ambitions ?? [], profile.goals ?? []));
  }

  if (domains.has("habits")) {
    sections.push(buildHabitsSection());
  }

  if (domains.has("goalSetting")) {
    sections.push(buildGoalSettingSection());
  }

  if (domains.has("mentalHealth")) {
    sections.push(buildMentalHealthSection());
  }

  if (domains.has("wellbeing")) {
    sections.push(buildWellbeingSection());
  }

  if (domains.has("lifestyle")) {
    sections.push(buildLifestyleSection());
  }

  if (domains.has("studentPerformance")) {
    sections.push(buildStudentSection(profile.goals ?? [], profile.ambitions ?? []));
  }

  if (domains.has("workLifeBalance")) {
    sections.push(buildWorkLifeSection());
  }

  sections.push("=== END KNOWLEDGE BASE ===");

  return sections.filter(s => s.trim()).join("\n\n");
}
