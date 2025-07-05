import {
  Users,
  FileQuestion,
  BookOpen,
  ScrollText,
  BookText,
  Archive,
} from "lucide-react";

export async function getDashboardStats() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/statistics/dashboard");
    const json = await res.json();

    if (!json.success || !json.stats) {
      throw new Error("Invalid stats data");
    }

    const { users, fatwas, books, articles, research } = json.stats;

    return [
      {
        name: "Total Users",
        value: users?.total?.toLocaleString() ?? "0",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "bg-blue-50 text-blue-600",
      },
      {
        name: "Fatwas Issued",
        value: fatwas?.total?.toLocaleString() ?? "0",
        change: "+9.3%",
        trend: "up",
        icon: FileQuestion,
        color: "bg-rose-50 text-rose-600",
      },
      {
        name: "Books Published",
        value: books?.total?.toLocaleString() ?? "0",
        change: "+5.3%",
        trend: "up",
        icon: BookOpen,
        color: "bg-purple-50 text-purple-600",
      },
      {
        name: "Articles Written",
        value: articles?.total?.toLocaleString() ?? "0",
        change: "+4.1%",
        trend: "up",
        icon: BookText,
        color: "bg-green-50 text-green-600",
      },
      {
        name: "Research Papers",
        value: research?.total?.toLocaleString() ?? "0",
        change: "+7.4%",
        trend: "up",
        icon: ScrollText,
        color: "bg-yellow-50 text-yellow-600",
      },
    ];
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    return [];
  }
}

// ___________________________________________________________
export async function getFatwaAnalyticsData() {
  const startDate = "2024-01";

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const endDate = `${year}-${month}`;

  try {
    const res = await fetch(
      `http://127.0.0.1:5000/api/statistics/count/questionFatwa?startDate=${startDate}&endDate=${endDate}`
    );
    const json = await res.json();
    console.log("🧆✈️🚟🎊✌️", json);

    if (
      !json.success ||
      !json.stats ||
      !Array.isArray(json.stats["questions and fatwa"])
    ) {
      throw new Error("Invalid response format");
    }

    const rawStats = json.stats["questions and fatwa"];

    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const map = new Map<
      string,
      { name: string; questions: number; answers: number }
    >();
    for (const m of allMonths) {
      map.set(m, { name: m, questions: 0, answers: 0 });
    }

    for (const item of rawStats) {
      map.set(item.month, {
        name: item.month,
        questions: item.questions ?? 0,
        answers: item.fatwas ?? 0,
      });
    }

    return Array.from(map.values());
  } catch (err) {
    console.error("Error fetching fatwa stats:", err);
    return [];
  }
}

// ////////////////////////////////////////////
export async function getCategoryFatwaChartData() {
  try {
    const res = await fetch(
      "http://127.0.0.1:5000/api/statistics/count/category-count-fatwa"
    );
    const json = await res.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid category fatwa data");
    }

    // Map category => count => chartData format
    const chartData = json.data.map((item: any) => ({
      month: item.category, // reuse 'month' key used in chart
      desktop: item.count, // use 'desktop' as bar value
    }));

    return chartData;
  } catch (err) {
    console.error("Error fetching category fatwa data:", err);
    return [];
  }
}
// ??????????????????????????????????????????????????????????
// totle fatwa, totle books, totle articles, totle research
export async function getTotoleForPich() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/statistics/dashboard");
    const json = await res.json();

    if (!json.success || !json.stats) {
      throw new Error("Invalid stats data");
    }

    const { fatwas, books, articles, research, users } = json.stats;

    return [
      { name: "Fatwas", value: fatwas?.total ?? 0 },
      { name: "Books", value: books?.total ?? 0 },
      { name: "Articles", value: articles?.total ?? 0 },
      { name: "Research", value: research?.total ?? 0 },
      { name: "User", value: users?.total ?? 0 },
    ];
  } catch (err) {
    console.error("Error fetching pie chart data:", err);
    return [];
  }
}

// _______________________________________________________________
export async function getActiveInactiveAnalyticsData() {
  const startDate = "2020-01-01";

  try {
    const res = await fetch(
      `http://127.0.0.1:5000/api/statistics/count/ative-inactive?startDate=${startDate}`
    );
    const json = await res.json();

    if (!json.success || !Array.isArray(json.stats)) {
      throw new Error("Invalid response format");
    }

    const rawStats = json.stats;

    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const map = new Map<
      string,
      { name: string; active: number; inactive: number }
    >();

    for (const m of allMonths) {
      map.set(m, { name: m, active: 0, inactive: 0 });
    }

    for (const item of rawStats) {
      map.set(item.month, {
        name: item.month,
        active: item.active ?? 0,
        inactive: item.inactive ?? 0,
      });
    }

    return Array.from(map.values());
  } catch (err) {
    console.error("Error fetching active/inactive stats:", err);
    return [];
  }
}
