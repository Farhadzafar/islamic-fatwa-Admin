// import { z } from "zod";

// export const ArticleSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   author: z.string().min(1, "Author ID is required"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   category: z.string().min(1, "Category ID is required"),
//   readTime: z.number().int().positive("Read time must be positive"),
//   language: z.string(),
//   coverImage: z
//     .any()
//     .optional()
//     .refine((file) => !file || file.type.startsWith("image/"), {
//       message: "Only image files are allowed",
//     }),
// });

// export type ArticleSchemaType = z.infer<typeof ArticleSchema>;

import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category ID is required"), // ObjectId as string
  language: z.string().min(1, "Language is required"), // e.g., "en", "ar"
  author: z.string().min(1, "Author ID is required"), // ObjectId as string
  readTime: z.number().optional(),
  coverImageUrl: z
    .any()
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }), // URL of the cover image
});

export type ArticleSchemaType = z.infer<typeof ArticleSchema>;
