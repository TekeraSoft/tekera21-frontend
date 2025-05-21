"use cleint";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

function BuyerLangChangeButton() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  // locale lang changes
  const supportedLocales = ["tr", "en"];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
    setIsLangDropdownOpen(false);
  };

  return (
    <div
      className="flex  justify-center items-center relative z-50"
      onMouseLeave={() => setIsLangDropdownOpen(false)}
    >
      <button
        className="w-7 h-6 flex items-center justify-center border border-slate-300   rounded-md text-secondary text-xs font-semibold uppercase transition duration-500 hover:bg-secondary hover:text-white"
        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
        onMouseLeave={() => setIsLangDropdownOpen(false)}
        onMouseEnter={() => setIsLangDropdownOpen(true)}
      >
        {locale}
      </button>
      {isLangDropdownOpen && (
        <ul
          className=" absolute  top-6 w-8 bg-white border   shadow-md text-sm rounded"
          onMouseEnter={() => setIsLangDropdownOpen(true)}
        >
          {supportedLocales.map((lang) => (
            <li
              key={lang}
              className="transition-all duration-200 hover:scale-105"
            >
              <button
                onClick={() => changeLanguage(lang)}
                className="block  w-full  py-1.5 text-center text-xs text-secondary rounded 
                               hover:bg-secondary hover:text-white  transition-all duration-300"
              >
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyerLangChangeButton;
