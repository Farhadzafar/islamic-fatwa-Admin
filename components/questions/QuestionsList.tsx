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

type Question = {
  id: number;
  title: string;
  category: string;
  status: string;
  priority: string;
  askedBy: string;
  assignedTo: string | null;
  dateAsked: string;
  views: number;
  answers: number;
  likes: number;
  verified: boolean;
  tags: string[];
  excerpt: string;
};

export default function QuestionsList({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id} className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                  {question.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
                  {question.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-600">
                  {question.priority} Priority
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
              <p className="text-gray-600 text-sm">{question.excerpt}</p>
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
            {question.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
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
            <div className="flex items-center gap-4 text-sm">
              <Eye className="w-4 h-4 text-gray-400" />
              {question.views}
              <MessageSquare className="w-4 h-4 text-gray-400" />
              {question.answers}
              <ThumbsUp className="w-4 h-4 text-gray-400" />
              {question.likes}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
