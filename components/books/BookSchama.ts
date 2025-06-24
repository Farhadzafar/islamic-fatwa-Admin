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

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  language: z.string().min(1, "Language is required"),
  fileLink: z.string().url("Invalid file link"),
  coverImageUrl: z.string().url("Invalid cover image URL"),
  rating: z
    .number()
    .min(0, "Rating cannot be less than 0")
    .max(5, "Rating cannot be more than 5")
    .default(0)
    .optional(),
  pageCount: z.number().int().positive().default(0).optional(),
  fileSizeMB: z.number().positive().default(0).optional(),
  category: z.string().optional(), // assuming ObjectId as string
  uploadedBy: z.string().nullable().optional(),
  downloadCount: z.number().int().nonnegative().default(0).optional(),
  status: z.enum(["pending", "published", "rejected"]).default("pending"),
  createdAt: z.string().datetime().optional(), // or z.date() if using native Date
});
