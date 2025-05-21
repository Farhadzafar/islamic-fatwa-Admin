// StatsGrid.tsx

import { StatsCard } from "./StatsCard";

export default function StatsGrid({
  stats,
}: {
  stats: {
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: React.ElementType;
    color: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
