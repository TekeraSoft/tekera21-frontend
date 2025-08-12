"use client";
import { useParams } from "next/navigation";
import { AdminCustomerEditForm } from "@/components/manage/AdminCustomerEditForm";
import React from "react";
import { customers } from "@/data/users";
import TopBar from "@/components/manage/TopBar";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";

const AdminEditCustomerPage = () => {
  const { id } = useParams() as { id: string };
  const customer: any = customers.find((customer) => customer.id === id);
  if (!customer) {
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
          <AdminCustomerEditForm
            customer={customer}
            onSave={handleSaveCustomer}
          />
        </div>
      </AdminInnerLayout>
    </>
  );
};

export default AdminEditCustomerPage;
