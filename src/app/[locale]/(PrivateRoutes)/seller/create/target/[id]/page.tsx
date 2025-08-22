import React from "react";
import { IProduct } from "@/types/product";
import TargetCreate from "@/components/manage/TargetPicture/Create";
import TargetDelete from "@/components/manage/TargetPicture/Delete";
import { getTargetPictureByProductById } from "@/app/actions/server/targetPicture.actions";
import { getProductById } from "@/services/seller/product.service";

import ErrorMessageComponent from "@/components/shared/ErrorMessageComponent";

const CreateTargetPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const prodId = (await params).id;

  const { data, success, message } = await getProductById(prodId);

  if (!success || !data.id) {
    return (
      <>
        <ErrorMessageComponent message={message || "Product cant get"} />
      </>
    );
  }

  const { data: targetData } = await getTargetPictureByProductById(data.id);

  if (targetData) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">
            Zaten bu ürün için bir target picture oluşturulmuş.
          </h1>
          <p className="text-muted-foreground">
            Lütfen önce ürünün target picture alanını temizleyin.
          </p>
          <TargetDelete id={targetData.id} />
        </div>
      </>
    );
  }
  const product: IProduct = (data as IProduct) || ({} as any[]);
  return <TargetCreate product={product} />;
};

export default CreateTargetPage;
