import React from 'react';
import { Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface PaymentSummaryCardProps {
  month: string;
  year: string;
  sellerFee: number;
  interruptionAmount: number;
  totalOrders: number;
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  month,
  year,
  sellerFee,
  interruptionAmount,
  totalOrders,
}) => {
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const monthName = monthNames[parseInt(month) - 1];
  const netAmount = sellerFee - interruptionAmount;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="lg:text-3xl font-bold text-gray-800">{monthName} {year} Ödeme Raporu</h1>
            <p className="text-gray-600 text-xs lg:text-base">Satıcı Komisyon ve Ücret Detayları</p>
          </div>
        </div>
        <div className="text-right">
          <div className="lg:text-2xl text-sm font-bold text-green-600">₺{netAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
          <div className="lg:text-sm text-xs text-gray-500">Net Ödeme</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-2xl font-semibold text-blue-700">₺{sellerFee.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
              <div className="text-sm text-blue-600">Toplam Satıcı Ücreti</div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <div className="text-2xl font-semibold text-red-700">₺{interruptionAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
              <div className="text-sm text-red-600">Kesinti Tutarı</div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <div>
              <div className="text-2xl font-semibold text-green-700">₺{netAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
              <div className="text-sm text-green-600">Net Ödeme</div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {totalOrders}
            </div>
            <div>
              <div className="text-2xl font-semibold text-purple-700">{totalOrders}</div>
              <div className="text-sm text-purple-600">Toplam Sipariş</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};