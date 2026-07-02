// Knowledge synthesised from career recommendation datasets
// (O*NET occupational data, LinkedIn career transition studies, RIASEC career research,
//  US BLS occupational outlook, Indian career market studies)

export const careerKnowledge = {
  domain: "career",
  description: "Career recommendation research — personality-career fit, skill adjacencies, and transition strategies",

  riasecModel: {
    description: "Holland's RIASEC model — 6 career personality types",
    types: {
      Realistic: { description: "Hands-on, practical, likes working with tools/machines/nature", careers: ["engineering", "farming", "construction", "military", "sports", "mechanics"] },
      Investigative: { description: "Analytical, curious, problem-solver, likes research", careers: ["software engineering", "data science", "medicine", "research", "economics", "law"] },
      Artistic: { description: "Creative, expressive, original, imaginative", careers: ["design", "writing", "music", "film", "marketing", "UX", "architecture"] },
      Social: { description: "Helping, teaching, counselling, cooperative", careers: ["teaching", "social work", "HR", "nursing", "coaching", "NGO work", "customer success"] },
      Enterprising: { description: "Leading, persuading, risk-taking, ambitious", careers: ["entrepreneurship", "sales", "management", "law", "politics", "investment banking"] },
      Conventional: { description: "Organized, detail-oriented, follows procedures", careers: ["accounting", "data analysis", "administration", "compliance", "operations"] },
    },
  },

  highValueSkillPaths: {
    tech: {
      entryPoint: "Python basics → DSA → system design",
      timeToEmployable: "6-12 months with daily 2-hour practice",
      salaryRange: "India: ₹4-25 LPA (fresher to 3yr exp), USA: $80k-$150k",
      milestonePattern: ["Complete Python fundamentals (4 weeks)", "Build 3 projects (6 weeks)", "DSA practice 150 problems (8 weeks)", "System design basics (4 weeks)", "Apply and interview (ongoing)"],
      keyInsight: "Leetcode + real projects + GitHub profile is the proven formula. Projects matter more than certificates.",
    },
    dataScience: {
      entryPoint: "Statistics → Python/R → ML fundamentals",
      timeToEmployable: "9-18 months",
      salaryRange: "India: ₹5-30 LPA, USA: $90k-$160k",
      milestonePattern: ["Statistics fundamentals (6 weeks)", "Python for data analysis (4 weeks)", "ML with scikit-learn (8 weeks)", "Kaggle competitions - 3 submissions (ongoing)", "Build portfolio with real datasets"],
      keyInsight: "Kaggle experience is disproportionately valued. Even bronze medals demonstrate practical capability.",
    },
    management: {
      entryPoint: "Domain expertise → team lead → people management",
      timeToEmployable: "3-7 years experience + MBA optional",
      salaryRange: "India: ₹15-80 LPA (mid to senior), USA: $100k-$300k+",
      milestonePattern: ["Excel in individual contributor role", "Mentor junior team members", "Lead a project end-to-end", "MBA / leadership program", "People management role"],
      keyInsight: "Management is a career change, not a promotion. Technical skills become less important; EQ and communication become critical.",
    },
    entrepreneurship: {
      entryPoint: "Problem → validation → MVP → customers",
      timeToFirstRevenue: "3-24 months (high variance)",
      riskProfile: "High risk, high reward; 90% of startups fail within 5 years",
      milestonePattern: ["Identify a real problem you've experienced", "Talk to 50 potential customers", "Build minimum MVP in 4-8 weeks", "Get 10 paying customers before scaling", "Iterate on feedback loop"],
      keyInsight: "The validation phase (talking to customers) is skipped by 80% of failed startups. Customer discovery is the most important skill.",
    },
  },

  careerTransitionResearch: {
    insights: [
      "Adjacent skill transitions succeed 3x more often than complete pivots (LinkedIn Economic Graph 2022)",
      "Network referrals account for 70-80% of hires at senior levels (LinkedIn data)",
      "Average successful career transition takes 11-14 months of active effort",
      "Building in public (writing, speaking, open source) reduces transition time by 40%",
      "T-shaped skills (broad + one deep area) are most marketable in 2024-2025 job market",
    ],
    indianCareerContext: {
      topHighValuePaths: [
        "IT/Software (TCS, Infosys → product companies → FAANG)",
        "Data Science / AI (fastest growing, 40% YoY demand increase in India)",
        "Government Services (IAS, IPS, IRS — prestige and stability)",
        "Medicine (MBBS + PG = 10-15 year path, high social capital)",
        "CA / Finance (CA exam → Big 4 → CFO track)",
        "Entrepreneurship (Bangalore, Mumbai, Delhi-NCR ecosystems)",
        "Content Creation (YouTube, edtech — 10k+ earning creators in India)",
      ],
      salaryBenchmarks2024: {
        freshSoftwareEngineer: "₹3.5-8 LPA (tier-2 cities) / ₹8-25 LPA (top product companies)",
        dataScientist3yr: "₹12-35 LPA",
        IAS_Officer: "₹56,100-₹2,50,000 + significant non-monetary benefits",
        MBBS_doctor: "₹6-20 LPA (private practice scales significantly higher)",
        CAqualified: "₹7-20 LPA (Big 4) / ₹25-1Cr+ (own practice or partner)",
        entrepreneur: "Variable — 0 to unlimited",
      },
    },
  },

  goalToCareerInsights: (goalKeywords: string[]): string[] => {
    const insights: string[] = [];
    const lower = goalKeywords.map(g => g.toLowerCase()).join(" ");

    if (lower.includes("coding") || lower.includes("software") || lower.includes("tech") || lower.includes("developer")) {
      insights.push("Software engineering: DSA practice on LeetCode is non-negotiable for product companies. Aim for 200+ problems before interviews.");
      insights.push("Portfolio projects matter more than certificates. 3 well-documented GitHub projects beat 10 Udemy certificates.");
    }
    if (lower.includes("upsc") || lower.includes("ias") || lower.includes("civil service")) {
      insights.push("UPSC: Success rates are under 0.2% per attempt. Most successful candidates spend 2-3 years of full preparation. Prelims → Mains → Interview is a 12-month cycle per attempt.");
      insights.push("The UPSC syllabus requires breadth across history, polity, geography, economics, and current affairs. Comprehensive newspapers (The Hindu) + NCERTs is the proven base.");
    }
    if (lower.includes("data") || lower.includes("machine learning") || lower.includes("ai")) {
      insights.push("Data Science/ML: Real projects on Kaggle and GitHub are what get you interviews. Theory without implementation rarely leads to hiring.");
      insights.push("Python + SQL + one ML framework (scikit-learn or PyTorch) is the minimum viable stack for entry-level roles.");
    }
    if (lower.includes("business") || lower.includes("startup") || lower.includes("entrepreneur")) {
      insights.push("Entrepreneurship research: 42% of startups fail because there was no market need. Validate before building — talk to 50 potential customers first.");
      insights.push("India has the 3rd largest startup ecosystem globally. Bangalore, Mumbai, Delhi-NCR and increasingly Pune and Hyderabad are strong hubs.");
    }
    if (lower.includes("mba") || lower.includes("iim") || lower.includes("management")) {
      insights.push("IIM: CAT score 99+ percentile for top IIMs. Work experience (2-5 years) significantly strengthens applications. Average IIM-A starting salary: ₹28-35 LPA.");
    }

    return insights.length > 0 ? insights : ["Career research shows that consistent skill-building and networking are the two highest-leverage activities regardless of domain."];
  },
};
