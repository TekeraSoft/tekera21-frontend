import { Link } from "@/i18n/navigation";
import Image from "next/image";

const categories = [
  {
    name: "Erkek T-Shirtler",
    href: "/urunler?kategori=erkek",
    image: "/placeholder.svg?height=600&width=800",
    description: "Erkekler için modern ve şık t-shirt koleksiyonu",
  },
  {
    name: "Kadın T-Shirtler",
    href: "/urunler?kategori=kadin",
    image: "/placeholder.svg?height=600&width=800",
    description: "Kadınlar için zarif ve rahat t-shirt modelleri",
  },
  {
    name: "Unisex T-Shirtler",
    href: "/urunler?kategori=unisex",
    image: "/placeholder.svg?height=600&width=800",
    description: "Herkes için tasarlanmış çok yönlü t-shirtler",
  },
];

export default function BuyerCategoriesSection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Kategoriler
          </h2>
          <Link
            href="/urunler"
            className="hidden text-sm font-semibold text-purple-600 hover:text-purple-500 sm:block"
          >
            Tüm ürünleri görüntüle
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-8">
          {categories.map((category) => (
            <div key={category.name} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                <Link href={category.href}>
                  <span className="absolute inset-0" />
                  {category.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/urunler"
            className="block text-sm font-semibold text-purple-600 hover:text-purple-500"
          >
            Tüm ürünleri görüntüle
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
