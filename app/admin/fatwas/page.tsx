import FatwaHeader from "@/components/fatwas/FatwaHeader";
import StatsGrid from "@/components/questions/StatsGrid";
import React from "react";
import {
  getStats,
  getFatwas,
  getCategories,
  getLanguages,
  getStatuses,
} from "@/lib/data/fatwa";
import FatwaCard from "@/components/fatwas/FatwaCard";
import FatwaFiltersCard from "@/components/fatwas/FatwaFiltersCard";
import FatwasPageClient from "@/components/fatwas/FatwasPageClient";

export default async function FatwasPage() {
  const stats = await getStats();
  const rawFatwas = await getFatwas();
  const categories = await getCategories();
  const languages = await getLanguages();
  const statuses = await getStatuses();
  return (
    <div className="space-y-8 p-8">
      <FatwaHeader />
      <StatsGrid stats={stats} />
      <FatwaFiltersCard
        categories={categories}
        languages={languages}
        statuses={statuses}
      />
      <FatwasPageClient />
    </div>
  );
}
