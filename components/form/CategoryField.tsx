import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { fatwaSchema } from "../fatwas/fatwaSchama";
import { z } from "zod";

interface Props {
  form: any;
  name: string;
  language: string;
}

export default function CategoryField({ form, language, name }: Props) {
  const popularCategories = [
    {
      value: language === "ps" ? "فقه" : "Fiqh",
      label: language === "ps" ? "فقه" : "Fiqh",
    },
    {
      value: language === "ps" ? "تفسير" : "Tafsir",
      label: language === "ps" ? "تفسير" : "Tafsir",
    },
    {
      value: language === "ps" ? "حديث" : "Hadith",
      label: language === "ps" ? "حديث" : "Hadith",
    },
    {
      value: language === "ps" ? "عقيده" : "Aqeedah",
      label: language === "ps" ? "عقيده" : "Aqeedah",
    },
    {
      value: language === "ps" ? "سيرت" : "Seerah",
      label: language === "ps" ? "سيرت" : "Seerah",
    },
    {
      value: language === "ps" ? "تصوف" : "Tasawwuf",
      label: language === "ps" ? "تصوف" : "Tasawwuf",
    },
    {
      value: language === "ps" ? "فقهي مسائل" : "Fiqh Issues",
      label: language === "ps" ? "فقهي مسائل" : "Fiqh Issues",
    },
    {
      value: language === "ps" ? "اسلامي قانون" : "Islamic Law",
      label: language === "ps" ? "اسلامي قانون" : "Islamic Law",
    },
    {
      value: language === "ps" ? "اخلاق" : "Akhlaq",
      label: language === "ps" ? "اخلاق" : "Akhlaq",
    },
  ];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem dir={language === "en" ? "ltr" : "rtl"}>
          <FormLabel>
            {language === "ps" ? "د کټګورۍ نوم" : "Book Category"}
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              list="category-list"
              placeholder={
                language === "ps"
                  ? "کټګورۍ ولیکئ یا انتخاب کړئ..."
                  : "Type or select category..."
              }
              {...field}
              className={cn(
                "w-full ",
                language === "en" ? "text-left" : "text-right"
              )}
              dir={language === "en" ? "ltr" : "rtl"}
              autoComplete="off"
            />
          </FormControl>
          <datalist id="category-list">
            {popularCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </datalist>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
