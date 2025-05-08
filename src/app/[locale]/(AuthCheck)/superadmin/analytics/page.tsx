import { AdminAnalyticsCharts } from "@/components/superadmin/AdminAnalyticsCharts";
import { AdminAnalyticsHeader } from "@/components/superadmin/AdminAnalyticsHeader";
import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import TopBar from "@/components/superadmin/TopBar";

export default async function AnalyticsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });

  const user = await res.json();
  console.log("user in analytics page", user);

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
