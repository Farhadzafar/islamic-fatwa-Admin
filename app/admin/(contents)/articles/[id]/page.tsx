"use client";

import { useEffect, useState } from "react";
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
import { getArticlesId } from "@/lib/data/articles";
import { Spinner } from "@/components/ui/spinner"; // You need to create or use a spinner component
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await getArticlesId(id);
        if (!data) throw new Error("Article not found");
        setArticle(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [params.id]);

  console.log("Aticle is this 👀👀👀👀", article);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Spinner />
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen flex justify-center items-center text-red-500">
        Error: {error || "Article data is missing"}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      {/* Back Button - Mobile */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 mb-4">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/books">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="lg:col-span-2 space-y-8">
          {/* Article Header */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {article.category.name ?? "null"}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {article.readTime ?? "12M"}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {article.createdAt}
              </span>
            </div>

            <small>Title:</small>
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            {/* <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p> */}

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={article.author.image}
                alt={article.author.fullName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{article.author.fullName}</h3>
                <p className="text-sm text-gray-600">
                  {article.author.bio ?? ""}
                </p>
                <p className="text-sm text-gray-600">
                  {article.author.institution ?? ""}
                </p>
              </div>
            </div>

            {/* Article Stats */}
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

          {/* Featured Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {article.coverImageUrl ? (
              <img
                src={`${
                  process.env.NEXT_PUBLIC_API_ENDPOINT
                }${article.coverImageUrl.replace("/public", "")}`}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Article Content */}
          <Card className="p-6">
            <div
              className={`prose max-w-none ${
                !isContentExpanded
                  ? "max-h-[500px] overflow-hidden relative"
                  : ""
              }`}
            >
              {/* Replace below with parsed content if needed */}
              <p>{article.description}</p>
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
        </div>
      </div>
    </main>
  );
}
