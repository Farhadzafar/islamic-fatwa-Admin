import { BookOpen, Clock, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/books`;

const apiGetAllBooks = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/books/filter`;

type Filters = {
  category?: string;
  language?: string;
  status?: string;
  search?: string;
};

export default async function getAllBooks(
  page = 1,
  limit = 12,
  filters: Filters = {}
) {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: filters.search || "null",
      language: filters.language || "all",
      category: filters.category || "all",
      status: filters.status || "all",
    });

    const url = `${apiGetAllBooks}?${params.toString()}`;

    console.log("📚 Fetching books with URL:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const json = await response.json();
    console.log("📚 Books fetched:", json);

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid response");
    }

    return {
      books: json.data,
      hasMore: json.hasMore,
    };
  } catch (error) {
    console.error("❌ getAllBooks error:", error);
    return { books: [], hasMore: false };
  }
}

export async function getBookById(id: string) {
  try {
    const userString = localStorage.getItem("user");
    if (!userString) throw new Error("User not found in localStorage");

    const userObject = JSON.parse(userString);
    const token = userObject?.user?.token;
    if (!token) throw new Error("Authentication token not found");

    const response = await fetch(`${apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const json = await response.json();
    console.log("📚 Book fetched:", json.data);

    if (!json.success || !json.data) {
      throw new Error("Invalid response");
    }

    return json.data;
  } catch (error) {
    console.error("❌ getBookById error:", error);
    return null; // Return null if there's an error
  }
}

export async function deleteBook(id: string): Promise<boolean> {
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
      throw new Error(errorData.message || "Failed to delete book");
    }

    toast({
      title: "Book deleted successfully",
      description: "The Book has been removed.",
      variant: "default",
    });

    return true;
  } catch (error: any) {
    console.error("Delete error:", error);
    toast({
      title: " delete error",
      description: error.message || "Failed to delete book, please try again.",
      variant: "destructive",
    });
    return false;
  }
}
// ///////////////////////////////////////////////////////////

const apiGetStats = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/books/statistics/`;  

export async function getStats() {
  try{
    const response = await fetch(apiGetStats, {
     
      cache: "no-store",
    });
    if(!response.ok) {
      throw new Error("Failed to fetch statistics");
    }
    const json = await response.json();
    if (!json.success) {
      throw new Error("Invalid response");
    }
    console.log("📊 Statistics fetched:", json);
    return [
    {
      title: "Total Books",
      value: json.totalCount,
      change: "+5.3%",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Published",
      value: json.publishedCount,
      change: "+8.2%",
      icon: BookOpen,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Under Review",
      value: json.pendingCount,
      change: "-2.1%",
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Downloads",
      value: json.totalDownloadCount,
      change: "+12.5%",
      icon: Download,
      color: "bg-purple-50 text-purple-600",
    },
  ];
  }catch (error){
    console.error("❌ getStats error:", error);
    return [];
  }
  
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
