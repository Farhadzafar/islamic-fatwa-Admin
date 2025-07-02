// lib/data/users.ts
import { Users, Activity, UserCheck, UserPlus } from "lucide-react";
const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/statistic/`;

const getUserStatics = async () => {
try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    const json = await response.json();
    console.log("📊 User Statistics fetched:", json);

    if (!json.success) {
      throw new Error("Invalid response");
    }

    return json.data;
  } catch (error) {
    console.error("❌ getUserStatics error:", error);
    return [];
  }

}


export async function getUserPageData() {
  console.log("Fetching user statistics...", apiUrl);
  const usrdata = await getUserStatics();
console.log("User Data:", usrdata);
  const stats = [
    {
      title: "Total Users",
      // value: "1,250",
      value:` ${usrdata.totalCount || "1,250"}`,
      change: "+12.5%",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Admins",
      value: "456",
      change: "+5.8%",
      icon: Activity,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Scholars",
      value: "890",
      change: "+8.2%",
      icon: UserCheck,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "New This Week",
      value: "125",
      change: "+15.3%",
      icon: UserPlus,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  const roles = [
    { value: "all", label: "All Roles", count: 1250 },
    { value: "user", label: "Users", count: 1024 },
    { value: "scholar", label: "Scholars", count: 56 },
    // { value: "moderator", label: "Moderators", count: 12 },
    { value: "admin", label: "Administrators", count: 8 },
  ];

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "away", label: "Away" },
    // { value: "suspended", label: "Suspended" },
  ];

  const users = [
    {
      id: 1,
      name: "Abdullah Ahmad",
      email: "abdullah@example.com",
      role: "User",
      status: "Active",
      location: "Dubai, UAE",
      joinDate: "Jan 15, 2024",
      lastActive: "2 hours ago",
      verified: true,
      avatar:
        "https://ui-avatars.com/api/?name=Abdullah+Ahmad&background=random",
      phone: "+971 50 123 4567",
      questionsAsked: 15,
      answersReceived: 12,
    },
    {
      id: 2,
      name: "Sarah Mohammed",
      email: "sarah@example.com",
      role: "Scholar",
      status: "Active",
      location: "Riyadh, KSA",
      joinDate: "Dec 10, 2023",
      lastActive: "5 mins ago",
      verified: true,
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Mohammed&background=random",
      phone: "+966 50 987 6543",
      questionsAnswered: 45,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Ibrahim Hassan",
      email: "ibrahim@example.com",
      role: "Moderator",
      status: "Away",
      location: "Cairo, Egypt",
      joinDate: "Feb 1, 2024",
      lastActive: "1 day ago",
      verified: true,
      avatar:
        "https://ui-avatars.com/api/?name=Ibrahim+Hassan&background=random",
      phone: "+20 100 123 4567",
      reportsHandled: 89,
      responseTime: "2h avg",
    },
  ];

  return { stats, roles, statuses, users };
}
