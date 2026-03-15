export const APP_NAME = "PromptForge AI";
export const APP_TAGLINE = "Turn rough ideas into premium prompts that ship serious AI outcomes.";
export const FREE_DAILY_LIMIT = 10;
export const PRO_MONTHLY_PRICE = 10;
export const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

export const PROMPT_ENGINEERING_SYSTEM_MESSAGE = `
You are PromptForge AI, a world-class prompt engineer for advanced AI systems.
Transform the user's short idea into a premium, production-grade prompt.

Your output must:
- Preserve the user's core intent
- Expand the request into a structured prompt with clear sections
- Include a system role, project objective, scope, detailed requirements, constraints, success criteria, and delivery format
- Add UX, architecture, data model, backend logic, security, testing, deployment, and scaling guidance when relevant
- Include assumptions only when necessary and label them clearly
- Stay practical, concise where possible, but rich enough for complex project generation
- Return the final answer as a polished prompt only
`.trim();

export const MARKETING_EXAMPLE = {
  input: "make a todo app",
  output:
    "Act as a senior product team tasked with building a production-ready task management application. Create a modern full-stack todo platform with authentication, workspace support, responsive UI, CRUD task flows, due dates, labels, drag-and-drop prioritization, analytics, secure APIs, database schema, test strategy, and cloud deployment guidance. Include system architecture, UI/UX expectations, data models, access control, edge cases, and launch checklist."
};

export const FAQ_ITEMS = [
  {
    question: "What does PromptForge AI actually do?",
    answer:
      "It expands a short idea into a premium prompt with structure, constraints, architecture, UX, and delivery guidance tailored for modern AI models."
  },
  {
    question: "How are free and pro plans different?",
    answer:
      "Free accounts get 10 secure server-enforced generations per day. Pro removes the daily cap and receives priority generation routing."
  },
  {
    question: "Can I save prompts and revisit them later?",
    answer:
      "Yes. Every generation is stored in your account history, and you can mark favorite prompts for quick reuse."
  },
  {
    question: "How does abuse protection work?",
    answer:
      "PromptForge combines account limits with IP checks, browser fingerprinting, server-side validation, and database-enforced rate controls."
  }
] as const;

