// app/admin/fatwas/[id]/page.tsx
import { getFatwaById } from "@/lib/data/fatwa";
import { formatDate } from "@/lib/utils";
import { Eye, ThumbsUp, User, Clock } from "lucide-react";
import { notFound } from "next/navigation";

export default async function FatwaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const fatwa = await getFatwaById(id);

  if (!fatwa) return notFound();

  const isRtl = fatwa.language === "ps" || fatwa.language === "ar";

  return (
    <div
      className="max-w-3xl mx-auto p-6 space-y-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <h1 className="text-2xl font-bold text-primary">{fatwa.title}</h1>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          {fatwa.category}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
          {fatwa.status}
        </span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
          Mezhab: {fatwa.madhab}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
          Language: {fatwa.language.toUpperCase()}
        </span>
      </div>

      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: fatwa.description }}
      />

      <div
        className="border-t pt-4 mt-6 flex flex-wrap justify-between text-sm text-gray-600"
        dir="ltr"
      >
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          Scholar:
          <span className="font-medium">
            {/* {fatwa.scholar?.fullName || "Farhad Ahmad Zafari"} */}
            Farhad Ahmad Zafari
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          Date:
          <span className="font-medium">{formatDate(fatwa.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400" />
          Views: {fatwa.views || 0}
        </div>

        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4 text-gray-400" />
          Likes: {fatwa.likes?.length || 0}
        </div>
      </div>
    </div>
  );
}
