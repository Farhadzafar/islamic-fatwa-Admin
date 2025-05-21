// components/users/PaginationControls.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function PaginationControls({ total }: { total: number }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">Showing 1-10 of {total} users</p>
      <div className="flex gap-2">
        <Button variant="outline" className="w-10 h-10 p-0">
          1
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0">
          2
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0">
          3
        </Button>
        <span className="w-10 h-10 flex items-center justify-center">...</span>
        <Button variant="outline" className="w-10 h-10 p-0">
          50
        </Button>
      </div>
    </div>
  );
}
