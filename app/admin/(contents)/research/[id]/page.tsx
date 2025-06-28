"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Download,
  Share2,
  FileText,
  ArrowLeft,
  Eye,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar,
  Building2,
  BookmarkPlus,
  Printer,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { getResearchById } from "@/lib/data/research";
import { useParams } from "next/navigation";

// Define interface for better type safety
interface ResearchPaper {
  _id: string;
  title: string;
  abstract: string;
  authors: {
    fullName: string;
    bio: string;
    affiliation: string;
  };
  category: {
    name: string;
    _id: string;
  };
  language: string;
  status: string;
  fileUrl: string;
  fileSize: string;
  pageCount: number;
  uploadedBy: {
    email: string;
    fullName: string;
    _id: string;
  };
  publishedDate: string;
  downloadCount: number;
  keywords: string[];
  createdAt: string;
}

export default function ResearchPaperDetailPage() {
  const [paper, setPaper] = useState<ResearchPaper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    async function fetchPaper() {
      try {
        if (typeof id === "string") {
          const response = await getResearchById(id);
          setPaper(response.data);
        } else {
          throw new Error("Invalid research paper ID.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load research");
        toast({
          title: "Error",
          description: err.message || "Failed to load research",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchPaper();
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading research paper...
      </main>
    );
  }

  if (error || !paper) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load research paper.
      </main>
    );
  }

  console.log("✈️✈️✈️✈️✈️", paper);
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      {/* Back Button - Mobile */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/admin/research">
            <ArrowLeft className="w-4 h-4" />
            Back to Research Papers
          </Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Paper Header */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Research Paper
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(paper.publishedDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  {paper.pageCount} pages
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-6">{paper.title}</h1>

              {/* Author Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg">
                  {paper.authors.fullName}
                </h3>
                <p className="text-sm text-gray-600">{paper.authors.bio}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  {paper.authors.affiliation}
                </div>
              </div>

              {/* Paper Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-primary mb-1">
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">{paper.downloadCount}</span>
                  </div>
                  <p className="text-sm text-gray-600">Downloads</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-primary mb-1">
                    <Eye className="w-5 h-5" />
                    <span className="font-semibold">0</span>
                  </div>
                  <p className="text-sm text-gray-600">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-primary mb-1">
                    <Globe className="w-5 h-5" />
                    <span className="font-semibold">{paper.language}</span>
                  </div>
                  <p className="text-sm text-gray-600">Language</p>
                </div>
              </div>
            </Card>

            {/* Abstract */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Abstract</h2>
              <div
                className={`relative ${
                  !isAbstractExpanded && "max-h-[200px] overflow-hidden"
                }`}
              >
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: paper.abstract }}
                />
                {!isAbstractExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
                className="mt-4 gap-2"
              >
                {isAbstractExpanded ? (
                  <>
                    Show Less
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </Card>

            {/* Keywords */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {paper.keywords.length > 0 ? (
                  paper.keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {kw}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No keywords provided.</p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Download & Actions */}
            <Card className="p-6">
              <Button className="w-full gap-2 mb-4" asChild>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}${paper.fileUrl}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Download Paper
                </a>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2">
                  <BookmarkPlus className="w-4 h-4" />
                  Save
                </Button>
                <Button variant="outline" className="gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button variant="outline" className="gap-2">
                  <Flag className="w-4 h-4" />
                  Report
                </Button>
              </div>
            </Card>

            {/* Paper Details */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Paper Details</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{paper.category.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size</span>
                  <span className="font-medium">{paper.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upload by</span>
                  <span className="font-medium">
                    {paper.uploadedBy.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium capitalize">{paper.status}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
