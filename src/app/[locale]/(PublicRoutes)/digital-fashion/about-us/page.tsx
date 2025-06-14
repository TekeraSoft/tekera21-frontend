import Image from "next/image";

export default function DigitalFashionAboutUsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Tekera21 Ekibi"
            className="h-full w-full object-cover"
            width={1600}
            height={800}
          />
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hakkımızda
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Tekera21 olarak, kaliteli ve şık t-shirtler tasarlayarak
            müşterilerimize benzersiz bir deneyim sunuyoruz.
          </p>
        </div>
      </div>

      {/* Hikayemiz */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Hikayemiz
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Tekera21, 2021 yılında İstanbul'da kuruldu. Kurucumuz, moda
                sektöründe 15 yıllık deneyime sahip olan Ahmet Yılmaz, kaliteli
                ve özgün tasarımlı t-shirtlerin Türkiye pazarında eksik olduğunu
                fark etti.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Bu boşluğu doldurmak için yola çıkan Tekera21, kısa sürede
                Türkiye'nin önde gelen t-shirt markalarından biri haline geldi.
                Yüksek kaliteli kumaşlar ve özgün tasarımlarla müşterilerimize
                en iyi ürünleri sunmayı hedefliyoruz.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Bugün, Tekera21 olarak 50'den fazla çalışanımız ve Türkiye
                genelinde 10.000'den fazla müşterimiz bulunmaktadır. Her geçen
                gün büyüyen ailemizle, müşterilerimize en iyi hizmeti sunmak
                için çalışıyoruz.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Tekera21 Ofisi"
                  className="h-full w-full object-cover object-center"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Misyon ve Vizyon */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Misyonumuz
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Tekera21 olarak misyonumuz, müşterilerimize yüksek kaliteli,
                rahat ve şık t-shirtler sunarak günlük yaşamlarında kendilerini
                iyi hissetmelerini sağlamaktır. Her bir ürünümüzü özenle
                tasarlıyor ve üretiyoruz.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Sürdürülebilir üretim pratiklerini benimseyerek çevreye olan
                etkimizi en aza indirmeyi hedefliyoruz. Müşteri memnuniyeti
                bizim için her zaman önceliklidir.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Vizyonumuz
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Vizyonumuz, Türkiye'nin ve dünyanın önde gelen t-shirt
                markalarından biri olmaktır. Yenilikçi tasarımlarımız, kaliteli
                ürünlerimiz ve müşteri odaklı yaklaşımımızla sektörde fark
                yaratmayı hedefliyoruz.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Gelecekte, sürdürülebilir moda anlayışıyla çevreye duyarlı
                ürünler geliştirmeye devam ederek, global pazarda da tanınan bir
                marka olmayı amaçlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Değerlerimiz
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              Tekera21 olarak, işimizi yaparken bizi yönlendiren temel
              değerlerimiz vardır.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
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
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                    Kalite
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Her ürünümüzü en yüksek kalite standartlarında üretiyoruz.
                    Müşterilerimize dayanıklı ve uzun ömürlü ürünler sunmak için
                    en iyi malzemeleri kullanıyoruz.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                    Yenilikçilik
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Sürekli olarak yeni tasarımlar ve fikirler geliştiriyoruz.
                    Moda trendlerini takip ederek müşterilerimize her zaman en
                    güncel ürünleri sunuyoruz.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                    Sürdürülebilirlik
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Çevreye duyarlı üretim süreçleri benimsiyoruz. Organik pamuk
                    kullanımı ve geri dönüştürülebilir ambalajlar ile doğaya
                    olan etkimizi en aza indirmeye çalışıyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ekibimiz */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ekibimiz
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              Tekera21'in başarısının arkasında tutkulu ve yetenekli bir ekip
              var.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Takım Üyesi"
                  className="h-full w-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Ahmet Yılmaz
              </h3>
              <p className="text-sm text-gray-500">Kurucu ve CEO</p>
              <p className="mt-3 text-base text-gray-500">
                15 yıllık moda sektörü deneyimiyle Tekera21'i kurdu ve
                vizyonuyla markayı büyütmeye devam ediyor.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Takım Üyesi"
                  className="h-full w-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Zeynep Kaya
              </h3>
              <p className="text-sm text-gray-500">Tasarım Direktörü</p>
              <p className="mt-3 text-base text-gray-500">
                Yaratıcı tasarımlarıyla Tekera21'in koleksiyonlarına hayat
                veriyor ve markanın görsel kimliğini şekillendiriyor.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Takım Üyesi"
                  className="h-full w-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Mehmet Demir
              </h3>
              <p className="text-sm text-gray-500">Operasyon Müdürü</p>
              <p className="mt-3 text-base text-gray-500">
                Üretim süreçlerini yöneterek, ürünlerimizin en yüksek kalitede
                ve zamanında müşterilerimize ulaşmasını sağlıyor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
