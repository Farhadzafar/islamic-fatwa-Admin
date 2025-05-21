// components/users/UserFiltersCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";

export default function UserFiltersCard({
  roles,
  statuses,
}: {
  roles: { value: string; label: string; count: number }[];
  statuses: { value: string; label: string }[];
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label} ({role.count})
              </option>
            ))}
          </select>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" placeholder="From" />
              <Input type="date" placeholder="To" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Input placeholder="Filter by location" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
              <option>All</option>
              <option>Verified</option>
              <option>Unverified</option>
            </select>
          </div>
        </div>
      )}
    </Card>
  );
}
