// app/admin/questions/page.tsx
import StatsGrid from "@/components/questions/StatsGrid";
import FiltersCard from "@/components/questions/FiltersCard";
import QuestionsList from "@/components/questions/QuestionsList";
import QuestionsHeader from "@/components/questions/QuestionsHeader";
import PaginationFooter from "@/components/questions/PaginationFooter";
import {
  getQuestions,
  getCategories,
  getStatuses,
  getStats,
} from "@/lib/data/qusetions";

export default async function QuestionsPage() {
  const stats = await getStats(); // move your stats array here
  const questions = await getQuestions(); // move your questions array here
  const categories = await getCategories(); // move your categories array here
  const statuses = await getStatuses(); // move your statuses array here

  return (
    <div className="space-y-8 p-8">
      <QuestionsHeader />
      <StatsGrid stats={stats} />
      <FiltersCard categories={categories} statuses={statuses} />
      <QuestionsList questions={questions} />
      <PaginationFooter total="1,250" />
    </div>
  );
}
