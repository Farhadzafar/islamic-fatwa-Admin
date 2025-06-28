"use client";
import React, { useEffect, useState } from "react";
import { ResearchSchema } from "./Researchchama";
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
import CategoryField from "@/components/form/CategoryField";
import RichTextEditorField from "../form/TextEditorField";
import { useSearchParams } from "next/navigation";
import PdfFileField from "../form/PdfFileField";
import PublishDateField from "../form/publishDateField";
import { submitResearchData } from "@/lib/data/research";
import { getUserId } from "@/hooks/userId";

export default function ResearchForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const userId = getUserId();
  console.log("value✌️✌️✌️✌️✌️value✌️✌️✌️✌️✌️value✌️✌️✌️✌️✌️", userId);

  const defaultValues: z.infer<typeof ResearchSchema> = {
    title: "",
    citations: 0,
    authors: {
      fullName: "",
      bio: "",
      affiliation: "",
    },
    abstract: "",
    publishedDate: new Date().toISOString().split("T")[0],
    fileUrl: undefined,
    category: "",
    language: lang,
    fileSize: "",
    pageCount: 0,
    uploadedBy: userId,
  };

  const form = useForm<z.infer<typeof ResearchSchema>>({
    resolver: zodResolver(ResearchSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ResearchSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await submitResearchData(values);
      console.log("✅ Upload successful:", result);
      form.reset(defaultValues);
    } catch (err) {
      console.error("❌ Upload failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { control, handleSubmit } = form;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Research Upload Form</h1>
      <p className="text-sm text-gray-500 mb-4">
        Please fill out the form below to upload a new research paper.
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Authors Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="authors.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="authors.bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Bio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="authors.affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Citations */}
          <FormField
            control={control}
            name="citations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citations</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : +e.target.value
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Abstract */}
          <RichTextEditorField form={form} language={lang} name="abstract" />

          {/* Category */}
          <CategoryField form={form} language={lang} name="category" />

          {/* File Upload */}
          <PdfFileField form={form} language={lang} name="fileUrl" />

          {/* Publish Date */}
          <PublishDateField form={form} language={lang} name="publishedDate" />

          {/* File Size */}
          {/* <FormField
            control={control}
            name="fileSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Size</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2 MB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Page Count */}
          <FormField
            control={control}
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : +e.target.value
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Submit Research
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
