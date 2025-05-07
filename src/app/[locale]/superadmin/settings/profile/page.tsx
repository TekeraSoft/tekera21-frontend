import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import AdminSettingsPanel from "@/components/superadmin/AdminSettingsPanel";
import TopBar from "@/components/superadmin/TopBar";
import React from "react";

const AdminProfilePage = () => {
  return (
    <div>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Hesap Ayarları
              </h1>
            </div>
          </div>
          <AdminSettingsPanel />
        </>
      </AdminInnerLayout>
    </div>
  );
};

export default AdminProfilePage;
