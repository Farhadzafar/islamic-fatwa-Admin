import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

import { Control, FieldValues } from "react-hook-form";

interface DescriptionFieldProps {
  form: { control: Control<FieldValues> };
  language: string;
}

function DescriptionField({ form, language }: DescriptionFieldProps) {
  const isEnglish = language === "en";

  return (
    <FormField
      control={form.control}
      name="summary"
      render={({ field }) => (
        <FormItem dir={isEnglish ? "ltr" : "rtl"}>
          {/* Use htmlFor matching the textarea id */}
          <FormLabel htmlFor="summary">
            {isEnglish ? "Description" : "تشریحات"}
          </FormLabel>
          <FormControl>
            <Textarea
              id="summary" // id matches htmlFor for accessibility
              placeholder={
                isEnglish
                  ? "Enter description here..."
                  : "تشریحات دلته ولیکئ..."
              }
              {...field}
              dir={isEnglish ? "ltr" : "rtl"}
              className={cn(
                "min-h-[120px]",
                isEnglish ? "text-left" : "text-right"
              )}
              autoComplete="off"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DescriptionField;
