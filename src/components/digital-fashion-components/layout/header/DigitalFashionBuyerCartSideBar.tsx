import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function DigitalFashionBuyerCartSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingBag className="h-6 w-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </div>
      </SheetTrigger>

      <SheetContent className="w-72 sm:w-80 ">
        <SheetHeader>
          <SheetTitle>Sepetim</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default DigitalFashionBuyerCartSideBar;
