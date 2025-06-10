export interface ISubcategory {
  id: string;
  name: string;
  image?: string;
}

export interface ICategory {
  id: string;
  name: string;
  count?: number;
  image?: string;
  subCategories: ISubcategory[];
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
