// app/admin/users/page.tsx (Server Component)
import PaginationControls from "@/components/users/Pagination";
import UserStatsGrid from "@/components/users/StatsGrid";
import UserFiltersCard from "@/components/users/UserFilters";
import UserHeader from "@/components/users/UserHeader";
import UserPageClient from "@/components/users/UserPageClient";
import UserListCard from "@/components/users/UsersList";
import { getUserPageData } from "@/lib/data/users";
export default async function UsersPage() {
  const { stats, roles, statuses, users } = await getUserPageData();

  return (
    <div className="space-y-8 p-8">
      <UserHeader />
      <UserStatsGrid stats={stats} />
      <UserPageClient />
    </div>
  );
}
