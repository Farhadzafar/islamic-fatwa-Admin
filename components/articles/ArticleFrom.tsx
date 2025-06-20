"use client";
import React, { useEffect, useRef, useState } from "react";
import { articleSchema } from "./ArticleSchama";
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

export default function ArticleForm() {
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
    author: "farhad",
    content: "",
    coverImage: undefined as File | undefined,
    category: "",
    madhab: "",
    language: `${lang}`,
    readTime: "",
  };
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof articleSchema>) => {
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
            <RichTextEditorField
              form={form}
              language={language}
              name="content"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem
                  className="w-full"
                  dir={language === "en" ? "ltr" : "rtl"}
                >
                  <FormLabel>
                    {language === "en" ? "Read time" : "د ویل وخت"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir={language === "en" ? "ltr" : "rtl"}
                      autoComplete="off"
                      className={cn("w-full")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
