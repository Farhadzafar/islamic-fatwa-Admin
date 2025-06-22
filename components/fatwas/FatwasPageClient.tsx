"use client";

import { useEffect, useRef, useState } from "react";
import FatwaCard from "./FatwaCard";
import { deleteFatwa, getFatwas } from "@/lib/data/fatwa";

export default function FatwasPageClient() {
  const [fatwas, setFatwas] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // ← اضافه شو
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    console.log(!hasMore, "🫰🫰🫰🫰🫰🫰🫰🍭🍭🍭🫰");
    if (!hasMore) return; // ← کنټرول شو
    setLoading(true);
    const { fatwas: newFatwas, hasMore: more } = await getFatwas(page);
    setFatwas((prev) => [...prev, ...newFatwas]);
    // console.log(hasMore, "🫰🫰🫰🫰🫰🫰🫰🫰");
    // console.log(fatwas, "🫰");
    setPage((prev) => prev + 1);
    console.log(newFatwas, "🫰🫰🫰🫰🫰🫰🫰");
    console.log("More fatwas loaded:", newFatwas.length);
    console.log("Has more fatwas:", more);
    console.log("Current page:", page);
    console.log("Total fatwas:", fatwas.length + newFatwas.length);
    console.log("Loading state:", loading);
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

  const handleDeleteFatwa = async (id: string) => {
    const success = await deleteFatwa(id);
    if (success) {
      setFatwas((prev) => prev.filter((f) => f._id !== id));
    }
    return success;
  };

  return (
    <div className="space-y-8 p-8">
      <FatwaCard fatwas={fatwas} onDelete={handleDeleteFatwa} />
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
