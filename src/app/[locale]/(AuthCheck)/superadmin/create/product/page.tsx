import React from "react";
import { ICategory } from "@/types/AdminTypes/category";
import { getCategories } from "@/app/actions";
import ProductCreateForm from "@/components/superadmin/Product/Create/ProductCreateForm";

const CreateProductPage = async () => {
  const { data, success } = await getCategories();
  const categories: ICategory[] = success ? data.content : [];
  return (
    <div>
      <ProductCreateForm categories={categories} />
    </div>
  );
};

export default CreateProductPage;
