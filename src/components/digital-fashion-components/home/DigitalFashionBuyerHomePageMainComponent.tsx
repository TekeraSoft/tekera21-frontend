import DigitalFashionBuyerHeroSection from "./DigitalFashionBuyerHeroSection";
import DigitalFashionBuyerFeaturedProductsSection from "./DigitalFashionBuyerFeaturedProductsSection";
import DigitalFashionBuyerNewsletterSection from "./DigitalFashionBuyerNewsletterSection";
import DigitalFashionBuyerProductSlider from "../product/slider/DigitalFashionBuyerProductSlider";
import DigitalFashionHeading from "../utils/DigitalFashionHeading";
import DigitalFashionHomeCustomerReviews from "./DigitalFashionHomeCustomerReviews";
import DigitalFashionWhyUsSection from "./DigitalFashionWhyUsSection";

export default function DigitalFashionBuyerHomePageMainComponent() {
  return (
    <>
      <DigitalFashionBuyerHeroSection />

      <>
        <DigitalFashionHeading
          as="h2"
          size="text-2xl md:text-3xl"
          align="text-left md:text-center"
          variant="default"
        >
          Öne Çıkan Ürünler
        </DigitalFashionHeading>

        <DigitalFashionBuyerProductSlider />
      </>

      <DigitalFashionBuyerFeaturedProductsSection />

      <DigitalFashionWhyUsSection />

      <DigitalFashionHomeCustomerReviews />
      <DigitalFashionBuyerNewsletterSection />
    </>
  );
}
