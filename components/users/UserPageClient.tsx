"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { getAllUsers, deleteUser } from "@/lib/data/users";
import UserCard from "./UserCard";
import { Card } from "../ui/card";

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 10;

export default function UserPageClient() {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchUsers = useCallback(
    async (pageToLoad = DEFAULT_PAGE, append = false) => {
      setLoading(true);
      try {
        const { users: fetchedUsers, hasMore: more } = await getAllUsers(
          pageToLoad,
          PAGE_LIMIT,
          {
            search,
            role: selectedRole,
            status: selectedStatus,
          }
        );
        setUsers((prev) =>
          append ? [...prev, ...fetchedUsers] : fetchedUsers
        );
        setPage(pageToLoad);
        setHasMore(more);
      } catch (err) {
        console.error("❌ Error loading users:", err);
      } finally {
        setLoading(false);
      }
    },
    [search, selectedRole, selectedStatus]
  );

  useEffect(() => {
    fetchUsers(DEFAULT_PAGE);
  }, [fetchUsers]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        fetchUsers(page + 1, true);
      }
    });

    const sentinel = observerRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [fetchUsers, loading, hasMore, page]);

  const handleDeleteUser = async (id: string) => {
    const success = await deleteUser(id);
    if (success) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
    return success;
  };

  const handleEditUser = async (id: string) => {
    console.log("Edit user in this urel", id);
  };

  const handleFilterChange = () => {
    fetchUsers(DEFAULT_PAGE);
  };

  return (
    <div className="space-y-8 p-8">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={handleFilterChange}
              placeholder="Search users..."
              className="pl-10"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                handleFilterChange();
              }}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="scholar">Scholar</option>
              <option value="user">User</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                handleFilterChange();
              }}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      {users.map((user, i) => (
        <UserCard
          key={user._id + i}
          user={user}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />
        // <UserCard key={user._id + i} user={user} onDelete={handleDeleteUser} />
        // <UserListCard
      ))}

      <div ref={observerRef} className="h-10" />

      {loading && (
        <p className="text-center text-gray-500">Loading more users...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400">✅ No more users to load.</p>
      )}
    </div>
  );
}
