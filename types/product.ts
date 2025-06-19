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

const attr = {
  color: {
    value: "sarı",
    sizes: [
      { size: "S", price: 100, stock: 10, sku: "RED-S", barcode: "123456" },
      { size: "M", price: 105, stock: 5, sku: "RED-M", barcode: "123457" },
    ],
    weights: [
      { size: "7", price: 100, stock: 10, sku: "Yedi-S", barcode: "123456" },
    ],
    cpu: "amd64",
  },
};
