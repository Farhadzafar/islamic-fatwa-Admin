import { z } from "zod";

export const fatwaSchema = z.object({
  // _id: z.string().optional(),
  title: z.string().min(1, "Fatwa title is required"),
  description: z
    .string()
    .min(50, "Description should be at least 50 characters"),

  madhab: z.string().min(1, "Madhab is required"),
  language: z.string().min(1, "Language must be one of: ps, en, ar"),
  category: z.string().min(1, "Category is required"),
  scholar: z.string().min(1, "Scholar is required"),
  createdAt: z.string().optional(),
});

export type articleSchemaType = z.infer<typeof fatwaSchema>;
