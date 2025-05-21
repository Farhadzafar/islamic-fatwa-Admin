"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Bell, Menu } from "lucide-react";
import Sidebar from "./Sidebar"; // Assuming same folder or adjust path

export default function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/admin" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Admin</span>
          </Link>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Render Sidebar when open (only on small screens) */}
      {isSidebarOpen && (
        <SidebarMobileOverlay onClose={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
}

// Sidebar overlay for mobile
function SidebarMobileOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30">
      <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
        <Sidebar />
        <div className="p-2 border-t text-right">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
