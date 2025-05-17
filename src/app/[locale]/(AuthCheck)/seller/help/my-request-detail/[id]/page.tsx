"use client";

import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { useAppSelector } from "@/store/store";
import { useParams } from "next/navigation";

const SellerMyHelpRequestDetail = () => {
  const { id } = useParams() as { id: string };

  const { SellerRequestsCompany } = useAppSelector(
    (state) => state.SellerRequests
  );

  const ticket: any = SellerRequestsCompany.find((ticket) => ticket.id === id);
  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <SellerInnerContainer>
      <div>{ticket.id}</div>
      <div></div>
      <div></div>
      <div></div>
    </SellerInnerContainer>
  );
};

export default SellerMyHelpRequestDetail;
