export const APP_NAME = "PromptForge AI";
export const APP_TAGLINE = "Turn rough ideas into premium prompts that ship serious AI outcomes.";
export const FREE_DAILY_LIMIT = 10;
export const PRO_MONTHLY_PRICE = 10;
export const PAYPAL_ME_URL = "https://paypal.me/AnasZaami";

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
      "Free mode gets 10 secure server-enforced generations per day. Pro access codes remove the daily cap and receive priority generation routing."
  },
  {
    question: "How do I unlock Pro without creating an account?",
    answer:
      "Buy Pro through the PayPal link, receive your private access code, then redeem it inside the dashboard."
  },
  {
    question: "Can I save prompts and revisit them on this device?",
    answer:
      "Yes. Prompt history and favorites are saved for your device fingerprint and active code session."
  },
  {
    question: "How does abuse protection work?",
    answer:
      "PromptForge combines account limits with IP checks, browser fingerprinting, server-side validation, and database-enforced rate controls."
  }
] as const;
