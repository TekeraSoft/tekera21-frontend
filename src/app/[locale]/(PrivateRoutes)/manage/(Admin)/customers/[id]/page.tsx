"use client";
import { useParams } from "next/navigation";
import React from "react";

import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import { getSellerByUserId } from "@/app/actions/server/seller.actions";
import { useQuery } from "@tanstack/react-query";

const AdminEditCustomerPage = () => {
  const { id } = useParams() as { id: string };

  const customerQuery = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getSellerByUserId(id),
  });

  if (!customerQuery.data?.success) {
    return <div>Customer not found</div>;
  }

  const handleSaveCustomer = (data: any) => {
    console.log("data", data);
  };
  return (
    <>
      
      <AdminInnerLayout>
        <div className="w-full">
          {/* <AdminCustomerEditForm
            customer={customerMutation.data.data}
            onSave={handleSaveCustomer}
          /> */}
        </div>
      </AdminInnerLayout>
    </>
  );
};

export default AdminEditCustomerPage;
