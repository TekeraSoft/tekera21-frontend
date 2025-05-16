"use client";

import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { useAppSelector } from "@/store/store";
import { useParams } from "next/navigation";

export const SellerHelpRequest = () => {
  const {} = useAppSelector((state) => state.SellerRequests);

  const { id } = useParams() as { id: string };

  const ticket: any = customers.find((customer) => customer.id === id);
  if (!customer) {
    return <div>Customer not found</div>;
  }

  return <SellerInnerContainer>dfsfsdf</SellerInnerContainer>;
};
