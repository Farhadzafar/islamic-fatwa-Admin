"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { truncateString } from "@/lib/utils";
import {
  Edit2,
  Trash2,
  ExternalLink,
  User,
  Clock,
  Eye,
  ThumbsUp,
} from "lucide-react";

type Fatwas = {
  id: number;
  len: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  mezhab: string;
  fatwaBy: string;
  views: number;
  likes: number;
  verified: boolean;
  reference: string[];
  data: string;
};

export default function FatwaCard({ fatwas }: { fatwas: Fatwas[] }) {
  return (
    <div className="space-y-4">
      {fatwas.map((fatwa) => (
        <Card key={fatwa.id} className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                  {fatwa.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
                  {fatwa.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-600">
                  Mezhab: {fatwa.mezhab}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{fatwa.title}</h3>
              <p className="text-gray-600 text-sm">
                {truncateString(fatwa.description, 150)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {fatwa.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-400" />
                Fatwa by: <span className="font-medium">{fatwa.fatwaBy}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                Date: <span className="font-medium ">{fatwa.data}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 text-sm">
              <Eye className="w-4 h-4 text-gray-400" />
              {fatwa.views}

              <ThumbsUp className="w-4 h-4 text-gray-400" />
              {fatwa.likes}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
