"use client";

import { useEffect, useRef, useState } from "react";
import FatwaCard from "./FatwaCard";
import { getFatwas } from "@/lib/data/fatwa";

export default function FatwasPageClient() {
  const [fatwas, setFatwas] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // ← اضافه شو
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    // if (loading) return; // ← کنټرول شو
    setLoading(true);
    const { fatwas: newFatwas, hasMore: more } = await getFatwas(page);
    setFatwas((prev) => [...prev, ...newFatwas]);
    console.log(hasMore, "🫰🫰🫰🫰🫰🫰🫰🫰");
    setPage((prev) => prev + 1);
    setHasMore(more); // ← update شو
    setLoading(false);
  };

  useEffect(() => {
    loadMore(); // initial load
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;
    console.log("Observer initialized");

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Observer triggered, loading more fatwas");
        loadMore();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef.current]);

  return (
    <div className="space-y-8 p-8">
      <FatwaCard fatwas={fatwas} />
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
