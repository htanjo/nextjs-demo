import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(30, "Title must be 30 characters or fewer"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(5000, "Content must be 5000 characters or fewer"),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
