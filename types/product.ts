export interface ProductAttributeDetail {
  key: string;
  value: string;
}

export interface ProductAttribute {
  attributeDetails: ProductAttributeDetail[];
  stock: number;
  price: number;
  discountPrice: number;
  sku: string;
  barcode: string;
}

export interface ProductVariation {
  id: string;
  modelName: string;
  isActive: boolean;
  modelCode: string;
  color: string;
  attributes: ProductAttribute[];
  images: string[];
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  code: string;
  isActive: boolean;
  brandName: string;
  description: string;
  category: ICategory;
  subCategories: ICategory[];
  variations: ProductVariation[];
  currencyType: string;
  tags: string[];
  productType: "PHYSICAL" | "DIGITAL"; // Diğer değerler varsa genişletilebilir
  attributeDetails: ProductAttributeDetail[];
  rate: number;
  videoUrl?: string;
}
