import { getCategoriesForSeller } from "@/app/actions/server/category.actions";
import ProductUpdateForm from "@/components/manage/Product/Update/ProductUpdateForm";
import { getProductById } from "@/services/seller/product.service";
import { ICategory } from "@/types/AdminTypes/category";
import { IGetByIdProduct } from "@/types/SingleProduct";
import React from "react";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const prodId = (await params).id;

  const { success, data } = await getProductById(prodId);

  if (!success) {
    return <div>Product cant get</div>;
  }
  const { data: categoryData, success: succesCategories } =
    await getCategoriesForSeller();

  if (!succesCategories || !categoryData) {
    return <>No Category</>;
  }
  const categories: ICategory[] = success ? categoryData.content : ([] as any);

  const product: IGetByIdProduct = (data as IGetByIdProduct) || ({} as any);

  return <ProductUpdateForm product={product} categories={categories} />;
};

export default UpdateProductPage;
