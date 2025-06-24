import BookHeader from "@/components/books/BookHeader";
import BooksGrid from "@/components/books/asd";
import React from "react";
import { articles, recentBooks } from "@/constants/data";
import { StaticCard } from "@/components/books/StaticCard";
import {
  getStats,
  getCategories,
  getLanguages,
  getStatuses,
} from "@/lib/data/books";
import BooksFiltersCard from "@/components/books/BooksFiltersCard";
import ArticlesHeeder from "@/components/articles/ArticlesHeeder";
import ArticleFiltersCard from "@/components/articles/ArticleFiltersCard";
import { ArticleCard } from "@/components/articles/ArticleCard";

export default async function page() {
  const stats = await getStats();
  const categories = await getCategories();
  const languages = await getLanguages();
  const Statuses = await getStatuses();

  return (
    <div className="space-y-8">
      <ArticlesHeeder />
      <StaticCard stats={stats} />
      <ArticleFiltersCard
        categories={categories}
        languages={languages}
        statuses={Statuses}
      />
      <div className="py-3">
        <h4>all articles</h4>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
