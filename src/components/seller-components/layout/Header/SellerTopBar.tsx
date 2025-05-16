import { Link } from "@/i18n/navigation";
import SellerAnnouncementPopover from "./Popovers/SellerAnnouncementPopover";
import SellerCompanyPopoverTopbar from "./Popovers/SellerCompanyPopoverTopbar";

interface NavItem {
  label: string;
  href?: string;
  target?: string;
}

const leftLinks: NavItem[] = [
  { label: "Satıcı Paneli", href: "/seller", target: "_blank" },
  { label: "Satıcı Bilgi Merkezi", href: "/sellet", target: "_blank" },
  { label: "Tekera21 Akademi", href: "/sellet", target: "_blank" },
  { label: "Entegrasyon Dökümanı", href: "/sellet", target: "_blank" },
];

interface AlertItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "error" | "warning" | "success";
}

const alertItems: AlertItem[] = [
  {
    id: "1",
    title: "Yeni Sipariş",
    message: "Bir müşteri yeni bir sipariş verdi.",
    type: "success",
  },
  {
    id: "2",
    title: "Stok Uyarısı",
    message: "Stokta azalan ürünler var.",
    type: "warning",
  },
];

function SellerTopbar() {
  return (
    <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 border-b text-sm bg-gray-100 gap-2">
      {/* Left Nav */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {leftLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            target={item.target}
            className="hover:underline text-secondary transition-all duration-300 ease-in-out "
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-4 relative">
        <SellerAnnouncementPopover alertItems={alertItems} />

        <Link
          href="/seller/calendar"
          target="_blank"
          className=" text-secondary transition-all duration-300"
        >
          Takvim
        </Link>
        <Link
          href={"/shop/arzuamber"}
          className=" text-secondary transition-all duration-300"
        >
          Mağazaya Git
        </Link>

        <SellerCompanyPopoverTopbar />
      </div>
    </div>
  );
}

export default SellerTopbar;
