"use client";
import React, { useState } from "react";
import { BookSchema, BookSchemaType } from "./BookSchama";
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
import { useSearchParams } from "next/navigation";
import { getUserId } from "@/hooks/userId";
import TitleField from "@/components/form/TitleField";
import DescriptionField from "@/components/form/DescriptionField";
import PdfFileField from "@/components/form/PdfFileField";
import ImageFileField from "@/components/form/ImageFileField";
import CategoryField from "@/components/form/CategoryField";
import { getUserToken } from "@/hooks/getTokn";

export default function BookForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const language = lang;
  const userId = getUserId();
  const token = getUserToken();

  console.log("🔍 Language:", token);
  if (!userId) {
    return <div className="text-red-600">⚠️ Error: User ID not found</div>;
  }

  const defaultValues: BookSchemaType = {
    title: "",
    author: "",
    description: "",
    language: `${lang}`, // assumes `language` is defined above
    file: undefined,
    coverImage: undefined,
    pageCount: "",
    fileSizeMB: "",
    category: "",
    uploadedBy: `${userId}`, // assumes `userId` is defined above
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
      formData.append("description", values.description);
      formData.append("language", values.language);
      formData.append("pageCount", String(values.pageCount));
      formData.append("fileSizeMB", String(values.fileSizeMB));
      if (values.category) formData.append("category", values.category);
      formData.append("uploadedBy", userId);
      if (values.file) formData.append("file", values.file);
      if (values.coverImage) formData.append("coverImage", values.coverImage);

      console.log(
        "📤 Submitting book data:",
        Object.fromEntries(formData.entries())
      );
      const response = await fetch(
        "https://final-year-backend-project.onrender.com/api/books/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Upload failed");
      }

      console.log("✅ Book uploaded successfully");
      form.reset(defaultValues);
    } catch (error: any) {
      console.error("🔥 Submit failed:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📘 Upload a New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TitleField form={form} language={language} name="title" />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Author name..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DescriptionField
            form={form}
            language={language}
            name="description"
          />
          <CategoryField form={form} language={language} name="category" />
          <PdfFileField form={form} language={language} name="file" />
          <ImageFileField form={form} language={language} name="coverImage" />
          <FormField
            control={form.control}
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fileSizeMB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Size (MB)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="mr-2 w-4 h-4" />
                Submit Book
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
