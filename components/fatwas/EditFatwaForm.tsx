"use client";
import React, { useEffect, useState } from "react";
import { fatwaSchema } from "../fatwas/fatwaSchama";
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
import { string, z } from "zod";

interface FatwaFormProps {
  initialData?: Partial<z.infer<typeof fatwaSchema>> | undefined;
  onSubmit: (
    id: string | undefined,
    values: z.infer<typeof fatwaSchema>
  ) => Promise<boolean>;
}

export default function EditFatwaForm({
  initialData = {},
  onSubmit,
}: FatwaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("");
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const { toast } = useToast();

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  if (!userString) throw new Error("User not found in localStorage");

  const userObject = JSON.parse(userString);
  const userId = userObject?.user?._id;
  if (!userId) throw new Error("User ID not found in localStorage");

  const form = useForm<z.infer<typeof fatwaSchema>>({
    resolver: zodResolver(fatwaSchema),
    defaultValues: {
      title: initialData.title || "",
      scholar: userId,
      description: initialData.description || "",
      category: initialData.category || "",
      madhab: initialData.madhab || "",
      language: initialData.language || lang,
    },
  });

  const handleSubmit = async (values: z.infer<typeof fatwaSchema>) => {
    setIsSubmitting(true);
    const success = await onSubmit(initialData?._id, values);
    if (success) {
      toast({
        title: "Success",
        description: "Fatwa submitted successfully.",
      });
      form.reset();
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {initialData?._id ? "Edit Fatwa" : "Create New Fatwa"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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

          <div className="flex justify-between items-end mt-6">
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
                  {initialData?._id ? "Update Fatwa" : "Submit Fatwa"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
