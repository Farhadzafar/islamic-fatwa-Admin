// components/users/UserHeader.tsx
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";

export default function UserHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">User Management</h1>
        <p className="text-gray-600">Manage and monitor user accounts</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </div>
    </div>
  );
}
