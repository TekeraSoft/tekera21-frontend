import React from "react";
import { Trash2, Calendar, Gift } from "lucide-react";
import { ICampaign } from "@/types/AdminTypes/campaign";
import ImageView from "@/components/shared/ImageView";

interface CampaignCardProps {
  campaign: ICampaign;
  onDelete: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCampaignTypeInfo = (type: string) => {
    switch (type) {
      case "FREESHIPPING":
        return {
          label: "Ücretsiz Kargo",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          icon: "🚚",
        };
      case "BUYXGETY":
        return {
          label: "Al-Öde Kampanyası",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          icon: "🎁",
        };
      default:
        return {
          label: "Kampanya",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          icon: "📢",
        };
    }
  };

  const typeInfo = getCampaignTypeInfo(campaign.campaignType);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Campaign Image */}
      <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20">
          <ImageView
            imageInfo={{ name: campaign.name, url: campaign.campaignImage }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeInfo.bgColor} ${typeInfo.textColor}`}
          >
            <span className="mr-1">{typeInfo.icon}</span>
            {typeInfo.label}
          </span>
        </div>
        <button
          onClick={() => onDelete(campaign.id)}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-red-500 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Kampanyayı Sil"
        >
          <Trash2 size={16} className="text-white" />
        </button>
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
            {campaign.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>

        {/* Campaign Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </span>
          </div>

          {campaign.discountValue > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <Gift size={16} className="mr-2 text-gray-400" />
              <span>
                İndirim: {campaign.discountValue}
                {campaign.discountType.toString() === "PERCENTAGE"
                  ? "%"
                  : " TL"}
              </span>
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              ID: {campaign.id.slice(0, 8)}...
            </span>
            <button
              onClick={() => onDelete(campaign.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <Trash2 size={14} className="mr-1" />
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
