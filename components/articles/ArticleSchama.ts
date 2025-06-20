import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(50, " content should be 50 > is required"),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Cover image is required"),
  category: z.string().min(1, "Category is required"),
  madhab: z.string().min(1, "Madhab is required"),
  language: z.string().min(1, "Language is required"),
  readTime: z.string().min(1, "Number is required"),
});

export type articleSchemaType = z.infer<typeof articleSchema>;
