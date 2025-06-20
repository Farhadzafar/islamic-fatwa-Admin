"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";

type FiltersCardProps = {
  categories: { name: string; count: number }[];
  statuses: { value: string; label: string }[];
  languages?: { name: string; code: string }[];
};

export default function ArticleFiltersCard({
  categories,
  statuses,
  languages,
}: FiltersCardProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search questions..." className="pl-10" />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm"
          >
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name.toLowerCase()}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </select>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm"
          >
            {languages?.map((lang) => (
              <option key={lang.name} value={lang.name.toLowerCase()}>
                {lang.name} ({lang.code})
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm"
          >
            {statuses.map((stat) => (
              <option key={stat.value} value={stat.value}>
                {stat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Additional filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" />
              <Input type="date" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm">
              <option>All</option>
              <option>Verified Only</option>
              <option>Unverified</option>
            </select>
          </div>
        </div>
      )}
    </Card>
  );
}
