import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Control, FieldValues } from "react-hook-form";

interface TitleFieldProps {
  form: { control: Control<FieldValues> };
  language: string;
}

function TitleField({ form, language }: TitleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              placeholder={`Enter title in ${
                language === "ps"
                  ? "سرلیک په پښتو ژبه ولیکئ..."
                  : "Enter title in English..."
              }`}
              {...field}
              dir={language === "en" ? "ltr" : "rtl"}
              autoComplete="off"
              className={cn(language === "en" ? "text-left" : "text-right")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
