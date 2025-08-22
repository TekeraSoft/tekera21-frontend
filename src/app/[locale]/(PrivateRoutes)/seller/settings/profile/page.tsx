import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import AdminSettingsPanel from "@/components/manage/AdminSettingsPanel";
import React from "react";

const AdminProfilePage = () => {
  return (
    <div>
      <AdminInnerLayout>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Hesap Ayarları
            </h1>
          </div>
        </div>
        <AdminSettingsPanel />
      </AdminInnerLayout>
    </div>
  );
};

export default AdminProfilePage;
