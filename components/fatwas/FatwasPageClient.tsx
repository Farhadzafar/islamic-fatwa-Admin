"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ مهم
import FatwaCard from "./FatwaCard";
import { deleteFatwa, getFatwas } from "@/lib/data/fatwa";

export default function FatwasPageClient() {
  const [fatwas, setFatwas] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const { fatwas: newFatwas, hasMore: more } = await getFatwas(page);
    setFatwas((prev) => [...prev, ...newFatwas]);
    setPage((prev) => prev + 1);
    setHasMore(more);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      <div ref={observerRef} className="h-20" />
      {loading && (
        <p className="text-center text-gray-500">Loading more fatwas...</p>
      )}
      {!hasMore && (
        <p className="text-center text-gray-400">✅ No more fatwas to load.</p>
      )}
    </div>
  );
}
