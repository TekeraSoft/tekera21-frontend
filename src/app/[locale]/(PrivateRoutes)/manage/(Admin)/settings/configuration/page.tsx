import AdminConfigurationPanel from "@/components/manage/AdminConfigurationPanel";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";

import React from "react";

const AdminConfigurationPage = () => {
  return (
    <div>
      
      <AdminInnerLayout>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Yapılandırma Ayarları
            </h1>
          </div>
        </div>
        <AdminConfigurationPanel />
      </AdminInnerLayout>
    </div>
  );
};

export default AdminConfigurationPage;
