// import { cn } from "@/lib/utils";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Control, FieldValues, UseFormReturn } from "react-hook-form";
// import { Input } from "../ui/input";
// import { fatwaSchema } from "../fatwas/fatwaSchama";
// import { z } from "zod";

// interface Props {
//   form: any;
//   name: string;
//   language: string;
// }

// export default function CategoryField({ form, language, name }: Props) {
//   const popularCategories = [
//     {
//       value: language === "ps" ? "فقه" : "Fiqh",
//       label: language === "ps" ? "فقه" : "Fiqh",
//     },
//     {
//       value: language === "ps" ? "تفسير" : "Tafsir",
//       label: language === "ps" ? "تفسير" : "Tafsir",
//     },
//     {
//       value: language === "ps" ? "حديث" : "Hadith",
//       label: language === "ps" ? "حديث" : "Hadith",
//     },
//     {
//       value: language === "ps" ? "عقيده" : "Aqeedah",
//       label: language === "ps" ? "عقيده" : "Aqeedah",
//     },
//     {
//       value: language === "ps" ? "سيرت" : "Seerah",
//       label: language === "ps" ? "سيرت" : "Seerah",
//     },
//     {
//       value: language === "ps" ? "تصوف" : "Tasawwuf",
//       label: language === "ps" ? "تصوف" : "Tasawwuf",
//     },
//     {
//       value: language === "ps" ? "فقهي مسائل" : "Fiqh Issues",
//       label: language === "ps" ? "فقهي مسائل" : "Fiqh Issues",
//     },
//     {
//       value: language === "ps" ? "اسلامي قانون" : "Islamic Law",
//       label: language === "ps" ? "اسلامي قانون" : "Islamic Law",
//     },
//     {
//       value: language === "ps" ? "اخلاق" : "Akhlaq",
//       label: language === "ps" ? "اخلاق" : "Akhlaq",
//     },
//   ];
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem dir={language === "en" ? "ltr" : "rtl"}>
//           <FormLabel>
//             {language === "ps" ? "د کټګورۍ نوم" : "Book Category"}
//           </FormLabel>
//           <FormControl>
//             <Input
//               type="text"
//               list="category-list"
//               placeholder={
//                 language === "ps"
//                   ? "کټګورۍ ولیکئ یا انتخاب کړئ..."
//                   : "Type or select category..."
//               }
//               {...field}
//               className={cn(
//                 "w-full ",
//                 language === "en" ? "text-left" : "text-right"
//               )}
//               dir={language === "en" ? "ltr" : "rtl"}
//               autoComplete="off"
//             />
//           </FormControl>
//           <datalist id="category-list">
//             {popularCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </datalist>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

/////////////////////////////////////////////////
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Label } from "@/components/ui/label";

interface Props {
  form: UseFormReturn<any>;
  name: string;
  language: string;
}

export default function CategoryField({ form, name, language }: Props) {
  const isPashto = language === "ps";
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const rawCategories = [
    { ps: "فقه", en: "Fiqh" },
    { ps: "تفسير", en: "Tafsir" },
    { ps: "حديث", en: "Hadith" },
    { ps: "عقيده", en: "Aqeedah" },
    { ps: "سيرت", en: "Seerah" },
    { ps: "تصوف", en: "Tasawwuf" },
    { ps: "فقهي مسائل", en: "Fiqh Issues" },
    { ps: "اسلامي قانون", en: "Islamic Law" },
    { ps: "اخلاق", en: "Akhlaq" },
  ];

  const categories = useMemo(
    () =>
      rawCategories.map((cat) => ({
        label: isPashto ? cat.ps : cat.en,
        value: isPashto ? cat.ps : cat.en,
      })),
    [isPashto]
  );

  const filtered = useMemo(() => {
    const v = inputValue.trim().toLowerCase();
    return categories.filter((cat) => cat.value.toLowerCase().includes(v));
  }, [categories, inputValue]);

  const handleAddCustom = () => {
    setNewCategory(inputValue.trim());
    setDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (newCategory) {
      form.setValue(name, newCategory);
      setDialogOpen(false);
      setOpen(false);
    }
  };

  const renderCategoryDialog = () => {
    const content = (
      <div className={cn("grid gap-4", !isDesktop && "px-4")}>
        <div className="grid gap-2">
          <Label htmlFor="new-category">"New Category"</Label>
          <Input
            id="new-category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder={"Enter category name..."}
          />
        </div>
        <Button onClick={handleSaveCategory}>"Save"</Button>
      </div>
    );

    return isDesktop ? (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>"Add New Category"</DialogTitle>
            <DialogDescription>
              "Write and save your custom category here."
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>"Add New Category"</DrawerTitle>
            <DrawerDescription>
              "Write and save your custom category here.
            </DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              "Cancel"
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem dir={isPashto ? "rtl" : "ltr"}>
            <FormLabel>{isPashto ? "د کټګورۍ نوم" : "Book Category"}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {field.value
                      ? categories.find((cat) => cat.value === field.value)
                          ?.label || field.value
                      : isPashto
                      ? "کټګورۍ انتخاب کړئ..."
                      : "Select category..."}
                    <ChevronsUpDown className="opacity-50 w-4 h-4" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    value={inputValue}
                    onValueChange={setInputValue}
                    placeholder={
                      isPashto ? "کټګورۍ لټوئ..." : "Search category..."
                    }
                    className="h-9"
                  />
                  <CommandList>
                    {filtered.length > 0 ? (
                      <CommandGroup>
                        {filtered.map((cat) => (
                          <CommandItem
                            key={cat.value}
                            value={cat.value}
                            onSelect={() => {
                              form.setValue(name, cat.value);
                              setOpen(false);
                            }}
                          >
                            {cat.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === cat.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : (
                      <div className="p-2">
                        <Button
                          onClick={handleAddCustom}
                          variant="ghost"
                          className="w-full"
                        >
                          ➕{" "}
                          {isPashto
                            ? ` Add "${inputValue}" as new category`
                            : `Add "${inputValue}" as new category`}
                        </Button>
                      </div>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      {renderCategoryDialog()}
    </>
  );
}
