import { AdminAnalyticsCharts } from "@/components/superadmin/AdminAnalyticsCharts";
import { AdminAnalyticsHeader } from "@/components/superadmin/AdminAnalyticsHeader";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-3 w-full">
      <AdminAnalyticsHeader />
      <AdminAnalyticsCharts />
    </div>
  );
}
