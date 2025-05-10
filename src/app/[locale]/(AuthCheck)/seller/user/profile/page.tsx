import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import SellerUserProfileTab from "@/components/seller-components/user/tabs/SellerUserProfileTab";
import SellerUserPreferencesAndPasswordTab from "@/components/seller-components/user/tabs/SellerUserPreferencesAndPasswordTab";

export default function SellerUserProfile() {
  return (
    <SellerInnerContainer>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Right side with tabs */}
        <div className="w-full flex items-center justify-center">
          <Tabs defaultValue="profile" className="w-full">
            {/* TabsList kapsayıcı genişliği %50 ve ortalı */}
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 w-full md:w-3/4 lg:w-1/2 ">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="security">Güvenlik & Tercihler</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile">
              <SellerUserProfileTab />
            </TabsContent>

            <TabsContent value="security">
              <SellerUserPreferencesAndPasswordTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SellerInnerContainer>
  );
}
