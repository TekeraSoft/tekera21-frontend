import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function DigitalFashionBuyerHeroSection() {
  return (
    <div className="relative overflow-hidden bg-white md:min-h-[90vh]">
      <div className="pb-80  sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-50">
        <div className="relative w-full flex flex-col md:flex-row   px-4 sm:static sm:px-6 lg:px-8">
          <div className=" sm:max-w-xl">
            <div className=" absolute inset-0 z-10 pointer-events-none">
              <div className="hidden md:block absolute bottom-24 left-24 w-48 h-48 bg-primary opacity-60 rotate-30 blur-xl" />
              <div className="absolute top-20 left-96 w-36 h-36 bg-primary opacity-60 rotate-30 blur-xl" />
              <div className="absolute top-20 right-[700px] w-36 h-36 bg-primary opacity-60 rotate-30 blur-xl" />
              <div className="absolute bottom-24 right-[700px] w-48 h-48 bg-primary opacity-60 rotate-30 blur-xl rounded-full" />
            </div>

            <h1 className="text-3xl  md:text-5xl font-bold tracking-tight text-gray-900 lg:text-6xl">
              Yeni sezon T-shirtler artık burada
            </h1>
            <p className="mt-4 text-sm md:text-xl text-gray-500">
              Benzersiz tasarımlar ve yüksek kaliteli kumaşlarla ürettiğimiz
              ürünler ile tarzınızı yansıtın. Tekera21 ile stilinizi bir adım
              öteye taşıyın.
            </p>
            <Button size={"lg"} variant={"primary"} className="mt-4">
              <Link href="/digital-fashion/all-products">
                Koleksiyonu Keşfet
              </Link>
            </Button>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-72 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          src="/home-hero-img/heroimg1.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-72 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/home-hero-img/heroimg2.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-72 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/home-hero-img/heroimg3.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-72 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/home-hero-img/heroimg4.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-72 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/home-hero-img/heroimg5.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-72 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/home-hero-img/heroimg2.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-72 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/home-hero-img/heroimg1.jpg"
                          alt="T-shirt model"
                          width={400}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
