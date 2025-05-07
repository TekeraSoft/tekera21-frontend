import AdminConfigurationPanel from "@/components/superadmin/AdminConfigurationPanel";
import TopBar from "@/components/superadmin/TopBar";
import React from "react";

const AdminConfigurationPage = () => {
  return (
    <div>
      <TopBar>
        <></>
      </TopBar>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Ayarlar ve Yapılandırma
          </h1>
        </div>
      </div>
      <AdminConfigurationPanel />
    </div>
  );
};

export default AdminConfigurationPage;
