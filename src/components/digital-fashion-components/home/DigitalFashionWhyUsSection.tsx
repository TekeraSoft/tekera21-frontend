import {
  Box,
  CheckCheck,
  CreditCard,
  RefreshCcw,
  Headphones,
  Leaf,
} from "lucide-react";
import React from "react";
import DigitalFashionHeading from "../utils/DigitalFashionHeading";

const features = [
  {
    icon: CheckCheck,
    title: "Yüksek Kalite",
    description:
      "Tüm ürünlerimiz yüksek kaliteli kumaşlardan üretilmektedir. Uzun ömürlü ve dayanıklı t-shirtlerimiz ile tarzınızı yansıtın.",
  },
  {
    icon: Box,
    title: "Hızlı Kargo",
    description:
      "Siparişleriniz aynı gün içinde hazırlanır ve en hızlı şekilde kargoya verilir. Türkiye'nin her yerine hızlı teslimat.",
  },
  {
    icon: CreditCard,
    title: "Güvenli Ödeme",
    description:
      "Tüm ödeme işlemleriniz SSL sertifikası ile güvence altındadır. Kredi kartı, havale veya kapıda ödeme seçenekleri.",
  },
  {
    icon: RefreshCcw,
    title: "Kolay İade",
    description:
      "14 gün içerisinde koşulsuz iade garantisi. Beğenmediğiniz ürünleri kolayca iade edebilirsiniz.",
  },
  {
    icon: Headphones,
    title: "7/24 Müşteri Desteği",
    description:
      "Sorularınız için her zaman buradayız. WhatsApp, e-posta veya canlı destek üzerinden bize kolayca ulaşabilirsiniz.",
  },
  {
    icon: Leaf,
    title: "Çevre Dostu Üretim",
    description:
      "Doğaya zarar vermeyen üretim süreçleriyle, sürdürülebilir bir moda anlayışını benimsiyoruz.",
  },
];

function DigitalFashionWhyUsSection() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <DigitalFashionHeading
            as="h2"
            size="text-xl md:text-3xl"
            align="text-left md:text-center"
            variant="primary"
          >
            Tekera21 Avantajları
          </DigitalFashionHeading>

          <DigitalFashionHeading
            as="h3"
            size="text-2xl md:text-4xl"
            align="text-left md:text-center"
            variant="default"
          >
            Neden Bizi Tercih Etmelisiniz?
          </DigitalFashionHeading>

          <p className="mt-4 max-w-2xl text-md text-gray-500 lg:mx-auto">
            Tekera21 olarak müşterilerimize en iyi alışveriş deneyimini sunmak
            için çalışıyoruz.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="relative ">
                <div className="flex justify-start items-center gap-2">
                  <div className=" flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-md bg-primary text-white">
                    <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="md:text-lg font-medium leading-6 text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs md:text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalFashionWhyUsSection;
