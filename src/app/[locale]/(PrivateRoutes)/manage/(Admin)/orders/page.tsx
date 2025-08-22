"use client";

import OrderTable from "@/components/shared/Orders/OrderTable";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import TopBar from "@/components/manage/TopBar";
import { IOrderData } from "@/types/OrderTypes";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/app/actions/server/order.actions";
import { IResponse } from "@/types/ResponseType";

export default function OrdersPage() {
  const orders = useQuery({
    queryKey: ["cartItems"],
    queryFn: async (): Promise<IResponse<IOrderData>> => {
      return await getAllOrders();
    },
  });

  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        {orders.isSuccess && orders.data.data && (
          <OrderTable orderData={orders.data.data} />
        )}
      </AdminInnerLayout>
    </>
  );
}
