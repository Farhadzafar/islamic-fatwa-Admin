"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import QuestionCard from "./QuestionCard";
import { getAllQuestions, deleteQuestion } from "@/lib/data/qusetions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Filter, Search } from "lucide-react";
import { Card } from "../ui/card";

type FiltersCardProps = {
  categories: { id: string; ps: string; en: string; ar: string }[];
  statuses: { value: string; label: string }[];
  languages?: { name: string; code: string }[];
};

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 10;

export default function QuestionPageClient({
  categories,
  statuses,
  languages,
}: FiltersCardProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const [showFilters, setShowFilters] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchQuestions = useCallback(
    async (pageToLoad = DEFAULT_PAGE, append = false) => {
      setLoading(true);
      try {
        const { questions: fetched, hasMore: more } = await getAllQuestions(
          pageToLoad,
          PAGE_LIMIT,
          {
            search,
            language: selectedLanguage,
            category: selectedCategory,
            status: selectedStatus,
          }
        );

        setQuestions((prev) => (append ? [...prev, ...fetched] : fetched));
        setPage(pageToLoad);
        setHasMore(more);
      } catch (err) {
        console.error("❌ Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    },
    [search, selectedCategory, selectedLanguage, selectedStatus]
  );

  useEffect(() => {
    fetchQuestions(DEFAULT_PAGE);
  }, [fetchQuestions]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchQuestions(page + 1, true);
      }
    });

    const sentinel = observerRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [fetchQuestions, loading, hasMore, page]);

  const handleDelete = async (id: string) => {
    const success = await deleteQuestion(id);
    if (success) {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    }
  };

  const handleEdit = (id: string) => {
    console.log("✏️ Edit question:", id);
    // Optionally route or open edit modal
  };

  const handleFilterChange = () => {
    fetchQuestions(DEFAULT_PAGE);
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
              placeholder="Search questions..."
              className="pl-10"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              onClick={() => setShowFilters((prev) => !prev)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
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
        </div>
      </Card>

      {questions.map((question, i) => (
        <QuestionCard
          key={question._id + i}
          question={question}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      <div ref={observerRef} className="h-10" />

      {loading && (
        <p className="text-center text-gray-500">Loading more questions...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400">
          ✅ No more questions to load.
        </p>
      )}
    </div>
  );
}
