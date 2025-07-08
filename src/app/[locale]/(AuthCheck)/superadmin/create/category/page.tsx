import CreateCategory from "@/components/superadmin/Category/Create";
import TopBar from "@/components/superadmin/TopBar";
import React from "react";

const CategoryCreatePage = async () => {
  return (
    <div>
      <TopBar>
        <></>
      </TopBar>
      <CreateCategory />
    </div>
  );
};

export default CategoryCreatePage;
