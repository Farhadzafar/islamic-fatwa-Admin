// "use client";
// import { useEffect, useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Heading from "@tiptap/extension-heading";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import Link from "@tiptap/extension-link";

// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Dialog, DialogContent } from "@/components/ui/dialog";

// import { cn } from "@/lib/utils";
// import {
//   Bold,
//   Italic,
//   Strikethrough,
//   CodeIcon,
//   Heading1,
//   Heading2,
//   Heading3,
//   List,
//   ListOrdered,
//   LinkIcon,
//   Unlink,
//   Undo,
//   Redo,
//   Quote,
//   Minus,
// } from "lucide-react";

// interface RichTextEditorFieldProps {
//   form: any;
//   name: string;
//   language: "en" | "ps" | string;
// }

// export default function RichTextEditorField({
//   form,
//   name,
//   language,
// }: RichTextEditorFieldProps) {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem dir={language === "ps" ? "rtl" : "ltr"}>
//           <FormLabel>
//             {language === "ps" ? "متن ولیکئ" : "Write content"}
//           </FormLabel>
//           <FormControl>
//             <TiptapEditor
//               content={field.value}
//               onUpdate={field.onChange}
//               language={language}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

// function TiptapEditor({
//   content,
//   onUpdate,
//   language,
// }: {
//   content: string;
//   onUpdate: (html: string) => void;
//   language: string;
// }) {
//   const [ayahInput, setAyahInput] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Heading.configure({ levels: [1, 2, 3] }),
//       BulletList,
//       OrderedList,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: "text-blue-600 underline cursor-pointer",
//         },
//       }),
//     ],
//     content: content || "",
//     onUpdate({ editor }) {
//       onUpdate(editor.getHTML());
//     },
//   });

//   useEffect(() => {
//     if (editor && editor.getHTML() !== content) {
//       editor.commands.setContent(content || "");
//     }
//   }, [content, editor]);

//   const addLink = () => {
//     const url = window.prompt("Enter URL:");
//     if (url) {
//       editor?.chain().focus().setLink({ href: url }).run();
//     }
//   };

//   const insertAyahs = async () => {
//     const ayahs = ayahInput
//       .split(",")
//       .map((a) => a.trim())
//       .filter(Boolean);

//     const results: string[] = [];

//     for (const ayah of ayahs) {
//       try {
//         const res = await fetch(
//           `https://api.alquran.cloud/v1/ayah/${ayah}/quran-uthmani`
//         );
//         const data = await res.json();
//         if (data.status === "OK") {
//           results.push(`<p><strong>(${ayah})</strong> ${data.data.text}</p>`);
//         }
//       } catch (error) {
//         results.push(`<p><strong>(${ayah})</strong> ❌ Not found</p>`);
//       }
//     }

//     editor?.chain().focus().insertContent(results.join("\n")).run();
//     setOpenModal(false);
//     setAyahInput("");
//   };

//   if (!editor) return null;

//   return (
//     <div className="bg-white dark:bg-gray-900 border rounded-lg shadow-sm overflow-hidden flex flex-col h-[500px]">
//       {/* Toolbar */}
//       <div className="border-b px-3 py-2 bg-gray-50 dark:bg-gray-800 flex items-center gap-1 flex-wrap flex-shrink-0">
//         {/* History */}
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().undo()}
//           className="h-8 w-8 p-0"
//           title="Undo"
//         >
//           <Undo className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().redo()}
//           className="h-8 w-8 p-0"
//           title="Redo"
//         >
//           <Redo className="h-4 w-4" />
//         </Button>

//         <Separator orientation="vertical" className="h-6 mx-1" />

//         {/* Headings */}
//         {[1, 2, 3].map((level) => (
//           <Button
//             key={level}
//             type="button"
//             variant="ghost"
//             size="sm"
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level }).run()
//             }
//             className={cn(
//               "h-8 px-2 font-bold",
//               editor.isActive("heading", { level }) &&
//                 "bg-gray-200 dark:bg-gray-700"
//             )}
//             title={`Heading ${level}`}
//           >
//             {level === 1 && <Heading1 className="h-4 w-4" />}
//             {level === 2 && <Heading2 className="h-4 w-4" />}
//             {level === 3 && <Heading3 className="h-4 w-4" />}
//           </Button>
//         ))}

//         <Separator orientation="vertical" className="h-6 mx-1" />

