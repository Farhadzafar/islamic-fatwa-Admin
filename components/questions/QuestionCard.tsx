"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit2,
  Trash2,
  ExternalLink,
  User,
  GraduationCap,
  Clock,
  Eye,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

export interface Question {
  id: string; // Usually maps from _id
  title: string;
  excerpt: string;
  description?: string;
  language: "ps" | "en" | "ar";
  status: "unanswered" | "answered" | "assigned" | "draft";
  category: {
    _id: string;
    name: string;
  };
  askedBy: string;
  assignedTo?: string | null;
  dateAsked: string;
  views: number;
  answers: number;
  likes: number;
  verified: boolean;
  tags: string[];
}

interface QuestionCardProps {
  question: Question;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function QuestionCard({
  question,
  onDelete,
  onEdit,
}: QuestionCardProps) {
  console.log("qustoin", question);
  return (
    <div className="space-y-4">
      <Card key={question.id} className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                {question.category?.name ?? "no Category"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
                {question.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
            <p className="text-gray-600 text-sm">{question.excerpt}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 hover:text-blue-400">
                {question.category}
              </span> */}

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

        <div className=" flex items-center justify-around pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            Asked by: <span className="font-medium">{question.askedBy}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            Assigned to:{" "}
            <span className="font-medium">
              {question.assignedTo || "Unassigned"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            Date: <span className="font-medium">{question.dateAsked}</span>
          </div>
          {/* <div className="flex items-center gap-4 text-sm">
              <Eye className="w-4 h-4 text-gray-400" />
              {question.views}
              <MessageSquare className="w-4 h-4 text-gray-400" />
              {question.answers}
              <ThumbsUp className="w-4 h-4 text-gray-400" />
              {question.likes}
            </div> */}
        </div>
      </Card>
    </div>
  );
}
