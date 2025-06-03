import BookHeader from "@/components/books/BookHeader";
import React from "react";
import { StaticCard } from "@/components/books/StaticCard";
import {
  getStats,
  getCategories,
  getLanguages,
  getStatuses,
} from "@/lib/data/books";
import BooksFiltersCard from "@/components/books/BooksFiltersCard";
import ResearchPapersList from "@/components/research/ResearchPapersList";
import { researchPapers } from "@/constants/data";

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
      <ResearchPapersList papers={researchPapers} />
    </div>
  );
}
