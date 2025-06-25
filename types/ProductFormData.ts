export type TProductFormData = {
  name: string;
  slug: string;
  code: string;
  brandName: string;
  companyId: string;
  description: string;
  currencyType: string;
  categoryId: string;
  subCategories?: { value: string }[];
  productType: string;
  tags: { value: string }[];
  attributeDetails: { key: string; value: string }[];
  variants: {
    id?: string;
    modelName: string;
    modelCode: string;
    images: string[];
    color: string;
    attributes: {
      attributeDetails: { key: string; value: string }[];
      stock: number;
      sku: string;
      barcode: string;
      price: number;
      discountPrice: number;
    }[];
  }[];
};
