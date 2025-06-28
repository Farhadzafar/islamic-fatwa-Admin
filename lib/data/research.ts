const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/research`;

import { getUserToken } from "@/hooks/getTokn";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Flag, MessageCircle } from "lucide-react";

export default async function getAllResearch(
  page = 1,
  limit = 12,
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
      search: filters?.search?.trim() || "null", // if empty or missing, set "null"
      language: filters?.language || "all",
      category: filters?.category || "all",
      status: filters?.status || "all",
    });

    const finalUrl = `${apiUrl}/filter?${queryParams.toString()}`;
    console.log("🔍 Fetching research from:", finalUrl);

    const response = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const json = await response.json();
    console.log("📚 Research fetched:", json);

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid response");
    }

    return {
      researches: json.data,
      hasMore: json.hasMore,
    };
  } catch (error) {
    console.error("❌ getAllResearch error:", error);
    return { researches: [], hasMore: false };
  }
}

export async function getResearchById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/research/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch research data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching research by ID:", error);
    throw error;
  }
}

export async function deleteResesrch(id: string): Promise<boolean> {
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
      throw new Error(errorData.message || "Failed to delete research");
    }

    toast({
      title: "Research deleted successfully",
      description: "The Research has been removed.",
      variant: "default",
    });

    return true;
  } catch (error: any) {
    console.error("Delete error:", error);
    toast({
      title: " delete error",
      description:
        error.message || "Failed to delete Research, please try again.",
      variant: "destructive",
    });
    return false;
  }
}

export async function submitResearchData(values: any) {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("citations", values.citations);
    formData.append("abstract", values.abstract);
    formData.append("publishedDate", values.publishedDate);
    formData.append("category", values.category);
    formData.append("language", values.language);
    formData.append("pageCount", values.pageCount.toString());
    formData.append("authors", JSON.stringify(values.authors));

    if (values.fileUrl instanceof File) {
      formData.append("fileUrl", values.fileUrl);
      formData.append("fileSize", String(values.fileUrl.size));
    }
    if (values.uploadedBy) {
      formData.append("uploadedBy", values.uploadedBy);
    }

    const userToken = getUserToken();
    if (!userToken) {
      toast({
        title: "Authentication error",
        description: "User token is missing. Please log in again.",
        variant: "destructive",
      });
      throw new Error("User token is missing.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/research/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      }
    );

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        toast({
          title: "Upload Failed",
          description: errorData.message || "Could not upload research.",
          variant: "destructive",
        });
        throw new Error(errorData.message || "Failed to upload research");
      } else {
        const text = await response.text();
        console.error("Non-JSON error response:", text);
        toast({
          title: "Unexpected Error",
          description: "Server returned an unexpected error.",
          variant: "destructive",
        });
        throw new Error("Server returned an unexpected error.");
      }
    }

    if (contentType?.includes("application/json")) {
      const result = await response.json();
      toast({
        title: "Success!",
        description: "Research uploaded successfully.",
      });
      return result;
    } else {
      toast({
        title: "Invalid Response",
        description: "Unexpected response format from server.",
        variant: "destructive",
      });
      throw new Error("Unexpected response format from server.");
    }
  } catch (error: any) {
    console.error("Error uploading research:", error);
    toast({
      title: "Error",
      description: error.message || "Something went wrong while uploading.",
      variant: "destructive",
    });
    throw error;
  }
}

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
