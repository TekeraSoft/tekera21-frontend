"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

function DigitalFashionBuyerLangChangeButton() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const supportedLocales = ["tr", "en"];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="uppercase text-xs font-semibold px-4 py-2 h-auto"
        >
          {locale}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-16 p-1">
        {supportedLocales.map((lang) => (
          <Button
            key={lang}
            variant={locale === lang ? "primary" : "ghost"}
            size="sm"
            className="w-full text-xs justify-center"
            onClick={() => changeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default DigitalFashionBuyerLangChangeButton;
