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

interface PublishDateFieldProps {
  form: any;
  language: string;
  name: string;
}

function PublishDateField({ form, language, name }: PublishDateFieldProps) {
  const isEnglish = language === "en";

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem dir={isEnglish ? "ltr" : "rtl"}>
          <FormLabel htmlFor="publishDate">
            {isEnglish ? "Publish Date" : "د خپریدو نیټه"}
          </FormLabel>
          <FormControl>
            <Input
              id="publishDate"
              type="date"
              {...field}
              dir={isEnglish ? "ltr" : "rtl"}
              className={cn(isEnglish ? "text-left" : "text-right")}
              autoComplete="off"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PublishDateField;
