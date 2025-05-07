"use client";
import { useParams } from "next/navigation";
import { AdminCustomerEditForm } from "@/components/superadmin/AdminCustomerEditForm";
import React from "react";
import { customers } from "@/data/users";
import TopBar from "@/components/superadmin/TopBar";
import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";

const AdminEditCustomerPage = () => {
  const { id } = useParams() as { id: string };
  const customer: any = customers.find((customer) => customer.id === id);
  if (!customer) {
    return <div>Customer not found</div>;
  }

  const handleSaveCustomer = (data: any) => {};
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
