import { getCategoriesForSeller } from "@/app/actions";
import SellerRegistrationForm from "@/components/seller/RegisterAsSeller";

export default async function SellerRegistrationPage() {
  const { success, data, message } = await getCategoriesForSeller();
  if (!success) {
    return <div className="p-4 text-red-500">{message}</div>;
  }
  return <SellerRegistrationForm />;
}
