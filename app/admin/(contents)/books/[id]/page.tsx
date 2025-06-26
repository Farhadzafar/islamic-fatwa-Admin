"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBookById } from "@/lib/data/books";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (typeof id !== "string") return;

        const bookData = await getBookById(id);
        if (!bookData) {
          setError("❌ Book not found or failed to load.");
        } else {
          setBook(bookData);
        }
      } catch (err) {
        setError("❌ An error occurred while fetching the book.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Loading book details...
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Book not found."}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded p-6 border">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover */}
                <div className="w-full md:w-48 lg:w-64 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                  {book.coverImageUrl ? (
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}${book.coverImageUrl.replace('/public', '')}`}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />

                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Cover
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="flex-1">
                  <span className="px-3 py-1 mb-2 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block">
                    {book.category.name || "Uncategorized"}
                  </span>

                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                    {book.title}
                  </h1>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-500 text-sm">Author</p>
                      <p className="font-medium">{book.author}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Language</p>
                      <p className="font-medium">{book.language}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Pages</p>
                      <p className="font-medium">{book.pageCount ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Size</p>
                      <p className="font-medium">
                        {book.fileSizeMB ? `${Number(book.fileSizeMB).toFixed(3)} MB` : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {book?.fileLink && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}${book.fileLink.replace('/public', '')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </a>
                        )}

                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <Card className="bg-white rounded p-6 border">
                <h2 className="text-xl font-semibold mb-4">About this Book</h2>
                <div className="prose max-w-none">
                  {book.description.split("\n\n").map((p: string, i: number) => (
                    <p key={i} className="mb-4">
                      {p}
                    </p>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="bg-white rounded p-6 border">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Uploaded By</span>
                  <span className="font-medium">{book.uploadedBy?.fullName ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created</span>
                  <span className="font-medium">
                    {book.createdAt
                      ? formatDate(book.createdAt)
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-medium">{book.rating ?? "—"}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
