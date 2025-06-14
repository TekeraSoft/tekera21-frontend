import { Link } from "@/i18n/navigation";
import { useAppSelector } from "@/store/store";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

function DigitalFashionBuyerTekeraInfo() {
  const { tekeraAddress, tekeraEmail, tekeraPhone } = useAppSelector(
    (state) => state.globalSettings
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900">Bize Ulaşın</h2>
      <p className="mt-4 text-lg text-gray-500">
        Aşağıdaki iletişim bilgilerinden bize ulaşabilir veya formu doldurarak
        mesaj gönderebilirsiniz.
      </p>

      <div className="mt-8 space-y-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-3 text-base text-gray-500">
            <p>{tekeraAddress}</p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-3 text-base text-gray-500">
            <p>{tekeraPhone}</p>
            <p className="mt-1">Pazartesi - Cuma, 10:00 - 18:00</p>
            <p className="mt-1">Cumartesi, 10:00 - 14:00</p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-3 text-base text-gray-500">
            <p>{tekeraEmail}</p>
            <p className="mt-1">Sorularınız için bize e-posta gönderin</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900">Sosyal Medya</h3>
        <div className="mt-4 flex space-x-6">
          <Link
            target="_blank"
            href="#"
            className="text-gray-400 hover:text-primary"
          >
            <span className="sr-only">Facebook</span>
            <Facebook />
          </Link>

          <Link
            target="_blank"
            href="#"
            className="text-gray-400 hover:text-primary"
          >
            <span className="sr-only">Instagram</span>
            <Instagram />
          </Link>

          <Link
            target="_blank"
            href="#"
            className="text-gray-400 hover:text-primary"
          >
            <span className="sr-only">Twitter</span>
            <Twitter />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DigitalFashionBuyerTekeraInfo;
