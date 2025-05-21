"use client";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function CategoryPieChart({
  data,
  colors,
}: {
  data: any[];
  colors: string[];
}) {
  return (
    <div className="p-6 bg-white rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Category Distribution</h2>
          <p className="text-sm text-gray-500">Questions by category</p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
