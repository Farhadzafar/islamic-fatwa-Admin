import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface DescriptionFieldProps {
  form: any;
  name: string;
  language: string;
}

function DescriptionField({ form, language, name }: DescriptionFieldProps) {
  const isEnglish = language === "en";

  return (
    <FormField
      control={form.control}
      name={name}
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
                "min-h-[320px]",
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
