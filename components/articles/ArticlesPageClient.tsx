"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArticleCard } from "./ArticleCard";
import { getAllArticles, deleteArticle } from "@/lib/data/articles";
import { Card } from "../ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FiltersCardProps = {
  categories: { id: string; ps: string; en: string; ar: string }[];
  statuses: { value: string; label: string }[];
  languages?: { name: string; code: string }[];
};

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 10;

export default function ArticlePageClient({
  categories,
  statuses,
  languages = [],
}: FiltersCardProps) {
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: "all",
    language: "all",
    status: "all",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const fetchArticles = useCallback(
    async (pageToLoad = DEFAULT_PAGE, append = false) => {
      setLoading(true);
      try {
        const { articles: fetched, hasMore: more } = await getAllArticles(
          pageToLoad,
          PAGE_LIMIT,
          filters
        );
        setArticles((prev) => (append ? [...prev, ...fetched] : fetched));
        setHasMore(more);
        setPage(pageToLoad);
      } catch (error) {
        console.error("❌ Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchArticles(DEFAULT_PAGE);
  }, [fetchArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore) {
        fetchArticles(page + 1, true);
      }
    });
    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchArticles, loading, hasMore, page]);

  const handleDelete = async (id: string) => {
    const success = await deleteArticle(id);
    if (success) setArticles((prev) => prev.filter((a) => a._id !== id));
  };

  const handleEdit = (id: string) =>
    router.push(`/admin/articles/upload/${id}`);

  const updateFilter = (key: string, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const debouncedSearch = useCallback(() => {
    const timeout = setTimeout(() => fetchArticles(DEFAULT_PAGE), 500);
    return () => clearTimeout(timeout);
  }, [fetchArticles]);

  useEffect(debouncedSearch, [filters.search]);

  return (
    <div className="space-y-8 p-8">
      <Card className="p-6 space-y-4">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="Search articles by title..."
              className="pl-10"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" /> Filters
            </Button>
            <select
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
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
              value={filters.language}
              onChange={(e) => updateFilter("language", e.target.value)}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code.toLowerCase()}>
                  {lang.name} ({lang.code})
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
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

      {/* Article List */}
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      {/* Load More Sentinel */}
      <div ref={observerRef} className="h-10" />

      {/* Loaders */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading more articles...
        </p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400">
          ✅ No more articles to load.
        </p>
      )}
    </div>
  );
}
