export type TProductFormData = {
  name: string;
  slug: string;
  code: string;
  imageUrls?: {
    [key: string]: string[];
  }
  brandName: string;
  description: string;
  currencyType: string;
  categoryId: string;
  subCategories?: { value: string }[];
  productType: string;
  tags: { value: string }[];
  attributeDetails: { key: string; value: string }[];
  videoUrl?: string;
  variants: {
    id?: string;
    modelName: string;
    modelCode: string;
    images: string[];
    color: string;
    attributes: {
      attributeDetails: { key: string; value: string }[];
      stock: number;
      maxPurchaseStock: number;
      sku: string;
      barcode: string;
      price: number;
      discountPrice: number;
    }[];
  }[];
};


export interface IOption { id: string; label: string };
export type IAttribute = {
  key: string;
  label: string;
  options: IOption[];
  isMultiple?: boolean;
  hasStock?: boolean;
};
