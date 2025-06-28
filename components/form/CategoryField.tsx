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
import { UseFormReturn } from "react-hook-form";
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
  const isArabic = language === "ar";
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const rawCategories = [
    {
      id: "6859544d68b989660de6f629",
      ps: "واده",
      en: "Marriage",
      ar: "الزواج",
    },
    { id: "6859544d68b989660de6f62a", ps: "طلاق", en: "Divorce", ar: "الطلاق" },
    { id: "6859544d68b989660de6f62b", ps: "نماز", en: "Prayer", ar: "الصلاة" },
    { id: "6859544d68b989660de6f62c", ps: "روژه", en: "Fasting", ar: "الصيام" },
    { id: "6859544d68b989660de6f62d", ps: "زکات", en: "Zakat", ar: "الزكاة" },
    { id: "6859544d68b989660de6f63a", ps: "تجارت", en: "Trade", ar: "التجارة" },
    {
      id: "6859544d68b989660de6f63b",
      ps: "خوراک او څښاک",
      en: "Food & Drink",
      ar: "الطعام والشراب",
    },
    {
      id: "6859544d68b989660de6f63c",
      ps: "کورنۍ اړیکې",
      en: "Family Relations",
      ar: "العلاقات الأسرية",
    },
    {
      id: "6859544d68b989660de6f643",
      ps: "میراث",
      en: "Inheritance",
      ar: "الميراث",
    },
    { id: "6859642f8c140503427e8c57", ps: "نکاح", en: "Nikah", ar: "النكاح" },
  ];

  const categories = useMemo(
    () =>
      rawCategories.map((cat) => ({
        id: cat.id,
        label: isPashto ? cat.ps : isArabic ? cat.ar : cat.en,
      })),
    [isPashto, isArabic]
  );

  const filtered = useMemo(() => {
    const v = inputValue.trim().toLowerCase();
    return categories.filter((cat) => cat.label.toLowerCase().includes(v));
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
          <Label htmlFor="new-category">New Category</Label>
          <Input
            id="new-category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder={"Enter category name..."}
          />
        </div>
        <Button onClick={handleSaveCategory}>Save</Button>
      </div>
    );

    return isDesktop ? (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Write and save your custom category here.
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add New Category</DrawerTitle>
            <DrawerDescription>
              Write and save your custom category here.
            </DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
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
                      ? categories.find((cat) => cat.id === field.value)
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
                            key={cat.id}
                            value={cat.id}
                            onSelect={() => {
                              form.setValue(name, cat.id);
                              setOpen(false);
                            }}
                          >
                            {cat.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === cat.id
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
                            ? ` "${inputValue}" نوی کټګوري اضافه کړئ`
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
