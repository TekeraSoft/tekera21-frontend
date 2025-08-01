import { AdminAnalyticsCharts } from "@/components/superadmin/AdminAnalyticsCharts";
import { AdminAnalyticsHeader } from "@/components/superadmin/AdminAnalyticsHeader";
import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import TopBar from "@/components/superadmin/TopBar";

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
