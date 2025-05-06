import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import ToggleSidebarButton from "./ToggleSidebarButton";

export function AdminAnalyticsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center">
        <ToggleSidebarButton />
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
      </div>
      <div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Last 30 days
        </Button>
      </div>
    </div>
  );
}
