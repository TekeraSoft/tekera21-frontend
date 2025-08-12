import { redirect } from "next/navigation";

const SellerPage = async () => {
  redirect("/seller/dashboard");
};

export default SellerPage;
