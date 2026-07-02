// Knowledge synthesised from wellbeing datasets
// (Gallup Wellbeing Index, PERMA model research (Seligman), positive psychology studies,
//  Oxford Happiness Questionnaire data, Blue Zones research, happiness economics research,
//  Indian wellbeing and life satisfaction studies)

export const wellbeingKnowledge = {
  domain: "wellbeing",
  description: "Positive psychology and wellbeing science — what actually makes people flourish",

  permaModel: {
    creator: "Martin Seligman, University of Pennsylvania",
    description: "PERMA — five elements of wellbeing",
    elements: {
      P_PositiveEmotions: {
        definition: "Experiencing positive feelings: joy, gratitude, serenity, interest, hope, pride, awe, amusement, love",
        research: "Barbara Fredrickson's Broaden-and-Build theory: positive emotions expand cognitive repertoire and build long-term psychological resources",
        practicalApplication: "Gratitude journaling (3 things daily) increases positive affect by 25% over 10 weeks. Brief daily positive experiences matter more than rare peak experiences.",
      },
      E_Engagement: {
        definition: "Being fully absorbed in activities — Mihaly Csikszentmihalyi's 'flow' state",
        research: "Flow occurs when challenge equals skill. Too easy = boredom. Too hard = anxiety. The sweet spot is the growth zone.",
        practicalApplication: "Design goals and tasks to sit at the edge of current capability. This creates intrinsic motivation without stress.",
      },
      R_Relationships: {
        definition: "Deep, meaningful connections with others",
        research: "Harvard Study of Adult Development (80 years, 800+ participants): quality of relationships is the single strongest predictor of health, happiness, and longevity",
        practicalApplication: "Social goals (connecting with people, maintaining friendships) deserve as much attention as career and health goals. Loneliness is as harmful to health as smoking 15 cigarettes/day (Holt-Lunstad 2015).",
      },
      M_Meaning: {
        definition: "Belonging to and serving something bigger than yourself",
        research: "Viktor Frankl: purpose and meaning enable humans to endure extraordinary suffering. Meaning predicts wellbeing above and beyond pleasure.",
        practicalApplication: "Connect every goal to a larger 'why.' 'I'm learning coding to build tools that help my community' > 'I'm learning coding for a better salary.'",
      },
      A_Achievement: {
        definition: "Pursuing accomplishment for its own sake",
        research: "Achievement motivation (McClelland): high achievers set moderately challenging goals, seek feedback, and take personal responsibility for outcomes",
        practicalApplication: "Celebrating achievement — even small wins — reinforces the achievement-seeking mindset. Milestone completion celebrations are not optional.",
      },
    },
  },

  happinessResearch: {
    setPointTheory: "Happiness has a genetic set point (~50% of variance). Life circumstances account for only ~10%. The remaining 40% is intentional activity — things people deliberately do.",
    practicalImplication: "Acquiring things (salary, grades, status) provides fleeting happiness. Activities (exercise, skill-building, meaningful work, relationships) provide sustained wellbeing.",
    hedonicAdaptation: "Humans adapt to positive life changes within 3-6 months. 'When I achieve X, I'll be happy' is a cognitive trap. Happiness practices must be ongoing.",
    topHappinessPredictors: [
      "Quality relationships (strongest predictor across cultures)",
      "Physical health and energy",
      "Autonomy and control over one's time",
      "Meaningful work and contribution",
      "Financial security (not wealth — security. Above ~$75k/year USD, additional income has diminishing happiness returns)",
      "Growth and learning",
    ],
  },

  blueZonesInsights: {
    description: "Dan Buettner's research on regions with highest longevity and life satisfaction",
    zones: ["Sardinia, Italy", "Okinawa, Japan", "Loma Linda, California", "Nicoya, Costa Rica", "Ikaria, Greece"],
    commonFactors: [
      "Strong social connections and community belonging",
      "Sense of purpose (Okinawan concept of 'ikigai' — reason to get up in the morning)",
      "Regular moderate physical activity (not intense exercise, but daily movement)",
      "Plant-based diet with moderate portions",
      "Stress reduction practices (prayer, meditation, ancestor respect, community gathering)",
      "Belonging to a faith community (correlated with 4-14 extra years of life expectancy)",
    ],
    goalCoachingApplication: "Long-term wellbeing is built on daily small practices, not dramatic transformations. The most impactful goals are often the simplest: sleep, movement, connection, purpose.",
  },

  wellbeingAndGoals: {
    insight: "Goal pursuit and wellbeing are not in tension — they're synergistic when goals are autonomously chosen and aligned with values",
    warningSign: "Wellbeing decreases when pursuing goals: (1) driven purely by external pressure, (2) that conflict with core values, (3) without rest and recovery built in",
    idealGoalCriteria: [
      "Intrinsically motivated (personally meaningful, not just externally rewarded)",
      "Growth-oriented (learning something new, not just performing)",
      "Connected to relationships (involves or benefits others)",
      "Includes recovery (rest, play, creativity are not luxuries — they fuel performance)",
      "Appropriately challenging (not too easy, not overwhelming)",
    ],
  },

  dailyPracticesWithEvidence: [
    { practice: "Gratitude journaling", duration: "5-10 min", effect: "+25% positive affect, -23% depression symptoms (Emmons & McCullough 2003)" },
    { practice: "Exercise", duration: "30 min moderate", effect: "+30% mood, proven equal to antidepressants for mild-moderate depression" },
    { practice: "Meditation / mindfulness", duration: "10-20 min", effect: "8-week MBSR: -43% anxiety, -38% depression" },
    { practice: "Acts of kindness", duration: "One act daily", effect: "+41% positive affect vs. control (Lyubomirsky 2005)" },
    { practice: "Spending time in nature", duration: "20 min", effect: "-12% cortisol, -10% activity in brain areas linked to worry (Gregory Bratman, Stanford)" },
    { practice: "Social connection", duration: "Meaningful interaction", effect: "Harvard 80-year study: the single biggest predictor of health and happiness" },
    { practice: "Flow activities", duration: "1+ hour in challenge-skill zone", effect: "High flow experiences correlate with highest reported life satisfaction scores" },
  ],
};
