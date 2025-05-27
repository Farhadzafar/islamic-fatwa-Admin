import PageHeader from "@/components/dashboard/header/PageHeader";
import QuickActionsGrid from "@/components/dashboard/actions/QuickActionsGrid";
import StatsGrid from "@/components/dashboard/stats/StatsGrid";
import QuestionsAnalyticsChart from "@/components/dashboard/charts/QuestionsAnalyticsChart";
import NotificationsList from "@/components/dashboard/notifications/NotificationsList";
import CategoryPieChart from "@/components/dashboard/charts/CategoryPieChart";
import UserActivityChart from "@/components/dashboard/charts/UserActivityChart";
import BooksGrid from "@/components/dashboard/books/BooksGrid";
import ResearchPapersList from "@/components/dashboard/research/ResearchPapersList";

// Sample Data Imports (you can move these to constants/data files later)
import {
  areaChartData,
  pieChartData,
  COLORS,
  stats,
  quickActions,
  notifications,
  recentBooks,
  researchPapers,
} from "@/constants/data";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader />

      <QuickActionsGrid actions={quickActions} />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuestionsAnalyticsChart data={areaChartData} />
        </div>
        <NotificationsList notifications={notifications} />
        <CategoryPieChart data={pieChartData} colors={COLORS} />
        <div className="lg:col-span-2">
          <UserActivityChart data={areaChartData} />
        </div>
      </div>

      <BooksGrid books={recentBooks} />

      <ResearchPapersList papers={researchPapers} />
    </div>
  );
}
