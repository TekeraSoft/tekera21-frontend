import React from "react";
import { Package, Receipt } from "lucide-react";
import { IOrderItem } from "@/types/PaymentReport";
import { formatPrice } from "@/lib/formatters";
import { makeCdnUrl } from "@/lib/makeCdnUrl";

interface OrderDetailsTableProps {
  orders: IOrderItem[];
}

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  orders,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center space-x-3">
          <Package className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Sipariş Detayları
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sipariş No
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform Hizmet Bedeli
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Komisyon
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Satıcı Karı
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr
                key={order.orderNumber}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {order.productImageUrl ? (
                        <img
                          src={makeCdnUrl(order.productImageUrl)}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Model: {order.modelCode}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-blue-600">
                      {order.orderNumber}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">
                    {formatPrice(order.platformUsageFee.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.platformUsageFee.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">
                    {formatPrice(order.platformCommission.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.platformCommission.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-green-600">
                    {formatPrice(order.sellerProfit)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
