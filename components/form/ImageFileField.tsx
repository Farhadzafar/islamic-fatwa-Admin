import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ImageIcon } from "lucide-react";
import React, { useRef, useState } from "react";

interface ImageFileFieldProps {
  form: any; // your react-hook-form form object
  language: string;
  name: string;
}

export default function ImageFileField({
  form,
  language,
  name,
}: ImageFileFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            field.onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
          }
        };

        return (
          <FormItem dir={language === "en" ? "ltr" : "rtl"}>
            <FormLabel>
              {language === "ps" ? "پوښښ عکس" : "Cover Image"}
            </FormLabel>

            <FormControl>
              <div
                onClick={handleImageClick}
                className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </FormControl>

            <input
              type="file"
              accept="image/*"
              ref={(ref) => {
                fileInputRef.current = ref;
                field.ref(ref);
              }}
              onChange={handleChange}
              className="hidden"
            />

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
