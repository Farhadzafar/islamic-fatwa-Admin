"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fatwaSchema } from "./fatwaSchama";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MadhabField from "@/components/form/MadhabField";
import TitleField from "@/components/form/TitleField";
import CategoryField from "@/components/form/CategoryField";
import RichTextEditorField from "@/components/form/TextEditorField";
import { editFatwa } from "@/lib/data/fatwa";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type FatwaFormValues = z.infer<typeof fatwaSchema>;

interface FatwaEditFormProps {
  fatwa?: FatwaFormValues & {
    _id: string;
  };
}

export default function FatwaEditForm({ fatwa }: FatwaEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FatwaFormValues>({
    resolver: zodResolver(fatwaSchema),
    defaultValues: {
      _id: fatwa?._id || "",
      title: fatwa?.title || "",
      scholar: fatwa?.scholar || "",
      description: fatwa?.description || "",
      category: fatwa?.category || "",
      madhab: fatwa?.madhab || "",
      language: fatwa?.language || "en",
      createdAt: fatwa?.createdAt || new Date().toISOString(),
    },
  });

  const handleSubmit = async (values: FatwaFormValues) => {
    setIsSubmitting(true);

    if (!fatwa?._id) {
      toast({
        title: "Error",
        description: "Fatwa ID is missing.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await editFatwa(fatwa._id, {
        _id: fatwa._id,
        title: values.title,
        scholar: values.scholar,
        description: values.description,
        category: values.category,
        madhab: values.madhab,
        language: values.language,
        createdAt: fatwa.createdAt ?? new Date().toISOString(),
      });

      if (result) {
        toast({
          title: "Updated",
          description: "Fatwa updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update fatwa.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Fatwa</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <TitleField
              form={form}
              language={fatwa?.language ?? "en"}
              name="title"
            />
            <MadhabField
              form={form}
              language={fatwa?.language ?? "en"}
              name="madhab"
            />
            <CategoryField
              form={form}
              language={fatwa?.language ?? "en"}
              name="category"
            />
          </div>

          <div className="flex flex-col gap-2">
            <RichTextEditorField
              form={form}
              language={fatwa?.language ?? "en"}
              name="description"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Update Fatwa
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
