import CreateCategory from "@/components/manage/Category/Create";
import TopBar from "@/components/manage/TopBar";
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
