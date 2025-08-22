"use client";
import React from "react";
import { DashboardCards } from "@/components/manage/DashBoardCards";
import { DashboardHeader } from "@/components/manage/DashBoardHeader";
import { RecentOrders } from "@/components/manage/RecentOrders";
import { TopProducts } from "@/components/manage/TopProducts";

import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import { getSellerReport } from "@/app/actions/server/seller.actions";
import { useQuery } from "@tanstack/react-query";
import LoadingBigCircle from "@/components/shared/Loading/LoadingBigCircle";

const DashBoard = () => {
  const mutationSellerReport = useQuery({
    queryKey: ["sellerReport"],
    queryFn: getSellerReport,
  });

  if (mutationSellerReport.isLoading) {
    return <LoadingBigCircle />;
  }
  if (mutationSellerReport.isError) {
    return <div>Hata: {mutationSellerReport.error.message}</div>;
  }
  if (!mutationSellerReport.data?.data) {
    return <div>Hata: Herhangi bir veri bulunamadı</div>;
  }
  return (
    <div>
      <AdminInnerLayout>
        <DashboardHeader />
        <DashboardCards data={mutationSellerReport.data.data} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentOrders orders={mutationSellerReport.data.data.recentOrders} />
          <TopProducts products={mutationSellerReport.data.data.topProducts} />
        </div>
      </AdminInnerLayout>
    </div>
  );
};

export default DashBoard;
