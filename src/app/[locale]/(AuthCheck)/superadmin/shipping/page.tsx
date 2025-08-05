import { getShippingCompanies } from "@/app/actions";
import ShippingManagement from "@/components/superadmin/ShippingManagement";
import TopBar from "@/components/superadmin/TopBar";
import React from "react";

const ShippingCompanies = async () => {
  const shippingCompaniesRes = await getShippingCompanies();

  if (!shippingCompaniesRes.success) {
    return (
      <div className="p-4 text-red-500">
        {shippingCompaniesRes.message} || Kargo Firmaları getirilemedi.
      </div>
    );
  }
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <ShippingManagement shippingCompanies={shippingCompaniesRes.data} />
    </>
  );
};

export default ShippingCompanies;
