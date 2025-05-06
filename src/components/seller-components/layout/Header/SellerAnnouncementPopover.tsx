import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  AlertCircle,
  CheckCircle,
  Info,
  ShieldAlert,
  Megaphone,
  XCircle,
  AlertTriangle,
} from "lucide-react";

type AlertItem = {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
};

const getAlertStyles = (type: AlertItem["type"]) => {
  switch (type) {
    case "success":
      return {
        icon: <CheckCircle size={20} className="text-green-500" />,
        bgColor: "bg-green-100",
        titleColor: "text-green-800",
      };
    case "warning":
      return {
        icon: <AlertTriangle size={20} className="text-yellow-500" />,
        bgColor: "bg-yellow-100",
        titleColor: "text-yellow-800",
      };
    case "error":
      return {
        icon: <XCircle size={20} className="text-red-500" />,
        bgColor: "bg-red-100",
        titleColor: "text-red-800",
      };
    case "info":
    default:
      return {
        icon: <Info size={20} className="text-blue-500" />,
        bgColor: "bg-blue-100",
        titleColor: "text-blue-800",
      };
  }
};

export default function SellerAnnouncementPopover({
  alertItems,
}: {
  alertItems: AlertItem[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer text-gray-600">
          <Megaphone size={16} />
          Duyurular
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm:w-80 text-sm">
        {alertItems.length === 0 ? (
          <p className="text-gray-600">
            Henüz yeni bir duyuru bulunmamaktadır.
          </p>
        ) : (
          alertItems.map((item) => {
            const styles = getAlertStyles(item.type);
            return (
              <div
                key={item.id}
                className={`flex items-start gap-2 mb-2 p-3 rounded-md shadow-sm border ${styles.bgColor}`}
              >
                {styles.icon}
                <div className="flex flex-col">
                  <span className={`font-semibold ${styles.titleColor}`}>
                    {item.title}
                  </span>
                  <span className="text-gray-700 text-sm">{item.message}</span>
                </div>
              </div>
            );
          })
        )}
      </PopoverContent>
    </Popover>
  );
}
