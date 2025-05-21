import ProductCard from "../product/BuyerProductCard";

// Örnek ürün verileri
const products = [
  {
    id: "1",
    name: "Temel Beyaz T-Shirt",
    price: 129.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Erkek",
  },
  {
    id: "2",
    name: "Grafik Baskılı Siyah T-Shirt",
    price: 149.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Unisex",
  },
  {
    id: "3",
    name: "Vintage Tasarım T-Shirt",
    price: 169.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Kadın",
  },
  {
    id: "4",
    name: "Oversize Fit T-Shirt",
    price: 139.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Unisex",
  },
];

export default function BuyerFeaturedProductsSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Öne Çıkan Ürünler
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
