import { getNewSellers } from "@/app/actions/server/seller.actions";
import VerificationPanel from "@/components/manage/Companies/CheckCompanies";

import React from "react";

const CompaniesCheckPage = async () => {
  const { data, success, message } = await getNewSellers();

  if (!success || !data) {
    return (
      <>
        <div className="p-4 text-red-500">
          {message} || Firmalar getirilemedi.
        </div>
      </>
    );
  }

  return (
    <>
      <VerificationPanel companies={data} />
    </>
  );
};

export default CompaniesCheckPage;
