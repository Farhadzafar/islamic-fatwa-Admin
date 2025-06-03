"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Download, Plus } from "lucide-react";

export default function BookHeader() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Books Management</h1>
        <p className="text-gray-600">
          Manage books, articles, and research papers
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button className="gap-2" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4" />
          {showAddForm ? "Cancel" : "Add Content"}
        </Button>
      </div>
    </div>
  );
}
