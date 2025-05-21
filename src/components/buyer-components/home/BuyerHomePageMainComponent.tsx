import Image from "next/image";
import BuyerHeroSection from "./BuyerHeroSection";
import BuyerFeaturedProductsSection from "./BuyerFeaturedProductsSection";
import BuyerCategoriesSection from "./BuyerCategoriesSection";
import BuyerNewsletterSection from "./BuyerNewsletterSection";

export default function BuyerHomePageMainComponent() {
  return (
    <>
      <BuyerHeroSection />
      <BuyerFeaturedProductsSection />
      <BuyerCategoriesSection />

      {/* Özellikler Bölümü */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-purple-600">
              Tekera21 Avantajları
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Neden Bizi Tercih Etmelisiniz?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Tekera21 olarak müşterilerimize en iyi alışveriş deneyimini sunmak
              için çalışıyoruz.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              <div className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Yüksek Kalite
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Tüm ürünlerimiz yüksek kaliteli kumaşlardan üretilmektedir.
                    Uzun ömürlü ve dayanıklı t-shirtlerimiz ile tarzınızı
                    yansıtın.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Hızlı Kargo
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Siparişleriniz aynı gün içinde hazırlanır ve en hızlı
                    şekilde kargoya verilir. Türkiye'nin her yerine hızlı
                    teslimat.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Güvenli Ödeme
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Tüm ödeme işlemleriniz SSL sertifikası ile güvence
                    altındadır. Kredi kartı, havale veya kapıda ödeme
                    seçenekleri.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Kolay İade
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    14 gün içerisinde koşulsuz iade garantisi. Beğenmediğiniz
                    ürünleri kolayca iade edebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Müşteri Yorumları */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Tekera21 müşterilerinin deneyimlerini keşfedin.
            </p>
          </div>
          <div className="mt-12 space-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src="/placeholder.svg?height=100&width=100"
                    alt="Müşteri"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Ahmet Y.</h4>
                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "Tekera21'den aldığım t-shirtler gerçekten çok kaliteli. Kumaşı
                yumuşak ve terletmiyor. Tasarımları da çok şık. Kesinlikle
                tavsiye ederim."
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src="/placeholder.svg?height=100&width=100"
                    alt="Müşteri"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Ayşe K.</h4>
                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "Siparişim çok hızlı bir şekilde elime ulaştı. Ürünlerin
                kalitesi beklediğimden çok daha iyi çıktı. Tekera21 ile
                alışveriş yapmak gerçekten keyifli."
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src="/placeholder.svg?height=100&width=100"
                    alt="Müşteri"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Mehmet S.</h4>
                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-5 w-5 ${
                          rating < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "Müşteri hizmetleri gerçekten çok ilgili. Yaşadığım küçük bir
                sorunu hemen çözdüler. Ürünlerin kalitesi de fiyatına göre
                oldukça iyi."
              </p>
            </div>
          </div>
        </div>
      </div>

      <BuyerNewsletterSection />
    </>
  );
}
