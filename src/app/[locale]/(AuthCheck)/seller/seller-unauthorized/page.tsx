import { CircleFadingPlus, MoveLeft, ShieldAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

function SellerUnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
        </div>

        {/* Başlık */}
        <h2 className="text-3xl font-bold text-gray-800">Yetkisiz Erişim</h2>

        {/* Açıklama */}
        <p className="text-gray-600 text-sm leading-relaxed">
          Bu sayfaya erişim izniniz bulunmamaktadır. Eğer bu sayfaya erişmeniz
          gerektiğini düşünüyorsanız, mağaza yöneticisiyle iletişime geçin.
        </p>

        {/* Butonlar */}
        <div className="space-y-4">
          <Button variant="destructive" className="w-full flex-center gap-2">
            <MoveLeft size={20} strokeWidth={3} />
            <Link href="/seller">Anasayfaya Dön</Link>
          </Button>

          <div className="text-sm text-gray-500 font-semibold">
            Bir sorun olduğunu mu düşünüyorsunuz?
          </div>

          <Button variant="warning" className="w-full flex-center gap-2">
            <CircleFadingPlus size={20} strokeWidth={2} />
            <Link href="/seller/help">Destek Talebi Oluştur</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SellerUnauthorizedPage;
