import { z } from "zod";

export const fatwaSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "fatwa title is required"),
  scholar: z.string().min(1, "Author is required"),
  description: z.string().min(50, " content should be 50 > is required"),
  category: z.string().min(1, "Category is required"),
  madhab: z.string().min(1, "Madhab is required"),
  language: z.string().min(1, "Language is required"),
});

export type articleSchemaType = z.infer<typeof fatwaSchema>;
