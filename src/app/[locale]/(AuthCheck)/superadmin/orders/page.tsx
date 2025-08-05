"use client";
import { getAllOrders } from "@/app/actions";
import OrderTable from "@/components/shared/Orders/OrderTable";
import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import TopBar from "@/components/superadmin/TopBar";
import { IOrderResponse } from "@/types/OrderTypes";
import { useQuery } from "@tanstack/react-query";

export default function OrdersPage() {
  const orders = useQuery({
    queryKey: ["cartItems"],
    queryFn: async (): Promise<IOrderResponse> => {
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
