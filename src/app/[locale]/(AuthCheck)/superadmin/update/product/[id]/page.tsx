import { getCategories, getSingleProductById } from "@/app/actions";

import ProductUpdateForm from "@/components/superadmin/Product/Update/ProductUpdateForm";
import { ICategory } from "@/types/AdminTypes/category";

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
  const { data: categoriesData, success: successCategories } =
    await getCategories();
  const categories: ICategory[] = successCategories
    ? categoriesData.content
    : [];
  const product: IGetByIdProduct = (data as IGetByIdProduct) || ({} as any);
  return <ProductUpdateForm product={product} categories={categories} />;
};

export default UpdateProductPage;
