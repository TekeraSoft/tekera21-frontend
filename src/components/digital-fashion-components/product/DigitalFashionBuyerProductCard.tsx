import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface DigitalFashionBuyerProductCardProps {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

export default function DigitalFashionBuyerProductCard({
  name,
  price,
  image,
  category,
  slug,
}: DigitalFashionBuyerProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-auto w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={500}
          height={600}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="h-5 w-5 text-gray-700" />
        </button> */}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price} TL</p>
      </div>
      {/* <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Sepete Ekle
      </button> */}
    </div>
  );
}
