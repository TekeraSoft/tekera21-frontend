import React from "react";
import { ICategory } from "@/types/AdminTypes/category";

import ProductCreateForm from "@/components/seller/Product/Create/ProductCreateForm";

import { getCategoriesForSeller } from "@/app/actions/server/category.actions";

const CreateProductPage = async () => {
  const { data, success } = await getCategoriesForSeller();

  if (!success || !data) {
    return <>No Category</>;
  }
  const categories: ICategory[] = success ? data.content : ([] as any);
  return (
    <div>
      
      <ProductCreateForm categories={categories} />
    </div>
  );
};

export default CreateProductPage;
