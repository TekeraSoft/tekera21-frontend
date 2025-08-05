import { getAllCompany } from "@/app/actions";
import VerificationPanel from "@/components/manage/Companies/CheckCompanies";
import TopBar from "@/components/manage/TopBar";
import React from "react";

const CompaniesCheckPage = async () => {
  const { data, success, message } = await getAllCompany();

  if (!success || !data) {
    return (
      <div className="p-4 text-red-500">
        {message} || Firmalar getirilemedi.
      </div>
    );
  }

  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <VerificationPanel companies={data} />
    </>
  );
};

export default CompaniesCheckPage;
