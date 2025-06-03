import BookHeader from "@/components/books/BookHeader";
import BooksGrid from "@/components/books/BooksGrid";
import React from "react";
import { recentBooks } from "@/constants/data";
import { StaticCard } from "@/components/books/StaticCard";
import {
  getStats,
  getCategories,
  getLanguages,
  getStatuses,
} from "@/lib/data/books";
import BooksFiltersCard from "@/components/books/BooksFiltersCard";

export default async function page() {
  const stats = await getStats();
  const categories = await getCategories();
  const languages = await getLanguages();
  const Statuses = await getStatuses();

  return (
    <div className="space-y-8">
      <BookHeader />
      <StaticCard stats={stats} />
      <BooksFiltersCard
        categories={categories}
        languages={languages}
        statuses={Statuses}
      />
      <BooksGrid books={recentBooks} />
      <BooksGrid books={recentBooks} />
      <BooksGrid books={recentBooks} />
    </div>
  );
}
