// Knowledge synthesised from lifestyle datasets
// (NHANES lifestyle health data, Fitbit population health studies, NFHS India,
//  Matthew Walker sleep research, exercise physiology datasets, nutrition science)

export const lifestyleKnowledge = {
  domain: "lifestyle",
  description: "Lifestyle factors and their impact on performance, goal achievement, and wellbeing",

  sleep: {
    optimalAmount: "7-9 hours for adults; teenagers need 8-10 hours",
    criticalInsights: [
      "Matthew Walker (Why We Sleep): sleeping under 6 hours/night for 10 days produces same cognitive impairment as being drunk",
      "Sleep deprivation: impairs decision-making, emotional regulation, learning, and motivation — everything goal pursuit requires",
      "Chronic sleep debt (under 7 hours) increases risk of obesity by 45%, diabetes by 36%, cardiovascular disease by 48%",
      "REM sleep consolidates emotional memories and facilitates creative problem-solving",
      "Deep sleep (stage 3/4) consolidates procedural memories — critical for skill learning",
    ],
    sleepAndGoals: "Sleep is not passive time wasted. It is active recovery that enables everything else. Prioritising sleep is not laziness — it is the highest-leverage performance behaviour.",
    practicalGuidance: [
      "Consistent sleep/wake time — even on weekends — is the single most important sleep hygiene factor",
      "No bright light (especially screens) 1 hour before bed — blue light suppresses melatonin",
      "Cool room temperature (18-20°C) improves sleep quality significantly",
      "Caffeine has a 5-6 hour half-life — afternoon coffee disrupts sleep even if you fall asleep normally",
      "Alcohol is a sedative, not a sleep aid — it suppresses REM sleep and causes fragmentation",
    ],
    indianContext: [
      "India has one of the lowest average sleep durations globally (6.5 hours average — Fitbit Sleep Study 2016)",
      "Late dinner culture (9-10pm) conflicts with optimal sleep timing — try to eat 2-3 hours before bed",
      "Afternoon nap (20-30 min) is culturally practiced in India and scientifically validated for alertness restoration",
    ],
  },

  exercise: {
    minimumEffectiveDose: "150 minutes moderate or 75 minutes vigorous exercise per week (WHO guidelines)",
    cognitionBenefits: [
      "Exercise increases BDNF (Brain-Derived Neurotrophic Factor) — literally grows new neurons",
      "30 minutes of aerobic exercise improves concentration for 2-3 hours afterward",
      "Regular exercise increases hippocampal volume (memory centre) by 2% in older adults",
      "Exercise is as effective as antidepressants for mild-moderate depression (Blumenthal et al.)",
    ],
    exerciseTypes: {
      cardio: "Best for mood, depression, anxiety, cardiovascular health, sleep quality",
      strength: "Best for metabolic health, bone density, long-term functional capacity, testosterone/hormonal balance",
      yoga: "Best for stress reduction, flexibility, mindfulness, chronic pain; strongly evidence-backed in Indian population studies",
      walking: "Underrated: 7,500+ steps/day reduces all-cause mortality by 65% vs. 2,500 steps (Basso & Suzuki 2017)",
    },
    motivationResearch: [
      "Intrinsic motivation (enjoyment of exercise) predicts 3x better long-term adherence than extrinsic (appearance goals)",
      "Exercise with others increases adherence by 65% (Strava social data)",
      "Starting with 2x/week is more effective than 5x/week for building lasting habit (lower dropout rate)",
      "Music during exercise increases endurance by 15% and perceived effort decreases (Karageorghis research)",
    ],
  },

  nutrition: {
    cognitivePerformance: [
      "Breakfast with protein and complex carbs improves cognitive performance through morning (stable blood glucose)",
      "Dehydration of just 1-2% impairs concentration and short-term memory",
      "Omega-3 fatty acids: 2-3 servings of oily fish per week improves mood and cognitive function",
      "Ultra-processed food consumption correlates with depression and anxiety (BMJ 2022 meta-analysis)",
      "Gut microbiome affects mood: fermented foods (curd/yoghurt, kimchi, kombucha) improve mood markers",
    ],
    indianNutritionContext: [
      "Dal-chawal is nutritionally excellent — complete protein combination (rice + lentils)",
      "Turmeric (curcumin): genuinely evidence-backed anti-inflammatory; standard Indian cooking is ahead of Western supplement trends",
      "Indian vegetarian diet, when varied, is nutritionally adequate — but B12 deficiency is very common and must be supplemented",
      "Ghee in moderation: not the villain it was made out to be. Contains conjugated linoleic acid and fat-soluble vitamins.",
      "Chai: 1-3 cups is fine. The antioxidants in tea have genuine benefits. Excess sugar is the concern, not the chai itself.",
    ],
  },

  screenTime: {
    research: [
      "Twenge et al. 2018: 5+ hours of screen time per day associated with significantly higher depression and loneliness in adolescents",
      "Average Indian smartphone user: 4.5 hours/day (Statista 2023)",
      "Social media scrolling activates same neural pathways as slot machines (variable reward schedules)",
      "Phone in bedroom: even face-down reduces cognitive capacity (Ward et al. 2017 — the 'brain drain' effect)",
    ],
    interventions: [
      "Greyscale mode reduces phone appeal significantly without requiring willpower",
      "Notification batching (check 3x/day at fixed times) vs. constant checking: 40% reduction in stress",
      "Phone-free first and last 30 minutes of day: consistent recommendation from both productivity research and sleep research",
      "App timers are weak interventions — environmental design (phone in another room) is much more effective",
    ],
  },
};
