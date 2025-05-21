// components/users/UserStatsGrid.tsx
import { Card } from "@/components/ui/card";

export default function UserStatsGrid({
  stats,
}: {
  stats: {
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
