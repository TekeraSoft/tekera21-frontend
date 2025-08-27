"use client";
import {
  deleteCampaign,
  getAllCampaigns,
} from "@/app/actions/server/campaign.actions";
import CampaignList from "@/components/manage/Campaign/CampaignList";
import { ICampaign } from "@/types/AdminTypes/campaign";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

function App() {
  const campaignsQuery = useQuery<ICampaign[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await getAllCampaigns();
      return response.success ? response.data : [];
    },
  });
  const deleteCampaignMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteCampaign(id);
      return response.success ? response.data : null;
    },
    onSuccess: () => {
      campaignsQuery.refetch();
    },
  });
  const handleDeleteCampaign = (id: string) => {
    if (window.confirm("Bu kampanyayı silmek istediğinizden emin misiniz?")) {
      deleteCampaignMutation.mutate(id);
    }
  };

  return (
    <div className="App">
      <CampaignList
        campaigns={campaignsQuery.data || []}
        onDeleteCampaign={handleDeleteCampaign}
      />
    </div>
  );
}

export default App;
