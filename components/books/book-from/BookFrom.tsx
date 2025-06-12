"use client";
import React, { useRef, useState } from "react";
import { BookSchema } from "./BookSchama";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const selectStyle = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

export default function BookForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    title: "",
    author: "",
    summary: "",
    publishDate: "",
    coverImage: undefined as File | undefined,
    file: undefined as File | undefined,
    category: "",
    madhab: "",
    language: "",
  };
  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: defaultValues,
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted with values:", values);

    // Simulate upload
    await new Promise((res) => setTimeout(res, 1000));

    setIsSubmitting(false);
    // Reset form after submission
    form.reset(defaultValues);
    setPreview(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Upload Form</h1>
      <p className="text-sm text-gray-500 mb-4">
        Please fill out the form below to upload a new book. All fields are
        required.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Language</FormLabel>
                  <FormControl>
                    <select {...field} className={selectStyle}>
                      <option value="">Select language</option>
                      <option value="en">English</option>
                      <option value="ps">پښتو</option>
                      <option value="ar">عربي</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="madhab"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Madhab</FormLabel>
                  <FormControl>
                    <select {...field} className={selectStyle}>
                      <option value="">Select Madhab</option>
                      <option value="hanafi">Hanafi</option>
                      <option value="maliki">Maliki</option>
                      <option value="shafi">Shafi</option>
                      <option value="hanbali">Hanbali</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Category</FormLabel>
                  <FormControl>
                    <select {...field} className={selectStyle}>
                      <option value="">Select category</option>
                      <option value="quran">Quran</option>
                      <option value="hadith">Hadith</option>
                      <option value="history">History</option>
                      <option value="literature">Islamic Literature</option>
                      <option value="islamic_history">Islamic History</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter book summary..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book PDF File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-end">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => {
                const handleChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                };

                return (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
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
                        <input
                          type="file"
                          accept="image/*"
                          ref={(ref) => {
                            fileInputRef.current = ref;
                            field.ref(ref); // connect to RHF
                          }}
                          onChange={handleChange}
                          className="hidden"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Submit Book
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
