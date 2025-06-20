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

const stats = await getStats();
const rawFatwas = await getFatwas();
const categories = await getCategories();
const languages = await getLanguages();
const statuses = await getStatuses();
const fatwas = rawFatwas.map((fatwa: any) => ({
  ...fatwa,
  date: fatwa.date ?? "", // Provide a default value or map from the correct field
}));

export default function FatwasPage() {
  return (
    <div className="space-y-8 p-8">
      <FatwaHeader />
      <StatsGrid stats={stats} />
      <FatwaFiltersCard
        categories={categories}
        languages={languages}
        statuses={statuses}
      />
      <hr />
      <FatwaCard fatwas={fatwas} />
    </div>
  );
}
