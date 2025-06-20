import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  ArrowRight,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Author = {
  name: string;
  role: string;
  avatar: string;
};

type Article = {
  id: string;
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
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 my-6 py-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Section */}
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge text={article.category} color="primary" />
            {article.status && <Badge text={article.status} />}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:col-span-2">
          <div className=" flex justify-between items-center">
            <AuthorInfo author={article.author} />
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 hover:bg-white"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
          <TagList tags={article.tags} />

          <div className="flex items-center justify-between pt-4 border-t">
            <MetaData
              readTime={article.readTime}
              publishDate={article.publishDate}
            />
            <div className="flex items-center gap-6">
              <Stats views={article.views} likes={article.likes} />
              <Link href={`articles/${article.id}`}>
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

const Badge = ({ text, color = "white" }: { text: string; color?: string }) => {
  const base = "px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm";
  const variants: Record<string, string> = {
    primary: "bg-primary text-white",
    white: "bg-white/90 text-black",
  };
  return <span className={`${base} ${variants[color]}`}>{text}</span>;
};

const AuthorInfo = ({ author }: { author: Author }) => (
  <div className="flex items-center gap-4 mb-4">
    <img
      src={author.avatar}
      alt={author.name}
      className="w-10 h-10 rounded-full"
    />
    <div>
      <h4 className="font-medium">{author.name}</h4>
      <p className="text-sm text-gray-600">{author.role}</p>
    </div>
  </div>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {tags.map((tag, i) => (
      <span
        key={i}
        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
      >
        #{tag}
      </span>
    ))}
  </div>
);

const MetaData = ({
  readTime,
  publishDate,
}: {
  readTime: string;
  publishDate: string;
}) => (
  <div className="flex items-center gap-6 text-sm text-gray-500">
    <span className="flex items-center gap-1">
      <Clock className="w-4 h-4" />
      {readTime}
    </span>
    <span className="flex items-center gap-1">
      <Calendar className="w-4 h-4" />
      {new Date(publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </span>
  </div>
);

const Stats = ({ views, likes }: { views: number; likes: number }) => (
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
);
