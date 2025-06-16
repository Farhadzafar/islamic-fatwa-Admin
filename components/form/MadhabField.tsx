import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select } from "../ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface MadhabFieldProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  language: string;
  name: string;
}

function MadhabField({ form, language, name }: MadhabFieldProps) {
  const madhabs = [
    {
      value: language === "ps" ? "حنفي" : "Hanafi",
      label: language === "ps" ? "حنفي" : "Hanafi",
    },
    {
      value: language === "ps" ? "شافعي" : "Shafi'i",
      label: language === "ps" ? "شافعي" : "Shafi'i",
    },
    {
      value: language === "ps" ? "مالکي" : "Maliki",
      label: language === "ps" ? "مالکي" : "Maliki",
    },
    {
      value: language === "ps" ? "حنبلي" : "Hanbali",
      label: language === "ps" ? "حنبلي" : "Hanbali",
    },
    {
      value: language === "ps" ? "هیځ" : "None",
      label: language === "ps" ? "هیځ" : "None",
    },
  ];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full" dir={language === "en" ? "ltr" : "rtl"}>
          <FormLabel htmlFor="madhab">
            {language === "ps" ? "فقهي مذهب" : "Islamic School of Thought"}
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                dir={language === "ps" ? "rtl" : "ltr"}
                className={cn(
                  "w-full",
                  language === "ps" ? "text-right" : "text-left"
                )}
              >
                <SelectValue
                  placeholder={
                    language === "ps"
                      ? "مذهب انتخاب کړئ..."
                      : "Select madhab..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {madhabs.map((madhab, i) => (
                  <SelectItem key={i} value={madhab.value}>
                    {madhab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default MadhabField;
