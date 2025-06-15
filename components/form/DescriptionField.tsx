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
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="description">
            {language === "ps" ? "تشریحات" : "Description"}
          </FormLabel>
          <FormControl>
            <Textarea
              id="description"
              placeholder={
                language === "ps"
                  ? "تشریحات دلته ولیکئ..."
                  : "Enter description here..."
              }
              {...field}
              dir={language === "en" ? "ltr" : "rtl"}
              className={cn(
                "min-h-[120px]",
                language === "en" ? "text-left" : "text-right"
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
