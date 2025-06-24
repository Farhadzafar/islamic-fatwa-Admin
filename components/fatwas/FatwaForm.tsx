"use client";
import React, { useEffect, useRef, useState } from "react";
import { fatwaSchema } from "./fatwaSchama";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MadhabField from "@/components/form/MadhabField";
import TitleField from "@/components/form/TitleField";
import CategoryField from "@/components/form/CategoryField";
import RichTextEditorField from "../form/TextEditorField";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { submitFatwa } from "@/lib/data/fatwa";
import { z } from "zod";
import { getUserId } from "@/hooks/userId";

export default function ArticleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  const userId = getUserId();
  if (!userId) throw new Error("User ID not found in localStorage");

  const defaultValues: z.infer<typeof fatwaSchema> = {
    // _id: "",
    title: "",
    description: "",
    scholar: `${userId}`,
    category: "",
    madhab: "",
    language: `${lang}`,
    createdAt: new Date().toISOString(),
  };

  const form = useForm<z.infer<typeof fatwaSchema>>({
    resolver: zodResolver(fatwaSchema),
    defaultValues,
  });
  const language = lang === "ar" ? "ps" : lang;
  const onSubmit = async (values: z.infer<typeof fatwaSchema>) => {
    setIsSubmitting(true);
    console.log("Submitted values: 🥱🥱🥱🥱🥱", values);
    const fatwaToSubmit = {
      ...values,
      createdAt: values.createdAt ?? new Date().toISOString(),
    };
    const success = await submitFatwa(fatwaToSubmit);
    if (success) {
      form.reset();
    }
    setIsSubmitting(false);
  };
  console.log("Form Errors:", form.formState.errors);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fatwa Upload Form</h1>
      <p className="text-sm text-gray-500 mb-4">
        Please fill out the form below to upload a new fatwa. All fields are
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
              name="description"
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
                  Submit
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
