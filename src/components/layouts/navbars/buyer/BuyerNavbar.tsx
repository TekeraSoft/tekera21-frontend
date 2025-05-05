"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import React, { useState } from "react";

function BuyerNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // locale lang changes
  const supportedLocales = ["tr", "en"];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
    setIsLangDropdownOpen(false);
  };

  return (
    <div className="w-full flex  items-center justify-center gap-4 p-1">
      <Link href={"/"} className="p-1 bg-black text-white">
        Home
      </Link>
      <Link href={"/seller"} className="p-1 bg-black text-white">
        Seller Dashboard
      </Link>
      <Link href={"/superadmin"} className="p-1 bg-black text-white">
        Superadmin Dashboard
      </Link>

      <div
        className="relative z-50"
        onMouseLeave={() => setIsLangDropdownOpen(false)}
      >
        <button
          className="w-8 h-7 sm:w-10 sm:h-8 text-heading-1 flex items-center justify-center border border-slate-300 rounded-md cursor-pointer  text-xs font-semibold uppercase transition duration-500"
          onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          onMouseLeave={() => setIsLangDropdownOpen(false)}
        >
          {locale}
        </button>
        {isLangDropdownOpen && (
          <ul
            className="absolute top-8 w-10 bg-white border border-slate-300  rounded shadow-md text-xs md:text-sm "
            onMouseEnter={() => setIsLangDropdownOpen(true)}
          >
            {supportedLocales.map((lang, index) => (
              <li key={index}>
                <button
                  onClick={() => changeLanguage(lang)}
                  className="block w-full py-1 text-black text-center rounded  transition-all duration-300 cursor-pointer hover:bg-black  hover:text-white "
                >
                  {lang === "tr" ? "TR" : "EN"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BuyerNavbar;
