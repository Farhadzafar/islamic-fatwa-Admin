"use client";

import React, { useState } from "react";
import { ArticleSchema, ArticleSchemaType } from "./ArticleSchama";
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
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export default function ArticleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const language = lang;
  const userId = getUserId();
  const token = getUserToken();

  if (!userId) {
    return <div className="text-red-600">⚠️ Error: User ID not found</div>;
  }

  const defaultValues: ArticleSchemaType = {
    title: "",
    author: userId, // Use the user ID from localStorage
    description: "",
    language: lang,
    readTime: 3454,
    coverImageUrl: undefined,
    category: "",
  };

  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ArticleSchema>) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("description", values.description);
      formData.append("language", values.language);
      if (values.category) formData.append("category", values.category);
      if (values.coverImageUrl)
        formData.append("coverImage", values.coverImageUrl); // ✅ correct field name

      console.log(
        "📤 Submitting book data:",
        Object.fromEntries(formData.entries())
      );

      const apiendpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const response = await fetch(`${apiendpoint}/api/articles/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Upload failed");
      }

      toast({
        title: "Book uploaded successfully",
        description: `Your book has been uploaded. ${(
          <Link href={`/admin/books`} className="text-bule">
            View Book
          </Link>
        )}`,
        variant: "default",
      });

      console.log("✅ Book uploaded successfully");
      form.reset(defaultValues);
    } catch (error: any) {
      toast({
        title: "🔥 Submit failed:",
        description: `Your book has been uploaded. ${error.message} className="text-bule">View Book</Link>}`,
        variant: "destructive",
      });
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

          <DescriptionField
            form={form}
            language={language}
            name="description"
          />
          <CategoryField form={form} language={language} name="category" />
          <ImageFileField
            form={form}
            language={language}
            name="coverImageUrl"
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
