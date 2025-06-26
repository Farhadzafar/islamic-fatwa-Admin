"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Calendar, Clock, Eye, Heart, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ActionMenu from "../share/ActionMenu";

type Author = {
  name: string;
  role: string;
  avatar: string;
};

type Article = {
  _id?: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  status?: string;
  author: Author;
  tags: string[];
  readTime: string;
  publishDate: string;
  views: number;
  likes: number;
  metrics: {
    comments: number;
  };
};

type ArticleCardProps = {
  article: Article;
  direction?: "ltr" | "rtl"; // Added direction prop
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export const ArticleCard = ({
  article,
  direction = "ltr",
  onDelete,
  onEdit,
}: ArticleCardProps) => {
  // Conditional classes for RTL / LTR
  const flexDirection =
    direction === "rtl" ? "lg:flex-row-reverse" : "lg:flex-row";
  const textAlign = direction === "rtl" ? "text-right" : "text-left";
  const justifyBetween =
    direction === "rtl" ? "justify-between" : "justify-between";
  const gapDirection = direction === "rtl" ? "gap-x-reverse" : "";

  return (
    <Card
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 my-6"
      dir={direction} // Set HTML direction
    >
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${flexDirection}`}>
        {/* Image Section */}
        <div className="relative w-full h-64 lg:h-auto">
          <Image
            src={article.image || "/default-article.webp"}
            alt={article.title || "Article image"}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur-placeholder.png"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge text={article.category} color="primary" />
            {article.status && <Badge text={article.status} />}
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-6 lg:col-span-2 space-y-4 ${textAlign}`}>
          <div className={`flex justify-between items-start`}>
            <AuthorInfo author={article.author} direction={direction} />
            <ActionMenu
              id={article._id ?? ""}
              onDelete={onDelete ?? (() => Promise.resolve(false))}
              onEdit={onEdit ?? (() => {})}
            />
          </div>

          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>

          <div className={`flex items-center justify-between pt-4 border-t`}>
            <MetaData
              readTime={article.readTime}
              publishDate={article.publishDate}
              direction={direction}
            />
            <div className="flex items-center gap-6">
              <Stats views={article.views} likes={article.likes} />
              <Link href={`/articles/${article._id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ========== Subcomponents ==========

const Badge = memo(
  ({ text, color = "white" }: { text: string; color?: string }) => {
    const base = "px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm";
    const variants: Record<string, string> = {
      primary: "bg-primary text-white",
      white: "bg-white/90 text-black",
    };
    return <span className={`${base} ${variants[color]}`}>{text}</span>;
  }
);

const AuthorInfo = memo(
  ({ author, direction = "ltr" }: { author: Author; direction?: string }) => {
    const flexDirection = direction === "rtl" ? "flex-row-reverse" : "flex-row";
    const textAlign = direction === "rtl" ? "text-right" : "text-left";
    return (
      <div className={`flex items-center gap-4 ${flexDirection}`}>
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              author.name || "Author"
            )}`}
            alt="Default Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
        <div className={textAlign}>
          <h4 className="font-medium">{author.name}</h4>
          <p className="text-sm text-gray-600">{author.role}</p>
        </div>
      </div>
    );
  }
);

const MetaData = memo(
  ({
    readTime,
    publishDate,
    direction = "ltr",
  }: {
    readTime: string;
    publishDate: string;
    direction?: string;
  }) => {
    const textAlign = direction === "rtl" ? "text-right" : "text-left";
    return (
      <div
        className={`flex items-center gap-6 text-sm text-gray-500 ${textAlign}`}
      >
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {readTime}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(publishDate).toLocaleDateString(
            direction === "rtl" ? "ar" : "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}
        </span>
      </div>
    );
  }
);

const Stats = memo(({ views, likes }: { views: number; likes: number }) => (
  <div className="flex items-center gap-4 text-gray-500">
    <span className="flex items-center gap-1">
      <Eye className="w-4 h-4" />
      {views}
    </span>
    <span className="flex items-center gap-1">
      <Heart className="w-4 h-4" />
      {likes}
    </span>
  </div>
));
