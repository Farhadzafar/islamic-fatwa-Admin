import { z } from "zod";

export const ResearchSchema = z.object({
  title: z.string().min(1, "Research title is required"),
  citations: z.string().min(1, "citation is required"),
  author: z.string().min(1, "Author is required"),
  authorBio: z.string().min(3, "author Bio is required"),
  abstract: z.string().min(50, " 50 > abstract summary is required"),
  publishDate: z.string().min(1, "Publish date is required"),

  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "PDF file is required"),

  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
});

export type BookSchemaType = z.infer<typeof ResearchSchema>;
