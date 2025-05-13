export const product = {
  name: "Sport Shoes",
  code: "SPRT123",
  description: "High-quality running shoes for men.",
  currencyType: "TRY",
  productType: "PHYSICAL",
  tags: ["running", "men", "shoes", "sport"],
  attributes: [
    { name: "brand", value: "Nike" },
    { name: "material", value: "Mesh" },
  ],
  categoryId: "b3a9f5e2-2c58-4b7d-befa-5f6d2f983f6e",
  subCategories: [
    "4b3792c1-49dc-4bc7-9c11-e07e04c7fce6",
    "be8bb44d-f7cf-4b73-8455-9961b0642d19",
  ],
  variants: [
    {
      modelName: "Sport Shoes Red",
      modelCode: "SPRT-RED",
      price: 499.99,
      stock: 15,
      sku: "SPRT123-RED",
      barcode: "8680000000011",
      attributes: [
        { name: "size", value: "42" },
        { name: "color", value: "Red" },
      ],
    },
    {
      modelName: "Sport Shoes Blue",
      modelCode: "SPRT-BLUE",
      price: 499.99,
      stock: 10,
      sku: "SPRT123-BLUE",
      barcode: "8680000000012",
      attributes: [
        { name: "size", value: "43" },
        { name: "color", value: "Blue" },
      ],
    },
  ],
};
