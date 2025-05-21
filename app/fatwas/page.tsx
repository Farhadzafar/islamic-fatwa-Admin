import FatwaHeader from "@/components/fatwas/FatwaHeader";
import StatsGrid from "@/components/questions/StatsGrid";
import React from "react";
import { getStats, getFatwas } from "@/lib/data/fatwa";
import FatwaCard from "@/components/fatwas/FatwaCard";

const stats = await getStats();
const rawFatwas = await getFatwas();
const fatwas = rawFatwas.map((fatwa: any) => ({
  ...fatwa,
  date: fatwa.date ?? "", // Provide a default value or map from the correct field
}));

export default function FatwasPage() {
  return (
    <div className="space-y-8 p-8">
      <FatwaHeader />
      <StatsGrid stats={stats} />
      <hr />
      <FatwaCard fatwas={fatwas} />
    </div>
  );
}
