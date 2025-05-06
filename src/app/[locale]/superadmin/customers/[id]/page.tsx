"use client";
import { useParams } from "next/navigation";
import { AdminCustomerEditForm } from "@/components/superadmin/AdminCustomerEditForm";
import React from "react";
import { customers } from "@/data/users";

const AdminEditCustomerPage = () => {
  const { id } = useParams() as { id: string };
  const customer: any = customers.find((customer) => customer.id === id);
  if (!customer) {
    return <div>Customer not found</div>;
  }

  const handleSaveCustomer = (data: any) => {};
  return (
    <div className="px-6 py-3 w-full">
      <AdminCustomerEditForm customer={customer} onSave={handleSaveCustomer} />
    </div>
  );
};

export default AdminEditCustomerPage;
