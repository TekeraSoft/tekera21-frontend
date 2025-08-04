import {
  getCategoriesForSeller,
  getSellerByUserId,
  getShippingCompanies,
} from "@/app/actions";
import SellerRegistrationForm from "@/components/seller/RegisterAsSeller";

export default async function SellerRegistrationPage() {
  const [categoriesRes, sellerInfoRes, shippingCompaniesRes] =
    await Promise.all([
      getCategoriesForSeller(),
      getSellerByUserId(),
      getShippingCompanies(),
    ]);

  const { success, data: categories, message } = categoriesRes;

  if (!success || !categories) {
    return (
      <div className="p-4 text-red-500">
        {message} || Şuanda Satıcı Kaydı Yapılamamaktadır.
      </div>
    );
  }

  const sellerInfo = sellerInfoRes.data;
  const shippingCompanies = shippingCompaniesRes.data;

  if (!shippingCompanies?.length) {
    return (
      <div className="p-4 text-red-500">
        {message} || Şuanda Satıcı Kaydı Yapılamamaktadır.
      </div>
    );
  }

  return (
    <SellerRegistrationForm
      categories={categories}
      sellerInfo={sellerInfo}
      shippingCompanies={shippingCompanies}
    />
  );
}
