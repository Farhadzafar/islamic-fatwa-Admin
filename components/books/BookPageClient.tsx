"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BookCard } from "./BookCard";
import getAllBooks, { deleteBook } from "@/lib/data/books";
import { Card } from "../ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 12;

type FiltersCardProps = {
  categories: {
    id: string;
    ps: string;
    en: string;
    ar: string;
  }[];
  statuses: { value: string; label: string }[];
  languages?: { name: string; code: string }[];
};

export default function BookPageClient({
  categories,
  statuses,
  languages,
}: FiltersCardProps) {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchBooks = useCallback(
    async (pageToLoad = DEFAULT_PAGE, append = false) => {
      setLoading(true);
      try {
        const { books: fetchedBooks, hasMore: more } = await getAllBooks(
          pageToLoad,
          PAGE_LIMIT,
          {
            category: selectedCategory,
            language: selectedLanguage,
            status: selectedStatus,
            search,
          }
        );
        setBooks((prev) =>
          append ? [...prev, ...fetchedBooks] : fetchedBooks
        );
        setHasMore(more);
        setPage(pageToLoad);
      } catch (err) {
        console.error("❌ Error loading books:", err);
      } finally {
        setLoading(false);
      }
    },
    [search, selectedCategory, selectedLanguage, selectedStatus]
  );

  useEffect(() => {
    fetchBooks(DEFAULT_PAGE);
  }, [fetchBooks]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        fetchBooks(page + 1, true);
      }
    });
    const sentinel = observerRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [fetchBooks, loading, hasMore, page]);

  const handleDeleteBook = async (id: string) => {
    const success = await deleteBook(id);
    if (success) {
      setBooks((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const handleEditBook = (id: string) => {
    console.log("Edit book with ID:", id);
  };

  const handleFilterChange = () => {
    fetchBooks(DEFAULT_PAGE);
  };

  return (
    <div className="space-y-8 p-8">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={handleFilterChange}
              placeholder="Search books by title..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                handleFilterChange();
              }}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.en.toLowerCase()}>
                  {cat.en}
                </option>
              ))}
            </select>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                handleFilterChange();
              }}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="all">All Languages</option>
              {languages?.map((lang) => (
                <option key={lang.name} value={lang.code.toLowerCase()}>
                  {lang.name} ({lang.code})
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                handleFilterChange();
              }}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="all">All Statuses</option>
              {statuses.map((stat) => (
                <option key={stat.value} value={stat.value.toLowerCase()}>
                  {stat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <BookCard
        books={books}
        onDelete={handleDeleteBook}
        onEdit={handleEditBook}
      />

      <div ref={observerRef} className="h-10" />

      {loading && (
        <p className="text-center text-gray-500">Loading more books...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400">✅ No more books to load.</p>
      )}
    </div>
  );
}
