"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ResearchPaperCard } from "./ResearchPaperCard";
import getAllResearch, { deleteResesrch } from "@/lib/data/research";

type FiltersCardProps = {
  categories: { id: string; ps: string; en: string; ar: string }[];
  statuses: { value: string; label: string }[];
  languages?: { name: string; code: string }[];
};

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 10;

export default function ResearchPageClient({
  categories,
  statuses,
  languages,
}: FiltersCardProps) {
  const [researches, setResearches] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [search, setSearch] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchResearches = useCallback(
    async (pageToLoad = DEFAULT_PAGE, append = false) => {
      setLoading(true);
      try {
        const { researches: fetched, hasMore: more } = await getAllResearch(
          pageToLoad,
          PAGE_LIMIT,
          {
            category: selectedCategory,
            language: selectedLanguage,
            status: selectedStatus,
            search,
          }
        );

        setResearches((prev) => (append ? [...prev, ...fetched] : fetched));
        setHasMore(more);
        setPage(pageToLoad);
      } catch (err) {
        console.error("❌ Error loading research papers:", err);
      } finally {
        setLoading(false);
      }
    },
    [search, selectedCategory, selectedLanguage, selectedStatus]
  );

  useEffect(() => {
    fetchResearches(DEFAULT_PAGE);
  }, [fetchResearches]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        fetchResearches(page + 1, true);
      }
    });

    const sentinel = observerRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [fetchResearches, loading, hasMore, page]);

  const handleDeleteResearch = async (id: string) => {
    const success = await deleteResesrch(id);
    if (success) {
      setResearches((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const handleEditResearch = (id: string) => {
    console.log("📝 Edit research with ID:", id);
  };

  const handleFilterChange = () => {
    fetchResearches(DEFAULT_PAGE);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search research papers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={handleFilterChange}
          className="border px-3 py-2 rounded-md w-full sm:max-w-xs"
        />
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
            <option key={lang.code} value={lang.code.toLowerCase()}>
              {lang.name}
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

      {/* Research Card Grid */}
      {researches.map((research, i) => (
        <ResearchPaperCard
          key={research._id + i}
          research={research}
          onDelete={handleDeleteResearch}
          onEdit={handleEditResearch}
        />
      ))}

      <div ref={observerRef} className="h-10" />
      {loading && (
        <p className="text-center text-gray-500">Loading more research...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400">
          ✅ No more research to load.
        </p>
      )}
    </div>
  );
}
