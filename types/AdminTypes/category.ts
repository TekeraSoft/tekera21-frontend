export interface Subcategory {
  id: string;
  name: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
  image?: string;
  subcategories: Subcategory[];
}
