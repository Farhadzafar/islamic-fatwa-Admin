// This file contains mock data for the dashboard components.
import {
  Users,
  FileQuestion,
  BookOpen,
  ScrollText,
  AlertCircle,
  CheckCircle,
  Flag,
  BarChart3,
  Settings,
} from "lucide-react";

export const areaChartData = [
  { name: "Jan", questions: 4000, answers: 24000 },
  { name: "Feb", questions: 3000, answers: 1398 },
  { name: "Mar", questions: 20000, answers: 9800 },
  { name: "Apr", questions: 2780, answers: 39008 },
  { name: "May", questions: 18900, answers: 4800 },
  { name: "Jun", questions: 2390, answers: 3800 },
  { name: "Jul", questions: 3490, answers: 4300 },
  { name: "Aug", questions: 4100, answers: 5200 },
  { name: "Sep", questions: 3700, answers: 4700 },
  { name: "Oct", questions: 4200, answers: 5100 },
  { name: "Nov", questions: 3900, answers: 4900 },
  { name: "Dec", questions: 4500, answers: 5300 },
];

export const pieChartData = [
  { name: "Aqeedah", value: 400 },
  { name: "Fiqh", value: 300 },
  { name: "Hadith", value: 300 },
  { name: "Quran", value: 200 },
  { name: "Tafsir", value: 180 },
  { name: "Seerah", value: 160 },
  { name: "Islamic History", value: 140 },
  { name: "Spirituality", value: 120 },
  // { name: "Islamic Finance", value: 100 },
  // { name: "Family Law", value: 90 },
  // { name: "Ethics", value: 80 },
  // { name: "Comparative Religion", value: 70 },
  // { name: "Islamic Philosophy", value: 60 },
  // { name: "Dawah", value: 50 },
  // { name: "Contemporary Issues", value: 40 },
];

export const COLORS = [
  "#0088FE", // blue
  "#00C49F", // teal
  "#FFBB28", // yellow
  "#FF8042", // orange
  "#A259F7", // purple
  "#FF5C8A", // pink
  "#34D399", // green
  "#F87171", // red
  "#6366F1", // indigo
  "#F59E42", // amber
  "#10B981", // emerald
  "#F472B6", // rose
  "#818CF8", // violet
  "#FCD34D", // gold
  "#60A5FA", // sky blue
];

export const stats: {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}[] = [
  {
    name: "Total Users",
    value: "50,249",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Questions Asked",
    value: "29,123",
    change: "+8.2%",
    trend: "up",
    icon: FileQuestion,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Books Published",
    value: "1,234",
    change: "+5.3%",
    trend: "up",
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Research Papers",
    value: "456",
    change: "+7.4%",
    trend: "up",
    icon: ScrollText,
    color: "bg-yellow-50 text-yellow-600",
  },
];

export const notifications = [
  {
    type: "question",
    message: "New question needs review",
    time: "5 minutes ago",
    icon: AlertCircle,
    color: "text-yellow-600",
  },
  {
    type: "user",
    message: "New scholar registration",
    time: "1 hour ago",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    type: "report",
    message: "Content reported by user",
    time: "2 hours ago",
    icon: Flag,
    color: "text-red-600",
  },
];

export const quickActions = [
  {
    name: "Review Questions",
    icon: FileQuestion,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Manage Users",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "View Reports",
    icon: BarChart3,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Site Settings",
    icon: Settings,
    color: "bg-yellow-50 text-yellow-600",
  },
];

export const recentQuestions = [
  {
    title: "What is the ruling on combining prayers while traveling?",
    author: "Abdullah Ahmad",
    time: "2 hours ago",
    status: "Pending",
    priority: "High",
    views: 156,
    answers: 4,
  },
  {
    title: "How to calculate Zakat on stocks and investments?",
    author: "Sarah Mohammed",
    time: "3 hours ago",
    status: "Answered",
    priority: "Medium",
    views: 234,
    answers: 6,
  },
  {
    title: "Is it permissible to use cryptocurrency?",
    author: "Ibrahim Hassan",
    time: "5 hours ago",
    status: "Pending",
    priority: "Low",
    views: 189,
    answers: 2,
  },
];

export const recentBooks = [
  {
    title: "The Sealed Nectar",
    author: "Safiur Rahman Mubarakpuri",
    category: "Biography",
    status: "Published",
    downloads: 12500,
    rating: 4.9,
    lastUpdated: "2 days ago",
    coverImage:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2776&auto=format&fit=crop",
  },
  {
    title: "The Divine Reality",
    author: "Hamza Andreas Tzortzis",
    category: "Philosophy",
    status: "Under Review",
    downloads: 8900,
    rating: 4.8,
    lastUpdated: "5 days ago",
    coverImage:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Purification of the Heart",
    author: "Hamza Yusuf",
    category: "Spirituality",
    status: "Published",
    downloads: 15600,
    rating: 4.9,
    lastUpdated: "1 week ago",
    coverImage:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=2940&auto=format&fit=crop",
  },
];

export const researchPapers = [
  {
    title: "Contemporary Applications of Islamic Finance",
    author: "Dr. Sarah Mohammed",
    institution: "Oxford Centre for Islamic Studies",
    category: "Islamic Finance",
    status: "Published",
    citations: 78,
    downloads: 2300,
    publishDate: "2024-01-15",
  },
  {
    title: "The Evolution of Islamic Jurisprudence",
    author: "Dr. Ahmad Al-Razi",
    institution: "International Islamic University",
    category: "Islamic Law",
    status: "Under Review",
    citations: 45,
    downloads: 1200,
    publishDate: "2024-02-01",
  },
  {
    title: "The Role of Hadith in Modern Islamic Thought",
    author: "Dr. Muhammad Al-Bukhari",
    institution: "Al-Azhar University",
    category: "Hadith Studies",
    status: "Published",
    citations: 56,
    downloads: 1800,
    publishDate: "2024-01-20",
  },
];
