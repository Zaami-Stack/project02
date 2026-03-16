import type { PlanTier } from "@/lib/types";

type DomainId =
  | "software"
  | "business"
  | "marketing"
  | "creative"
  | "education"
  | "research"
  | "operations"
  | "data"
  | "general";

type IntentId = "build" | "optimize" | "analyze" | "strategy" | "content" | "automate" | "general";

type DomainProfile = {
  id: DomainId;
  label: string;
  role: string;
  priorities: string[];
  architectureFocus: string[];
  dataFocus: string[];
  riskControls: string[];
  deliverables: string[];
  qualityChecks: string[];
};

type DynamicModule = {
  title: string;
  focus: string[];
  outputs: string[];
};

type PromptFrame = {
  name: string;
  objectiveLabel: string;
  moduleLabel: string;
  phaseLabel: string;
  deliverableLabel: string;
};

const DOMAIN_KEYWORDS: Record<DomainId, string[]> = {
  software: [
    "app",
    "website",
    "web",
    "saas",
    "frontend",
    "backend",
    "api",
    "database",
    "mobile",
    "ios",
    "android",
    "dashboard",
    "platform",
    "nextjs",
    "react",
    "node",
    "supabase"
  ],
  business: ["business", "startup", "plan", "revenue", "profit", "pricing", "sales", "operations", "investor"],
  marketing: ["marketing", "campaign", "ads", "brand", "seo", "social", "email", "funnel", "conversion"],
  creative: ["story", "novel", "script", "character", "plot", "worldbuilding", "creative", "lyrics", "poem"],
  education: ["course", "lesson", "curriculum", "student", "teacher", "learning", "education", "training"],
  research: ["research", "hypothesis", "study", "paper", "methodology", "analysis", "evidence"],
  operations: ["process", "workflow", "sop", "operations", "logistics", "support", "service delivery"],
  data: ["data", "analytics", "dashboard", "kpi", "warehouse", "etl", "sql", "metrics", "forecast"],
  general: []
};

