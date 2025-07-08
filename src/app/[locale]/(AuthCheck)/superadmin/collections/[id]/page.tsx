import React from "react";

interface IProps {
  params: Promise<{ id: string }>;
}

const CollectionEdit = async ({ params }: IProps) => {
  const { id } = await params;
  const sampleCollection = {
    id: "85364687-1667-4009-9927-ca7719b6874a",
    collectionName: "Test",
    slug: "test-26551",
    products: [
      {
        id: "b3b2b35f-cbd0-4b25-828c-89cf692f71f7",
        name: "Kebap fsdf",
        slug: "kebap-fsdf-42891",
        code: "AADKOUT1",
        videoUrl: null,
        brandName: "ArzuAmber",
        category: {
          id: "ef8a9f00-cefa-47b1-9209-16ff4c58e1dc",
          name: "Moda",
          slug: "moda-83721",
          image: "category/f46b4e27-d10c-4c48-be54-98193eba8a04.jpg",
        },
        subCategories: [
          {
            id: "d3e1e719-e81d-43a0-a4e4-ca392ad98de2",
            name: "Digital Fashion",
            slug: "digital-fashion-27382",
            image: "sub-category/c5c46109-5189-48cc-b8f1-e50a69dcf4b3.jpg",
          },
        ],
        company: {
          id: "452531d6-343c-4952-a923-af51f3bffe2b",
          name: "ARZUAMBER MODA",
          logo: "/company/logo/arzuamber_moda/9916b32c-95c1-4273-a589-6d9d327c6e08.webp",
          rate: 0.0,
        },
        description: "sdfdsfsdf",
        variations: [
          {
            id: "782afcc5-f9d7-4cee-9e7c-bdb85e893fc0",
            modelName: "Polo Yaka siyah",
            modelCode: "sdf",
            color: "Açık Kahverengi",
            attributes: [
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "XS",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Sxs-1",
                barcode: "DK-Sxs-1-BC",
              },
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "S",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Ss-2",
                barcode: "DK-Ss-2-BC",
              },
            ],
            images: [
              "/products/arzuamber_moda/kebap-fsdf-76530-clr_Açık Kahverengi.webp",
            ],
          },
        ],
        currencyType: "TRY",
        tags: ["Kadın"],
        productType: "PHYSICAL",
        attributeDetails: [
          {
            key: "material",
            value: "11",
          },
        ],
        rate: 0.0,
        comments: [],
        isActive: false,
      },
      {
        id: "51ad615e-28b1-4263-aab5-dff1e004204e",
        name: "Kebap",
        slug: "kebap-86295",
        code: "AADKOUT1",
        videoUrl: null,
        brandName: "ArzuAmber",
        category: {
          id: "caad85e9-38c8-4788-9469-7b855a555412",
          name: "Elektronik",
          slug: "elektronik-68609",
          image: "category/fb49fdd6-58bf-4762-a78a-14e247d9a546.jpg",
        },
        subCategories: [
          {
            id: "e10ea795-8002-40d9-939b-49e2fe1806d8",
            name: "Cep Telefonu",
            slug: "cep-telefonu-18613",
            image: "sub-category/2fdc358e-499a-41f5-aaf0-0f4f3bdd8c85.jpg",
          },
        ],
        company: {
          id: "452531d6-343c-4952-a923-af51f3bffe2b",
          name: "ARZUAMBER MODA",
          logo: "/company/logo/arzuamber_moda/9916b32c-95c1-4273-a589-6d9d327c6e08.webp",
          rate: 0.0,
        },
        description: "sdfsdfs",
        variations: [
          {
            id: "039ec6a8-0803-4670-9612-7d8e2e3f4c23",
            modelName: "Polo Yaka siyah",
            modelCode: "666",
            color: "Açık Pembe",
            attributes: [
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "XS",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Sxs-1",
                barcode: "DK-Sxs-1-BC",
              },
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "S",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Ss-2",
                barcode: "DK-Ss-2-BC",
              },
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "M",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Sm-3",
                barcode: "DK-Sm-3-BC",
              },
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "XL",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Sxl-4",
                barcode: "DK-Sxl-4-BC",
              },
              {
                attributeDetails: [
                  {
                    key: "size",
                    value: "L",
                  },
                ],
                stock: 50,
                price: 1449,
                discountPrice: 0,
                sku: "DK-Sl-5",
                barcode: "DK-Sl-5-BC",
              },
            ],
            images: [
              "/products/arzuamber_moda/kebap-56508-clr_Açık Pembe.webp",
            ],
          },
        ],
        currencyType: "TRY",
        tags: ["Kadın"],
        productType: "PHYSICAL",
        attributeDetails: [
          {
            key: "dimensions",
            value: "11",
          },
        ],
        rate: 0.0,
        comments: [],
        isActive: true,
      },
    ],
    image:
      "fashion-collection-images/4b1242d4-297c-45fc-82d7-5864413e6f26.jpeg",
    description: "testsdf",
    isActive: true,
  };
  return <div>CollectionEdit</div>;
};

export default CollectionEdit;
