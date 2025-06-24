"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BookCard } from "./BookCard";
import getAllBooks, { deleteBook } from "@/lib/data/books";

export default function BookPageClient() {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const { books: newBooks, hasMore: more } = await getAllBooks(nextPage);
      console.log("📚 Loaded page", nextPage, newBooks);

      setBooks((prev) => [...prev, ...(newBooks || [])]);
      setPage(nextPage);
      setHasMore(more);
    } catch (error) {
      console.error("⚠️ Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);
  useEffect(() => {
    const fetchFirstPage = async () => {
      setLoading(true);
      try {
        const { books: initialBooks, hasMore: more } = await getAllBooks(1);
        console.log("🚀 First page books:", initialBooks);

        setBooks(initialBooks || []);
        setHasMore(more);
        setPage(1);
      } catch (err) {
        console.error("❌ Error loading first page:", err);
        setBooks([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstPage();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });

    const sentinel = observerRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loadMore]);

  // delete book function:
  const handleDeleteFatwa = async (id: string) => {
    const success = await deleteBook(id);
    if (success) {
      setBooks((prev) => prev.filter((f) => f._id !== id));
    }
    return success;
  };

  const handleEditFatwa = (id: string) => {
    // Implement edit functionality here
    console.log("Edit book with ID:", id);
  };

  return (
    console.log("📚📚📚📚📚 Rendering BookPageClient", books),
    (
      <div className="space-y-8 p-8">
        <BookCard
          books={books}
          onDelete={handleDeleteFatwa}
          onEdit={handleEditFatwa}
        />
        <div ref={observerRef} className="h-10" />
        {loading && (
          <p className="text-center text-gray-500">Loading more fatwas...</p>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-gray-400">
            ✅ No more fatwas to load.
          </p>
        )}
      </div>
    )
  );
}
