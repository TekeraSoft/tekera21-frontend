"use client";
import { getSellerInterruptions } from "@/app/actions/server/seller.actions";

import LoadingBigCircle from "@/components/shared/Loading/LoadingBigCircle";
import PaymentReport from "@/components/shared/PaymentSummary";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SellerInterruptions = () => {
  const interruptionsQuery = useQuery({
    queryKey: ["interruptions"],
    queryFn: () => getSellerInterruptions(),
  });

  if (interruptionsQuery.isLoading) {
    return <LoadingBigCircle />;
  }
  if (interruptionsQuery.isError) {
    return <div>Hata: {interruptionsQuery.error.message}</div>;
  }
  if (interruptionsQuery.data?.data?.length === 0) {
    return <div>Herhangi bir kesinti bulunamadı.</div>;
  }
  return (
    <div className="flex flex-col gap-y-6">
      {interruptionsQuery.data?.data?.map((report) => (
        <PaymentReport
          key={report.calculateDate.month + report.calculateDate.year}
          report={report}
        />
      ))}
    </div>
  );
};

export default SellerInterruptions;
