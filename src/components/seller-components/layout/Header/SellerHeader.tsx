import React from "react";
import SellerTopbar from "./SellerTopBar";
import SellerNavbar from "./SellerNavbar";

function SellerHeader() {
  return (
    <div className="w-full">
      <SellerTopbar />
      <SellerNavbar />
    </div>
  );
}

export default SellerHeader;
