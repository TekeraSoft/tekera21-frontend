"use client";
import { useParams } from "next/navigation";
import { AdminCustomerEditForm } from "@/components/manage/AdminCustomerEditForm";
import React from "react";
import TopBar from "@/components/manage/TopBar";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import { getSellerByUserId } from "@/app/actions/server/seller.actions";
import { useQuery } from "@tanstack/react-query";

const AdminEditCustomerPage = () => {
  const { id } = useParams() as { id: string };

  const customerMutation = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getSellerByUserId(id),
  });

  if (!customerMutation.data?.success) {
    return <div>Customer not found</div>;
  }

  const handleSaveCustomer = (data: any) => {
    console.log("data", data);
  };
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
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
