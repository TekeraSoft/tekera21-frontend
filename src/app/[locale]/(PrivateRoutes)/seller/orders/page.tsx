"use client";

import OrderTable from "@/components/shared/Orders/OrderTable";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import TopBar from "@/components/manage/TopBar";
import { IOrderData } from "@/types/OrderTypes";
import { useQuery } from "@tanstack/react-query";
import { getSellerOrders } from "@/app/actions/server/seller.actions";
import ErrorMessageComponent from "@/components/shared/ErrorMessageComponent";
import { IResponse } from "@/types/ResponseType";

export default function OrdersPage() {
  const orders = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async (): Promise<IResponse<IOrderData>> => {
      return await getSellerOrders();
    },
  });

  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        {orders.isLoading ? (
          <div>Loading...</div>
        ) : orders.isSuccess && orders.data.data ? (
          <OrderTable orderData={orders.data.data} />
        ) : (
          <ErrorMessageComponent
            message={orders.error?.message || "Siparişler getirilemedi."}
          />
        )}
      </AdminInnerLayout>
    </>
  );
}
