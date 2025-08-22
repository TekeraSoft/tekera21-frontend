import { AdminAnalyticsCharts } from "@/components/manage/AdminAnalyticsCharts";
import { AdminAnalyticsHeader } from "@/components/manage/AdminAnalyticsHeader";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";


export default async function AnalyticsPage() {
  return (
    <>
      
      <AdminInnerLayout>
        <AdminAnalyticsHeader />
        <AdminAnalyticsCharts />
      </AdminInnerLayout>
    </>
  );
}
