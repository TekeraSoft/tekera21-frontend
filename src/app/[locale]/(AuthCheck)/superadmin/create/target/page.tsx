import { getCompanyProducts } from "@/app/actions";
import TargetCreate from "@/components/superadmin/Create/TargetPicture";
import React from "react";
import { IProduct } from "@/types/product";

const CreateTargetPicture = async () => {
  const { data, success } = await getCompanyProducts();
  if (!success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Error Loading Products</h1>
        <p className="text-muted-foreground">
          There was an error loading the products. Please try again later.
        </p>
      </div>
    );
  }
  const products: IProduct[] = (data.content as IProduct[]) || ([] as any[]);
  return <TargetCreate products={products} />;
};

export default CreateTargetPicture;
