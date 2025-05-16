"use client";

import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { useAppSelector } from "@/store/store";
import { useParams } from "next/navigation";

export const SellerHelpRequest = () => {
  const { SellerRequestsBuyer } = useAppSelector(
    (state) => state.SellerRequests
  );

  const { id } = useParams() as { id: string };

  const ticket: any = SellerRequestsBuyer.find(
    (customer) => customer.id === id
  );
  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return <SellerInnerContainer>dfsfsdf</SellerInnerContainer>;
};