//         {/* Formatting */}
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={cn(
//             "h-8 w-8 p-0 font-bold",
//             editor.isActive("bold") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Bold"
//         >
//           <Bold className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={cn(
//             "h-8 w-8 p-0 italic",
//             editor.isActive("italic") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Italic"
//         >
//           <Italic className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           className={cn(
//             "h-8 w-8 p-0",
//             editor.isActive("strike") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Strikethrough"
//         >
//           <Strikethrough className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleCode().run()}
//           className={cn(
//             "h-8 w-8 p-0",
//             editor.isActive("code") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Inline Code"
//         >
//           <CodeIcon className="h-4 w-4" />
//         </Button>

//         <Separator orientation="vertical" className="h-6 mx-1" />

//         {/* Lists */}
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={cn(
//             "h-8 w-8 p-0",
//             editor.isActive("bulletList") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Bullet List"
//         >
//           <List className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={cn(
//             "h-8 w-8 p-0",
//             editor.isActive("orderedList") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Numbered List"
//         >
//           <ListOrdered className="h-4 w-4" />
//         </Button>

//         <Separator orientation="vertical" className="h-6 mx-1" />

//         {/* Links */}
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={addLink}
//           className={cn(
//             "h-8 w-8 p-0",
//             editor.isActive("link") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Add Link"
//         >
//           <LinkIcon className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().unsetLink().run()}
//           disabled={!editor.isActive("link")}
//           className="h-8 w-8 p-0"
//           title="Remove Link"
//         >
//           <Unlink className="h-4 w-4" />
//         </Button>

//         <Separator orientation="vertical" className="h-6 mx-1" />

//         {/* Block */}
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           className={cn(
//             "h-8 w-8 p-0",
//             editor.isActive("blockquote") && "bg-gray-200 dark:bg-gray-700"
//           )}
//           title="Quote"
//         >
//           <Quote className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().setHorizontalRule().run()}
//           className="h-8 w-8 p-0"
//           title="Horizontal Rule"
//         >
//           <Minus className="h-4 w-4" />
//         </Button>

//         <Separator orientation="vertical" className="h-6 mx-1" />

//         {/* 📖 Ayah Insert Button */}
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => setOpenModal(true)}
//           className="h-8 px-2"
//           title="Add Quran Ayah"
//         >
//           📖 Ayah
//         </Button>
//       </div>

//       {/* Editor */}
//       <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
//         <EditorContent
//           editor={editor}
//           className="h-full [&_.ProseMirror]:min-h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:prose [&_.ProseMirror]:dark:prose-invert [&_.ProseMirror]:max-w-none"
//         />
//       </div>

//       {/* Ayah Modal */}
//       <Dialog open={openModal} onOpenChange={setOpenModal}>
//         <DialogContent className="sm:max-w-md">
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium">
//               Enter Ayah(s):{" "}
//               <span className="text-muted">(e.g. 2:255, 1:2, 43:4)</span>
//             </label>
//             <input
//               type="text"
//               value={ayahInput}
//               onChange={(e) => setAyahInput(e.target.value)}
//               className="border p-2 rounded"
//               placeholder="e.g. 2:255, 1:2"
//             />
//             <Button onClick={insertAyahs} className="mt-2">
//               Insert Ayahs
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Strikethrough,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  LinkIcon,
  Unlink,
  Undo,
  Redo,
  Quote,
  Minus,
} from "lucide-react";

interface RichTextEditorFieldProps {
  form: any;
  name: string;
  language: "en" | "ps" | string;
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

function TiptapEditor({
  content,
  onUpdate,
  language,
}: {
  content: string;
  onUpdate: (html: string) => void;
  language: string;
}) {
  const [ayahInput, setAyahInput] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
    ],
    content: content || "",
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
  });

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

  const insertAyahs = async () => {
    const ayahs = ayahInput
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const results: string[] = [];

    for (const ayah of ayahs) {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/ayah/${ayah}/quran-uthmani`
        );
        const data = await res.json();
        if (data.status === "OK") {
          results.push(`<p><strong>(${ayah})</strong> ${data.data.text}</p>`);
        }
      } catch (error) {
        results.push(`<p><strong>(${ayah})</strong> ❌ Not found</p>`);
      }
    }

    editor?.chain().focus().insertContent(results.join("\n")).run();
    setOpenModal(false);
    setAyahInput("");
  };

  if (!editor) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border rounded-lg shadow-sm overflow-hidden flex flex-col h-[500px]">
      {/* Toolbar */}
      <div className="border-b px-3 py-2 bg-gray-50 dark:bg-gray-800 flex items-center gap-1 flex-wrap flex-shrink-0">
        {/* History */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
          title="Undo"
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
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        {[1, 2, 3].map((level) => (
          <Button
            key={level}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 })
                .run()
            }
            className={cn(
              "h-8 px-2 font-bold",
              editor.isActive("heading", { level }) &&
                "bg-gray-200 dark:bg-gray-700"
            )}
            title={`Heading ${level}`}
          >
            {level === 1 && <Heading1 className="h-4 w-4" />}
            {level === 2 && <Heading2 className="h-4 w-4" />}
            {level === 3 && <Heading3 className="h-4 w-4" />}
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Formatting */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "h-8 w-8 p-0 font-bold",
            editor.isActive("bold") && "bg-gray-200 dark:bg-gray-700"
          )}
          title="Bold"
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
          title="Italic"
        >
          <Italic className="h-4 w-4" />
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
          title="Strikethrough"
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
          title="Inline Code"
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
          title="Bullet List"
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
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
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
          title="Add Link"
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
          title="Remove Link"
        >
          <Unlink className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Block */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("blockquote") && "bg-gray-200 dark:bg-gray-700"
          )}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="h-8 w-8 p-0"
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* 📖 Ayah Insert Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpenModal(true)}
          className="h-8 px-2"
          title="Add Quran Ayah"
        >
          📖 Ayah
        </Button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <EditorContent
          editor={editor}
          className="h-full [&_.ProseMirror]:min-h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:prose [&_.ProseMirror]:dark:prose-invert [&_.ProseMirror]:max-w-none"
        />
      </div>

      {/* Ayah Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Enter Ayah(s):{" "}
              <span className="text-muted">(e.g. 2:255, 1:2, 43:4)</span>
            </label>
            <input
              type="text"
              value={ayahInput}
              onChange={(e) => setAyahInput(e.target.value)}
              className="border p-2 rounded"
              placeholder="e.g. 2:255, 1:2"
            />
            <Button type="button" onClick={insertAyahs} className="mt-2">
              Insert Ayahs
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
