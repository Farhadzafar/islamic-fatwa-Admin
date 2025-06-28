import PageHeader from "@/components/dashboard/header/PageHeader";
import QuickActionsGrid from "@/components/dashboard/actions/QuickActionsGrid";
import StatsGrid from "@/components/dashboard/stats/StatsGrid";
import QuestionsAnalyticsChart from "@/components/dashboard/charts/QuestionsAnalyticsChart";
import NotificationsList from "@/components/dashboard/notifications/NotificationsList";
import CategoryPieChart from "@/components/dashboard/charts/CategoryPieChart";
import UserActivityChart from "@/components/dashboard/charts/UserActivityChart";

import ResearchPapersList from "@/components/research/ResearchPapersList";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      <div className="space-y-6 border px-5 py-7 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Books</h2>
            <p className="text-sm text-gray-500">
              Latest books and publications
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/books">
              <Button variant="outline">
                wive all
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* <ResearchPapersList papers={researchPapers} /> */}
    </div>
  );
}
