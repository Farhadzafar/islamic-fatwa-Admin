// ResearchPaperCard.tsx
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  GraduationCap,
  Download,
  Link,
  User,
} from "lucide-react";

export function ResearchPaperCard({ paper }: { paper: any }) {
  return (
    <div className="p-4 rounded-lg border hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                paper.status === "Published"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {paper.status}
            </span>
            <span className="text-sm text-gray-500">{paper.category}</span>
          </div>
          <h3 className="font-medium text-lg mb-2">{paper.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GraduationCap className="w-4 h-4" />
            <span>{paper.institution}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {paper.author}
          </span>
          <span className="flex items-center gap-1">
            <Link className="w-4 h-4" />
            {paper.citations} citations
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {paper.downloads} downloads
          </span>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
}
