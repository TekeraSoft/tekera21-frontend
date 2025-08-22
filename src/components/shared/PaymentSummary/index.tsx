"use client";
import { IPaymentReport } from "@/types/PaymentReport";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { FinancialBreakdown } from "./FinancialBreakdown";
import { OrderDetailsTable } from "./OrderDetailsTable";

function PaymentReport({ report }: { report: IPaymentReport }) {

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <PaymentSummaryCard
          month={report.calculateDate.month}
          year={report.calculateDate.year}
          sellerFee={report.sellerFee}
          interruptionAmount={report.interruptionAmount}
          totalOrders={report.interruptionContent.length}
        />

        <OrderDetailsTable orders={report.interruptionContent} />

        <FinancialBreakdown
          orders={report.interruptionContent}
          sellerFee={report.sellerFee}
          interruptionAmount={report.interruptionAmount}
        />
      </div>
    </div>
  );
}

export default PaymentReport;
