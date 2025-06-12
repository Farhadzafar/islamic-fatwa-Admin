import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Author is required"),
  summary: z.string().min(1, "Book summary is required"),
  publishDate: z.string().min(1, "Publish date is required"),

  // Accepts a File or undefined
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Cover image is required"),

  // Accepts a File or undefined
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "PDF file is required"),

  category: z.string().min(1, "Category is required"),
  madhab: z.string().min(1, "Madhab is required"),
  language: z.string().min(1, "Language is required"),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
