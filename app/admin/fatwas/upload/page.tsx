// app/fatwa/new/page.tsx (Server Component)
import MultiStepFatwaForm from "@/components/fatwas/fatwa-form/multi-step-fatwa-form";
import FatwaForm from "@/components/fatwas/FatwaForm";
import dynamic from "next/dynamic";

// const FatwaForm = dynamic(() => import("@/components/fatwas/FatwaForm"), {
//   ssr: false,
// });

export default function NewFatwaPage() {
  return (
    <main className="p-8">
      {/* <FatwaForm /> */}
      <MultiStepFatwaForm />
    </main>
  );
}
