export interface IProduct {
  id: string;
  name: string;
  slug: string;
  code: string;
  brandName: string;
  description: string;
  variations: TVariation[];
  company: {
    name: string;
    logo: string;
    rate: 0.0;
    id: string;
  };
  category: {
    id: string;
    name: string;
    image: string;
    subCategories: {
      id: string;
      name: string;
      image: string;
    }[];
  };
  currencyType: string;
  tags: string[];
  productType: "PHYSICAL" | "DIGITAL" | string;
  attributes: ProductAttribute[];
  rate: number;
}

export type TVariation = {
  id: string;
  modelName: string;
  modelCode: string;
  attributes: VariationAttribute[];
  images: string[];
};

type VariationAttribute = {
  stockAttribute: StockAttribute[];
  stock: number;
  price: number;
  discountPrice: number;
  sku: string;
  barcode: string;
};

type StockAttribute = {
  key: string;
  value: string;
};

type ProductAttribute = {
  key: string;
  value: string;
};
