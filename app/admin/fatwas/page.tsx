import FatwaHeader from "@/components/fatwas/FatwaHeader";
import StatsGrid from "@/components/questions/StatsGrid";
import React from "react";
import {
  getStats,
  getCategories,
  getLanguages,
  getStatuses,
} from "@/lib/data/fatwa";
import FatwaFiltersCard from "@/components/fatwas/FatwaFiltersCard";
import FatwasPageClient from "@/components/fatwas/FatwasPageClient";

export default async function FatwasPage() {
  const stats = await getStats();
  const categories = await getCategories();
  const languages = await getLanguages();
  const statuses = await getStatuses();
  return (
    <div className="space-y-8 p-8">
      <FatwaHeader />
      <StatsGrid stats={stats} />
      <FatwasPageClient
        categories={categories}
        languages={languages}
        statuses={statuses}
      />
    </div>
  );
}
