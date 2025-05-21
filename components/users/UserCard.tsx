// components/users/UserListCard.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";

export default function UserListCard({ users }: { users: any[] }) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-4 flex-1">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{user.name}</h3>
                  {user.verified && (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Role & Status */}
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  user.role === "Scholar"
                    ? "bg-purple-50 text-purple-600"
                    : user.role === "Moderator"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.role}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  user.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {user.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Lock className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last active {user.lastActive}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>
                {user.role === "Scholar"
                  ? `${user.questionsAnswered} answers`
                  : user.role === "Moderator"
                  ? `${user.reportsHandled} reports`
                  : `${user.questionsAsked} questions`}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
