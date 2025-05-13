import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
} from "lucide-react";

type AlertItem = {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error"; // Alert türünü belirtelim
};

type NotificationPopoverProps = {
  alertItems: AlertItem[];
};

export function NotificationPopover({ alertItems }: NotificationPopoverProps) {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle size={24} />,
          iconColor: "text-green-500",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
        };
      case "warning":
        return {
          icon: <AlertTriangle size={24} />,
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      case "info":
        return {
          icon: <Info size={24} />,
          iconColor: "text-blue-500",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
        };
      case "error":
        return {
          icon: <XCircle size={24} />,
          iconColor: "text-red-500",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
      default:
        return {
          icon: <AlertCircle size={24} />,
          iconColor: "text-gray-500",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="relative bg-secondary h-10 w-10 flex justify-center items-center rounded-full cursor-pointer ">
        <Bell className="text-white" size={18} />
        {alertItems.length > 0 && (
          <span className="absolute top-0 right-0 inline-block text-[10px] text-white w-4 h-4 bg-red-500 rounded-full">
            {alertItems.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="min-w-md max-h-[400px] overflow-y-auto p-2 mt-2 lg:hidden">
        {alertItems.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-4">
            Bildiriminiz yok
          </p>
        ) : (
          alertItems.map((alert) => {
            const styles = getAlertStyles(alert.type); // Alert türüne göre stil almak

            return (
              <Alert
                key={alert.id}
                className={`mb-2 flex items-start gap-3 border rounded-lg shadow-sm p-3 ${styles.bgColor}`}
              >
                <div className={`mt-1 ${styles.iconColor}`}>{styles.icon}</div>
                <div className="flex flex-col gap-1 text-sm">
                  <AlertTitle className={`font-semibold ${styles.textColor}`}>
                    {alert.title}
                  </AlertTitle>
                  <AlertDescription className={`text-gray-600`}>
                    {alert.message}
                  </AlertDescription>
                </div>
              </Alert>
            );
          })
        )}
      </PopoverContent>
    </Popover>
  );
}
