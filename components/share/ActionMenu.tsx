"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

interface ActionMenuProps {
  id: string;
  type: "book" | "article" | "research" | "fatwa";
}

export default function ActionMenu({ id, type }: ActionMenuProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [openMenu, setOpenMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const editPath = `/${type}s/edit/${id}`;
  const apiPath = `/api/${type}s/${id}`;

  const capitalize = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(apiPath, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      toast({
        title: "Deleted",
        description: `${capitalize(type)} deleted successfully.`,
      });

      setShowConfirm(false);
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: `Failed to delete the ${type}.`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Close dropdown menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Menu trigger button */}

      <Button
        variant="ghost"
        size="icon"
        className="bg-white/90 hover:bg-white"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        <MoreVertical className="h-5 w-5" />
      </Button>

      {/* Dropdown menu */}
      {openMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-50">
          <button
            onClick={() => {
              setOpenMenu(false);
              router.push(editPath);
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              setShowConfirm(true);
              setOpenMenu(false);
            }}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this {type}?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded border border-gray-300 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center"
              >
                {isDeleting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
