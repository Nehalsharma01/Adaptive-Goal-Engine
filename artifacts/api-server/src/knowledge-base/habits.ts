// Knowledge synthesised from habit tracking datasets and habit formation research
// (BJ Fogg's Tiny Habits research, Phillippa Lally's habit formation study UCL,
//  James Clear's Atomic Habits framework, Duhigg habit loop research,
//  Fitbit/Strava behavioural datasets, Beeminder commitment device studies)

export const habitsKnowledge = {
  domain: "habits",
  description: "Habit formation science — what the data actually shows about building and sustaining habits",

  coreFindings: {
    howLongToFormAHabit: {
      popularMyth: "21 days",
      actualResearch: "18 to 254 days, average 66 days (Lally et al., 2010, University College London, n=96)",
      implication: "Anyone who tells you a habit takes 21 days is wrong. Complex habits (exercise) take much longer than simple ones (drinking water with lunch).",
      practicalGuidance: "Plan for 60-90 days before a habit feels automatic. Don't quit at day 22.",
    },

    habitLoop: {
      model: "Cue → Routine → Reward (Duhigg 2012)",
      keyInsight: "The craving (anticipation of reward) drives behaviour, not the routine itself. Change the cue or reward, and the routine changes.",
      practicalApplication: "To build a new habit: attach it to an existing cue. To break a bad habit: disrupt the cue or replace the routine while keeping the reward.",
    },

    tinyHabits: {
      researcher: "BJ Fogg, Stanford Behaviour Design Lab",
      coreInsight: "Motivation is unreliable. Ability (ease) is designable. Design habits so small they can be done on your worst day.",
      formula: "Behaviour = Motivation × Ability × Prompt. If motivation is low, ability must be extremely high.",
      examples: [
        "Floss one tooth (not all teeth) — triggers the behaviour that scales",
        "Do one pushup (not 20) — establishes the anchor",
        "Write one sentence (not 1000 words) — activates the writing identity",
      ],
      keyRule: "Never miss a day — never miss twice. Missing once is an accident. Missing twice is starting a new (bad) habit.",
    },

    streakDataInsights: [
      "Beeminder data (2M+ commitment contracts): commitment devices with financial stakes increase completion by 300%",
      "Strava data: social accountability (sharing activities publicly) increases workout completion by 65%",
      "Habit tracking apps: users who track daily are 2x more likely to sustain habits beyond 90 days",
      "The 'fresh start effect': Mondays, 1st of month, birthdays, New Year — new habit attempts spike 4x and succeed at higher rates",
      "Habit bundling (doing habits together) increases adherence by 40% vs. solo habit formation",
    ],

    environmentDesign: {
      principle: "Make the desired behaviour the path of least resistance",
      examples: [
        "Put workout clothes out the night before — reduces friction by removing a decision",
        "Put phone charger outside bedroom — removes social media cue",
        "Prepare healthy snacks at eye level in fridge — makes good choice the easy choice",
        "Install website blockers during focus hours — removes distraction cue",
      ],
      research: "Van Dam et al. 2018: Environment design interventions work even when motivation is low. They work by-passing willpower entirely.",
    },

    keystrategiesRankedByEvidence: [
      { rank: 1, strategy: "Implementation intentions ('I will do X at Y time in Z place')", effectSize: "r=0.54, massive effect (Gollwitzer 1999, 94 studies)", howToUse: "Never set a goal without specifying exactly WHEN and WHERE" },
      { rank: 2, strategy: "Habit stacking ('After I do X, I will do Y')", effectSize: "r=0.44, large effect", howToUse: "Anchor new habits to existing ones. Coffee → journal. Shower → affirmations." },
      { rank: 3, strategy: "Reducing friction (making the habit 20 seconds easier)", effectSize: "Shawn Achor: 20-second rule reduces activation energy required", howToUse: "What is the smallest possible version of this habit? Start there." },
      { rank: 4, strategy: "Social accountability", effectSize: "65-300% completion increase depending on stakes", howToUse: "Tell someone. Better: involve someone. Best: financial commitment." },
      { rank: 5, strategy: "Tracking and measurement", effectSize: "Hawthorne effect + feedback loop = 2x adherence", howToUse: "Daily checkbox. Streaks. Anything visible and immediate." },
    ],
  },

  habitsByGoalType: {
    fitness: {
      mostCommonFailurePoints: ["Missing day 1 after a gap (never miss twice)", "Setting unrealistic initial volume (too much, too soon)", "Gym being too far away", "No clear time slot"],
      evidenceBasedStrategies: ["Start with 2x/week, not 5x (adherence is 3x higher)", "Choose a gym within 3km of home or work", "Schedule workout time as a meeting", "Track body measurements monthly not weekly (scale variance is noisy)"],
      progressionPattern: "Weeks 1-4: Establish the habit. Weeks 5-8: Build consistency. Weeks 9-12: Increase intensity. Results typically visible at 8-12 weeks.",
    },
    learning: {
      mostCommonFailurePoints: ["Passive learning (watching without doing)", "No spaced repetition", "Learning without building", "Too broad focus"],
      evidenceBasedStrategies: ["Active recall > re-reading (70% better retention — Roediger & Butler 2011)", "Spaced repetition systems (Anki, etc.) — proven for language and fact-heavy domains", "Teach what you learn (Feynman technique)", "Time-box learning: 25-minute Pomodoro blocks with deliberate breaks"],
      progressionPattern: "Fundamentals → Projects → Teaching others. Competence feels like confusion early on — this is normal.",
    },
    financial: {
      mostCommonFailurePoints: ["Manual saving (rely on willpower)", "Checking accounts daily (anxiety-inducing)", "No specific target"],
      evidenceBasedStrategies: ["Automate savings on payday — remove willpower requirement entirely", "Monthly (not daily) financial review", "Specific target with deadline: '₹5L in 18 months' not 'save more'", "Sinking funds for expected irregular expenses (weddings, electronics)"],
      progressionPattern: "Emergency fund first → High-interest debt → Investment → Long-term wealth building.",
    },
  },

  milestoneStructureInsights: [
    "Research shows 4-6 week milestones are optimal — long enough to see progress, short enough to maintain urgency",
    "Milestones that include both a behaviour metric ('practice 30 min daily') AND an outcome metric ('complete chapter 5') are 40% more likely to be hit",
    "Celebration of small wins activates the same neural reward circuits as achieving large goals — don't skip it",
    "Milestone difficulty should increase by no more than 10-15% per step (progressive overload principle from sports science)",
  ],
};
