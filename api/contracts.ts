import { z } from "zod";

export const promptRequestSchema = z.object({
  prompt: z.string().trim().min(5).max(600),
  fingerprint: z.string().trim().min(20).max(128)
});

export const favoriteRequestSchema = z.object({
  isFavorite: z.boolean()
});

export type PromptRequest = z.infer<typeof promptRequestSchema>;
export type FavoriteRequest = z.infer<typeof favoriteRequestSchema>;
