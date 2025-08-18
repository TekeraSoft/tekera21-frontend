"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  DollarSign,
  Info,
  XCircle,
} from "lucide-react";
import { useNotificationContext } from "@/context/NotificationContext";
import { INotification } from "@/types/NotificationTypes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const router = useRouter();
  const { notifications, unreadCount } = useNotificationContext();

  const getAlertStyles = (type: INotification["type"]) => {
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
        return {
          icon: <Info size={20} className="text-blue-500" />,
          bgColor: "bg-blue-100",
          titleColor: "text-blue-800",
        };
      case "order":
        return {
          icon: <DollarSign size={20} className="text-teal-500" />,
          bgColor: "bg-teal-100",
          titleColor: "text-teal-800",
        };
      default:
        return {
          icon: <Info size={20} className="text-blue-500" />,
          bgColor: "bg-blue-100",
          titleColor: "text-blue-800",
        };
    }
  };

  const goToTheOrders = () => {
    router.push("/seller/orders");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer text-gray-600">
          <Bell size={16} />
          Bildirimler
          {unreadCount > 0 && (
            <span className="text-red-600">({unreadCount})</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm:w-80 text-sm">
        {notifications.length === 0 ? (
          <p className="text-gray-600">
            Henüz yeni bir duyuru bulunmamaktadır.
          </p>
        ) : (
          notifications.map((item) => {
            const styles = getAlertStyles(item.type);
            return (
              <div
                onClick={item.type === "order" ? goToTheOrders : undefined}
                key={item.id}
                className={cn(
                  `flex items-start gap-2 mb-2 p-3 rounded-md shadow-sm border ${styles.bgColor}`,
                  {
                    "cursor-pointer": item.type === "order",
                  }
                )}
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
};

export default Notifications;
