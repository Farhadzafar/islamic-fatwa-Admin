import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface StatCardItem {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: string;
}

interface StatsCardsProps {
  stats: StatCardItem[];
}

export function StaticCard({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="p-6 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
