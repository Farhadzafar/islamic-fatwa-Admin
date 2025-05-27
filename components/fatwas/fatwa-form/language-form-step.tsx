"use client"

import type { UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { FatwaFormData, Language } from "./types"

const selectStyles = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
)

interface LanguageFormStepProps {
  form: UseFormReturn<FatwaFormData>
  language: Language
  onSubmit: (data: FatwaFormData) => void
}

export function LanguageFormStep({ form, language, onSubmit }: LanguageFormStepProps) {
  return (
    <div className="mb-6">
      <FormHeader language={language} />
      <div className={cn("space-y-6", language.direction === "rtl" && "text-right")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TitleField form={form} language={language} />
            <DescriptionField form={form} language={language} />
            <MadhabField form={form} language={language} />
          </form>
        </Form>
      </div>
    </div>
  )
}

function FormHeader({ language }: { language: Language }) {
  return (
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <span className="text-2xl">{language.flag}</span>
      {language.name} Content
      {language.direction === "rtl" && <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">RTL</span>}
    </h3>
  )
}

function TitleField({ form, language }: { form: UseFormReturn<FatwaFormData>; language: Language }) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              placeholder={`Enter title in ${language.name}...`}
              {...field}
              dir={language.direction}
              className={cn(language.direction === "rtl" && "text-right")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function DescriptionField({ form, language }: { form: UseFormReturn<FatwaFormData>; language: Language }) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder={`Enter description in ${language.name}...`}
              {...field}
              className={cn("min-h-[120px]", language.direction === "rtl" && "text-right")}
              dir={language.direction}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function MadhabField({ form, language }: { form: UseFormReturn<FatwaFormData>; language: Language }) {
  const getMadhabOptions = (languageCode: string) => {
    const madhabs = {
      en: [
        { value: "hanafi", label: "Hanafi" },
        { value: "maliki", label: "Maliki" },
        { value: "shafi", label: "Shafi'i" },
        { value: "hanbali", label: "Hanbali" },
      ],
      ps: [
        { value: "hanafi", label: "حنفي" },
        { value: "maliki", label: "مالکي" },
        { value: "shafi", label: "شافعي" },
        { value: "hanbali", label: "حنبلي" },
      ],
      ar: [
        { value: "hanafi", label: "حنفي" },
        { value: "maliki", label: "مالكي" },
        { value: "shafi", label: "شافعي" },
        { value: "hanbali", label: "حنبلي" },
      ],
    }
    return madhabs[languageCode as keyof typeof madhabs] || madhabs.en
  }

  const options = getMadhabOptions(language.code)

  return (
    <FormField
      control={form.control}
      name="madhab"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Madhab</FormLabel>
          <FormControl>
            <select
              {...field}
              className={cn(selectStyles, language.direction === "rtl" && "text-right")}
              dir={language.direction}
            >
              <option value="">Select Madhab</option>
              {options.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
