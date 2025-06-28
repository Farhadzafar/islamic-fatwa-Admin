import { z } from "zod";

const isPDF = (file: File | undefined) =>
  !file || file.type === "application/pdf";

export const ResearchSchema = z.object({
  title: z.string({ required_error: "Title is required" }),

  citations: z.number({ required_error: "Title is required" }).optional(),

  authors: z.object({
    fullName: z.string({ required_error: "Author's full name is required" }),
    bio: z.string({ required_error: "Author's bio is required" }),
    affiliation: z.string({
      required_error: "Author's affiliation is required",
    }),
  }),

  abstract: z.string({ required_error: "Abstract is required" }),

  publishedDate: z.string().min(1, "Publish date is required"),

  fileUrl: z
    .any()
    .optional()
    .refine(isPDF, { message: "Only PDF files are allowed" }),
  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
  fileSize: z.string({ required_error: "File size is required" }),
  pageCount: z.number().min(0),
  uploadedBy: z.string().optional(),
});

export type BookSchemaType = z.infer<typeof ResearchSchema>;
