import EditFatwaForm from "@/components/fatwas/EditFatwaForm";
import { getFatwaById, editFatwa } from "@/lib/data/fatwa";

export default async function EditFatwaPage({
  params,
}: {
  params: { id: string };
}) {
  const fatwa = await getFatwaById(params.id);
  const handleEditFatwa = async (
    id: string | undefined,
    values: {
      title: string;
      scholar: string;
      description: string;
      category: string;
      madhab: string;
      language: string;
    }
  ) => {
    if (!id) return false;
    return editFatwa(id, values);
  };

  return (
    <div className="p-6">
      <EditFatwaForm
        initialData={fatwa ?? undefined}
        onSubmit={handleEditFatwa}
      />
    </div>
  );
}
