// Knowledge synthesised from Big Five / OCEAN personality research datasets
// (openpsychometrics.org, IPIP-NEO studies, MBTI correlation research)

export const personalityKnowledge = {
  domain: "personality",
  description: "Big Five personality trait research — correlations with goal achievement, career success, and habit formation",

  traits: {
    openness: {
      name: "Openness to Experience",
      highScoreProfile: "Creative, curious, artistic, intellectually engaged",
      lowScoreProfile: "Conventional, practical, prefers routine, concrete thinking",
      goalAffinities: ["learning new skills", "creative projects", "exploring ideas", "artistic pursuits", "travel"],
      careerAffinities: ["design", "research", "arts", "entrepreneurship", "writing", "innovation"],
      habitFormationStyle: "Thrives with variety; gets bored by rigid routines. Benefits from habit stacking with novelty (rotating workout types, varied reading topics).",
      coachingTips: [
        "Frame goals as explorations, not obligations",
        "Allow experimentation within structure — give permission to iterate",
        "Boredom is a real threat; build in novelty every 2-3 weeks",
        "Connect goals to curiosity: 'What will you discover?' not 'What will you achieve?'",
      ],
      researchInsights: [
        "High openness correlates with creative problem-solving (r=0.43, McCrae & Costa 1997)",
        "Open individuals are 40% more likely to pursue self-directed learning goals",
        "Openness predicts long-term career satisfaction more than salary in knowledge workers",
      ],
    },
    conscientiousness: {
      name: "Conscientiousness",
      highScoreProfile: "Organized, disciplined, reliable, goal-oriented, detail-oriented",
      lowScoreProfile: "Flexible, spontaneous, less structured, responds to the moment",
      goalAffinities: ["systematic skill building", "financial planning", "fitness milestones", "certification prep"],
      careerAffinities: ["management", "medicine", "law", "engineering", "finance", "project management"],
      habitFormationStyle: "The single strongest personality predictor of habit adherence. High-C individuals build habits through checklists, tracking, and schedules. Low-C individuals benefit from accountability partners and shorter commitment periods.",
      coachingTips: [
        "High conscientiousness: give clear milestones and timelines — they will execute",
        "Low conscientiousness: break goals into micro-commitments, 5-minute versions",
        "Track streaks visually — particularly motivating for high-C individuals",
        "Low-C: reduce friction to the point where there is no decision required",
      ],
      researchInsights: [
        "Conscientiousness is the #1 Big Five predictor of academic and job performance (meta-analysis, Barrick & Mount 1991, r=0.31)",
        "High conscientiousness individuals are 60% more likely to maintain exercise habits beyond 6 months",
        "Conscientiousness grows with age; people become more conscientious through their 20s and 30s",
        "Even low-C individuals succeed with environmental design (removing friction, visual cues)",
      ],
    },
    extraversion: {
      name: "Extraversion",
      highScoreProfile: "Sociable, energised by others, assertive, talkative, positive affect",
      lowScoreProfile: "Introspective, energised by solitude, reflective, reserved",
      goalAffinities: ["social goals", "leadership", "sales", "team sports", "networking", "public speaking"],
      careerAffinities: ["sales", "management", "teaching", "marketing", "event management", "politics"],
      habitFormationStyle: "Extroverts benefit from social accountability, group challenges, public commitment. Introverts sustain habits better through private tracking and solo consistency windows.",
      coachingTips: [
        "Extroverts: suggest accountability partners, group challenges, public goals",
        "Introverts: suggest journaling, solo morning routines, private tracking",
        "Extroverts often overcommit socially; protect focus blocks explicitly",
        "Introverts need recovery time built into ambitious schedules",
      ],
      researchInsights: [
        "Extroverts report higher average positive affect daily (Watson & Clark 1997)",
        "Introvert-designed routines (deep work blocks) lead to 35% higher creative output",
        "Social accountability increases habit completion by 65% — disproportionately for extroverts",
      ],
    },
    agreeableness: {
      name: "Agreeableness",
      highScoreProfile: "Cooperative, empathetic, trusting, helpful, conflict-avoidant",
      lowScoreProfile: "Competitive, skeptical, less concerned with social harmony, direct",
      goalAffinities: ["helping others", "community service", "team collaboration", "family goals", "caregiving"],
      careerAffinities: ["nursing", "social work", "counselling", "HR", "teaching", "NGO work"],
      habitFormationStyle: "High-A individuals struggle to say no, leading to goal abandonment when others' needs conflict. Need explicit permission to prioritise themselves. Low-A individuals set firm boundaries naturally.",
      coachingTips: [
        "High agreeableness: permission to prioritise self is essential coaching work",
        "Frame self-care goals as enabling them to help others MORE",
        "High-A: watch for overcommitment to others' goals at expense of their own",
        "Low-A: harness competitive drive — leaderboards, comparisons, beating a benchmark",
      ],
      researchInsights: [
        "High-agreeableness individuals earn 6-7% less on average (salary negotiation avoidance)",
        "Agreeable individuals are more likely to abandon personal goals when family/friends need help",
        "Agreeableness predicts relationship satisfaction and collaborative work quality strongly",
      ],
    },
    neuroticism: {
      name: "Neuroticism / Emotional Stability",
      highScoreProfile: "Emotionally reactive, experiences stress/anxiety/worry intensely, sensitive",
      lowScoreProfile: "Emotionally stable, calm under pressure, resilient, less reactive",
      goalAffinities: ["stress management", "mindfulness", "therapy/coaching", "mental health goals"],
      careerAffinities: ["creative fields", "writing", "arts", "research (where sensitivity is an asset)"],
      habitFormationStyle: "High neuroticism disrupts habits during stressful periods. Critical to build 'minimum viable habit' versions for bad days. Low neuroticism individuals maintain habits through adversity more easily.",
      coachingTips: [
        "High neuroticism: explicitly design 'bad day' versions of every habit",
        "Reframe setbacks as data, not failures — catastrophising is the enemy",
        "Build stress-management milestones into every goal plan",
        "Low neuroticism: stability is an asset; use calm periods to build challenging habits",
        "Never 'miss twice' rule is especially important for high-N individuals",
      ],
      researchInsights: [
        "High neuroticism is the strongest predictor of habit relapse after stressful life events",
        "Mindfulness practices reduce neuroticism scores by 0.3-0.5 SDs over 8 weeks (MBSR studies)",
        "Emotional stability (low N) predicts leadership effectiveness and academic persistence",
        "High-N individuals benefit MORE from coaching — baseline improvement is larger",
      ],
    },
  },

  mbtiCorrelations: {
    note: "MBTI maps roughly onto Big Five dimensions",
    mapping: {
      "INTJ": { bigFive: "High O, High C, Low E, Low A, Low N", strengthGoals: ["strategic planning", "mastery in a domain", "systems building"] },
      "ENFP": { bigFive: "High O, Low C, High E, High A, Moderate N", strengthGoals: ["creative projects", "people-focused missions", "variety-driven learning"] },
      "ISTJ": { bigFive: "Low O, High C, Low E, Moderate A, Low N", strengthGoals: ["routine mastery", "financial discipline", "systematic skill building"] },
      "INFJ": { bigFive: "High O, High C, Low E, High A, Moderate N", strengthGoals: ["meaningful work", "personal growth", "helping others at scale"] },
    },
  },

  goalPersonalityMatrix: [
    { goal: "Lose weight / get fit", bestTraitCombination: "High C (executes plan) + Low N (resilient through plateaus)", risk: "Low C → needs ultra-simple habit design; High N → needs setback scripting" },
    { goal: "Pass competitive exam", bestTraitCombination: "High C + Moderate O (structured but can adapt)", risk: "High N → needs anxiety management built in" },
    { goal: "Start a business", bestTraitCombination: "High O + Moderate C + Low-Moderate A (can push back on bad feedback)", risk: "High A → may struggle with self-promotion and saying no to bad clients" },
    { goal: "Improve mental health", bestTraitCombination: "Openness to therapy + willingness to examine patterns", risk: "High N → heightened need, but also most responsive to intervention" },
    { goal: "Build financial savings", bestTraitCombination: "High C + Low N (avoids panic-spending)", risk: "Low C → automate everything, remove willpower requirement" },
  ],
};
