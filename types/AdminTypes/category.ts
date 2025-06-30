
export interface ICategory {
  id: string;
  name: string;
  count?: number;
  image?: string;
  subCategories: ICategory[];
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
