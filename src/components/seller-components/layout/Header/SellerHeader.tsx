import React from "react";
import SellerNavbar from "./SellerNavbar";
import SellerTopBar from "./SellerTopBar";

function SellerHeader() {
  return (
    <div className="w-full">
      <SellerTopBar />
      <SellerNavbar />
    </div>
  );
}

export default SellerHeader;
