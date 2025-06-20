"use client";
import React, { useEffect, useRef, useState } from "react";
import { BookSchema } from "./BookSchama";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MadhabField from "@/components/form/MadhabField";
import TitleField from "@/components/form/TitleField";
import { Description } from "@radix-ui/react-toast";
import DescriptionField from "@/components/form/DescriptionField";
import PdfFileField from "@/components/form/PdfFileField";
import PublishDateField from "@/components/form/publishDateField";
import ImageFileField from "@/components/form/ImageFileField";
import CategoryField from "@/components/form/CategoryField";
import RichTextEditorField from "../form/TextEditorField";
import { useSearchParams } from "next/navigation";

// const selectStyle = cn(
//   "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
// );

export default function BookForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en"; // default to English if not set

  const [language, setLanguage] = useState("");

  useEffect(() => {
    const languageMap: Record<string, string> = {
      ps: "ps",
      en: "en",
      ar: "ps",
    };

    setLanguage(languageMap[lang] || "English");
  }, [lang]);

  const defaultValues = {
    title: "",
    author: "jlsdfj",
    summary: "",
    publishDate: "",
    coverImage: undefined as File | undefined,
    file: undefined as File | undefined,
    category: "",
    madhab: "",
    language: `${language}`,
  };
  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted with values:", values);

    // Simulate upload
    await new Promise((res) => setTimeout(res, 1000));

    setIsSubmitting(false);
    // Reset form after submission
    form.reset(defaultValues);
    setPreview(null);
  };
  console.log("language is ===", language);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Upload Form</h1>
      <p className="text-sm text-gray-500 mb-4">
        Please fill out the form below to upload a new book. All fields are
        required.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <TitleField form={form} language={language} name="title" />
            <MadhabField form={form} language={language} name="madhab" />

            <CategoryField form={form} language={language} name="category" />
          </div>

          <div className="flex flex-col gap-2">
            <DescriptionField form={form} language={language} name="summary" />
            {/* <RichTextEditorField
              form={form}
              language={language}
              name="summary"
            /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <PdfFileField form={form} language={language} name="file" />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem
                  className="w-full"
                  dir={language === "en" ? "ltr" : "rtl"}
                >
                  <FormLabel>
                    {language === "en" ? "author" : "لیکوال"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir={language === "en" ? "ltr" : "rtl"}
                      autoComplete="off"
                      placeholder={
                        language === "en"
                          ? "Enter the book title..."
                          : "سرلیک په پښتو ژبه ولیکئ..."
                      }
                      className={cn("w-full")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PublishDateField
              form={form}
              language={language}
              name="publishDate"
            />
          </div>

          <div className="flex justify-between items-end">
            <ImageFileField form={form} language={language} name="coverImage" />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Submit Book
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
