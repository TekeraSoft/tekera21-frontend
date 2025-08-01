import React from "react";

import { DashboardCards } from "@/components/superadmin/DashBoardCards";
import { DashboardHeader } from "@/components/superadmin/DashBoardHeader";
import { RecentOrders } from "@/components/superadmin/RecentOrders";
import { TopProducts } from "@/components/superadmin/TopProducts";
import TopBar from "@/components/superadmin/TopBar";
import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";

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
