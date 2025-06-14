import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import DigitalFashionHeading from "../utils/DigitalFashionHeading";

export default function DigitalFashionHomeCustomerReviews() {
  const reviews = [
    {
      name: "Ahmet Y.",
      image: "https://fakeimg.pl/50x50",
      rating: 5,
      comment:
        "Tekera21'den aldığım t-shirtler gerçekten çok kaliteli. Kumaşı yumuşak ve terletmiyor. Tasarımları da çok şık. Kesinlikle tavsiye ederim.",
    },
    {
      name: "Ayşe K.",
      image: "https://fakeimg.pl/50x50",
      rating: 5,
      comment:
        "Siparişim çok hızlı bir şekilde elime ulaştı. Ürünlerin kalitesi beklediğimden çok daha iyi çıktı. Tekera21 ile alışveriş yapmak gerçekten keyifli.",
    },
    {
      name: "Mehmet S.",

      rating: 4,
      comment:
        "Müşteri hizmetleri gerçekten çok ilgili. Yaşadığım küçük bir sorunu hemen çözdüler. Ürünlerin kalitesi de fiyatına göre oldukça iyi.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <DigitalFashionHeading
            as="h3"
            size="text-2xl md:text-3xl"
            align="text-center"
            variant="default"
          >
            Müşterilerimiz Ne Diyor?
          </DigitalFashionHeading>

          <p className="mt-4 text-md md:text-lg text-gray-500">
            Tekera21 müşterilerinin deneyimlerini keşfedin.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={review.image} alt={review.name} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-semibold">{review.name}</h4>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