const DOMAIN_PROFILES: Record<DomainId, DomainProfile> = {
  software: {
    id: "software",
    label: "Software/Product Engineering",
    role: "Principal Full-Stack Architect and Product Delivery Lead",
    priorities: [
      "Define product scope, user stories, and measurable acceptance criteria.",
      "Design frontend experience with responsive flows, accessibility, and state handling.",
      "Design backend architecture with clear APIs, validation, and failure handling.",
      "Specify deployment, observability, and release-readiness requirements."
    ],
    architectureFocus: [
      "System components, boundaries, and service responsibilities.",
      "API design (endpoints, contracts, auth model, validation rules).",
      "UI flow map and component-level responsibilities."
    ],
    dataFocus: [
      "Relational schema with keys, indexes, and migration strategy.",
      "Lifecycle of core entities and data integrity constraints.",
      "Data access patterns and performance considerations."
    ],
    riskControls: [
      "Input validation, auth boundaries, and abuse prevention.",
      "Rate limiting, sensitive data handling, and audit logging.",
      "Fallback behavior for external service failures."
    ],
    deliverables: [
      "Product requirements brief",
      "Architecture specification",
      "Database schema and API contract",
      "Implementation plan and launch checklist"
    ],
    qualityChecks: [
      "All requirements are mapped to implementation tasks.",
      "Critical flows have edge-case and error-state coverage.",
      "Security and deployment steps are explicit and testable."
    ]
  },
  business: {
    id: "business",
    label: "Business Planning and Execution",
    role: "Senior Business Strategist and Operator",
    priorities: [
      "Define the market opportunity and ideal customer profile.",
      "Build positioning, pricing logic, and go-to-market motion.",
      "Translate strategy into milestones, owners, and timeline.",
      "Track execution with KPI framework and risk mitigation."
    ],
    architectureFocus: [
      "Business model and unit economics assumptions.",
      "Go-to-market workflow and channel sequencing.",
      "Decision framework for prioritization and trade-offs."
    ],
    dataFocus: [
      "Core KPIs and reporting cadence.",
      "Forecast assumptions and scenario planning.",
      "Data needed for weekly operational review."
    ],
    riskControls: [
      "Assumption risk, execution risk, and market risk controls.",
      "Contingency triggers with mitigation actions.",
      "Clear stop-loss criteria for failed experiments."
    ],
    deliverables: [
      "Business strategy document",
      "Go-to-market plan",
      "Financial and KPI model",
      "Execution roadmap"
    ],
    qualityChecks: [
      "Strategy is tied to concrete actions and owners.",
      "Financial assumptions are explicit and testable.",
      "KPIs include both leading and lagging indicators."
    ]
  },
  marketing: {
    id: "marketing",
    label: "Marketing and Growth",
    role: "Performance Marketing Lead and Growth Strategist",
    priorities: [
      "Define message-market fit and campaign objective hierarchy.",
      "Build channel strategy with budget and experimentation plan.",
      "Map creative, copy, and funnel assets by stage.",
      "Establish attribution, testing cadence, and optimization loops."
    ],
    architectureFocus: [
      "Campaign architecture by channel and audience segment.",
      "Creative matrix (message x audience x offer).",
      "Funnel stages, conversion points, and retargeting logic."
    ],
    dataFocus: [
      "Primary performance metrics and guardrail metrics.",
      "Attribution approach and reporting windows.",
      "Testing log and decision criteria."
    ],
    riskControls: [
      "Budget pacing controls and spend caps.",
      "Brand safety and compliance checks.",
      "Fallback actions for underperforming channels."
    ],
    deliverables: [
      "Campaign strategy",
      "Channel execution plan",
      "Creative/testing matrix",
      "Reporting and optimization framework"
    ],
    qualityChecks: [
      "Each channel has objective, audience, and success metric.",
      "Testing plan is statistically and operationally realistic.",
      "Decisions are tied to measurable outcomes."
    ]
  },
  creative: {
    id: "creative",
    label: "Creative Production",
    role: "Creative Director and Narrative Systems Designer",
    priorities: [
      "Define tone, style, and emotional intent before drafting.",
      "Build structure and pacing with scene/section objectives.",
      "Maintain consistency in voice, character, and world rules.",
      "Use revision loops for coherence and originality."
    ],
    architectureFocus: [
      "Narrative or concept structure with progression logic.",
      "Style guide and tone constraints.",
      "Section-level objectives and transitions."
    ],
    dataFocus: [
      "Reference matrix for themes and motifs.",
      "Character/object consistency tracker.",
      "Revision criteria for quality control."
    ],
    riskControls: [
      "Avoid contradictions and unresolved arcs.",
      "Maintain style consistency across sections.",
      "Flag low-originality or repetitive content."
    ],
    deliverables: ["Creative brief", "Structured outline", "Draft output", "Revision checklist"],
    qualityChecks: [
      "Tone and structure remain consistent end-to-end.",
      "Output aligns with intended audience and format.",
      "Final draft passes coherence and originality checks."
    ]
  },
  education: {
    id: "education",
    label: "Education and Instructional Design",
    role: "Instructional Designer and Learning Experience Architect",
    priorities: [
      "Define learner profile, baseline, and learning objectives.",
      "Sequence modules from foundations to applied outcomes.",
      "Include exercises, assessments, and feedback loops.",
      "Ensure clarity, accessibility, and measurable mastery."
    ],
    architectureFocus: [
      "Learning path structure and module dependencies.",
      "Assessment model and grading rubric.",
      "Engagement and retention mechanisms."
    ],
    dataFocus: [
      "Learning metrics and completion milestones.",
      "Assessment data collection plan.",
      "Feedback loop for continuous improvement."
    ],
    riskControls: [
      "Avoid cognitive overload and unclear objectives.",
      "Include remediation paths for struggling learners.",
      "Validate learning outcomes with assessments."
    ],
    deliverables: ["Curriculum map", "Lesson plans", "Assessment strategy", "Implementation checklist"],
    qualityChecks: [
      "Each lesson maps to a measurable objective.",
      "Assessments evaluate true mastery, not memorization.",
      "Content is practical, accessible, and progressively structured."
    ]
  },
  research: {
    id: "research",
    label: "Research and Analysis",
    role: "Research Lead and Analytical Framework Specialist",
    priorities: [
      "Define research question, hypotheses, and evaluation criteria.",
      "Select method, evidence sources, and analysis approach.",
      "Distinguish findings, interpretation, and uncertainty.",
      "Translate insights into clear recommendations."
    ],
    architectureFocus: [
      "Research design and evidence hierarchy.",
      "Methodological steps and validation process.",
      "Decision framework for interpreting results."
    ],
    dataFocus: [
      "Data collection strategy and source quality checks.",
      "Analysis framework and assumptions log.",
      "Confidence scoring and uncertainty notes."
    ],
    riskControls: [
      "Bias detection and source reliability checks.",
      "Explicit uncertainty and limitations section.",
      "Avoid unsupported conclusions."
    ],
    deliverables: ["Research brief", "Method plan", "Findings report", "Recommendation memo"],
    qualityChecks: [
      "Claims are traceable to evidence.",
      "Limitations are explicit and not hidden.",
      "Recommendations are actionable and prioritized."
    ]
  },
  operations: {
    id: "operations",
    label: "Operations and Process Design",
    role: "Operations Architect and Process Improvement Lead",
    priorities: [
      "Map current workflow and identify bottlenecks.",
      "Design future-state process with ownership and SLAs.",
      "Define tooling, handoffs, and escalation paths.",
      "Implement monitoring and continuous improvement cycles."
    ],
    architectureFocus: [
      "End-to-end workflow map and handoff logic.",
      "Operating cadence, roles, and decision rights.",
      "SOP structure and exception handling."
    ],
    dataFocus: [
      "Operational KPIs and SLA metrics.",
      "Incident/event tracking model.",
      "Weekly performance review inputs."
    ],
    riskControls: [
      "Failure-mode handling and fallback process.",
      "Ownership clarity for critical steps.",
      "Auditability and compliance checks."
    ],
    deliverables: ["Process blueprint", "SOP pack", "KPI dashboard spec", "Rollout plan"],
    qualityChecks: [
      "Process is executable without ambiguity.",
      "Metrics align with operational goals.",
      "Exception paths are documented and tested."
    ]
  },
  data: {
    id: "data",
    label: "Data and Analytics",
    role: "Data Product Manager and Analytics Engineer",
    priorities: [
      "Define business questions and required metrics.",
      "Design data model, transformation logic, and quality checks.",
      "Specify dashboards, alerts, and decision workflows.",
      "Set governance and data reliability standards."
    ],
    architectureFocus: [
      "Pipeline design (ingestion, transformation, serving).",
      "Metric definitions and semantic layer logic.",
      "Dashboard structure by stakeholder needs."
    ],
    dataFocus: [
      "Source mapping and lineage requirements.",
      "Data quality rules and anomaly detection.",
      "Access model and governance controls."
    ],
    riskControls: [
      "Prevent metric drift with strict definitions.",
      "Detect stale/broken pipelines quickly.",
      "Restrict sensitive data exposure."
    ],
    deliverables: ["Data model spec", "Pipeline plan", "Dashboard design", "Governance checklist"],
    qualityChecks: [
      "Metrics are clearly defined and reproducible.",
      "Pipelines include validation and monitoring hooks.",
      "Dashboards drive concrete decisions."
    ]
  },
  general: {
    id: "general",
    label: "General Problem Solving",
    role: "Senior Multi-Disciplinary Problem Solver",
    priorities: [
      "Clarify desired outcome, constraints, and success criteria.",
      "Break work into executable phases and checkpoints.",
      "Document assumptions and decision trade-offs.",
      "Provide practical outputs with verification steps."
    ],
    architectureFocus: [
      "Problem framing and structured decomposition.",
      "Execution sequence with dependencies.",
      "Clear ownership of each workstream."
    ],
    dataFocus: [
      "Key inputs required for high-quality output.",
      "Evidence/validation points for major decisions.",
      "Tracking model for progress and quality."
    ],
    riskControls: [
      "Assumption validation before major decisions.",
      "Failure-point identification and fallback plan.",
      "Final output consistency and quality checks."
    ],
    deliverables: ["Structured brief", "Execution plan", "Risk register", "Verification checklist"],
    qualityChecks: [
      "Output is specific, actionable, and testable.",
      "Every recommendation has rationale.",
      "Final result aligns with requested outcome."
    ]
  }
};

