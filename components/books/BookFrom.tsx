"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import MadhabField from "@/components/form/MadhabField";
import TitleField from "@/components/form/TitleField";
import DescriptionField from "@/components/form/DescriptionField";
import PdfFileField from "@/components/form/PdfFileField";
import PublishDateField from "@/components/form/publishDateField";
import ImageFileField from "@/components/form/ImageFileField";
import CategoryField from "@/components/form/CategoryField";
import { useSearchParams } from "next/navigation";
import { getUserId } from "@/hooks/userId";

export default function BookForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const language = lang;

  const userId = getUserId();

  const defaultValues = {
    title: "",
    author: "",
    summary: "",
    publishDate: "",
    coverImage: undefined as File | undefined,
    file: undefined as File | undefined,
    category: "",
    madhab: "",
    language: language,
  };

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("description", values.summary);
      formData.append("publishDate", values.publishDate);
      formData.append("category", values.category);
      formData.append("madhab", values.madhab);
      formData.append("language", language);
      formData.append("uploadedBy", userId);

      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }
      if (values.file) {
        formData.append("file", values.file);
      }

      const res = await fetch(
        "https://final-year-backend-project.onrender.com/api/books/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Server Error:", errorText);
        throw new Error("Failed to upload the book.");
      }

      console.log("✅ Book submitted successfully");
      form.reset(defaultValues);
    } catch (err: any) {
      console.error("🔥 Submit failed:", err.message);
    } finally {
      setIsSubmitting(false);
    }
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
            <DescriptionField form={form} language={language} name="summary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <PdfFileField form={form} language={language} name="file" />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem dir={language === "en" ? "ltr" : "rtl"}>
                  <FormLabel>
                    {language === "en" ? "Author" : "لیکوال"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder={
                        language === "en"
                          ? "Enter author name..."
                          : "لیکوال نوم ولیکئ..."
                      }
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
