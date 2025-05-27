"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectItem } from "@/components/ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const selectStyles = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

const fatwaSchema = z.object({
  len: z.string().min(2, { message: "Language code required" }),
  title: z.string().min(2, { message: "Title required" }),
  description: z.string().min(20, { message: "Description required" }),
  category: z.string(),
  tags: z.array(z.string()).min(1, { message: "At least one tag required" }),
  status: z.enum(["publish", "pending", "draft"]),
  mezhab: z.string(),
  fatwaBy: z.string().min(2, { message: "Fatwa By required" }),
  verified: z.boolean(),
  reference: z.array(
    z.string().min(1, { message: "At least one reference required" })
  ),
});

export default function FatwaForm() {
  const form = useForm<z.infer<typeof fatwaSchema>>({
    resolver: zodResolver(fatwaSchema),
    defaultValues: {
      len: "en",
      title: "",
      description: "",
      category: "",
      tags: [],
      status: "publish",
      mezhab: "",
      fatwaBy: "",
      verified: false,
      reference: [""],
    },
  });

  function onSubmit(values: z.infer<typeof fatwaSchema>) {
    console.log(values);
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Submit a New Fatwa
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-xl"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="len"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <select {...field} className={selectStyles}>
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="ps">Pashto</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mezhab"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mezhab</FormLabel>
                  <FormControl>
                    <select {...field} className={selectStyles}>
                      <option value="Hanafi">Hanafi</option>
                      <option value="Maliki">Maliki</option>
                      <option value="Shafi">Shafi</option>
                      <option value="Hanbali">Hanbali</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Fiqh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fatwaBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fatwa By</FormLabel>
                  <FormControl>
                    <Input placeholder="Ahmad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    className="textarea textarea-bordered min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prayer, Travel, Fiqh"
                      value={field.value.join(",")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((tag) => tag.trim())
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>References (comma separated URLs)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/reference1, https://example.com/reference2"
                      value={field.value.join(",")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((ref) => ref.trim())
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="btn btn-primary px-8 py-2 rounded-lg shadow hover:shadow-lg transition"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
