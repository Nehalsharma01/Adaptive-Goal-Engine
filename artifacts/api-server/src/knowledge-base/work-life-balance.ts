// Knowledge synthesised from work-life balance research datasets
// (Gallup State of the Global Workplace, WHO burnout classification studies,
//  Stanford working hours research, Microsoft Work Trend Index, SHRM studies,
//  Indian IT sector burnout research, 4-day work week trials)

export const workLifeBalanceKnowledge = {
  domain: "work-life-balance",
  description: "Work-life balance research — what the data shows about sustainable productivity and burnout prevention",

  burnoutResearch: {
    whoClassification: "WHO 2019: Burnout is an occupational phenomenon characterised by exhaustion, cynicism, and reduced professional efficacy",
    prevalence: {
      global: "67% of workers report feeling burned out at least sometimes (Gallup 2022)",
      india: "59% of Indian workers report extreme stress at work (Deloitte India 2022). IT sector: 80%+ report some burnout symptoms.",
      cost: "Burnout costs $322 billion annually in turnover and lost productivity (Gallup)",
    },
    maslachModel: {
      dimensions: [
        "Emotional Exhaustion: feeling depleted of emotional resources",
        "Depersonalisation / Cynicism: detachment from work and colleagues",
        "Reduced Personal Accomplishment: feeling ineffective despite effort",
      ],
      earlyWarnings: [
        "Sunday night dread that gets earlier in the week",
        "Difficulty concentrating on tasks that used to be easy",
        "Increased irritability and emotional reactivity",
        "Physical symptoms: headaches, frequent illness, sleep disruption",
        "Loss of satisfaction from work that previously felt meaningful",
      ],
    },
  },

  workHoursResearch: {
    standfordStudy: {
      finding: "John Pencavel, Stanford: productivity per hour drops sharply after 50 hours/week, and falls to near-zero after 55 hours",
      implication: "Someone working 70 hours/week produces no more than someone working 55 hours/week — they just take longer to do it and damage their health in the process",
    },
    microsoftFourDayWeek: {
      trial: "Microsoft Japan 2019: 4-day work week pilot",
      result: "Productivity increased by 40%. Meeting time reduced. Electricity usage fell 23%.",
    },
    globalTrials: {
      description: "2022 global 4-day work week trials (61 companies, 2900 employees)",
      results: "92% of companies continued 4-day week after trial. Revenue increased 8% on average. Burnout decreased 71%.",
    },
    deepWork: "Cal Newport research: knowledge workers average only 3-4 hours of truly focused cognitive work per day — rest is shallow work, meetings, or distraction. Optimising quality beats increasing quantity.",
  },

  boundaryResearch: {
    psychologicalDetachment: {
      definition: "Mentally disengaging from work during non-work time",
      research: "Sonnentag & Fritz 2015: Psychological detachment during evenings is the strongest predictor of next-day energy and work performance",
      practicalGuidance: [
        "Hard stop time — no work emails/messages after 7pm as a starting point",
        "Shutdown ritual: write tomorrow's top 3 tasks, then close laptop. Ritual signals to brain 'we're done'",
        "Avoid work topics in personal conversations during evenings",
        "Physical boundary: designated work space, even if just a corner of a room",
      ],
    },
    recoveryActivities: {
      mostEffective: ["Exercise (physical recovery + mental detachment)", "Social activities (if restorative for the person's personality type)", "Nature exposure", "Creative hobbies", "Sleep"],
      leastEffective: ["Passive entertainment with work worry in background", "Social media scrolling", "Work-adjacent reading during downtime"],
    },
  },

  indianWorkplaceContext: {
    culturalChallenges: [
      "Long work hours culture, especially in IT sector — social norm to be the last to leave",
      "Hustle culture glorification — 'I work 80 hours a week' as status signal",
      "Manager visibility (perceived, not actual productivity) drives presenteeism",
      "High social expectations to sacrifice personal life for career advancement",
      "Limited boundary-setting culture — saying 'no' to additional work is culturally difficult",
    ],
    structuralContext: [
      "Indian IT sector: average 9-12 hour workdays are common; project deadlines drive extreme weeks",
      "Increasing startup culture bringing global work norms but also global burnout patterns",
      "Work-from-home post-COVID blurred boundaries significantly for Indian knowledge workers",
      "Mental health conversation is growing — Gen Z workers in India are more likely to set limits than previous generations",
    ],
    practicalStrategies: [
      "Communicate availability windows explicitly (respectable in most Indian corporate environments when done professionally)",
      "Use out-of-office for focus blocks — effective even in high-pressure environments",
      "Build recovery practices into commute time (many Indians have 1-2 hour commutes — audio, podcasts, mindfulness)",
      "Festival seasons are natural recovery periods — use them intentionally, not guiltily",
      "Family time is a productivity asset, not a tax on career success",
    ],
  },

  sustainableProductivityFramework: {
    principle: "Peak performance is sustainable only when paired with deliberate recovery. Elite athletes structure rest as carefully as training. Knowledge workers should do the same.",
    practices: [
      { practice: "Weekly review and planning session (1 hour Sunday)", benefit: "Reduces Monday anxiety, ensures alignment of effort with priorities" },
      { practice: "Daily shutdown ritual", benefit: "Psychological detachment enables recovery; next-day performance improves" },
      { practice: "Single most important task (MIT) daily", benefit: "Ensures meaningful progress even on chaotic days" },
      { practice: "Energy management over time management", benefit: "Schedule cognitively demanding work during peak energy hours" },
      { practice: "Quarterly review of career goals vs. daily activities", benefit: "Prevents 'busy but not progressing' trap" },
    ],
    goalIntegration: "Work-life balance is itself a goal — not the absence of ambition. Ambitious people who maintain balance outperform driven-but-burned-out individuals in 3-5 year timeframes.",
  },
};
