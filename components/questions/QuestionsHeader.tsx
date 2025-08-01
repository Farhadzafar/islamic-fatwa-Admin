"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Plus } from "lucide-react";

export default function QuestionsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Questions Management</h1>
        <p className="text-gray-600">
          Manage and monitor questions and answers
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Link href="/questions/upload">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Question
          </Button>
        </Link>
      </div>
    </div>
  );
}
