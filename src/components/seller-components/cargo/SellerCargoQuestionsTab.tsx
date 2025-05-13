"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SellerCargoQuestionsTab() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className=" font-medium mb-4">
        tekera21 hangi kargo firmalarıyla çalışıyor?
      </h2>

      <p className="mb-6">
        tekera21'da paketlerinizi 81 ilde hizmet veren Yurtiçi, MNG, Aras, PTT,
        Sürat Kargo, tekera21 Express, Kolay Gelsin, CEVA Lojistik, Horoz
        Lojistik ve Borusan Lojistik firmaları ile müşterilerinize
        ulaştırabilirsiniz.
      </p>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem
          value="item-1"
          className="border rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            Kargo faturaları ne zaman kesilir? Kargo faturalarımı nasıl kontrol
            edebilirim?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            Kargo faturaları genellikle aylık olarak kesilir. Faturalarınızı
            tekera21 Satıcı Paneli üzerinden "Finans" bölümünden kontrol
            edebilirsiniz.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="border rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            Kargo faturası kesilirken uygulanan baremler nelerdir?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            Kargo faturası kesilirken desi, ağırlık ve mesafe gibi faktörler göz
            önünde bulundurulur. tekera21 anlaşmalı kargo modeli
            kullanıyorsanız, özel indirimli baremlerden faydalanabilirsiniz.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="border rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            Desi nedir ve kargo faturalarını nasıl etkiler?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            Desi, kargonun hacimsel ağırlığıdır ve en x boy x yükseklik / 3000
            formülü ile hesaplanır. Kargo ücretlendirmesinde fiziksel ağırlık
            ile desi karşılaştırılır ve yüksek olan değer üzerinden
            ücretlendirme yapılır.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="border rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            Kargo firmamı değiştirmek istiyorum, ne yapmalıyım?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            Kargo firmanızı değiştirmek için "Çalıştığım Kargo Firmaları"
            sayfasında ilgili firmanın yanındaki "Değiştir" butonuna tıklayarak
            yeni firma seçimi yapabilirsiniz.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="border rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            Kargo dağıtım tercihlerimi güncellemek istiyorum, ne yapmalıyım?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            Kargo dağıtım tercihlerinizi güncellemek için "Hesap Ayarları"
            bölümünden "Kargo Ayarları" sekmesine giderek gerekli değişiklikleri
            yapabilirsiniz.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
