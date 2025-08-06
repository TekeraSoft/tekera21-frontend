import { getAllCollection } from "@/app/actions/server/collection.actions";
import CollectionList from "@/components/manage/FashionCollection/CollectionList";
import TopBar from "@/components/manage/TopBar";
import React from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const FashionCollectionsPage = async ({ searchParams }: IProps) => {
  const search = await searchParams;
  const pageParam = Array.isArray(search.page)
    ? search.page[0] ?? "0"
    : search.page ?? "0";
  const sizeParam = Array.isArray(search.pagesize)
    ? search.pagesize[0] ?? "8"
    : search.pagesize ?? "8";
  const result = await getAllCollection(pageParam, sizeParam);

  if (!result.success) {
    console.log("message", result.message);
    return <div>Bir hata oluştu.</div>;
  }
  const { data } = result;

  return (
    <div>
      <TopBar>
        <></>
      </TopBar>
      <CollectionList collectionsData={data} />
    </div>
  );
};

export default FashionCollectionsPage;
