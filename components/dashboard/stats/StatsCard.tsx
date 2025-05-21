// StatsCard.tsx
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatsCard({
  icon: Icon,
  name,
  value,
  change,
  trend,
  color,
}: {
  icon: React.ElementType;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}) {
  return (
    <div className="p-6 hover:shadow-lg transition-all duration-300 bg-white rounded-lg border">
      <div className="flex items-start justify-between">
        <div>
          <div
            className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <p className="text-gray-600">{name}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div
          className={`flex items-center gap-1 ${
            trend === "up" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}
