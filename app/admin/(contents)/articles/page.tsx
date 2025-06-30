import React from "react";
import { StaticCard } from "@/components/books/StaticCard";
import {
  getStats,
  getCategories,
  getLanguages,
  getStatuses,
} from "@/lib/data/articles";
import ArticlesHeeder from "@/components/articles/ArticlesHeeder";
import ArticleFiltersCard from "@/components/articles/ArticleFiltersCard";
import ArticlePageClient from "@/components/articles/ArticlesPageClient";

export default async function page() {
  const stats = await getStats();
  const categories = await getCategories();
  const languages = await getLanguages();
  const Statuses = await getStatuses();

  return (
    <div className="space-y-8">
      <ArticlesHeeder />
      <StaticCard stats={stats} />
      <div className="py-3">
        <ArticlePageClient
          categories={categories}
          languages={languages}
          statuses={Statuses}
        />
      </div>
    </div>
  );
}