const INTENT_KEYWORDS: Record<IntentId, string[]> = {
  build: ["build", "create", "make", "develop", "launch", "design"],
  optimize: ["improve", "optimize", "fix", "upgrade", "scale", "refactor"],
  analyze: ["analyze", "review", "evaluate", "audit", "assess", "compare"],
  strategy: ["plan", "strategy", "roadmap", "go to market", "gtm", "positioning"],
  content: ["write", "draft", "script", "story", "copy", "article"],
  automate: ["automate", "workflow", "pipeline", "orchestrate", "integration"],
  general: []
};

const INTENT_OBJECTIVES: Record<IntentId, string> = {
  build: "design and deliver a complete implementation blueprint",
  optimize: "diagnose current gaps and design a measurable improvement plan",
  analyze: "produce a structured analysis with evidence-based conclusions",
  strategy: "produce a strategic plan with prioritization and execution milestones",
  content: "produce high-quality structured content aligned to audience and goal",
  automate: "define a reliable automation architecture with controls and observability",
  general: "convert the request into a complete execution-ready specification"
};

const TECHNOLOGY_TERMS = [
  "next.js",
  "nextjs",
  "react",
  "node.js",
  "node",
  "typescript",
  "javascript",
  "python",
  "supabase",
  "postgres",
  "mongodb",
  "firebase",
  "vercel",
  "aws",
  "stripe",
  "paypal",
  "tailwind",
  "docker"
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "make",
  "of",
  "on",
  "or",
  "the",
  "to",
  "want",
  "with",
  "you",
  "your"
]);

function cleanWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sentenceCase(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function tokenize(input: string) {
  return input
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9+.-]*/g)
    ?.filter(Boolean) ?? [];
}

function detectDomain(normalized: string, tokens: string[]): DomainId {
  let bestDomain: DomainId = "general";
  let bestScore = 0;

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS) as Array<[DomainId, string[]]>) {
    if (domain === "general") {
      continue;
    }

    let score = 0;

    for (const keyword of keywords) {
      const lowKeyword = keyword.toLowerCase();
      if (lowKeyword.includes(" ")) {
        if (normalized.includes(lowKeyword)) {
          score += 2;
        }
      } else if (tokens.includes(lowKeyword)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain;
    }
  }

  return bestScore >= 2 ? bestDomain : "general";
}

function detectIntent(normalized: string, tokens: string[]): IntentId {
  let bestIntent: IntentId = "general";
  let bestScore = 0;

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS) as Array<[IntentId, string[]]>) {
    if (intent === "general") {
      continue;
    }

    let score = 0;

    for (const keyword of keywords) {
      const lowKeyword = keyword.toLowerCase();
      if (lowKeyword.includes(" ")) {
        if (normalized.includes(lowKeyword)) {
          score += 2;
        }
      } else if (tokens.includes(lowKeyword)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return bestScore >= 1 ? bestIntent : "general";
}

function extractQuotedPhrases(input: string) {
  const matches = input.match(/"([^"]{2,80})"|'([^']{2,80})'/g) ?? [];
  return matches
    .map((segment) => segment.replace(/^["']|["']$/g, ""))
    .map(cleanWhitespace)
    .slice(0, 4);
}

function extractAudience(normalized: string): string | null {
  const match =
    normalized.match(/\bfor\s+([a-z0-9 ,&/-]{3,60})/i) ??
    normalized.match(/\btarget(?:ing)?\s+([a-z0-9 ,&/-]{3,60})/i);

  return match ? sentenceCase(cleanWhitespace(match[1])) : null;
}

function extractTimeline(normalized: string): string | null {
  const match = normalized.match(/\b(?:in|within|over)\s+(\d+\s*(?:day|week|month|quarter|year)s?)\b/i);
  return match ? cleanWhitespace(match[1]) : null;
}

function extractBudget(normalized: string): string | null {
  const match =
    normalized.match(/\bbudget\s*(?:of|is|:)?\s*\$?([\d,.]+\s*[kKmM]?)\b/i) ??
    normalized.match(/\bunder\s*\$?([\d,.]+\s*[kKmM]?)\b/i);
  return match ? cleanWhitespace(match[1]) : null;
}

function extractTechStack(normalized: string) {
  return TECHNOLOGY_TERMS.filter((term) => normalized.includes(term)).map((term) =>
    term
      .replace("nextjs", "Next.js")
      .replace("node.js", "Node.js")
      .replace("node", "Node.js")
      .replace("react", "React")
      .replace("typescript", "TypeScript")
      .replace("javascript", "JavaScript")
      .replace("supabase", "Supabase")
      .replace("postgres", "Postgres")
      .replace("tailwind", "TailwindCSS")
      .replace("vercel", "Vercel")
      .replace("aws", "AWS")
      .replace("paypal", "PayPal")
      .replace("stripe", "Stripe")
      .replace("mongodb", "MongoDB")
      .replace("firebase", "Firebase")
      .replace("docker", "Docker")
      .replace("python", "Python")
  );
}

function extractTopicTerms(tokens: string[]) {
  return unique(
    tokens.filter((token) => token.length > 3 && !STOP_WORDS.has(token) && !/^\d+$/.test(token))
  ).slice(0, 8);
}

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickBySeed<T>(items: T[], seed: number, offset = 0) {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty array.");
  }
  return items[(seed + offset) % items.length];
}

function hasAnyToken(tokens: string[], values: string[]) {
  return values.some((value) => tokens.includes(value));
}

function buildDirectiveTitle(inputPrompt: string) {
  const normalized = cleanWhitespace(inputPrompt).replace(/[^\w\s:/,+.-]/g, "");
  const title = sentenceCase(normalized);
  return title.length > 90 ? `${title.slice(0, 87)}...` : title;
}

function inferDynamicModules({
  domainId,
  intentId,
  tokens,
  topicTerms,
  audience,
  techStack
}: {
  domainId: DomainId;
  intentId: IntentId;
  tokens: string[];
  topicTerms: string[];
  audience: string | null;
  techStack: string[];
}) {
  const subject = topicTerms.length > 0 ? topicTerms.join(", ") : "the requested initiative";
  const modules: DynamicModule[] = [];

  if (domainId === "software") {
    modules.push(
      {
        title: "Product flows and core use cases",
        focus: [
          `Define user journeys, feature boundaries, and acceptance criteria for ${subject}.`,
          audience ? `Tailor workflows for ${audience}.` : "Prioritize practical user-facing workflows."
        ],
        outputs: ["User journey map", "Feature matrix", "Acceptance criteria set"]
      },
      {
        title: "System architecture and API contracts",
        focus: [
          "Design service boundaries, request/response contracts, and validation strategy.",
          techStack.length > 0 ? `Respect stack choices: ${techStack.join(", ")}.` : "Choose production-safe defaults."
        ],
        outputs: ["Architecture diagram description", "API endpoint spec", "Error-handling rules"]
      },
      {
        title: "Data model and persistence logic",
        focus: [
          "Define entities, relationships, and indexing strategy.",
          "Include migration and data integrity safeguards."
        ],
        outputs: ["Database schema", "Migration notes", "Data access policy"]
      },
      {
        title: "Delivery, QA, and deployment controls",
        focus: [
          "Create implementation phases with testing gates and release criteria.",
          "Define monitoring, rollback, and incident response basics."
        ],
        outputs: ["Implementation backlog", "Test plan", "Launch checklist"]
      }
    );

    if (hasAnyToken(tokens, ["auth", "login", "signup", "permission", "role", "user"])) {
      modules.push({
        title: "Authentication and access control",
        focus: [
          "Define user identity flow, session strategy, and authorization boundaries.",
          "Include role rules, sensitive actions, and abuse prevention."
        ],
        outputs: ["Auth flow spec", "Role/permission matrix", "Security rule set"]
      });
    }

    if (hasAnyToken(tokens, ["payment", "billing", "subscription", "checkout", "paypal", "stripe"])) {
      modules.push({
        title: "Payments and monetization",
        focus: [
          "Define pricing logic, checkout states, and failed-payment handling.",
          "Include webhook states, retries, and reconciliation."
        ],
        outputs: ["Billing flow", "Subscription state machine", "Payment failure playbook"]
      });
    }
  } else if (domainId === "business") {
    modules.push(
      {
        title: "Market and positioning thesis",
        focus: [
          `Define target segment and core differentiation around ${subject}.`,
          "Articulate value proposition and competitive stance."
        ],
        outputs: ["Market thesis", "ICP profile", "Positioning statement"]
      },
      {
        title: "Monetization and unit economics",
        focus: [
          "Build pricing model, margin assumptions, and conversion targets.",
          "List key financial sensitivities and guardrails."
        ],
        outputs: ["Pricing model", "Unit economics table", "Assumption register"]
      },
      {
        title: "Go-to-market execution plan",
        focus: [
          "Map channel strategy, campaign phases, and ownership.",
          "Define near-term milestones and review cadence."
        ],
        outputs: ["GTM plan", "90-day roadmap", "KPI dashboard outline"]
      }
    );
  } else if (domainId === "marketing") {
    modules.push(
      {
        title: "Audience and message architecture",
        focus: [
          "Define audience segments, pain points, and offer-message fit.",
          "Create message hierarchy by funnel stage."
        ],
        outputs: ["Segment map", "Message framework", "Offer hierarchy"]
      },
      {
        title: "Campaign execution system",
        focus: [
          "Design channel mix, budget split, and experiment cadence.",
          "Specify creative and landing flow requirements."
        ],
        outputs: ["Channel plan", "Campaign calendar", "Creative matrix"]
      },
      {
        title: "Measurement and optimization",
        focus: [
          "Define attribution model, reporting windows, and optimization triggers.",
          "Include stop-loss controls and scale-up criteria."
        ],
        outputs: ["Metric framework", "Experiment log format", "Optimization rules"]
      }
    );
  } else if (domainId === "creative") {
    modules.push(
      {
        title: "Creative direction and structure",
        focus: [
          `Define voice, tone, and structure tailored to ${subject}.`,
          "Set pacing and emotional progression objectives."
        ],
        outputs: ["Creative brief", "Structured outline", "Style guardrails"]
      },
      {
        title: "Draft production",
        focus: [
          "Produce complete content sections, not summaries or placeholders.",
          "Ensure coherence, originality, and thematic consistency."
        ],
        outputs: ["Full draft output", "Section transitions", "Continuity notes"]
      },
      {
        title: "Revision and quality polish",
        focus: [
          "Run consistency checks and tighten language quality.",
          "Resolve contradictions and weak sections."
        ],
        outputs: ["Revision checklist", "Quality improvements", "Final polished version"]
      }
    );
  } else {
    modules.push(
      {
        title: "Problem framing and success criteria",
        focus: [
          `Clarify outcome scope for ${subject}.`,
          "Define measurable success criteria and constraints."
        ],
        outputs: ["Problem statement", "Scope boundaries", "Success criteria"]
      },
      {
        title: "Execution design",
        focus: [
          "Break the work into practical phases with owners and dependencies.",
          "Define priority order and decision checkpoints."
        ],
        outputs: ["Execution roadmap", "Prioritized task list", "Dependency map"]
      },
      {
        title: "Validation and risk handling",
        focus: [
          "Define quality checks, failure modes, and mitigation actions.",
          "Include review cadence and adjustment criteria."
        ],
        outputs: ["Risk register", "Quality checklist", "Review plan"]
      }
    );
  }

  if (intentId === "analyze") {
    modules.push({
      title: "Analysis evidence and conclusions",
      focus: [
        "Separate evidence, interpretation, and recommendations.",
        "Show confidence level and explicit limitations."
      ],
      outputs: ["Findings table", "Evidence-backed conclusions", "Recommendation priorities"]
    });
  }

  if (intentId === "automate") {
    modules.push({
      title: "Automation reliability controls",
      focus: [
        "Define triggers, retries, fallback paths, and alerting strategy.",
        "Document observability and ownership for failed runs."
      ],
      outputs: ["Automation workflow map", "Failure-handling policy", "Monitoring checklist"]
    });
  }

  return unique(modules);
}

function estimateComplexity(inputPrompt: string, terms: string[], techStack: string[], quotedPhrases: string[]) {
  const lengthScore = Math.min(Math.floor(inputPrompt.length / 80), 4);
  const termScore = Math.min(Math.floor(terms.length / 2), 4);
  const stackScore = techStack.length > 0 ? 2 : 0;
  const quoteScore = quotedPhrases.length > 0 ? 1 : 0;
  const total = lengthScore + termScore + stackScore + quoteScore;

  if (total >= 7) {
    return "high";
  }
  if (total >= 4) {
    return "medium";
  }
  return "baseline";
}

function listItems(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function formatModules(modules: DynamicModule[]) {
  return modules
    .map((module, index) => {
      const focus = module.focus.join(" ");
      const outputs = module.outputs.join(", ");
      return `${index + 1}. ${module.title}: ${focus} Required outputs: ${outputs}.`;
    })
    .join("\n");
}

export function buildIntelligentPrompt({
  inputPrompt,
  plan
}: {
  inputPrompt: string;
  plan: PlanTier;
}) {
  const normalized = cleanWhitespace(inputPrompt);
  const lowered = normalized.toLowerCase();
  const tokens = tokenize(normalized);

  const domainId = detectDomain(lowered, tokens);
  const intentId = detectIntent(lowered, tokens);
  const profile = DOMAIN_PROFILES[domainId];

  const quotedPhrases = extractQuotedPhrases(normalized);
  const techStack = unique(extractTechStack(lowered));
  const topicTerms = extractTopicTerms(tokens);
  const audience = extractAudience(lowered);
  const timeline = extractTimeline(lowered);
  const budget = extractBudget(lowered);
  const complexity = estimateComplexity(normalized, topicTerms, techStack, quotedPhrases);
  const seed = hashString(`${normalized}|${domainId}|${intentId}|${plan}`);
  const directiveTitle = buildDirectiveTitle(normalized);

  const frames: PromptFrame[] = [
    {
      name: "Execution Blueprint",
      objectiveLabel: "PRIMARY OBJECTIVE",
      moduleLabel: "DYNAMIC EXECUTION MODULES",
      phaseLabel: "EXECUTION PHASE PLAN",
      deliverableLabel: "FINAL DELIVERABLES"
    },
    {
      name: "Delivery Command Spec",
      objectiveLabel: "OUTCOME TARGET",
      moduleLabel: "WORK MODULES",
      phaseLabel: "DELIVERY PHASES",
      deliverableLabel: "REQUIRED OUTPUT ARTIFACTS"
    },
    {
      name: "Operational Playbook",
      objectiveLabel: "MISSION OBJECTIVE",
      moduleLabel: "MISSION MODULES",
      phaseLabel: "RUNBOOK PHASES",
      deliverableLabel: "PRODUCTION DELIVERABLES"
    }
  ];

  const frame = pickBySeed(frames, seed);

  const planDepthInstruction =
    plan === "pro"
      ? "Depth mode: Pro. Provide exhaustive detail, explicit trade-offs, and implementation-grade precision."
      : "Depth mode: Free. Provide strong practical detail while keeping output concise and actionable.";

  const assumptions: string[] = [];
  if (!audience) {
    assumptions.push("Assume a professional audience and explain decisions clearly.");
  }
  if (!timeline) {
    assumptions.push("Assume phased delivery with short iterative milestones.");
  }
  if (techStack.length === 0 && domainId === "software") {
    assumptions.push("Prefer mainstream stack choices unless the user specifies alternatives.");
  }
  if (assumptions.length === 0) {
    assumptions.push("Use only assumptions necessary to remove ambiguity and label them explicitly.");
  }

  const constraints: string[] = [
    "Preserve the user intent exactly; do not shift the objective.",
    "Prioritize practical execution over generic theory.",
    "Include acceptance criteria for each major output."
  ];
  if (audience) {
    constraints.push(`Target audience: ${audience}.`);
  }
  if (timeline) {
    constraints.push(`Delivery horizon: ${timeline}.`);
  }
  if (budget) {
    constraints.push(`Budget consideration: ${budget}.`);
  }
  if (techStack.length) {
    constraints.push(`Respect stack preference: ${techStack.join(", ")}.`);
  }

  const inferredModules = inferDynamicModules({
    domainId,
    intentId,
    tokens,
    topicTerms,
    audience,
    techStack
  });

  const maxModules = plan === "pro" ? 7 : 5;
  const selectedModules = inferredModules.slice(0, maxModules);

  const dynamicWorkstreams = unique([
    ...profile.priorities,
    ...selectedModules.map(
      (module) => `Execute module "${module.title}" with complete outputs and acceptance criteria.`
    ),
    intentId === "analyze" ? "Separate findings, interpretation, and recommendations." : "",
    intentId === "strategy" ? "Provide phased roadmap with owner-level accountability." : "",
    intentId === "content" ? "Define voice and structure before writing full output." : "",
    intentId === "automate" ? "Map triggers, dependencies, and monitoring for each workflow step." : ""
  ]).filter(Boolean);

  const maxWorkstreams = plan === "pro" ? 8 : 5;
  const selectedWorkstreams = dynamicWorkstreams.slice(0, maxWorkstreams);

  const phaseCount = plan === "pro" ? 6 : 4;
  const executionPhases = [
    "Discovery and constraint clarification",
    "Architecture/strategy design",
    "Detailed implementation plan",
    "Validation, risk checks, and quality assurance",
    "Deployment/rollout and monitoring",
    "Post-launch optimization cycle"
  ].slice(0, phaseCount);

  const selectedDeliverables = unique([
    ...profile.deliverables,
    ...selectedModules.flatMap((module) => module.outputs)
  ]).slice(0, plan === "pro" ? 10 : 7);

  const selectedQualityChecks = unique(
    [
      ...profile.qualityChecks,
      ...selectedModules.map(
        (module) => `Module "${module.title}" produces concrete artifacts instead of generic advice.`
      ),
      topicTerms.length > 0 ? `Output stays specific to: ${topicTerms.slice(0, 4).join(", ")}.` : ""
    ].filter(Boolean)
  ).slice(0, plan === "pro" ? 12 : 8);

  const contextLines = [
    `Directive title: ${directiveTitle}`,
    `Original request: "${normalized}"`,
    `Detected domain: ${profile.label}`,
    `Detected intent: ${intentId === "general" ? "General execution" : sentenceCase(intentId)}`,
    `Complexity profile: ${sentenceCase(complexity)}`,
    `Response frame: ${frame.name}`
  ];
  if (topicTerms.length) {
    contextLines.push(`Key topic signals: ${topicTerms.join(", ")}`);
  }
  if (quotedPhrases.length) {
    contextLines.push(`Quoted requirements: ${quotedPhrases.join(" | ")}`);
  }
  if (selectedModules.length) {
    contextLines.push(`Dynamic modules: ${selectedModules.map((module) => module.title).join(" | ")}`);
  }

  return `
SYSTEM ROLE
You are ${profile.role}.

MISSION
Execute the user request directly and deliver final, high-quality outputs. Do not produce a rewritten prompt for another AI.

DOCUMENT FRAME
${frame.name}

CONTEXT SNAPSHOT
${listItems(contextLines)}

OPERATING RULES
${listItems([
  "Use precise, implementation-oriented language.",
  "Keep sections structured and easy to execute.",
  "Label assumptions and avoid hidden guesses.",
  planDepthInstruction
])}

NON-NEGOTIABLE RESPONSE MODE
${listItems([
  "Return final deliverables directly, not a prompt template.",
  "Do not output phrases like: 'Here is a prompt', 'Use this prompt', or 'Prompt for AI'.",
  "Do not ask the user to copy/paste into another model; complete the work now.",
  "If information is missing, state assumptions briefly and continue with the best professional result."
])}

MANDATORY CONSTRAINTS
${listItems(constraints)}

ASSUMPTIONS (IF REQUIRED)
${listItems(assumptions)}

${frame.objectiveLabel}
Begin with one concise objective statement focused on ${INTENT_OBJECTIVES[intentId]}, then execute it fully.

REQUIREMENTS WORKSTREAMS
${listItems(selectedWorkstreams)}

${frame.moduleLabel}
${formatModules(selectedModules)}

ARCHITECTURE / STRATEGY BLUEPRINT
${listItems(profile.architectureFocus)}

DATA / KNOWLEDGE DESIGN
${listItems(profile.dataFocus)}

${frame.phaseLabel}
${listItems(executionPhases)}

SECURITY, RISK, AND GOVERNANCE
${listItems(profile.riskControls)}

${frame.deliverableLabel}
${listItems(selectedDeliverables)}

QUALITY VERIFICATION CHECKLIST
${listItems(selectedQualityChecks)}

OUTPUT FORMAT CONTRACT
- Use markdown headings and numbered sections.
- Include: Objective, Scope, Requirements, Module Outputs, Execution Plan, Risks, Deliverables, Checklist.
- Under each deliverable, produce complete final content (not instructions to produce content).
- Do not include any prompt block, meta-prompt, or "prompt rewrite" section.
- Do not ask clarifying questions unless a blocker prevents meaningful output.

Now execute the request and return the final deliverables.
`.trim();
}
