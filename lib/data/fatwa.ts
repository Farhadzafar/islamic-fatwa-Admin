import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Flag, MessageCircle } from "lucide-react";

const apiUrl = "https://final-year-backend-project.onrender.com/api/fatwas";

interface Fatwa {
  title: string;
  scholar: string;
  description: string;
  category: string;
  madhab: string;
  language: string;
}
export async function getFatwas(page = 1, limit = 5) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
        // "Accept-Language": "ps",
      },
      cache: "no-store",
    });

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid response");
    }

    return {
      fatwas: json.data,
      hasMore: json.hasMore, // ← مهمه ده
    };
  } catch (error) {
    console.error("❌ getFatwas error:", error);
    return { fatwas: [], hasMore: false };
  }
}

export const submitFatwa = async (values: Fatwa): Promise<boolean> => {
  try {
    const userString = localStorage.getItem("user");
    if (!userString) throw new Error("User not found in localStorage");

    const userObject = JSON.parse(userString);
    const token = userObject?.user?.token;
    if (!token) throw new Error("Authentication token not found");
    const endpoint = `${apiUrl}/add`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit fatwa");
    }

    toast({
      title: "Fatwa submitted successfully",
      description: "Your fatwa has been submitted for review.",
      variant: "default",
    });

    return true;
  } catch (error: any) {
    console.error("Submit error:", error);
    toast({
      title: "د ثبتولو تېروتنه",
      description: error.message || "فتوی ونه سپارل شوه، بیا هڅه وکړئ.",
      variant: "destructive",
    });
    return false;
  }
};

export async function getStats() {
  return [
    {
      title: "Total Fatwas",
      value: "1,250",
      change: "+12.5%",
      icon: MessageCircle,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Category of fatwas",
      value: "49",
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

export async function getCategories() {
  return [
    { name: "Fiqh", count: 500 },
    { name: "Aqeedah", count: 300 },
    { name: "History", count: 200 },
    { name: "Islamic Law", count: 150 },
    { name: "Ethics", count: 100 },
    { name: "Islamic Finance", count: 50 },
  ];
}

export async function getStatuses() {
  return [
    { label: "All", value: "all" },
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
