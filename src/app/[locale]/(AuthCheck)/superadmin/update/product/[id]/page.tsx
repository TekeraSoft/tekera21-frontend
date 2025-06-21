import { getCategories, getSingleProductById } from "@/app/actions";
import ProductUpdateForm from "@/components/superadmin/Create/Product/ProductUpdateForm";
import { ICategory } from "@/types/AdminTypes/category";
import { IProduct } from "@/types/product";
import { IGetByIdProduct } from "@/types/SingleProduct";
import React from "react";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const prodId = (await params).id;

  const { success, data } = await getSingleProductById(prodId);

  if (!success) {
    return <div>Product cant get</div>;
  }

  const categoriesData = await getCategories();
  if (!categoriesData.success) {
    return <div>categories cant get</div>;
  }
  const categories: ICategory[] = categoriesData.success
    ? categoriesData.data.content
    : [];

  const product: IGetByIdProduct = (data as IGetByIdProduct) || ({} as any);
  return <ProductUpdateForm product={product} categories={categories} />;
};

export default UpdateProductPage;
