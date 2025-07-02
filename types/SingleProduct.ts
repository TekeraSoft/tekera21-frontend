export type IGetByIdProduct = {
  id: string;
  name: string;
  slug: string;
  code: string;
  brandName: string;
  category: Category;
  subCategories: Category[];
  company: Company;
  description: string;
  variations: Variation[];
  currencyType: string;
  tags: string[];
  productType: "PHYSICAL" | "DIGITAL"; // enum gibi düşünebilirsin
  attributeDetails: Attribute[];
  rate: number;
  comments: any[];
  videoUrl?: string // Eğer yorumların yapısı belli değilse `any[]` bırakabiliriz
};

type Category = {
  id: string;
  name: string;
  image: string;
};

type Company = {
  id: string;
  name: string;
  logo: string;
  rate: number;
};

type Variation = {
  id: string;
  modelName: string;
  modelCode: string;
  attributes: StockItem[];
  images: string[];
};

type StockItem = {
  stockAttribute: StockAttribute[];
  stock: number;
  price: number;
  discountPrice: number;
  sku: string;
  barcode: string;
};

type StockAttribute = {
  key: string; // örn: "color" veya "size"
  value: string; // örn: "Beyaz", "XS"
};

type Attribute = {
  key: string; // örn: "kumaş"
  value: string; // örn: "1.sınıf compact penye kumaş"
};
