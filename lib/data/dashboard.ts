import { 
  Users,           // For Total Users
  ShieldCheck,     // For Admin Users
  GraduationCap,   // For Scholars
  UserPlus         // For New Users
} from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const apiGetStats = `${apiUrl}/api/users/statistics/`;

export async function getStats() {
  try {
    const response = await fetch(apiGetStats, {
      cache: "no-store",
    });

    const json = await response.json();
    console.log("📊 Statistics fetched:", json);

    if (!json.success) {
      throw new Error("Invalid response");
    }

    return [
      {
        title: "Total Users",
        value: json.totalCount || 0,
        change: "+5.3%", // Optional static/dynamic
        icon: Users,
        color: "bg-blue-50 text-blue-600",
      },
      {
        title: "Admin Users",
        value: json.adminCount || 0,
        change: "+8.2%",
        icon: ShieldCheck,
        color: "bg-green-50 text-green-600",
      },
      {
        title: "Scholars",
        value: json.scholarCount || 0,
        change: "-2.1%",
        icon: GraduationCap,
        color: "bg-yellow-50 text-yellow-600",
      },
      {
        title: "New Users (This Month)",
        value: json.newUsersCount || 0,
        change: "+12.5%",
        icon: UserPlus,
        color: "bg-purple-50 text-purple-600",
      },
    ];
  } catch (error) {
    console.error("❌ getStats error:", error);
    return [];
  }
}
