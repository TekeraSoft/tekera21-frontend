export interface ICategory {
  id: string;
  image?: string;
  name: string;
  slug?: string;
  subCategories: ISubCategory[];
}
export interface ISubCategory {
  id: string;
  image?: string;
  name: string;
  children: ISubCategory[];
}

export interface ICategoryData {
  content: ICategory[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
