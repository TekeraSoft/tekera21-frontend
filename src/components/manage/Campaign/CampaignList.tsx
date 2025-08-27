import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { ICampaign } from "@/types/AdminTypes/campaign";
import CampaignCard from "./CampaignCard";
import { campaignTypes } from "@/constants/campaign";

interface CampaignListProps {
  campaigns: ICampaign[];
  onDeleteCampaign: (id: string) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onDeleteCampaign,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "ALL" || campaign.campaignType === filterType;

    return matchesSearch && matchesFilter;
  });

  console.log("filter Type", filterType, campaigns);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kampanya Yönetimi
              </h1>
              <p className="text-gray-600">
                Aktif kampanyalarınızı yönetin ve düzenleyin
              </p>
            </div>
            <button className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center">
              <Plus size={20} className="mr-2" />
              Yeni Kampanya
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Kampanya ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value={"ALL"}>Tüm Kampanyalar</option>
                {campaignTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">
                {campaigns.length}
              </div>
              <div className="text-sm text-gray-600">Toplam Kampanya</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {
                  campaigns.filter((c) =>
                    c.campaignType.includes("FREESHIPPING")
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Ücretsiz Kargo</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {
                  campaigns.filter((c) =>
                    c.campaignType.includes("BUYXGETY")
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Al-Öde Kampanyası</div>
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onDelete={onDeleteCampaign}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Kampanya bulunamadı
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterType !== "ALL"
                ? "Arama kriterlerinize uygun kampanya bulunmuyor."
                : "Henüz hiç kampanya oluşturulmamış."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
