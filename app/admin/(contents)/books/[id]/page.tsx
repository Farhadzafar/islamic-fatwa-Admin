import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBookById } from "@/lib/data/books";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const book = await getBookById(id);
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className=" max-w-7xl mx-auto px-4 mb-4">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/admin/books">
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </Link>
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
                      src={book.coverImageUrl}
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
                    {book.category}
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
                        {book.fileSizeMB ? `${book.fileSizeMB} MB` : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {book.fileLink && (
                      <a href={book.fileLink} target="_blank" rel="noreferrer">
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
              <Card className=" bg-white rounded p-6 border">
                <h2 className="text-xl font-semibold mb-4">About this Book</h2>
                <div className="prose max-w-none">
                  {book.description
                    .split("\n\n")
                    .map((p: string, i: number) => (
                      <p key={i} className="mb-4">
                        {p}
                      </p>
                    ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar (Optional Info) */}
          <div className="space-y-8">
            <Card className=" bg-white rounded p-6 border">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Uploaded By</span>
                  <span className="font-medium">{book.uploadedBy ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created</span>
                  <span className="font-medium">
                    {book.createdAt
                      ? new Date(book.createdAt).toLocaleDateString()
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
