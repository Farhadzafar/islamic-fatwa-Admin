import { z } from "zod";

// Custom file validation
const isPDF = (file: File | undefined) =>
  !file || file.type === "application/pdf";

const isImage = (file: File | undefined) =>
  !file || file.type.startsWith("image/");

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  language: z.string().min(1, "Language is required"),
  file: z
    .any()
    .optional()
    .refine(isPDF, { message: "Only PDF files are allowed" }),
  coverImage: z
    .any()
    .optional()
    .refine(isImage, { message: "Only image files are allowed" }),
  pageCount: z.string().optional(),
  fileSizeMB: z.string().optional(),
  category: z.string().optional(),
  uploadedBy: z.string().optional(),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
