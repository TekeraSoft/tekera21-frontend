import { getCategories } from "@/app/actions/server/category.actions";
import { getSingleProductById } from "@/app/actions/server/product.actions";
import ProductUpdateForm from "@/components/manage/Product/Update/ProductUpdateForm";
import TopBar from "@/components/manage/TopBar";
import ErrorMessageComponent from "@/components/shared/ErrorMessageComponent";
import { ICategory } from "@/types/AdminTypes/category";
import { IGetByIdProduct } from "@/types/SingleProduct";
import React from "react";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const prodId = (await params).id;

  const { success, data, message } = await getSingleProductById(prodId);

  if (!success) {
    return (
      <>
        <TopBar>
          <></>
        </TopBar>
        <ErrorMessageComponent message={message || "Product cant get"} />
      </>
    );
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
