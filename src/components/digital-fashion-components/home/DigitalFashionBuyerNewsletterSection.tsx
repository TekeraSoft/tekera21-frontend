import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DigitalFashionHeading from "../utils/DigitalFashionHeading";

export default function DigitalFashionBuyerNewsletterSection() {
  return (
    <div className="bg-primary rounded-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="rounded-lg bg-teal-600 px-6 py-6 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <DigitalFashionHeading
              as="h3"
              size="text-lg md:text-3xl"
              align="text-left md:text-center"
              variant="white"
            >
              Yeni ürünler ve indirimlerden haberdar olun
            </DigitalFashionHeading>

            <p className="mt-3 max-w-3xl text-sm text-white">
              E-bültenimize kaydolun ve en yeni koleksiyonlar, özel teklifler ve
              indirimler hakkında ilk siz haberdar olun.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex gap-2">
              <label htmlFor="email-address" className="sr-only">
                E-posta adresiniz
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="E-posta adresiniz"
              />
              <Button
                className="mt-2 sm:mt-0"
                variant={"outline"}
                size={"sm"}
                type="submit"
              >
                Abone Ol
              </Button>
            </form>
            <p
              className="mt-3 text-xs
             md:text-sm text-gray-200"
            >
              Gizliliğinize önem veriyoruz. Bilgilerinizi asla paylaşmayacağız.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
