import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function NotificationsList({
  notifications,
}: {
  notifications: {
    type: string;
    message: string;
    time: string;
    icon: React.ElementType;
    color: string;
  }[];
}) {
  return (
    <div className="p-6 bg-white rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Notifications</h2>
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </div>
      <div className="space-y-4">
        {notifications.map((n, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-full bg-gray-50 ${n.color}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{n.message}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
