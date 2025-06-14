export interface IProduct {
  id: string;
  name: string;
  slug: string;
  code: string;
  brandName: string;
  description: string;
  category?: {
    id: string;
    name: string;
    image: string;
    subCategories: {
      id: string;
      name: string;
      image: string;
    }[];
  };
  variations: {
    id: string;
    modelName: string;
    modelCode: string;
    price: number;
    stock: number;
    sku: string;
    barcode: string;
    attributes: {
      key: string;
      value: string;
    }[];
    images: string[];
  }[];
  currencyType: string;
  tags: string[];
  productType: string;
  attributes: {
    key: string;
    value: string;
  }[];
  rate: number;
  comments: any[]; // yorumlar daha sonra tanımlanacaksa bu şekilde kalabilir
}
