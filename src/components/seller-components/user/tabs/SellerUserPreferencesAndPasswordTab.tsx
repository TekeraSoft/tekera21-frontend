import SellerUserPasswordChangeCard from "./SellerUserPasswordChangeCard";
import SellerUserProfilePreferencesCard from "./SellerUserProfilePreferencesCard";

export default function SellerUserPreferencesAndPasswordTab() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <SellerUserPasswordChangeCard />
      <SellerUserProfilePreferencesCard />
    </div>
  );
}
