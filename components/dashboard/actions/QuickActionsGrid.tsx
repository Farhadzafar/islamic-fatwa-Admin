import { Button } from "@/components/ui/button";

export default function QuickActionsGrid({
  actions,
}: {
  actions: { name: string; icon: any; color: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-gray-50"
        >
          <div
            className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}
          >
            <action.icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">{action.name}</span>
        </Button>
      ))}
    </div>
  );
}
