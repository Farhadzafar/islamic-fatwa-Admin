import { BookOpen, Clock, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";


const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/books`
const apiGetAllBooks = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/books/admin-books`;

export default async function getAllBooks(page = 1, limit = 12) {
  try {
    console.log("📚 Fetching books from API:", apiGetAllBooks);
    const response = await fetch(`${apiGetAllBooks}?page=${page}&limit=${limit}`, {
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
    return { books: [], hasMore: false }; // ✅ fixed here
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

export async function getStats() {
  return [
    {
      title: "Total Books",
      value: "1,234",
      change: "+5.3%",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Published",
      value: "987",
      change: "+8.2%",
      icon: BookOpen,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Under Review",
      value: "156",
      change: "-2.1%",
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Downloads",
      value: "45.2K",
      change: "+12.5%",
      icon: Download,
      color: "bg-purple-50 text-purple-600",
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
