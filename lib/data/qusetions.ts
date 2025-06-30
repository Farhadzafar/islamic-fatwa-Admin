import { MessageCircle, CheckCircle, Clock, Flag } from "lucide-react";

const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/questions`;

export async function getAllQuestions(
  page = 1,
  limit = 10,
  filters?: {
    search?: string;
    language?: string;
    category?: string;
    status?: string;
  }
) {
  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: filters?.search?.trim() || "null",
      language: filters?.language || "all",
      category: filters?.category || "all",
      status: filters?.status || "all",
    });

    const response = await fetch(`${apiUrl}/filter?${queryParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid response");
    }
    console.log(json.data);

    return {
      questions: json.data,
      hasMore: json.hasMore,
    };
  } catch (error) {
    console.error("❌ getAllQuestions error:", error);
    return { questions: [], hasMore: false };
  }
}

export async function deleteQuestion(id: string) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error("❌ Failed to delete question:", error);
    return false;
  }
}

export async function getQuestions() {
  return [
    {
      id: 1,
      title: "What is the ruling on combining prayers while traveling?",
      category: "Fiqh",
      status: "Answered",
      priority: "High",
      askedBy: "Abdullah Ahmad",
      assignedTo: "Dr. Sarah Mohammed",
      dateAsked: "2024-02-15",
      views: 1256,
      answers: 4,
      likes: 89,
      verified: true,
      tags: ["Prayer", "Travel", "Fiqh"],
      excerpt:
        "I will be traveling next week and I'm wondering about the conditions for combining prayers during travel...",
    },
  ];
}

export async function getCategories() {
  return [
    {
      id: "6859544d68b989660de6f629",
      ps: "واده",
      en: "Marriage",
      ar: "الزواج",
    },
    { id: "6859544d68b989660de6f62a", ps: "طلاق", en: "Divorce", ar: "الطلاق" },
    { id: "6859544d68b989660de6f62b", ps: "نماز", en: "Prayer", ar: "الصلاة" },
    { id: "6859544d68b989660de6f62c", ps: "روژه", en: "Fasting", ar: "الصيام" },
    { id: "6859544d68b989660de6f62d", ps: "زکات", en: "Zakat", ar: "الزكاة" },
    { id: "6859544d68b989660de6f63a", ps: "تجارت", en: "Trade", ar: "التجارة" },
    {
      id: "6859544d68b989660de6f63b",
      ps: "خوراک او څښاک",
      en: "Food & Drink",
      ar: "الطعام والشراب",
    },
    {
      id: "6859544d68b989660de6f63c",
      ps: "کورنۍ اړیکې",
      en: "Family Relations",
      ar: "العلاقات الأسرية",
    },
    {
      id: "6859544d68b989660de6f643",
      ps: "میراث",
      en: "Inheritance",
      ar: "الميراث",
    },
    { id: "6859642f8c140503427e8c57", ps: "نکاح", en: "Nikah", ar: "النكاح" },
  ];
}

export async function getStatuses() {
  return [
    { label: "Published", value: "published" },
    { label: "Pending", value: "pending" },
    { label: "Draft", value: "draft" },
  ];
}

export async function getLanguages() {
  return [
    { name: "English", code: "en" },
    { name: "Arabic", code: "ar" },
    { name: "Pashto", code: "ps" },
  ];
}

export async function getStats() {
  return [
    {
      title: "Total Questions",
      value: "1,250",
      change: "+12.5%",
      icon: MessageCircle,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Answered",
      value: "856",
      change: "+8.2%",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending Review",
      value: "145",
      change: "-5.1%",
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Reported",
      value: "23",
      change: "+2.3%",
      icon: Flag,
      color: "bg-red-50 text-red-600",
    },
  ];
}
