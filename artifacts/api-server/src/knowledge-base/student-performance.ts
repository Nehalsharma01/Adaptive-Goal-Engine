// Knowledge synthesised from student performance datasets
// (PISA international student data, IIT/JEE preparation studies, John Hattie's Visible Learning meta-analysis,
//  Dunlosky learning strategies research, Indian education performance studies, NEET/UPSC topper strategies)

export const studentPerformanceKnowledge = {
  domain: "student-performance",
  description: "Evidence-based learning strategies and academic performance insights",

  hattieMeta: {
    description: "John Hattie's Visible Learning — meta-analysis of 800+ studies, 250 million students",
    topStrategiesByEffectSize: [
      { strategy: "Formative evaluation / feedback loops", effectSize: 0.9, description: "Regular testing and feedback is the most effective learning strategy" },
      { strategy: "Spaced practice (distributed practice)", effectSize: 0.71, description: "Spreading learning over time dramatically outperforms massed practice (cramming)" },
      { strategy: "Elaborative interrogation (asking 'why' and 'how')", effectSize: 0.64, description: "Deep processing beats passive reading" },
      { strategy: "Interleaved practice", effectSize: 0.59, description: "Mixing subjects/topics beats blocked practice" },
      { strategy: "Practice testing (self-testing)", effectSize: 0.54, description: "Testing yourself is more effective than re-reading by a factor of 2-3x" },
    ],
    ineffectiveStrategies: [
      { strategy: "Re-reading", effectSize: 0.2, description: "Very low effect despite being the most common study habit" },
      { strategy: "Highlighting / underlining", effectSize: 0.16, description: "Nearly no effect — creates illusion of learning" },
      { strategy: "Summarising", effectSize: 0.32, description: "Modest effect only when done in your own words" },
    ],
  },

  indianExamStrategies: {
    JEE: {
      successPattern: "Conceptual understanding over rote memorisation. Physics concepts applied across contexts. NCERT mastery first, then reference books.",
      studyHours: "Toppers average 6-8 hours of focused study daily, not 12-16 hours of unfocused sitting",
      keyResources: "NCERT (mandatory foundation) → HC Verma (Physics) → Arihant / DC Pandey for practice",
      timelineFor2YearPrep: [
        "Year 1 Class 11: Build conceptual foundation, don't skip. NCERT first for all subjects.",
        "Year 1: Practice 5-10 problems per topic per day. Quality over quantity.",
        "Year 2 Class 12: Integrate knowledge. Mock tests monthly from October.",
        "Year 2 Jan-March: Weekly full-length mock tests. Identify weak areas systematically.",
        "Final Month: Revision, not new learning. Sleep 8 hours. Health is performance.",
      ],
      commonMistakes: [
        "Starting with reference books before NCERT mastery",
        "Solving many problems without understanding mistakes",
        "Ignoring weak subjects until too late",
        "Studying 12+ hours without breaks (diminishing returns after 6-8 focused hours)",
        "Neglecting mental health and physical health",
      ],
    },
    NEET: {
      successPattern: "Biology: NCERT mastery is 80% of the exam. Chemistry: NCERT + previous year questions. Physics: conceptual understanding.",
      studyHours: "5-7 hours daily systematic study beats marathon sessions",
      keyInsight: "NEET rewards thorough NCERT knowledge more than any other exam. Multiple read-throughs of NCERT are not wasted time.",
    },
    UPSC: {
      successPattern: "The most multi-disciplinary exam in India. Breadth of general awareness + depth in optional + essay and interview skills.",
      studyHours: "Successful candidates average 8-10 hours daily during serious preparation. Quality matters.",
      timelineInsights: [
        "Foundation phase (6-12 months): NCERT readings across all subjects, basic polity, history, geography",
        "Main preparation (12-18 months): Selective deep-dives, current affairs integration, optional subject mastery",
        "Test series phase (6 months before exam): Regular mock tests, answer writing practice",
        "Never skip current affairs — The Hindu and PIB are standard",
        "Answer writing is a distinct skill from knowledge — practice it explicitly",
      ],
      mentalHealthNote: "UPSC preparation is a marathon measured in years. Mental health maintenance is not optional — it is strategy. Aspirants who ignore this burn out before succeeding.",
    },
    CAExam: {
      successPattern: "CA is a triple hurdle: Foundation → Intermediate → Final. Each requires different preparation approach.",
      keyInsight: "Practice problems are more important than theory reading for CA exams. Accounts, law, and taxation require repeated problem-solving.",
      clearanceRates: "CA Final pass rate: 10-20% per attempt. Persistence and systematic revision are more important than raw intelligence.",
    },
  },

  learningOptimisation: {
    spacedRepetitionSchedule: {
      description: "Optimal review intervals for long-term retention (Ebbinghaus forgetting curve + modern research)",
      schedule: [
        "Review within 24 hours of learning (critical — prevents 60% of forgetting)",
        "Review again at 3 days",
        "Review again at 1 week",
        "Review again at 2 weeks",
        "Review again at 1 month",
        "Thereafter: monthly or as needed",
      ],
      tools: "Anki (free, proven) uses spaced repetition algorithm automatically. Highly recommended for fact-heavy subjects (UPSC, medicine, law).",
    },
    deepWork: {
      researcher: "Cal Newport",
      principle: "Cognitively demanding study requires uninterrupted blocks of 60-90 minutes. Constant interruptions make deep understanding impossible.",
      implementation: [
        "Phone in another room or airplane mode during study blocks",
        "25-minute Pomodoro blocks for routine tasks; 90-minute blocks for deep conceptual work",
        "Single task only — multitasking reduces effective IQ by 10+ points during performance",
        "Best cognitive performance: typically 9am-12pm for most people. Protect this time.",
      ],
    },
    testingEffect: {
      research: "Roediger & Butler 2011: Retrieval practice (testing yourself) produces 50-80% better long-term retention than restudying the same material",
      implementation: [
        "After reading a chapter: close the book, write down everything you remember",
        "Flashcards (physical or Anki) for factual knowledge",
        "Practice exams under real conditions (timed, no notes)",
        "Explain concepts out loud without reference material (Feynman technique)",
      ],
    },
  },

  studentWellbeing: {
    insight: "Academic performance and mental health are inseparable. Burnout is the number one reason intelligent students underperform.",
    protectiveFactors: [
      "Regular physical exercise — even 30 minutes daily improves focus and memory",
      "Adequate sleep — sleep deprivation impairs the very cognitive functions exams test",
      "Social connection — isolation during exam prep is counterproductive to resilience",
      "Progress tracking — seeing measurable progress maintains motivation through long preparation periods",
      "Regular breaks — Pomodoro principle and weekly rest days prevent diminishing returns",
    ],
    warningSignsOfBurnout: [
      "Studying many hours but retaining nothing",
      "Loss of interest in the subject/career you're preparing for",
      "Chronic fatigue despite adequate sleep",
      "Emotional numbing or irritability",
    ],
  },
};
