"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Share2,
  Clock,
  Heart,
  Eye,
  Calendar,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

type ArticleProps = {
  article: {
    _id?: string;
    title: string;
    subtitle?: string;
    content?: string;
    image?: string;
    category: string;
    readTime: string;
    publishDate: string;
    views: number;
    likes: number;
    shares: number;
    author: {
      name: string;
      title?: string;
      institution?: string;
      avatar?: string;
    };
  };
};

export default function ArticleDetailPageClient({ article }: ArticleProps) {
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="lg:hidden max-w-7xl mx-auto px-4 mb-4">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/articles">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishDate).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            {article.subtitle && (
              <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
            )}

            {/* Author */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={
                  article.author.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    article.author.name || "Author"
                  )}`
                }
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{article.author.name}</h3>
                {article.author.title && (
                  <p className="text-sm text-gray-600">
                    {article.author.title}
                  </p>
                )}
                {article.author.institution && (
                  <p className="text-sm text-gray-600">
                    {article.author.institution}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {article.likes} likes
              </span>
              <span className="flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                {article.shares} shares
              </span>
            </div>
          </Card>

          {/* Image */}
          {article.image && (
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          {article.content && (
            <Card className="p-6">
              <div
                className={`prose max-w-none relative ${
                  !isContentExpanded ? "max-h-[500px] overflow-hidden" : ""
                }`}
              >
                {article.content.split("\n\n").map((para, idx) => (
                  <p key={idx} className="mb-4">
                    {para}
                  </p>
                ))}

                {!isContentExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>

              <Button
                variant="ghost"
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                className="mt-4 gap-2"
              >
                {isContentExpanded ? (
                  <>
                    Show Less
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
