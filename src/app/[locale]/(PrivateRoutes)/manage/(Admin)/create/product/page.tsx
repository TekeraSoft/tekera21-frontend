import React from "react";
import { ICategory } from "@/types/AdminTypes/category";

import ProductCreateForm from "@/components/manage/Product/Create/ProductCreateForm";
import TopBar from "@/components/manage/TopBar";
import { getCategories } from "@/app/actions/server/category.actions";

const CreateProductPage = async () => {
  const { data, success } = await getCategories();
  const categories: ICategory[] = success ? data.content : [];
  return (
    <div>
      <TopBar>
        <></>
      </TopBar>
      <ProductCreateForm categories={categories} />
    </div>
  );
};

export default CreateProductPage;
