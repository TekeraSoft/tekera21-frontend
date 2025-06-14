import { Link } from "@/i18n/navigation";
import { ChevronsRight } from "lucide-react";
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
];

export default function DigitalFashionBuyerCategoriesSection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Kategoriler
          </h2>
          <Link
            href="/urunler"
            className="hidden text-lg font-semibold text-primary sm:flex justify-center items-center gap-1 hover:underline"
          >
            Tüm ürünleri görüntüle
            <ChevronsRight />
          </Link>
        </div>

        <div className="mt-6 grid  gap-6 grid-cols-2 ">
          {categories.map((category) => (
            <div key={category.name} className="group relative">
              <div className="relative max-h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
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

        <div className="mt-6 lg:hidden">
          <Link
            href="/urunler"
            className=" text-lg font-semibold text-primary flex justify-center items-center gap-1 hover:underline"
          >
            Tüm ürünleri görüntüle
            <ChevronsRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
