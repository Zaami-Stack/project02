import type { PlanTier } from "@/lib/types";

type PromptMode = "software" | "business" | "creative" | "generic";

function detectMode(inputPrompt: string): PromptMode {
  const normalized = inputPrompt.toLowerCase();

  if (
    /\b(app|website|web app|api|backend|frontend|database|dashboard|saas|mobile)\b/.test(
      normalized
    )
  ) {
    return "software";
  }

  if (/\b(business|strategy|marketing|sales|startup|revenue|plan)\b/.test(normalized)) {
    return "business";
  }

  if (/\b(story|novel|fiction|character|plot|script|worldbuilding)\b/.test(normalized)) {
    return "creative";
  }

  return "generic";
}

function modeSpecificRequirements(mode: PromptMode) {
  if (mode === "software") {
    return `
### 4) Software Requirements
- Define product scope and user personas.
- Specify frontend UX/UI flows and responsive behavior.
- Define backend architecture, API contracts, and error handling.
- Include database schema, indexing strategy, and migrations.
- Add authentication/authorization model only if needed.
- Include testing strategy (unit, integration, end-to-end).
- Include deployment steps, runtime environment variables, and observability.`;
  }

  if (mode === "business") {
    return `
### 4) Business Requirements
- Define target market, ICP, and pain points.
- Build a clear value proposition and positioning statement.
- Include go-to-market plan, channel strategy, and timeline.
- Include financial model assumptions and risk analysis.
- Provide execution milestones with owner accountability.
- Add KPI dashboard with leading/lagging indicators.`;
  }

  if (mode === "creative") {
    return `
### 4) Creative Requirements
- Define tone, narrative style, pacing, and emotional arc.
- Build structured outline before full writing.
- Ensure character consistency and strong motivations.
- Include scene-level goals, conflict, and resolution beats.
- Add revision checklist for coherence and originality.`;
  }

  return `
### 4) Core Requirements
- Expand scope clearly and remove ambiguity.
- Provide a structured plan before final output.
- Include realistic constraints and tradeoff decisions.
- Add quality checks and final delivery format.`;
}

export function buildPremiumPrompt({
  inputPrompt,
  plan
}: {
  inputPrompt: string;
  plan: PlanTier;
}) {
  const mode = detectMode(inputPrompt);
  const depthLine =
    plan === "pro"
      ? "Depth mode: Pro. Be extremely detailed and exhaustive."
      : "Depth mode: Free. Be detailed and clear without unnecessary repetition.";

  return `
You are a world-class prompt engineer and execution architect.

## Mission
Transform this basic request into a complete, production-grade execution response:
"${inputPrompt.trim()}"

## Operating Rules
- Preserve the user's core intent.
- Do not invent impossible assumptions; if assumptions are needed, label them clearly.
- Prefer practical implementation detail over abstract theory.
- Use concise but professional language.
- ${depthLine}

## Required Output Structure

### 1) System Role
Define the ideal expert role the model should assume to solve this request.

### 2) Objective
Rewrite the objective into a clear, outcome-focused brief with success criteria.

### 3) Scope and Constraints
- In-scope tasks
- Out-of-scope boundaries
- Constraints (time, tools, quality, risk)
- Acceptance criteria

${modeSpecificRequirements(mode)}

### 5) Step-by-Step Execution Plan
- Break the work into phases.
- Include dependencies and sequencing.
- Include likely failure points and mitigation steps.

### 6) Security and Quality Guardrails
- Include safety checks, validation rules, and abuse prevention.
- Include edge cases and fallback behavior.

### 7) Final Deliverables
Define the exact artifacts to produce (documents, code modules, diagrams, checklists, etc.).

### 8) Output Formatting Requirements
- Use headings and numbered steps.
- Use explicit assumptions section.
- End with a final verification checklist.

Now produce the final best-possible response to the mission above following every section and constraint.
`.trim();
}

