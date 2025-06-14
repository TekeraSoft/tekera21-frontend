import ProductCreateForm from "@/components/superadmin/Create/Product";
import React from "react";
import { ICategory } from "@/types/AdminTypes/category";
import { getCategories } from "@/app/actions";

const CreateProductPage = async () => {
  const { data } = await getCategories();
  const categories: ICategory[] = data.content || [];
  return (
    <div>
      <ProductCreateForm categories={categories} />
    </div>
  );
};

export default CreateProductPage;
