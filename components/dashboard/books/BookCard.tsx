// BookCard.tsx
import { Button } from "@/components/ui/button";
import { MoreVertical, Star, Download, Clock } from "lucide-react";

export function BookCard({ book }: { book: any }) {
  return (
    <div className="rounded-lg border hover:shadow-lg transition-all overflow-hidden">
      <div className="relative h-40">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              book.status === "Published"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-yellow-50 text-yellow-600"
            }`}
          >
            {book.status}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">{book.rating}</span>
          </div>
        </div>
        <h3 className="font-medium text-lg mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {book.downloads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {book.lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
}
