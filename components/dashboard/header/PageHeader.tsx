import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Download } from "lucide-react";

export default function PageHeader() {
  return (
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
    </div>
  );
}
