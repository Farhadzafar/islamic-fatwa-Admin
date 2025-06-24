"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FatwaCard from "./FatwaCard";
import { deleteFatwa, getFatwas } from "@/lib/data/fatwa";

export default function FatwasPageClient() {
  const [fatwas, setFatwas] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      console.log("👉 Fetching page:", nextPage);
      const { fatwas: newFatwas, hasMore: more } = await getFatwas(nextPage);

      setFatwas((prev) => [...prev, ...newFatwas]);
      setPage(nextPage);
      setHasMore(more);
    } catch (error) {
      console.error("⚠️ Failed to load fatwas:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    // Load the first page once on mount
    const fetchFirstPage = async () => {
      setLoading(true);
      try {
        const { fatwas: initialFatwas, hasMore: more } = await getFatwas(1);
        setFatwas(initialFatwas);
        setHasMore(more);
        setPage(1);
      } catch (err) {
        console.error("❌ Error loading first page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstPage();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const sentinel = observerRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loadMore]);

  const handleDeleteFatwa = async (id: string) => {
    const success = await deleteFatwa(id);
    if (success) {
      setFatwas((prev) => prev.filter((f) => f._id !== id));
    }
    return success;
  };

  const handleEditFatwa = (id: string) => {
    router.push(`/admin/fatwas/upload/${id}`);
  };

  return (
    <div className="space-y-8 p-8">
      <FatwaCard
        fatwas={fatwas}
        onDelete={handleDeleteFatwa}
        onEdit={handleEditFatwa}
      />
      <div ref={observerRef} className="h-10" />
      {loading && (
        <p className="text-center text-gray-500">Loading more fatwas...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400">✅ No more fatwas to load.</p>
      )}
    </div>
  );
}
