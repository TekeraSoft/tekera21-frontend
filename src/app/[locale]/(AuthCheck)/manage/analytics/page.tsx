import { AdminAnalyticsCharts } from "@/components/manage/AdminAnalyticsCharts";
import { AdminAnalyticsHeader } from "@/components/manage/AdminAnalyticsHeader";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import TopBar from "@/components/manage/TopBar";

export default async function AnalyticsPage() {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <AdminAnalyticsHeader />
        <AdminAnalyticsCharts />
      </AdminInnerLayout>
    </>
  );
}
