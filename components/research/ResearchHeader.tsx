import { Button } from "../ui/button";
import { Download, Plus, PlusIcon } from "lucide-react";
import UploadButton from "../share/UploadButton";
const language = [
  {
    name: "Pashto",
    value: "ps",
    link: "/admin/research/upload?lang=ps",
  },
  {
    name: "English",
    value: "en",
    link: "/admin/research/upload?lang=en",
  },
  {
    name: "Arabic",
    value: "ar",
    link: "/admin/research/upload?lang=ar",
  },
];

export default function ResearchHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Research Management</h1>
        <p className="text-gray-600">Manage research papers</p>
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
