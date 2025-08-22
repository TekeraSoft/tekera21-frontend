import React from "react";
import { BarChart3, Calculator } from "lucide-react";
import { IOrderItem } from "@/types/PaymentReport";

interface FinancialBreakdownProps {
  orders: IOrderItem[];
  sellerFee: number;
  interruptionAmount: number;
}

export const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({
  orders,
  sellerFee,
  interruptionAmount,
}) => {
  const totalPlatformFees = orders.reduce(
    (sum, order) => sum + order.platformUsageFee.value,
    0
  );
  const totalCommissions = orders.reduce(
    (sum, order) => sum + order.platformCommission.value,
    0
  );
  const totalSellerProfit = orders.reduce(
    (sum, order) => sum + order.sellerProfit,
    0
  );

  const formatCurrency = (amount: number) => {
    return `₺${amount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calculator className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            Finansal Dağılım
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <span className="text-gray-700">Platform Hizmet Bedeli</span>
            <span className="font-semibold text-blue-700">
              {formatCurrency(totalPlatformFees)}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
            <span className="text-gray-700">Toplam Komisyon</span>
            <span className="font-semibold text-orange-700">
              {formatCurrency(totalCommissions)}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <span className="text-gray-700">Toplam Satıcı Karı</span>
            <span className="font-semibold text-green-700">
              {formatCurrency(totalSellerProfit)}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Brüt Toplam</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(sellerFee)}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg mt-2">
              <span className="text-gray-700 font-medium">Kesinti (-)</span>
              <span className="font-bold text-red-700">
                -{formatCurrency(interruptionAmount)}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg mt-2">
              <span className="text-gray-800 font-bold">Net Ödeme</span>
              <span className="font-bold text-green-800 text-lg">
                {formatCurrency(sellerFee - interruptionAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            Sipariş İstatistikleri
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">
                Ortalama Sipariş Karı
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(totalSellerProfit / orders.length)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Ortalama Komisyon</span>
              <span className="text-sm font-medium">
                {formatCurrency(totalCommissions / orders.length)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">
                Ortalama Platform Ücreti
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(totalPlatformFees / orders.length)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">
                {orders.length}
              </div>
              <div className="text-sm text-indigo-600">
                Bu ay işlenen sipariş
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
