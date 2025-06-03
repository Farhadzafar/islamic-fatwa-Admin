"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GitPullRequestCreateIcon,
  AlignVerticalDistributeStart,
  Microscope,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Fatwas", href: "/admin/fatwas", icon: GitPullRequestCreateIcon },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  {
    name: "Articles",
    href: "/admin/articles",
    icon: AlignVerticalDistributeStart,
  },
  { name: "Research", href: "/admin/research", icon: Microscope },
  { name: "Questions", href: "/admin/questions", icon: FileQuestion },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  image: string;
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}
export default function Sidebar({ open, onClose, user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  console.log("Sidebar user:", user?.email);

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link
            href="/admin"
            className="flex items-center gap-2 overflow-hidden"
          >
            <BookOpen className="w-6 h-6 text-primary" />
            {!collapsed && (
              <span className="font-bold text-xl">Admin Panel</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={
                user?.image ||
                "https://ui-avatars.com/api/?name=Abdullah+Ahmad&background=random"
              }
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />

            {!collapsed && (
              <>
                <div className="flex-1">
                  <p className="font-medium">{user?.fullName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
