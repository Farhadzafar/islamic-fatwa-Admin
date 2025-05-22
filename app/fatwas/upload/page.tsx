// app/fatwa/new/page.tsx (Server Component)
import FatwaForm from "@/components/fatwas/FatwaForm";
import dynamic from "next/dynamic";

// const FatwaForm = dynamic(() => import("@/components/fatwas/FatwaForm"), {
//   ssr: false,
// });

export default function NewFatwaPage() {
  return (
    <main className="p-8">
      <FatwaForm />
    </main>
  );
}
