"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResearchSchema } from "./Researchchama";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
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
import ImageFileField from "@/components/form/ImageFileField";
import CategoryField from "@/components/form/CategoryField";
import RichTextEditorField from "../form/TextEditorField";
import { useSearchParams } from "next/navigation";
import PdfFileField from "../form/PdfFileField";
import PublishDateField from "../form/publishDateField";

export default function ResearchForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("");
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  console.log("language is ===", lang);
  useEffect(() => {
    setLanguage(lang || "en");
  }, [lang]);

  const defaultValues = {
    title: "",
    citations: "",
    author: "",
    authorBio: "",
    abstract: "",
    publishDate: "",
    file: undefined as File | undefined,
    category: "",
    language: `${lang}`,
  };
  const form = useForm<z.infer<typeof ResearchSchema>>({
    resolver: zodResolver(ResearchSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ResearchSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted with values:", values);

    // Simulate upload
    await new Promise((res) => setTimeout(res, 1000));

    setIsSubmitting(false);
    // Reset form after submission
    form.reset(defaultValues);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Research Upload Form</h1>
      <p className="text-sm text-gray-500 mb-4">
        Please fill out the form below to upload a new research. All fields are
        required.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TitleField form={form} language={language} name="title" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            <FormField
              control={form.control}
              name="citations"
              render={({ field }) => (
                <FormItem
                  className="w-full"
                  dir={language === "en" ? "ltr" : "rtl"}
                >
                  <FormLabel>
                    {language === "en" ? "citations" : "citations"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir={language === "en" ? "ltr" : "rtl"}
                      className={cn("w-full")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem
                  className="w-full"
                  dir={language === "en" ? "ltr" : "rtl"}
                >
                  <FormLabel>
                    {language === "en" ? "author" : "author"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir={language === "en" ? "ltr" : "rtl"}
                      className={cn("w-full")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorBio"
              render={({ field }) => (
                <FormItem
                  className="w-full"
                  dir={language === "en" ? "ltr" : "rtl"}
                >
                  <FormLabel>
                    {language === "en" ? "authorBio" : "authorBio"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir={language === "en" ? "ltr" : "rtl"}
                      className={cn("w-full")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CategoryField form={form} language={language} name="category" />
          </div>

          <div className="flex flex-col gap-2">
            <RichTextEditorField
              form={form}
              language={language}
              name="abstract"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <PdfFileField form={form} language={language} name="file" />
            <PublishDateField
              form={form}
              language={language}
              name="publishDate"
            />
          </div>

          <div className="flex justify-between items-end">
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
