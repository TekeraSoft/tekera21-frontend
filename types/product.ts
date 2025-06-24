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
  modelCode: string;
  color: string;
  attributes: ProductAttribute[];
  images: string[];
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  code: string;
  brandName: string;
  description: string;
  variations: ProductVariation[];
  currencyType: string;
  tags: string[];
  productType: "PHYSICAL" | "DIGITAL"; // Diğer değerler varsa genişletilebilir
  attributeDetails: ProductAttributeDetail[];
  rate: number;
}
