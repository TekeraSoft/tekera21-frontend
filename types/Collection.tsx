import { IProduct } from "./product";

export interface IPage {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface IFashionCollection {
  id: string;
  collectionName: string;
  products: IProduct[];
  image: string;
  description: string;
  isActive: boolean;
}

export interface IFashionCollectionData {
  content: IFashionCollection[];
  page: IPage;
}
