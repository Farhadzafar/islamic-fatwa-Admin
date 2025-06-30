// app/admin/questions/page.tsx
import StatsGrid from "@/components/questions/StatsGrid";
import FiltersCard from "@/components/questions/FiltersCard";
import QuestionsList from "@/components/questions/QuestionCard";
import QuestionsHeader from "@/components/questions/QuestionsHeader";

import {
  getQuestions,
  getCategories,
  getStatuses,
  getStats,
  getLanguages,
} from "@/lib/data/qusetions";
import QuestionPageClient from "@/components/questions/QuestionsPageClient";
import { AwardIcon, Languages } from "lucide-react";

export default async function QuestionsPage() {
  const stats = await getStats(); // move your stats array here
  const questions = await getQuestions(); // move your questions array here
  const categories = await getCategories(); // move your categories array here
  const statuses = await getStatuses(); // move your statuses array here
  const language = await getLanguages();

  return (
    <div className="space-y-8 p-8">
      <QuestionsHeader />
      <StatsGrid stats={stats} />
      {/* <FiltersCard categories={categories} statuses={statuses} /> */}
      {/* <QuestionsList questions={questions} /> */}
      <QuestionPageClient
        categories={categories}
        statuses={statuses}
        languages={language}
      />
    </div>
  );
}
