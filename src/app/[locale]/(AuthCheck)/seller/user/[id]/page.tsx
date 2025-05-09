import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import SellerUserProfileTab from "@/components/seller-components/user/tabs/SellerUserProfileTab";

import SellerUserPasswordUpdateTab from "@/components/seller-components/user/tabs/SellerUserPasswordUpdateTab";
import SellerUserProfilePreferencesTab from "@/components/seller-components/user/tabs/SellerUserProfilePreferencesTab";

export default function SellerUserProfile() {
  return (
    <SellerInnerContainer>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Right side with tabs */}
        <div className="w-full ">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Güvenlik</TabsTrigger>
              <TabsTrigger value="preferences">Tercihler</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <SellerUserProfileTab />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <SellerUserPasswordUpdateTab />
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <SellerUserProfilePreferencesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SellerInnerContainer>
  );
}
