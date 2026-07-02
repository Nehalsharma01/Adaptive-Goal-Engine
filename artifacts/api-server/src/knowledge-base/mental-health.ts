// Knowledge synthesised from mental health survey datasets
// (WHO Mental Health Survey, India NMHS 2015-16, NIMHANS data, PHQ-9 validation studies,
//  GAD-7 research, burnout studies, positive psychology interventions research)

export const mentalHealthKnowledge = {
  domain: "mental-health",
  description: "Mental health awareness knowledge for goal coaching — recognising indicators and suggesting evidence-based coping",

  disclaimer: "This knowledge is for supportive coaching context only. Always recommend professional help for clinical mental health concerns.",

  prevalenceData: {
    global: "1 in 8 people live with a mental health disorder (WHO 2022)",
    india: {
      prevalence: "150 million Indians need mental health care; only 10-12% receive it (NIMHANS National Mental Health Survey 2015-16)",
      topConditions: ["Depression", "Anxiety disorders", "Substance use disorders", "Schizophrenia spectrum"],
      treatmentGap: "~83% treatment gap — large majority of those who need help don't receive it",
      stigma: "Mental health stigma remains a significant barrier in Indian society; framing mental health as 'brain health' or 'stress management' often reduces resistance",
      stressors: ["Academic pressure (especially competitive exams)", "Career uncertainty", "Family expectations", "Financial stress", "Marital/relationship issues", "Social comparison via social media"],
    },
  },

  stressAndGoals: {
    cortisol: "Chronic stress elevates cortisol, impairing prefrontal cortex function — the part of the brain responsible for planning, decision-making, and goal pursuit",
    insight: "Mental health is not separate from goal achievement — it IS goal infrastructure. Coaching ignoring mental health fails.",
    stressGoalCycle: "High stress → poor sleep → impaired executive function → goal abandonment → guilt/shame → more stress. Breaking this cycle is often more valuable than the goal itself.",
    protectiveFactors: [
      "Social connection (strong predictor of resilience)",
      "Physical exercise (proven antidepressant effect, equivalent to medication in mild-moderate depression)",
      "Purpose and meaning (Self-determination theory: autonomy, competence, relatedness)",
      "Adequate sleep (7-9 hours; chronic sleep restriction impairs goal pursuit significantly)",
      "Mindfulness practice (8-week MBSR: 43% reduction in anxiety scores)",
    ],
  },

  recognitionSignals: {
    burnoutIndicators: [
      "Emotional exhaustion — feeling drained after tasks that used to energise",
      "Depersonalisation — going through motions without genuine engagement",
      "Reduced sense of personal accomplishment",
      "Physical symptoms: headaches, sleep disruption, frequent illness",
    ],
    anxietyPatterns: [
      "Excessive worry about performance and outcomes",
      "Procrastination driven by fear of failure (not laziness)",
      "Avoidance of challenging tasks despite genuine desire to do them",
      "Perfectionism that prevents starting",
    ],
    coachingResponse: "When users show these signals: acknowledge the difficulty first, suggest one small step (not 10), recommend professional support, and reduce goal pressure temporarily.",
  },

  evidenceBasedStrategies: {
    immediateRegulation: [
      "4-7-8 breathing: inhale 4 counts, hold 7, exhale 8 — activates parasympathetic nervous system within 90 seconds",
      "5-4-3-2-1 grounding: 5 things you see, 4 hear, 3 can touch, 2 smell, 1 taste — interrupts anxiety spiral",
      "Physical movement for 10 minutes: proven acute mood elevator (endorphins + BDNF release)",
      "Writing about stress for 20 minutes (expressive writing) — reduces subjective stress and improves cognitive function",
    ],
    longerTermStrategies: [
      "Mindfulness-Based Stress Reduction (MBSR): 8 weeks, 43% anxiety reduction, 38% depression reduction",
      "Cognitive Behavioural Therapy (CBT): gold standard for anxiety and depression, 60-80% effectiveness",
      "Regular exercise: equivalent to antidepressants for mild-moderate depression (Blumenthal et al.)",
      "Social support cultivation: quality of relationships predicts mental health more than quantity",
      "Sleep hygiene: consistent sleep/wake schedule is among the most impactful interventions for mood regulation",
    ],
    indianContext: [
      "Yoga: globally researched; Yoga Nidra and pranayama proven for stress reduction in Indian populations",
      "Ayurveda: ashwagandha has evidence for cortisol reduction (KSM-66 extract studies)",
      "Community and spirituality: faith and community participation strongly predict resilience in Indian cultural research",
      "Family support: in Indian context, family is often the first line of support — while sometimes a stressor, also a genuine protective factor",
    ],
  },

  goalCoachingIntegration: {
    principle: "Mental health awareness should be embedded in every goal plan, not treated as a separate concern",
    practices: [
      "Include rest and recovery milestones in every goal plan",
      "Explicitly name expected difficult periods (exam season stress, project crunch periods)",
      "Build 'minimum viable habit' versions for bad mental health days",
      "Regular check-ins should include 'how are you feeling' not just 'what did you accomplish'",
      "Celebrate progress — positive reinforcement has proven antidepressant effects",
      "Permission to slow down without quitting — the goal can wait, burnout recovery cannot",
    ],
  },
};
