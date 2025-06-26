"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import { ArticleCard } from "./ArticleCard";
import { getAllArticles, deleteArticle } from "@/lib/data/articles";

export default function ArticlePageClient() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const { articles: newArticles, hasMore: more } = await getAllArticles(
        nextPage
      );
      console.log("📚 Loaded page", nextPage, newArticles);

      setArticles((prev) => [...prev, ...(newArticles || [])]);
      setPage(nextPage);
      setHasMore(more);
    } catch (error) {
      console.error("⚠️ Failed to load articles:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);
  useEffect(() => {
    const fetchFirstPage = async () => {
      setLoading(true);
      try {
        const { articles: initialArticles, hasMore: more } =
          await getAllArticles(1);
        console.log("🚀 First page Articles:", initialArticles);

        setArticles(initialArticles || []);
        setHasMore(more);
        setPage(1);
      } catch (err) {
        console.error("❌ Error loading first page:", err);
        setArticles([]);
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

  // delete articles function:
  const handleDeleteArticle = async (id: string) => {
    const success = await deleteArticle(id);
    if (success) {
      setArticles((prev) => prev.filter((f) => f._id !== id));
    }
    return success;
  };

  const handleEditAticle = (id: string) => {
    // Implement edit functionality here
    console.log("Edit articles with ID:", id);
  };

  return (
    console.log("📚📚📚📚📚 Rendering articlClient page", articles),
    (
      <div className="space-y-8 p-8">
        {articles.map((article, i) => (
          <ArticleCard
            key={article._id + i}
            // direction={article.languages === "en" ? "ltr" : "rtl"}
            article={article}
            onDelete={handleDeleteArticle}
            onEdit={handleEditAticle}
          />
        ))}

        <div ref={observerRef} className="h-10" />
        {loading && (
          <p className="text-center text-gray-500">Loading more Articles...</p>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-gray-400">
            ✅ No more Articles to load.
          </p>
        )}
      </div>
    )
  );
}
