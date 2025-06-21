import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues } from "react-hook-form";

interface PdfFileFieldProps {
  form: any;
  language: string;
  name: string;
}

function PdfFileField({ form, language, name }: PdfFileFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem dir={language === "en" ? "ltr" : "rtl"}>
          <FormLabel>
            {language === "ps" ? "د کتاب PDF فایل" : "Book PDF File"}
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => field.onChange(e.target.files?.[0])}
              dir={language === "en" ? "ltr" : "rtl"}
              className={cn(
                "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700",
                "border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm",
                "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
                language === "ps" ? "text-right" : "text-left"
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PdfFileField;
