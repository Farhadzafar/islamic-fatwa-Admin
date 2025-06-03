import { BookOpen, Clock, Download } from "lucide-react";

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
