"use client";
import { Card } from "@/components/ui/card"; // Corrected the path to use the alias "@/components"
import { Button } from "@/components/ui/button";
import {
  Users,
  FileQuestion,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MessageSquare,
  ThumbsUp,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Activity,
  Filter,
  Download,
  Printer,
  Share2,
  Star,
  CheckCircle,
  AlertCircle,
  Bell,
  Mail,
  Flag,
  HelpCircle,
  Settings,
  ChevronDown,
  User,
  FileText,
  GraduationCap,
  BookMarked,
  Library,
  ScrollText,
  Bookmark,
  Link,
  MoreVertical,
} from "lucide-react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
  Area,
} from "recharts";

export default function AdminDashboard() {
  // Sample data for charts
  const areaChartData = [
    { name: "Jan", questions: 4000, answers: 24000 },
    { name: "Feb", questions: 3000, answers: 1398 },
    { name: "Mar", questions: 20000, answers: 9800 },
    { name: "Apr", questions: 2780, answers: 39008 },
    { name: "May", questions: 18900, answers: 4800 },
    { name: "Jun", questions: 2390, answers: 3800 },
    { name: "Jul", questions: 3490, answers: 4300 },
  ];

  const pieChartData = [
    { name: "Aqeedah", value: 400 },
    { name: "Fiqh", value: 300 },
    { name: "Hadith", value: 300 },
    { name: "Quran", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const stats = [
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

  const notifications = [
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

  const quickActions = [
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

  const recentQuestions = [
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

  const recentBooks = [
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

  const researchPapers = [
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back, Admin User</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Last 7 Days
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-gray-50"
            >
              <div
                className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}
              >
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{action.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600">{stat.name}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Analytics */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Questions Analytics</h2>
              <p className="text-sm text-gray-500">
                Questions and answers over time
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="questions"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="answers"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`p-2 rounded-full bg-gray-50 ${notification.color}`}
                >
                  <notification.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Category Distribution</h2>
              <p className="text-sm text-gray-500">Questions by category</p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">User Activity</h2>
              <p className="text-sm text-gray-500">Active users over time</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="questions"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="answers" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Questions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Questions</h2>
            <p className="text-sm text-gray-500">
              Latest questions that need attention
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {recentQuestions.map((question, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <h3 className="font-medium hover:text-primary transition-colors">
                  {question.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {question.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {question.time}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      question.status === "Answered"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {question.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      question.priority === "High"
                        ? "bg-red-50 text-red-600"
                        : question.priority === "Medium"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {question.priority} Priority
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{question.views}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{question.answers}</span>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Books Report */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Books</h2>
            <p className="text-sm text-gray-500">
              Latest books and publications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBooks.map((book, index) => (
            <div
              key={index}
              className="rounded-lg border hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative h-40">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      book.status === "Published"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {book.status}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{book.rating}</span>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {book.downloads.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {book.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Research Papers */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Research Papers</h2>
            <p className="text-sm text-gray-500">
              Latest academic publications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {researchPapers.map((paper, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        paper.status === "Published"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {paper.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {paper.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{paper.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>{paper.institution}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {paper.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Link className="w-4 h-4" />
                    {paper.citations} citations
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {paper.downloads} downloads
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
