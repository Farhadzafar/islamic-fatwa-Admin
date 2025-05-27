import { z } from "zod"

export const fatwaSchema = z.object({
  title: z.string().min(2, { message: "Title required" }),
  description: z.string().min(20, { message: "Description required" }),
  madhab: z.string().min(1, { message: "Madhab required" }),
})

export type FatwaFormData = z.infer<typeof fatwaSchema>

export interface Language {
  code: "en" | "ps" | "ar"
  name: string
  flag: string
  direction: "ltr" | "rtl"
}

export interface MultiLanguageField {
  ps: string
  en: string
  ar: string
}

export interface GlobalSettings {
  question: string // ObjectId reference
  category: string // ObjectId reference
  scholar: string // ObjectId reference
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" },
  { code: "ps", name: "Pashto", flag: "🇦🇫", direction: "rtl" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", direction: "rtl" },
]

export const defaultFormData: FatwaFormData = {
  title: "",
  description: "",
  madhab: "",
}
