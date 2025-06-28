import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical, Star, Download, Clock } from "lucide-react";
import ActionMenu from "../share/ActionMenu";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  category: string;
  coverImageUrl: string;
  description: string;
  fileLink: string;
  fileSizeMB: number;
  language: string;
  pageCount: number;
  rating: number;
  createdAt: string;
  uploadedBy?: string | null;
  downloads?: number; // ✅ Fix missing field
}

interface BookCardProps {
  books: Book[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function BookCard({ books, onDelete, onEdit }: BookCardProps) {
  if (!Array.isArray(books) || books.length === 0) {
    return <p className="text-center text-gray-400">📚 No books available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book, i) => {
        const imageUrl = book.coverImageUrl?.startsWith("http")
          ? book.coverImageUrl
          : book.coverImageUrl && process.env.NEXT_PUBLIC_API_ENDPOINT
          ? `${
              process.env.NEXT_PUBLIC_API_ENDPOINT
            }${book.coverImageUrl.replace("/public", "")}`
          : null;

        return (
          <div
            key={i}
            className="rounded-lg border hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="relative h-40 bg-gray-100">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={book.title || "Book Cover"}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No Cover Image
                </div>
              )}
              <div className="absolute top-2 right-2">
                <ActionMenu
                  id={book._id ?? ""}
                  onDelete={onDelete ?? (() => Promise.resolve(false))}
                  onEdit={onEdit ?? (() => {})}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600">
                  Published
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{book.rating ?? 0}</span>
                </div>
              </div>

              <Link href={`/admin/books/${book._id}`}>
                <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">
                  {book.title || "Untitled Book"}
                </h3>
              </Link>

              <p className="text-sm text-gray-600 mb-3">
                by {book.author || "Unknown"}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {(book.downloads ?? 0).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDate(book.createdAt) || "N/A"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
