"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

export default function UserActivityChart({ data }: { data: any[] }) {
  return (
    <div className="p-6 bg-white rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">User Activity</h2>
          <p className="text-sm text-gray-500">Active users over time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
    </div>
  );
}
