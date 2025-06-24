import { Card } from "@/components/ui/card";
import { truncateString, formatDate } from "@/lib/utils";
import { User, Clock, Eye, ThumbsUp } from "lucide-react";
import ActionMenu from "../share/ActionMenu";
import Link from "next/link";

import { getFatwaInterface } from "@/lib/data/fatwa";

type Fatwas = {
  _id: string;
  title: string;
  description: string;
  category: string;
  language: "ps" | "en" | "ar";
  madhab: string;
  status: "pending" | "assigned" | "submitted" | "published" | "rejected";
  views: number;
  likes?: string[];
  tags?: string[];
  createdAt: string;
  scholar?: {
    _id: string;
    fullName?: string;
  };
};

export default function FatwaCard({
  fatwas,
  onDelete,
  onEdit,
}: {
  fatwas: getFatwaInterface[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  if (!fatwas || fatwas.length === 0) {
    return <div className="text-center text-gray-500">No fatwas found.</div>;
  }
  return (
    <div className="space-y-4">
      {fatwas.map((fatwa, i) => {
        const isRtl = fatwa.language === "ps" || fatwa.language === "ar";

        return (
          <Card key={fatwa._id} className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    {fatwa.category?.name || "No category"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
                    {fatwa.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-600">
                    Mezhab: {fatwa.madhab || "Unknown"}
                  </span>
                </div>

                <Link
                  href={`/admin/fatwas/${fatwa._id}`}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <h3 className="text-lg font-semibold mb-2 hover:text-primary">
                    {fatwa.title}
                  </h3>
                </Link>

                <p
                  className="text-gray-600 text-sm"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {truncateString(fatwa.description, 150)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ActionMenu
                  id={fatwa._id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t w-full">
              <div className=" flex items-center justify-start gap-8 ">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />

                  <span className="font-medium">
                    {fatwa.scholar?.fullName || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Date:
                  <span className="font-medium">
                    {formatDate(fatwa.createdAt ?? "")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 text-sm w">
                <Eye className="w-4 h-4 text-gray-400" />
                {fatwa.views ?? 0}
                <ThumbsUp className="w-4 h-4 text-gray-400" />
                {fatwa.likes?.length ?? 0}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
