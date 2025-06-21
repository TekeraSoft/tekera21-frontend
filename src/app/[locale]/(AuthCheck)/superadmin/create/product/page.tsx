import ProductCreateForm from "@/components/superadmin/Create/Product";
import React from "react";
import { ICategory } from "@/types/AdminTypes/category";
import { getCategories } from "@/app/actions";
import ProductCreateFormNew from "@/components/superadmin/Create/Product/ProductCreateFormNew";
import ProductCreateFormNewWithSize from "@/components/superadmin/Create/Product/ProductCreateFormNewWithSizes";

const CreateProductPage = async () => {
  const { data, success } = await getCategories();
  const categories: ICategory[] = success ? data.content : [];
  return (
    <div>
      <ProductCreateFormNewWithSize categories={categories} />
    </div>
  );
};

export default CreateProductPage;
