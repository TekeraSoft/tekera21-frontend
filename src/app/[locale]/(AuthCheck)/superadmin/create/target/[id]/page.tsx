import {
  getSingleProductById,
  getTargetPictureByProductById,
} from "@/app/actions";

import React from "react";
import { IProduct } from "@/types/product";
import TargetCreate from "@/components/superadmin/TargetPicture/Create";
import TargetDelete from "@/components/superadmin/TargetPicture/Delete";

const CreateTargetPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const prodId = (await params).id;

  const { data, success } = await getSingleProductById(prodId);

  if (!success || !data.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Ürünler yüklenemedi.</h1>
        <p className="text-muted-foreground">
          There was an error loading the products. Please try again later.
        </p>
      </div>
    );
  }

  const { data: targetData } = await getTargetPictureByProductById(data.id);

  if (targetData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Zaten bu ürün için bir target picture oluşturulmuş.
        </h1>
        <p className="text-muted-foreground">
          Lütfen önce ürünün target picture alanını temizleyin.
        </p>
        <TargetDelete id={targetData.id} />
      </div>
    );
  }
  const product: IProduct = (data as IProduct) || ({} as any[]);
  return <TargetCreate product={product} />;
};

export default CreateTargetPage;
