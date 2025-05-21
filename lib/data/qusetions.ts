import { MessageCircle, CheckCircle, Clock, Flag } from "lucide-react";
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
    { name: "All", count: 1250 },
    { name: "Fiqh", count: 450 },
    { name: "Aqeedah", count: 320 },
    { name: "Hadith", count: 280 },
    { name: "Quran", count: 200 },
  ];
}

export async function getStatuses() {
  return [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "answered", label: "Answered" },
    { value: "review", label: "Under Review" },
    { value: "rejected", label: "Rejected" },
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
