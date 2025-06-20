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
  name: string;
}

export default function TitleField({ form, language, name }: TitleFieldProps) {
  const isPashto = language === "ps";

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full" dir={isPashto ? "rtl" : "ltr"}>
          <FormLabel>{isPashto ? "د کتاب سرلیک" : "Book Title"}</FormLabel>
          <FormControl>
            <Input
              {...field}
              dir={isPashto ? "rtl" : "ltr"}
              autoComplete="off"
              placeholder={
                isPashto
                  ? "سرلیک په پښتو ژبه ولیکئ..."
                  : "Enter the book title..."
              }
              className={cn("w-full")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
