// ResearchPaperCard.tsx
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  GraduationCap,
  Download,
  Link as link,
  User,
} from "lucide-react";
import Link from "next/link";
import { string } from "zod";
import ActionMenu from "../share/ActionMenu";

// types/ResearchPaper.ts

export interface Research {
  _id?: string;
  title: string;
  abstract: string;
  status?: string;
  citations: number;
  authors?: {
    fullName?: string;
    bio?: string;
    affiliation?: string;
  };
  language: "en" | "ps" | "ar";
  downloadCount: number;
  category: {
    _id: string;
    name: string;
  };
  fileSize: string; // in bytes, from API
  pageCount: number;
  uploadedBy: {
    _id: string;
    fullName?: string;
    image?: string;
    bio?: string;
  };
  keywords?: string[];
  publishedDate: string; // ISO date
  createdAt: string; // ISO date
}

interface ResearchCardProps {
  research: Research;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function ResearchPaperCard({
  research,
  onDelete,
  onEdit,
}: ResearchCardProps) {
  return (
    <div className="p-4 rounded-lg border hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                research?.status === "Published"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {research.status}
            </span>
            <span className="text-sm text-gray-500">
              {research.category?.name ?? "No Category"}
            </span>
          </div>
          <h3 className="font-medium text-lg m-2">{research.title}</h3>
          <div className="flex items-start gap-4 mb-6">
            <GraduationCap className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">{research.authors?.fullName}</h3>
              {research.authors?.bio && (
                <p className="text-sm text-gray-600">{research.authors?.bio}</p>
              )}
              {research.authors?.affiliation && (
                <p className="text-sm text-gray-600">
                  {research.authors?.affiliation}
                </p>
              )}
            </div>
          </div>
        </div>
        <ActionMenu
          id={research._id ?? ""}
          onDelete={onDelete ?? (() => Promise.resolve(false))}
          onEdit={onEdit ?? (() => {})}
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            {/* <User className="w-4 h-4" /> */}
            Uploade_by:
            {research.uploadedBy?.fullName ?? "Not Find"}
          </span>
          <span className="flex items-center gap-1">
            <link className="w-4 h-4" />
            {research.citations} citations
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {research.downloadCount} downloads
          </span>
        </div>
        <Button>
          <Link href={`/admin/research/${research._id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
