"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Define the type for slider items
interface SliderItem {
  id: string | number;
  imageUrl: string;
  title: string;
  description: string;
  altText?: string;
}

interface HomePageSliderProps {
  // Allow passing slides directly as props
  slides?: SliderItem[];
  // Or fetch from an API endpoint
  apiEndpoint?: string;
  // Autoplay configuration
  autoplayDelay?: number;
  // Optional className for additional styling
  className?: string;
}

function HomePageSlider({
  slides: initialSlides,
  apiEndpoint,
  autoplayDelay = 5000,
  className = "",
}: HomePageSliderProps) {
  // State to hold slider data
  const [slides, setSlides] = useState<SliderItem[]>(
    initialSlides || [
      // Default slides if none provided
      {
        id: 1,
        imageUrl: "/placeholder.svg?height=500&width=1200",
        title: "Ürünlerinizi Yönetin",
        description:
          "Satıcı paneliniz ile tüm ürünlerinizi kolayca yönetin ve satışlarınızı artırın.",
        altText: "Slider image 1",
      },
      {
        id: 2,
        imageUrl: "/placeholder.svg?height=500&width=1200",
        title: "Siparişleri Takip Edin",
        description:
          "Tüm siparişlerinizi tek bir yerden takip edin ve müşteri memnuniyetini artırın.",
        altText: "Slider image 2",
      },
      {
        id: 3,
        imageUrl: "/placeholder.svg?height=500&width=1200",
        title: "Analitikleri İnceleyin",
        description:
          "Detaylı analitikler ile satışlarınızı analiz edin ve stratejilerinizi geliştirin.",
        altText: "Slider image 3",
      },
    ]
  );

  const [loading, setLoading] = useState(!!apiEndpoint);
  const [error, setError] = useState<string | null>(null);

  // Fetch slides from API if endpoint is provided
  useEffect(() => {
    if (!apiEndpoint) return;

    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch slides: ${response.status}`);
        }

        const data = await response.json();
        setSlides(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching slider data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load slider data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [apiEndpoint]);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-red-500 text-center p-4">
          <p className="font-semibold">Slider yüklenemedi</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full relative ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: autoplayDelay,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-4 w-full">
              <div className="h-[200px] md:h-[300px] lg:h-[400px] w-full relative rounded-lg overflow-hidden  w">
                <Image
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={slide.altText || slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl max-w-2xl text-center">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <CarouselPrevious className="h-10 w-10 bg-white/80 hover:bg-white" />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <CarouselNext className="h-10 w-10 bg-white/80 hover:bg-white" />
        </div>
      </Carousel>
    </div>
  );
}

export default HomePageSlider;
