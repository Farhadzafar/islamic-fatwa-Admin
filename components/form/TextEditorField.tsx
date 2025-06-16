"use client";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LinkIcon,
  Unlink,
  Undo,
  Redo,
  Quote,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface RichTextEditorFieldProps {
  form: { control: Control<FieldValues> };
  name: string;
  language: "en" | "ps";
}

export default function RichTextEditorField({
  form,
  name,
  language,
}: RichTextEditorFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem dir={language === "ps" ? "rtl" : "ltr"}>
          <FormLabel>
            {language === "ps" ? "متن ولیکئ" : "Write content"}
          </FormLabel>
          <FormControl>
            <TiptapEditor
              content={field.value}
              onUpdate={field.onChange}
              language={language}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Enhanced Editor with comprehensive toolbar
function TiptapEditor({
  content,
  onUpdate,
  language,
}: {
  content: string;
  onUpdate: (html: string) => void;
  language: "en" | "ps";
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Code,
      CodeBlock,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "border-0 p-4 prose dark:prose-invert focus:outline-none min-h-[300px] max-w-none",
        dir: language === "ps" ? "rtl" : "ltr",
      },
    },
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
  });

  // Keep external value in sync
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border rounded-lg shadow-sm overflow-hidden">
      {/* Enhanced Toolbar */}
      <div className="border-b px-3 py-2 bg-gray-50 dark:bg-gray-800 flex items-center gap-1 flex-wrap">
        {/* History */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "h-8 px-2 font-bold",
            editor.isActive("heading", { level: 1 }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "h-8 px-2 font-bold",
            editor.isActive("heading", { level: 2 }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            "h-8 px-2 font-bold",
            editor.isActive("heading", { level: 3 }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text Formatting */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "h-8 w-8 p-0 font-bold",
            editor.isActive("bold") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "h-8 w-8 p-0 italic",
            editor.isActive("italic") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleMark("underline").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("underline") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("strike") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("code") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <CodeIcon className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("bulletList") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("orderedList") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "left" }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "center" }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "right" }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "justify" }) &&
              "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Links */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("link") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="h-8 w-8 p-0"
        >
          <Unlink className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Block Elements */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("blockquote") && "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor content */}
      <div className="bg-white dark:bg-gray-900">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
