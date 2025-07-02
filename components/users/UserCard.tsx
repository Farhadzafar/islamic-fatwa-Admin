"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getUserToken } from "@/hooks/getTokn";
import { formatDate } from "@/lib/utils";
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

interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  image?: string;
  isVerified: boolean;
  madhab?: string;
  language?: string;
  status?: "active" | "pending";
  role: "user" | "scholar" | "admin";
  location?: { city: string; country: string };
  createdAt: string;
  lastActive?: string;
  answersReceived?: number;
  questionsAsked?: number;
}

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const roleStyles = {
  user: "bg-gray-100 text-gray-600",
  scholar: "bg-purple-50 text-purple-600",
  admin: "bg-blue-50 text-blue-600",
};

export default function UserCard({
  user: initialUser,
  onDelete,
  onEdit,
}: UserCardProps) {
  const [user, setUser] = useState(initialUser);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const handleRoleChange = async (
    userId: string,
    fullName: string,
    newRole: string
  ) => {
    const token = getUserToken();

    try {
      setUpdatingUserId(userId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/role/${userId}?role=${newRole}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to update role");

      toast({
        title: "✅ Role Updated",
        description: `${fullName} is now a ${newRole.toUpperCase()}`,
      });

      // ✅ Update frontend state
      setUser((prev) => ({
        ...prev,
        role: newRole as "user" | "scholar" | "admin",
      }));
    } catch (err) {
      toast({
        title: "❌ Role Update Failed",
        description: "There was an error changing the user role.",
        variant: "destructive",
      });
      console.error("Error changing role:", err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const avatarUrl =
    user.image && user.image !== "default-user.jpg"
      ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/users/${user.image}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.fullName
        )}&background=random`;

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* User Info */}
        <div className="flex items-start gap-4 flex-1">
          <img
            src={avatarUrl}
            alt={user.fullName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{user.fullName}</h3>
              {user.isVerified && (
                <CheckCircle className="w-4 h-4 text-primary" />
              )}
              <div className="ml-4 flex gap-2 mb-1">
                {user.madhab && (
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-sm">
                    {user.madhab}
                  </span>
                )}
                {user.language && (
                  <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-sm">
                    {{
                      en: "English",
                      ps: "پښتو",
                      ar: "العربية",
                    }[user.language] ?? user.language}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col text-sm text-gray-600 gap-1.5">
              <div className="flex items-start gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
                {user.phoneNumber && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {user.phoneNumber}
                  </span>
                )}
              </div>
              {user.bio && <span className="max-w-3xl">{user.bio}</span>}
            </div>
          </div>
        </div>

        {/* Role & Status */}
        <div className="flex items-center gap-4">
          {user.status && (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                user.status === "active"
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {user.status}
            </span>
          )}

          {updatingUserId === user._id ? (
            <div className="w-6 h-6 flex justify-center items-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
            </div>
          ) : (
            <select
              value={user.role}
              onChange={(e) =>
                handleRoleChange(user._id, user.fullName, e.target.value)
              }
              className={`px-3 py-1 rounded-full text-sm outline-none cursor-pointer ${
                roleStyles[user.role]
              }`}
            >
              <option value="user">User</option>
              <option value="scholar">Scholar</option>
              <option value="admin">Admin</option>
            </select>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(user._id)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500"
            onClick={() => onDelete(user._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>
              {user.location.country}, {user.location.city}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        {user.lastActive && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Last active {formatDate(user.lastActive)}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <span>
            {user.role === "scholar"
              ? `${user.answersReceived ?? 0} answers`
              : `${user.questionsAsked ?? 0} questions`}
          </span>
        </div>
      </div>
    </Card>
  );
}
