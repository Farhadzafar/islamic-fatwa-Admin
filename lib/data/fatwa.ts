import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Flag, MessageCircle } from "lucide-react";

const apiUrl = "https://final-year-backend-project.onrender.com/api/fatwas";

export interface getFatwaInterface {
  _id: string;
  title: string;
  description: string; // HTML content as string
  madhab: string;
  category: {
    _id: string;
    name?: string;
  };
  scholar: {
    _id: string;
    fullName: string;
    email: string;
  };
  status: "pending" | "published" | "rejected" | string;
  views: number;
  createdAt: string; // ISO date string
  language: "ps" | "en" | "ar";
}

export interface Fatwa {
  _id?: string;
  title: string;
  scholar: string;
  description: string;
  category: string;
  madhab: string;
  language: string;
  createdAt: string;
}

export async function getFatwas(page = 1, limit = 10) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid response");
    }

    console.log("📜 Fatwas fetched:", json.data);
    console.log("📜 Has more:", json.hasMore);

    return {
      fatwas: json.data,
      hasMore: json.hasMore, // ← مهمه ده
    };
  } catch (error) {
    console.error("❌ getFatwas error:", error);
    return { fatwas: [], hasMore: false };
  }
}

export async function getFatwaById(
  id: string
): Promise<getFatwaInterface | null> {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        // "Accept-Language": "ps",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch fatwa");
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching fatwa by ID:", error);
    return null;
  }
}

export async function deleteFatwa(id: string): Promise<boolean> {
  try {
    const userString = localStorage.getItem("user");
    if (!userString) throw new Error("User not found in localStorage");

    const userObject = JSON.parse(userString);
    const token = userObject?.user?.token;
    if (!token) throw new Error("Authentication token not found");

    const endpoint = `${apiUrl}/${id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete fatwa");
    }

    toast({
      title: "Fatwa deleted successfully",
      description: "The fatwa has been removed.",
      variant: "default",
    });

    return true;
  } catch (error: any) {
    console.error("Delete error:", error);
    toast({
      title: " delete error",
      description: error.message || "Failed to delete fatwa, please try again.",
      variant: "destructive",
    });
    return false;
  }
}

export async function editFatwa(
  id: string | undefined,
  data: Fatwa
): Promise<boolean> {
  if (!id) return false;

  try {
    const userString = localStorage.getItem("user");
    if (!userString) throw new Error("User not found");

    const userObject = JSON.parse(userString);
    const token = userObject?.user?.token;
    if (!token) throw new Error("Authentication token not found");

    const endpoint = `https://final-year-backend-project.onrender.com/api/fatwas/update/${id}`;

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update fatwa");
    }

    return true;
  } catch (error: any) {
    console.error("Edit error:", error.message);
    return false;
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

    console.log("📤 Submitting fatwa to:", endpoint);
    console.log("🧾 Payload:", values);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const rawText = await response.text();
      let errorMessage: string;

      try {
        const errorData = JSON.parse(rawText);
        console.error("❌ API JSON Error:", errorData);
        errorMessage = errorData?.message || "Unknown API error";
      } catch {
        console.error("❌ API Text Error:", rawText);
        errorMessage =
          rawText || `Request failed with status ${response.status}`;
      }

      throw new Error(errorMessage);
    }

    toast({
      title: "Fatwa submitted successfully",
      description: "Your fatwa has been submitted for review.",
      variant: "default",
    });

    return true;
  } catch (error: any) {
    console.error("🔥 Submit exception:", error);
    toast({
      title: "Error submitting fatwa",
      description: error.message || "Something went wrong during submission.",
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
