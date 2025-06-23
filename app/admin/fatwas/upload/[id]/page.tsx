import { getFatwaById } from "@/lib/data/fatwa";
import { editFatwa } from "@/lib/data/fatwa";
import FatwaEditForm from "@/components/fatwas/FatwaEditForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EditFatwaPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  if (!id) {
    return <div className="p-6">Fatwa ID is required.</div>;
  }
  const fatwa = await getFatwaById(id);
  console.log("Editing Fatwa:", fatwa);
  if (!fatwa) {
    return (
      <div className="w-full h-screen p-6 flex flex-col items-center justify-center">
        <p>Fatwa not found. Please check the ID and try again.</p>
        <Link href="/admin/fatwas">
          <Button variant="link" className="mt-4">
            Go back to Fatwas List
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <FatwaEditForm fatwa={fatwa} />
    </div>
  );
}
