// Knowledge synthesised from goal-setting research datasets
// (Locke & Latham goal-setting theory, OKR effectiveness studies, Gail Matthews 2015 goal study,
//  Dominican University goal research, self-determination theory, implementation intentions research)

export const goalSettingKnowledge = {
  domain: "goal-setting",
  description: "Evidence-based goal setting science — what actually predicts goal achievement",

  foundationalResearch: {
    lockeLathamTheory: {
      summary: "Goal-Setting Theory (Locke & Latham 1990) — 35+ years of research across 40,000+ participants",
      coreFindings: [
        "Specific, hard goals lead to higher performance than vague or easy goals 90% of the time",
        "The more difficult the goal (within the realm of possibility), the higher the performance",
        "Feedback is essential — goals without feedback loops are significantly less effective",
        "Goal commitment is the moderator: high commitment + hard goal = highest performance",
      ],
      practicalImplication: "'Get fit' is a bad goal. 'Run 5km in under 30 minutes by March 31' is a good goal.",
    },

    matthewsStudy2015: {
      institution: "Dominican University of California",
      participants: 267,
      keyFinding: "People who wrote down their goals + shared them with a friend + sent weekly progress reports achieved 33% more than those who only thought about their goals",
      hierarchy: [
        "Think about goal: 43% achievement rate",
        "Write goal down: 61% achievement rate",
        "Write + accountability: 76% achievement rate",
      ],
    },

    smartGoalResearch: {
      framework: "SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
      effectiveness: "SMART goals increase goal achievement by 25-30% vs. non-specific goals",
      limitation: "SMART goals are better for execution than for discovery. For novel challenges, more flexible goal structures work better.",
      enhancement: "SMART + Why (purpose alignment) + If-Then planning = optimal goal structure",
    },

    selfDeterminationTheory: {
      researchers: "Deci & Ryan",
      insight: "Intrinsic motivation (pursuing a goal because it's personally meaningful) leads to much greater persistence and wellbeing than extrinsic motivation (pursuing a goal for external rewards)",
      practicalImplication: "The 'why' behind a goal matters as much as the goal itself. Goals aligned with personal values are maintained 3x longer.",
      autonomy: "Goals feel most motivating when the person had genuine choice in setting them (even if the goal was suggested by others)",
    },
  },

  goalTypeInsights: {
    learningGoals: {
      definition: "Goals focused on developing competence ('I want to learn to code')",
      bestFor: "Novel, complex challenges; situations where the path isn't clear",
      research: "Learning goals outperform performance goals on complex tasks (Seijts & Latham 2005)",
      milestoneTip: "Frame milestones as skills to develop, not metrics to hit",
    },
    performanceGoals: {
      definition: "Goals focused on outcomes ('I want to earn ₹15 LPA')",
      bestFor: "Well-defined tasks where the skill already exists",
      research: "Performance goals drive higher output when the task is clear and skills are sufficient",
      milestoneTip: "Frame milestones as measurable outcomes with deadlines",
    },
    habitGoals: {
      definition: "Process-based goals ('I will exercise every weekday at 7am')",
      bestFor: "Long-term behaviour change, when consistency matters more than performance",
      research: "Process goals lead to higher intrinsic motivation and lower anxiety than outcome goals (Harackiewicz et al. 2000)",
      milestoneTip: "Measure consistency (days hit), not performance (weight lifted)",
    },
  },

  whatKillsGoals: [
    { factor: "Vagueness", frequency: "Most common reason goals fail", fix: "Specify the exact outcome, measurement, and deadline" },
    { factor: "Too many goals at once", frequency: "67% of people set 5+ goals simultaneously", fix: "Research suggests focusing on 1-3 goals maximizes achievement. More goals = less achievement per goal." },
    { factor: "No feedback loop", frequency: "Absent in 80% of abandoned goals", fix: "Weekly check-in at minimum. Daily for habit-type goals." },
    { factor: "No plan for obstacles", frequency: "People plan for success, not failure", fix: "If-then planning: 'If X happens, I will do Y.' Pre-mortems: imagine failure and work backwards." },
    { factor: "All-or-nothing thinking", frequency: "One missed day = quitting", fix: "The 'never miss twice' rule. Progress, not perfection." },
    { factor: "Motivation-dependent execution", frequency: "Waiting to 'feel like it'", fix: "Motivation follows action more often than it precedes it. Start with the smallest possible action." },
    { factor: "Goal-reality gap too large", frequency: "Overly ambitious first goals", fix: "Set a goal that is challenging but achievable in 90 days. Extend after success." },
  ],

  optimalGoalStructure: {
    timeframe: {
      shortTerm: "2-4 weeks (habit formation anchor)",
      mediumTerm: "90 days (proven optimal for meaningful progress without burnout)",
      longTerm: "1-3 years (direction-setting, not execution-planning)",
      visionLevel: "5-10 years (values alignment only — don't plan at this level)",
    },
    milestoneCount: "5-8 milestones for a 90-day goal is optimal. Fewer lacks structure; more causes overwhelm.",
    difficultyProgression: "Each milestone should be 10-20% harder than the previous. Graduated difficulty maintains engagement without triggering avoidance.",
    celebrationProtocol: "Reward completion of each milestone. The reward doesn't need to be large — recognition and acknowledgment activate the same neural circuits as material rewards.",
  },

  goalCategoryInsights: {
    health: "Health goals with a specific behaviour target (minutes of exercise) outperform outcome targets (weight loss) by 30% in adherence. The behaviour creates the outcome.",
    career: "Career goals with skill-building milestones outperform salary-target goals. Skill is controllable; salary is a lagging indicator.",
    financial: "Savings goals with automated behaviour change (auto-debit on payday) are achieved 4x more often than willpower-based approaches.",
    relationships: "Relationship goals framed as behaviours ('call parents weekly') rather than outcomes ('improve relationship with parents') are more achievable.",
    learning: "Learning goals with a project component (build something with the skill) produce 3x better retention than passive learning goals.",
  },

  indianGoalContext: {
    culturalGoalPatterns: [
      "Family approval is a genuine motivational driver — not a weakness. Use it.",
      "Competitive exam goals benefit from cohort-based study groups (proven in UPSC and JEE communities)",
      "Festival deadlines (before Diwali, before new academic year) are natural commitment anchors",
      "Parental expectations, while sometimes stressful, correlate with higher goal commitment when aligned",
    ],
    commonGoalMistakes: [
      "Setting goals based on others' expectations alone (low intrinsic motivation → high dropout)",
      "Studying 16 hours/day unsustainably instead of 6-8 hours effectively (quality over quantity — proven in UPSC toppers' strategies)",
      "Treating every exam failure as a full reset instead of a diagnostic",
      "Ignoring physical and mental health in service of academic/career goals (unsustainable)",
    ],
  },
};
