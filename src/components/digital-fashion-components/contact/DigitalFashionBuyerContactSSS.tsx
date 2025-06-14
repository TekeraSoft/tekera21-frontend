import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Siparişim ne zaman kargoya verilir?",
    answer:
      "Siparişleriniz genellikle aynı gün içinde hazırlanır ve 1-3 iş günü içerisinde kargoya verilir. Kargoya verildikten sonra size bir bilgilendirme e-postası gönderilir.",
  },
  {
    question: "Ürün iade ve değişim koşulları nelerdir?",
    answer:
      "Ürünlerimizi, teslim aldığınız tarihten itibaren 14 gün içerisinde iade edebilirsiniz. İade etmek istediğiniz ürünlerin kullanılmamış, yıkanmamış ve orijinal etiketleri çıkarılmamış olması gerekmektedir.",
  },
  {
    question: "Hangi ödeme yöntemlerini kullanabilirim?",
    answer:
      "Kredi kartı, banka havalesi ve kapıda ödeme seçeneklerini kullanabilirsiniz. Kredi kartı ile yapılan ödemelerde taksit imkanı da sunulmaktadır.",
  },
  {
    question: "Kargo ücreti ne kadar?",
    answer:
      "150 TL ve üzeri alışverişlerinizde kargo ücretsizdir. 150 TL altındaki siparişlerde 20 TL kargo ücreti alınmaktadır.",
  },
  {
    question: "Yurt dışına kargo yapıyor musunuz?",
    answer:
      "Evet, yurt dışına da kargo gönderimi yapmaktayız. Yurt dışı kargo ücretleri ülkelere göre değişiklik göstermektedir. Detaylı bilgi için bizimle iletişime geçebilirsiniz.",
  },
];

export default function DigitalFashionBuyerContactSSS() {
  return (
    <div className="bg-white py-16 border rounded-md shadow-lg">
      <div className="px-6 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Sıkça Sorulan Sorular
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <AccordionTrigger className="flex items-center justify-between text-lg font-semibold text-gray-900 px-5 py-4 hover:bg-slate-100  cursor-pointer select-none transition-colors duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 flex justify-start items-center text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
