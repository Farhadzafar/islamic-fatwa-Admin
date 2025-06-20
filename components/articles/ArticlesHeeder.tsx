import { Button } from "../ui/button";
import { Download, Plus, PlusIcon } from "lucide-react";
import Link from "next/link";
import UploadButton from "../share/UploadButton";
const language = [
  {
    name: "Pashto",
    value: "ps",
    link: "/admin/articles/upload?lang=ps",
  },
  {
    name: "English",
    value: "en",
    link: "/admin/articles/upload?lang=en",
  },
  {
    name: "Arabic",
    value: "ar",
    link: "/admin/articles/upload?lang=ar",
  },
];

export default function ArticlesHeeder() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-1 shadow px-4 py-3 rounded">
      <div>
        <h1 className="text-2xl font-bold mb-1">Articles Management</h1>
        <p className="text-gray-600">Manage articles</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>

        <UploadButton language={language} />
      </div>
    </div>
  );
}
