import { Link } from "@/i18n/navigation";
import { Frown } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function NotFoundPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* İkon ile başlık */}

      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-6">
        <Frown className="w-10 h-10" />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {t("warningText.pageNotFoundTitle")}
      </h1>

      {/* Hata mesajı */}
      <p className="text-lg text-gray-600 mb-6">
        {t("warningText.pageNotFoundText")}
      </p>

      {/* Ana sayfaya yönlendirme */}
      <Link
        href="/"
        className="px-6 py-3 bg-secondary text-white rounded-full hover:scale-105 transition duration-300"
      >
        {t("warningText.ButtonText")}
      </Link>
    </div>
  );
}

export default NotFoundPage;
