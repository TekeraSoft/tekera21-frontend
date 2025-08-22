import { getCollectionById } from "@/app/actions/server/collection.actions";
import CollectionForm from "@/components/manage/FashionCollection/CollectionForm";

import React from "react";

interface IProps {
  params: Promise<{ id: string }>;
}

const CollectionEditPage = async ({ params }: IProps) => {
  const { id } = await params;
  const result = await getCollectionById(id);

  if (!result.success) {
    return <div>Koleksiyon bulunmaadı.</div>;
  }

  const { data } = result;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      <CollectionForm defaultData={data} />
    </div>
  );
};

export default CollectionEditPage;
