import React from "react";

import { DashboardCards } from "@/components/manage/DashBoardCards";
import { DashboardHeader } from "@/components/manage/DashBoardHeader";
import { RecentOrders } from "@/components/manage/RecentOrders";
import { TopProducts } from "@/components/manage/TopProducts";
import TopBar from "@/components/manage/TopBar";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";

const DashBoard = () => {
  return (
    <div>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <DashboardHeader />
        <DashboardCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentOrders />
          <TopProducts />
        </div>
      </AdminInnerLayout>
    </div>
  );
};

export default DashBoard;
