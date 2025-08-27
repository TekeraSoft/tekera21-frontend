"use client";

import { useState } from "react";

import { CampaignList } from "@/components/seller/Campaign/CampaignList";
import { ProductSelector } from "@/components/seller/Campaign/CampaignProducSelector";
import { ICampaign } from "@/types/AdminTypes/campaign";
import { IProduct } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSellerProducts } from "@/services/seller/product.service";
import { IPageableData } from "@/types/PageableData";
import {
  addProductsToCampaign,
  getAllCampaignsForSeller,
  removeProductsFromCampaign,
} from "@/app/actions/server/seller.actions";

export default function CampaignManager() {
  const queryClient = useQueryClient();
  const campaignsQuery = useQuery<ICampaign[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await getAllCampaignsForSeller();
      console.log("campaigns query", response);
      return response.success ? response.data : [];
    },
  });

  const productsQuery = useQuery<IPageableData<IProduct>>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getSellerProducts(0, 20);
      console.log("data in products query", data);
      return data || [];
    },
  });

  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(
    null
  );
  const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);
  const [isRemoveProductSelectorOpen, setIsRemoveProductSelectorOpen] =
    useState(false);

  const addProductsToCampaignMutation = useMutation({
    mutationFn: async (data: { campaignId: string; productIds: string[] }) => {
      const response = await addProductsToCampaign(
        data.campaignId,
        data.productIds
      );
      queryClient.refetchQueries({ queryKey: ["campaigns"] });
      console.log("response add product to campaign", response);
      return response;
    },
  });

  const removeProductsFromCampaignMutation = useMutation({
    mutationFn: async (data: { campaignId: string; productIds: string[] }) => {
      const response = await removeProductsFromCampaign(
        data.campaignId,
        data.productIds
      );
      queryClient.refetchQueries({ queryKey: ["campaigns"] });
      console.log("response remove product from campaign", response);
      return response;
    },
  });

  const handleAddProductsToCampaign = (
    campaignId: string,
    selectedProducts: IProduct[]
  ) => {
    addProductsToCampaignMutation.mutate({
      campaignId,
      productIds: selectedProducts.map((product) => product.id),
    });
    setIsProductSelectorOpen(false);
    setSelectedCampaign(null);
  };

  const handleRemoveProductsFromCampaign = (
    campaignId: string,
    selectedProducts: IProduct[]
  ) => {
    removeProductsFromCampaignMutation.mutate({
      campaignId,
      productIds: selectedProducts.map((product) => product.id),
    });
    setIsProductSelectorOpen(false);
    setSelectedCampaign(null);
  };

  const openProductSelector = (campaign: ICampaign) => {
    setSelectedCampaign(campaign);
    setIsProductSelectorOpen(true);
  };
  const openRemoveSelector = (campaign: ICampaign) => {
    setSelectedCampaign(campaign);
    setIsRemoveProductSelectorOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Kampanya Yönetimi
          </h1>
          <p className="text-muted-foreground">
            Kampanyalarınızı yönetin ve ürünleri kampanyalara ekleyin
          </p>
        </div>

        <CampaignList
          campaigns={campaignsQuery.data || []}
          onAddProducts={openProductSelector}
          onRemoveProducts={openRemoveSelector}
        />

        {selectedCampaign && (
          <ProductSelector
            type="add"
            isOpen={isProductSelectorOpen}
            onClose={() => {
              setIsProductSelectorOpen(false);
              setSelectedCampaign(null);
            }}
            campaign={selectedCampaign}
            availableProducts={productsQuery.data?.content || []}
            onAddProducts={handleAddProductsToCampaign}
          />
        )}
        {selectedCampaign && (
          <ProductSelector
            type="remove"
            isOpen={isRemoveProductSelectorOpen}
            onClose={() => {
              setIsRemoveProductSelectorOpen(false);
              setSelectedCampaign(null);
            }}
            campaign={selectedCampaign}
            availableProducts={productsQuery.data?.content || []}
            onAddProducts={handleRemoveProductsFromCampaign}
          />
        )}
      </div>
    </div>
  );
}
